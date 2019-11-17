import React, { useEffect } from 'react'
import VideoPlayer from '../../components/VideoPlayer'
import FixedPortal from '../../components/FixedPortal'
import CanvasBlend from '../../components/CanvasBlend'
import Curtains from '../../components/Curtains'
import Slideshow from '../../components/Slideshow'
import { clamp } from 'lodash'
import TweenMax from 'TweenMax'
import TimelineMax from 'TimelineMax'
import { withPrefix } from 'gatsby'

export default [
React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal, progress}) => {
    useEffect(() => {
      registerAnimation({
        key: ".ScrollSections__background",
        sectionIndex: 0, 
        tween: () => TweenMax.to(".ScrollSections__background", 1, {y: '-' + (20 / ((20 + 100)/100)) + '%', ease: "Linear.easeNone"}),
        persist: 'all', 
      });
    }, []);

    return (
    <React.Fragment>
      <FixedPortal target={backgroundPortal}>
        <div 
         className="ScrollSections__background"
         style={{
           backgroundImage: "url(" + `${withPrefix('/')}img/paris.jpg` + ")",
           // height: (20 + 100) + "%"
           height: "120vh"
         }}></div>
      </FixedPortal>
      <FixedPortal target={midgroundPortal}>
        <div className={"Panel Panel--centered Transition--slow-fade" + (active ? " isActive" : "")}
        style={{flexDirection: "column"}}>
          <img src={`${withPrefix('/')}img/bienvenue-a-paris.png`} alt="" className="welcomeToParis" />
          <div className="videoborder">
            <div className="videoborder__border"><img src={`${withPrefix('/')}img/card.jpg`} alt="" /></div>
            <VideoPlayer
                videoId="TwXilp2mUtE"
                startTime={18}
                endTime={61}
                active={active}
                onEnd={() => scrollTo("next")}
              />
          </div>  
        </div>    
      </FixedPortal>
    </React.Fragment>
  )}
), 

React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal, progress}) => {

    return(
      <React.Fragment>
        <Curtains 
          registerAnimation={registerAnimation}
          sectionIndex={sectionIndex}
          foregroundPortal={foregroundPortal}
          backgroundPortal={backgroundPortal}
          persist={1}
        />
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              videoId="89KcuiXDKb4"
              fullscreen
              active={(progress > 0.2) && (progress < 0.8) && active}
              onEnd={() => scrollTo("next")}
            />
            
        </FixedPortal>
      </React.Fragment>
)}), React.memo(({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal, progress}) => (
          <FixedPortal target={midgroundPortal}>
            <div className={"Panel Transition--fade" + (active ? " isActive" : "")}>
              <Slideshow progress={progress}>
                <img src={`${withPrefix('/')}img/parisCanal.jpg`} alt="" />
                <img src={`${withPrefix('/')}img/jumbotron.jpg`} alt="" />
                <img src={`${withPrefix('/')}img/chemex.jpg`} alt="" />
                <img src={`${withPrefix('/')}img/og-image.jpg`} alt="" />
              </Slideshow>
            </div>
          </FixedPortal>
)), React.memo(({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal, progress}) => (
          <FixedPortal target={midgroundPortal}>
            <div className={"Panel Transition--fade" + (active ? " isActive" : "")}>
              <Slideshow progress={progress}>
                <CanvasBlend use="multiply"><img src={`${withPrefix('/')}img/parisCanal.jpg`} alt="" /></CanvasBlend>
                <CanvasBlend use="multiply"><img src={`${withPrefix('/')}img/jumbotron.jpg`} alt="" /></CanvasBlend>
                <CanvasBlend use="multiply"><img src={`${withPrefix('/')}img/chemex.jpg`} alt="" /></CanvasBlend>
                <CanvasBlend use="multiply"><img src={`${withPrefix('/')}img/og-image.jpg`} alt="" /></CanvasBlend>
              </Slideshow>
            </div>
          </FixedPortal>
))
]
