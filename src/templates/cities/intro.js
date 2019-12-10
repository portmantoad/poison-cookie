import React, { useEffect } from 'react'
import VideoPlayer from '../../components/VideoPlayer'
import FixedPortal from '../../components/FixedPortal'
import CanvasBlend from '../../components/CanvasBlend'
import Curtains from '../../components/Curtains'
import Slideshow from '../../components/Slideshow'
import { clamp } from 'lodash'
import { Tween, Timeline } from 'react-gsap';
import { withPrefix, Link } from 'gatsby'


const pages = [
React.memo(
  ({setActiveSection, sectionIndex, activeIndex, active, foregroundPortal, backgroundPortal}) => {

    // useEffect(() => {
    //   registerAnimation({
    //     key: ".SlideSections__background",
    //     sectionIndex: 0, 
    //     tween: () => TweenMax.to(".SlideSections__background", 1, {y: '-' + (20 / ((20 + 100)/100)) + '%', ease: "Linear.easeNone"}),
    //     persist: 'all', 
    //   });

    //   registerAnimation({
    //     key: ".Animation--titlescreen",
    //     sectionIndex: sectionIndex, 
    //     tween:() => TweenMax.to(".Animation--titlescreen", 1, {y: '-' + (20 / ((20 + 100)/100)) + '%', opacity: 0}), 
    //   });
    // }, []);

    return (
    <React.Fragment>
            <FixedPortal target={backgroundPortal}>
               <div 
                 className="SlideSections__background"
                 style={{
                   backgroundImage: "url(" + `${withPrefix('/')}img/paris.jpg` + ")",
                   transform: 'translateY(-' + (20 / ((20 + 100)/100) * (activeIndex / (pages.length - 1))) + '%)',
                   height: "120vh" 
                 }}></div>
               {/*<video className={"IntroCover__vid" + (active ? " isActive" : "")} autoPlay muted loop src={`${withPrefix('/')}img/cover.mp4`} />*/}
            </FixedPortal>
            <div className={
              "Panel Transition--slow-fade" 
              + (active ? " isActive" : "") 
              + (activeIndex < sectionIndex ? " isBefore" : "") 
              + (activeIndex > sectionIndex ? " isAfter" : "")
            } style={{display: "block"}}>
              <img className="IntroCover__img Animation--titlescreen" src={`${withPrefix('/')}img/cover.png`} alt="" />
              <img className="IntroCover__logo" src={`${withPrefix('/')}img/cookietitle.png`} alt="The Poison Cookie Jar" />
            </div>
    </React.Fragment>
  )}
), 

React.memo(
  ({setActiveSection, sectionIndex, activeIndex, active, foregroundPortal, backgroundPortal}) => {

    return(
      <React.Fragment>
        <div className={
              "Panel Transition--slide-up" 
              + (active ? " isActive" : "") 
              + (activeIndex < sectionIndex ? " isBefore" : "") 
              + (activeIndex > sectionIndex ? " isAfter" : "")
        }>
          <div className="videoborder">
            <div className="videoborder__border">
            <img className="videoborder__img videoborder__img--mask2 videoborder__img--alt3" src={`${withPrefix('/')}img/card.jpg`} alt="" /></div>
            <VideoPlayer
                videoId="0GWlYInjOCI"
                active={active}
                onEnd={() => setActiveSection("next")}
              />
          </div>  
        </div>         
      </React.Fragment>
)}), 
React.memo(
  ({setActiveSection, sectionIndex, activeIndex, active, foregroundPortal, backgroundPortal}) => {
    return (
      <React.Fragment>
        <div className={
              "Panel Transition--slide-up" 
              + (active ? " isActive" : "") 
              + (activeIndex < sectionIndex ? " isBefore" : "") 
              + (activeIndex > sectionIndex ? " isAfter" : "")
        }>
          <div className="videoborder">
            <div className="videoborder__border">
            <img className="videoborder__img videoborder__img--mask videoborder__img--alt1" src={`${withPrefix('/')}img/card2.jpg`} alt="" /></div>
            <VideoPlayer
                videoId="xl5eTt4Qusw"
                active={active}
                onEnd={() => setActiveSection("next")}
              />
          </div>  
        </div>  
      </React.Fragment>
)}), React.memo(({setActiveSection, sectionIndex, activeIndex, active, foregroundPortal, backgroundPortal}) => (
          <div className={
            "Panel Panel--centered Transition--slow-fade" 
              + (active ? " isActive" : "")
              + (activeIndex < sectionIndex ? " isBefore" : "") 
              + (activeIndex > sectionIndex ? " isAfter" : "")
          }>
            <div className="fullscreenQuote fullscreenQuote--hollaender">
                <figure className="quote">
                   <q>Under the cover of an evening’s relaxing entertainment, cabaret, like nothing else, suddenly dispenses a <span style={{color: '#be553d', fontStyle: 'italic'}}>poison cookie</span>. Suggestively administered and hastily swallowed, its effect reaches far beyond the harmless evening to make otherwise placid blood boil and inspire a sluggish brain to think.</q>
                   <figcaption><img src={`${withPrefix('/')}img/friedrich.jpg`} alt="" />&ensp;&mdash;&ensp;Friedrich Hollaender, 1932</figcaption>
                </figure>
            </div>
            <div className="bigborder"></div>
          </div>
)), React.memo(({setActiveSection, sectionIndex, activeIndex, active, foregroundPortal, backgroundPortal}) => (
          <div className={
              "EatFast Panel Transition--slide-up" 
              + (active ? " isActive" : "")
              + (activeIndex < sectionIndex ? " isBefore" : "") 
              + (activeIndex > sectionIndex ? " isAfter" : "")
          }>
                <video autoPlay muted loop src={`${withPrefix('/')}img/john-eats.mp4`} />
                <div className={"EatFast__text"}>Eat fast, we're off to <Link className="EatFast__link" to="/cities/paris">Paris</Link></div>
          </div>
))
]


export default pages;