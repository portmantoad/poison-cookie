import React, { useEffect } from 'react'
import VideoPlayer from '../../components/VideoPlayer'
import FixedPortal from '../../components/FixedPortal'
import CanvasBlend from '../../components/CanvasBlend'
import Curtains from '../../components/Curtains'
import Slideshow from '../../components/Slideshow'
import { clamp } from 'lodash'
import { withPrefix, Link } from 'gatsby'


export default [

React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {

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
               <video className={"IntroCover__vid" + (active ? " isActive" : "")} autoPlay muted loop src={`${withPrefix('/')}img/cover.mp4`} />
            </FixedPortal>
          <FixedPortal target={midgroundPortal}>
            <div className={"Panel Transition--slow-fade" + (active ? " isActive" : "")} style={{display: "block"}}>
              <img className="IntroCover__img Animation--titlescreen" src={`${withPrefix('/')}img/cover.png`} alt="" />
              <img className="IntroCover__logo" src={`${withPrefix('/')}img/cookietitle.png`} alt="The Poison Cookie Jar" />
            </div>
          </FixedPortal>
    </React.Fragment>
  )}
), 

React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <Curtains 
          registerAnimation={registerAnimation}
          sectionIndex={sectionIndex}
          activeIndex={activeIndex}
          foregroundPortal={foregroundPortal}
          midgroundPortal={backgroundPortal}
          persist={1}
        />
        <div className={"Panel Transition--fade" + (active ? " isActive" : "")}>
            <VideoPlayer
              videoId="0GWlYInjOCI"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />           
        </div>
      </React.Fragment>
)}), 
React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {
    
    // registerAnimation({
    //   key: "Animation--curtain-right-leave" + sectionIndex,
    //   sectionIndex: sectionIndex, 
    //   tween: () => TweenMax.from(".Animation--curtain-right", 1, {x: '100%'}), 
    //   start: 0.5, 
    //   end: 1
    // });

    // registerAnimation({
    //   key: "Animation--curtain-left-leave" + sectionIndex,
    //   sectionIndex: sectionIndex, 
    //   tween: () => TweenMax.from(".Animation--curtain-left", 1, {x: '-100%'}), 
    //   start: 0.5, 
    //   end: 1
    // });
    return (
      <React.Fragment>
        <div className={"Panel Transition--fade" + (active ? " isActive" : "")}>
            <VideoPlayer
              // videoId="GQPcG4D3Zno"
              videoId="xl5eTt4Qusw"
              // startTime={18}
              // endTime={61}
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
      </div>
      </React.Fragment>
)}), React.memo(({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => (
        <FixedPortal target={midgroundPortal}>
          <div className={"Panel Panel--centered Transition--slow-fade" + (active ? " isActive" : "")}>
            <div className="fullscreenQuote fullscreenQuote--hollaender">
                <figure className="quote">
                   <q>Under the cover of an evening’s relaxing entertainment, cabaret, like nothing else, suddenly dispenses a <span style={{color: '#be553d', fontStyle: 'italic'}}>poison cookie</span>. Suggestively administered and hastily swallowed, its effect reaches far beyond the harmless evening to make otherwise placid blood boil and inspire a sluggish brain to think.</q>
                   <figcaption><img src={`${withPrefix('/')}img/friedrich.jpg`} alt="" />&ensp;&mdash;&ensp;Friedrich Hollaender, 1932</figcaption>
                </figure>
            </div>
            <div className="bigborder"></div>
          </div>
        </FixedPortal>
)), React.memo(({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => (
        <FixedPortal target={midgroundPortal}>
          <div className={"EatFast Panel Transition--slow-fade" + (active ? " isActive" : "")}  >
                <video autoPlay muted loop src={`${withPrefix('/')}img/john-eats.mp4`} />
                <div className={"EatFast__text"}>Eat fast, we're off to <Link className="EatFast__link" to="/cities/paris">Paris</Link></div>
          </div>
        </FixedPortal>
))
]