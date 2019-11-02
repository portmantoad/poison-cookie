import React from 'react'
import PropTypes from 'prop-types'
import VideoPlayer from './VideoPlayer'
import ResizeDetector from 'react-resize-detector'
import { Tween, Timeline } from 'react-gsap'
import FixedPortal from './FixedPortal'
import ParisBG from '../img/paris.jpg'
import { clamp } from 'lodash'

class ScrollSections extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
 
    this.backgroundPortalRef = React.createRef();
    this.midgroundPortalRef = React.createRef();
    this.foregroundPortalRef = React.createRef();

    this.state = {
      activeSection: 0,
      // scrollTop: 0
    };
  }

  componentWillMount() {
    if (typeof window !== `undefined`) {
      this.handleScrollThrottled();
      window.addEventListener('scroll', this.handleScrollThrottled , {passive: true});
    }
  }

  handleScroll = () => {
    const scrollTop = clamp((document.documentElement.scrollTop || document.body.scrollTop), 0, this.state.totalHeight);
    console.log(scrollTop);
    let activeSection = 0;
    let prevSectionHeight = 0;

    for (let i = 0; i < this.props.sections.length; i++) {
      if (scrollTop > (prevSectionHeight + this.state["sectionHeight" + i])) {
        prevSectionHeight += this.state["sectionHeight" + i];
        activeSection++;
      }
    }

    const sectionProgress = (scrollTop - prevSectionHeight) / this.state["sectionHeight" + activeSection];
    const totalProgress = scrollTop / this.state.totalHeight;
    this.setState({activeSection, ['sectionProgress' + activeSection]: sectionProgress, totalProgress});
    // if (this.state.activeSection !== activeSection) this.setState({activeSection});
  }

  handleScrollThrottled = () => {
    if (this.scrollTimeout) {
      window.cancelAnimationFrame(this.scrollTimeout);
    }
    this.scrollTimeout = window.requestAnimationFrame(this.handleScroll);
  }

  componentWillUnmount(){
    if (typeof window !== `undefined`) {
      window.removeEventListener('scroll', this.handleScrollThrottled , {passive: true});
    }
  }

  render() {
    const {
      className,
      sections,
      background = ParisBG
    } = this.props;

    return (
      <div className={"ScrollSections" + (className ? ` ${className}` : "")}>

        <ResizeDetector handleHeight onResize={(width, height) => {
          this.setState({ totalHeight: height })
        }} />

       <div className="ScrollSections__fixedRoot ScrollSections__fixedRoot--background" ref={this.backgroundPortalRef}>
        <Tween totalProgress={this.state.totalProgress} paused={true}
            ease="linear"
            position="0"
            from={{y: '0%'}}
            to={{y: '-' + (20 / ((20 + 100)/100)) + '%'}}
          >
              <div 
                className="ScrollSections__background"
                style={{
                  backgroundImage: "url(" + background + ")",
                  height: (20 + 100) + "%"
                }}></div>
          </Tween>

          <ResizeDetector handleHeight onResize={(width, height) => {
            const newState = {visibleHeight: height};
            if (sections) {
              for (var i = sections.length - 1; i >= 0; i--) {
                if (!this.state["sectionHeight" + i] 
                  || this.state["sectionHeight" + i] == this.state.visibleHeight
                ) {
                  newState["sectionHeight" + i] = height;
                }
              }
            }
            this.setState(newState);
          }} /> 
        </div>

        <div className="ScrollSections__fixedRoot ScrollSections__fixedRoot--midground" ref={this.midgroundPortalRef} />

        
          {sections &&
            sections.map((Sect, index) => {
                    const active = this.state.activeSection === index;
                    const heightDiff = this.state["sectionHeight" + index] && this.state.visibleHeight 
                      ? (this.state["sectionHeight" + index] - this.state.visibleHeight) / 2
                      : 0;
                    return (
                      <section className={
                        "ScrollSection ScrollSection--" + index + (active ? " isActive" : "")}>
                        <Sect 
                          progress={this.state["sectionProgress" + index]} 
                          active={active} 
                          foregroundPortal={this.foregroundPortalRef.current} 
                          backgroundPortal={this.backgroundPortalRef.current} 
                          midgroundPortal={this.midgroundPortalRef.current} 
                        />
                        {heightDiff ? (<Tween totalProgress={this.state["sectionProgress" + index]} paused={true} ease="linear" position="0" from={{y: -heightDiff}} to={{y: heightDiff}}>
                            <div className="ScrollSection__timeIndicator"></div>
                          </Tween>) : <div className="ScrollSection__timeIndicator"></div>}
                        <ResizeDetector handleHeight onResize={(width, height) => {
                          if (this.state["sectionHeight" + index] !== height) {
                            this.setState({ ["sectionHeight" + index]: height })
                          }
                        }} />
                      </section>
                  )})
          }

          <div className="ScrollSections__fixedRoot ScrollSections__fixedRoot--foreground" ref={this.foregroundPortalRef} />
      </div>
    );
  }
}


ScrollSections.propTypes = {
  sections: PropTypes.array,
  className: PropTypes.string
}

export default ScrollSections