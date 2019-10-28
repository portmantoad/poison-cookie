import React from 'react'
import PropTypes from 'prop-types'
import VideoPlayer from './VideoPlayer'
import { Controller, Scene } from 'react-scrollmagic'
import ResizeDetector from 'react-resize-detector'
import { Tween, Timeline } from 'react-gsap'
import FixedPortal from './FixedPortal'
import ParisBG from '../img/paris.jpg'

class ScrollSections extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
 
    this.backgroundPortalRef = React.createRef();
    this.foregroundPortalRef = React.createRef();

    this.state = {};
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

        <Controller refreshInterval="5">
          <Scene duration={this.state.totalHeight || "100%"} triggerHook="onLeave">
            {(progress, event) => {
              const active = event.state === "DURING";
              const extraScroll = 20;
              return (
                <FixedPortal target={this.backgroundPortalRef.current}>
                  <Timeline totalProgress={progress} paused={true}>
                    <Tween
                      ease="linear"
                      position="0"
                      from={{y: '0%'}}
                      to={{y: '-' + (extraScroll / ((extraScroll + 100)/100)) + '%'}}
                    >
                        <div 
                          className="ScrollSections__background"
                          style={{
                            background: "url(" + background + ")",
                            height: (extraScroll + 100) + "%"
                          }}></div>
                    </Tween>
                  </Timeline>
                </FixedPortal>
            )}}
          </Scene>

          {sections &&
            sections.map((Sect, index) => {
              return(
                <Scene 
                  key={"ScrollSections__section--" + index} 
                  duration={
                    this.state["sectionHeight" + index] 
                    || this.state.visibleHeight 
                    || "100%"
                  } 
                  classToggle="isActive"
                >
                  {(progress, event) => {
                    const active = event.state === "DURING";
                    const heightDiff = this.state["sectionHeight" + index] && this.state.visibleHeight 
                      ? (this.state["sectionHeight" + index] - this.state.visibleHeight) / 2
                      : 0;
                    return (
                      <section className={"ScrollSection ScrollSection--" + index}>
                        <Sect 
                          progress={progress} 
                          active={active} 
                          foregroundPortal={this.foregroundPortalRef.current} 
                          backgroundPortal={this.backgroundPortalRef.current} 
                        />
                        {heightDiff ? (<Timeline totalProgress={progress} paused={true}>
                          <Tween ease="linear" position="0" from={{y: -heightDiff}} to={{y: heightDiff}}>
                            <div className="ScrollSection__timeIndicator"></div>
                          </Tween>
                        </Timeline>) : <div className="ScrollSection__timeIndicator"></div>}
                        <ResizeDetector handleHeight onResize={(width, height) => {
                          if (this.state["sectionHeight" + index] !== height) {
                            this.setState({ ["sectionHeight" + index]: height })
                          }
                        }} />
                      </section>
                  )}}
                </Scene>
                      
                    
              )
            })
          }
          </Controller>

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