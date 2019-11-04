import React from 'react'
import PropTypes from 'prop-types'
import VideoPlayer from './VideoPlayer'
import ResizeDetector from 'react-resize-detector'
import { Tween, Timeline } from 'react-gsap'
import FixedPortal from './FixedPortal'
import ParisBG from '../img/paris.jpg'
import { clamp, throttle } from 'lodash'

class ScrollSections extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
 
    this.backgroundPortalRef = React.createRef();
    this.midgroundPortalRef = React.createRef();
    this.foregroundPortalRef = React.createRef();

    this.state = {
      // scrollTop: 0
    };
  }

  componentWillMount() {
    if (typeof window !== `undefined`) {
      this.handleScrollThrottled();
      window.addEventListener('scroll', this.handleScrollThrottled , {passive: true});
    }
  }

  getSectionOffset = (index) => {
    let offset = 0;
    for (let i = 0; i < index; i++) {
      offset += this.state["sectionHeight" + i];
    }
    return offset;
  }

  handleScroll = () => {
    const scrollTop = clamp((document.documentElement.scrollTop || document.body.scrollTop), 0, this.state.totalHeight);
    const newState = {};

    for (let i = 0; i < this.props.sections.length; i++) {
      const height = this.state["sectionHeight" + i];

      if (isNaN(height)) {
        this.handleScrollThrottled();
        return false;
      }

      const offset = this.getSectionOffset(i);

      if (scrollTop >= offset && (scrollTop - offset) <= height) {
        newState['sectionProgress' + i] = (scrollTop - offset) / height;
        if (!this.state['sectionActive' + i]) {
          newState['sectionActive' + i] = true;
        }
      } else if (this.state['sectionActive' + i]) {
        newState['sectionActive' + i] = false;
      }
    }

    newState.totalProgress = scrollTop / this.state.totalHeight;

    this.setState(newState);

  }

  handleScrollThrottled = () => {
    if (this.scrollTimeout) {
      window.cancelAnimationFrame(this.scrollTimeout);
    }
    this.scrollTimeout = window.requestAnimationFrame(this.handleScroll);
  };

  // handleScrollThrottled = () => {
  //   if (this.scrollTimeout) {
  //     window.cancelAnimationFrame(this.scrollTimeout);
  //   }
  //   this.scrollTimeout = window.requestAnimationFrame(this.handleScroll);
  // }

  componentWillUnmount(){
    if (typeof window !== `undefined`) {
      window.removeEventListener('scroll', this.handleScrollThrottled , {passive: true});
      window.cancelAnimationFrame(this.scrollTimeout);
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

        <ResizeDetector refreshMode='debounce' handleHeight onResize={(width, height) => {
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

          <ResizeDetector refreshMode='debounce' handleHeight onResize={(width, height) => {
            this.setState({visibleHeight: height});
          }} /> 
        </div>

        <div className="ScrollSections__fixedRoot ScrollSections__fixedRoot--midground" ref={this.midgroundPortalRef} />

        
          {sections &&
            sections.map((Sect, index) => {
                    const active = this.state["sectionActive" + index];
                    const heightDiff = this.state["sectionHeight" + index] && this.state.visibleHeight
                      ? (this.state["sectionHeight" + index] - this.state.visibleHeight) / 2
                      : 0;
                    return (
                      <section className={
                          "ScrollSection ScrollSection--" + index + (active ? " isActive" : "")
                        } style = {{
                          ...(this.state.visibleHeight ? {minHeight: this.state.visibleHeight} : {})
                        }}
                      >
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
                        <ResizeDetector refreshMode='debounce' handleHeight onResize={(width, height) => {
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