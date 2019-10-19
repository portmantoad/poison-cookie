import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Slideshow from './Slideshow'
import Video from './Slideshow'
import { Controller, Scene } from 'react-scrollmagic'
import ResizeDetector from 'react-resize-detector'
import { Tween, Timeline } from 'react-gsap'
import Vimeo from '@u-wave/react-vimeo';

const Components = {
  Slideshow,
  Video
};

const SectionComponent = (props) => {
  let Component = Components[ props.component ];
  return (<Component { ...props } />);
};

class FixedPortal extends React.PureComponent {
  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.props.target || document.querySelector("body")
    );
  }
}

class VideoPlayer extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
 
    this.vidRef = React.createRef();
    this.state = {volume: 1};
  }

  clearAudioFadeInterval = () => {
    clearInterval(this.audioFadeInterval);
  }

  play = () => {
    const vid = this.vidRef.current.player;
    this.clearAudioFadeInterval();
    vid.volume = 1;
    vid.play();
  }

  pause = () => {
    const vid = this.vidRef.current.player;
    this.vol = this.state.volume;
    this.clearAudioFadeInterval();
    this.audioFadeInterval = setInterval(() => {
        if (this.vol < 0.1) {
            this.setState({volume: 0});
            vid.pause();
            this.clearAudioFadeInterval();
        } else {
            this.vol -= 0.1
            this.setState({volume: this.vol});
        }
    }, 100);
  }

  render() {
    const {
      className,
      fullscreen,
      video,
      active
    } = this.props;

    return <div 
      className={"Video" + (fullscreen ? " Video--fullscreen" : "") + (className ? ` ${className}` : "")}
      onClick={() => {
        this.pause();
        console.log(this.pause)
      }}> 
    <Vimeo 
      ref={this.vidRef}
      video={video}
      volume={this.state.volume}
      controls={false}
      playsinline
      responsive
      showTitle={false}
      showPortrait={false}
      showByline={false}
      paused={!active}
      onPlay={(...something) => {
        if(!active) {
          this.vidRef.current.player.pause();
        }
      }}
      
    />
    </div>
  }
}

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
      background = 'https://picsum.photos/id/434/3000/2500'
    } = this.props;

    return (
      <div className={"ScrollSections" + (className ? ` ${className}` : "")}>
        <style dangerouslySetInnerHTML={{__html: `
          .ScrollSections {
            position: absolute; 
            top: 0; left: 0; 
            width: 100%; 
            padding: 50vh 0 calc(50vh - 1px);
          }
          .ScrollSections__fixedRoot{
            position: fixed; 
            top: 0; left: 0; 
            width: 100%; 
            height: 100vh;
          }
          .ScrollSections__background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 110%;
            background-size: cover;
            opacity:0.1;
          }
          .ScrollSections__section {
            opacity: 1;
            transition: opacity 250ms;
            display: flex; 
            align-items: center; 
            justify-content:center;
            min-height: 100vh;
            position: relative;
            top:0;
            left:0;
            width:100%;
          }
          .ScrollSections__section.isActive { opacity: 1;}

          .ScrollSections__timeIndicator{
             position: absolute;
             top:0;
             left:0;
             bottom: 0;
           }
           .ScrollSections__timeIndicator:after{
                content:'';
                display:block;
                width:8px;
                height:10%;
                position:absolute;
                top:45%;
                left:2px;
                border-radius: 5px;
                background-color: rgba(0,0,0,0.6);
                background-clip: padding-box;
                border:1px solid rgba(255,255,255,0.3);
           }

           .slowfade{
            transition: opacity 1000ms;
           }
           .slowfade:not(.isActive){ 
            opacity: 0;
            pointer-events: none;
           }

           .Video{
            background-color: #000;
           }

           .Video > div{
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            transform: translate(-50%,-50%);
            pointer-events: none;
           }

           .Video--fullscreen{
            position: absolute;
            top: 0;
            left: 0;
            width: 100% !important;
            height: 100% !important;
           }
        `}} />

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
              const extraScroll = 50;
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
                          className={
                            "ScrollSections__background slowfade" 
                            + (active ? " isActive" : "")
                          } 
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
            sections.map((section, index) => {
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
                    const scene = event.currentTarget;
                    // console.log(event);
                    return (
                      <section className={"ScrollSections__section ScrollSections__section--" + index}>
                        <SectionComponent {...section} progress={progress} active={active} />
                        <FixedPortal target={this.foregroundPortalRef.current}>
                          <VideoPlayer
                            video="362160902"
                            fullscreen
                            className={"slowfade" + (active ? " isActive" : "")}
                            active={active}
                          />
                          <Timeline totalProgress={progress} paused={true}>
                            <Tween ease="linear" position="0" from={{y: '50%'}} to={{y: '-50%'}}>
                              <div className={"ScrollSections__timeIndicator slowfade" + (active ? " isActive" : "")}></div>
                            </Tween>
                          </Timeline>
                        </FixedPortal>
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