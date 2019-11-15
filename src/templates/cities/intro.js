import React, { useEffect } from 'react'
import VideoPlayer from '../../components/VideoPlayer'
import FixedPortal from '../../components/FixedPortal'
import CanvasBlend from '../../components/CanvasBlend'
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

      registerAnimation({
        key: ".Animation--titlescreen",
        sectionIndex: sectionIndex, 
        tween:() => TweenMax.to(".Animation--titlescreen", 1, {y: '-' + (20 / ((20 + 100)/100)) + '%', opacity: 0}), 
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
            <div className={"Panel Transition--slow-fade" + (active ? " isActive" : "")}>
            <img src={`${withPrefix('/')}img/cover.png`} alt="" className={"Animation--titlescreen"} style={{
                objectFit: "cover",
                objectPosition: "right 25%",
                // right: "calc(15% - 50px)",
                width: "calc(85% + 50px)",
                // height: "auto",
                height: "calc((100vh - 40px) * 1.2)",
                minHeight: "120%"
              }}/>
              <img src={`${withPrefix('/')}img/cookietitle.png`} alt="The Poison Cookie Jar" style={{
                position: "absolute", 
                right:"5%", bottom: "5%", 
                width: "250px",
                maxWidth:"65%",
                height: "auto"}}/>
            </div>
          </FixedPortal>
    </React.Fragment>
  )}
), 

React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal, progress}) => {
      
    useEffect(() => {
      registerAnimation({
        key: ".Animation--curtains-scrim",
        sectionIndex: sectionIndex, 
        classToggle: ['.Animation--curtains-scrim', 'isActive'], 
        persist: 1, 
      });

      registerAnimation({
        key: ".Animation--curtains",
        sectionIndex: sectionIndex, 
        classToggle: ['.Animation--curtains', 'isActive'], 
        persist: 1, 
      });

      registerAnimation({
        key: ".Animation--curtain-right",
        sectionIndex: sectionIndex, 
        tween: () => new TimelineMax()
          .to(".Animation--curtain-right", .3, {x: '0%'})
          .to(".Animation--curtain-right", .7, {x: '100%'})
          .to(".Animation--curtain-right", 2, {x: '100%'})
          .to(".Animation--curtain-right", .7, {x: '0%'})
          .to(".Animation--curtain-right", .3, {x: '0%'}),
        persist: 1
      });

      registerAnimation({
        key: ".Animation--curtain-left",
        sectionIndex: sectionIndex, 
        tween: () => new TimelineMax()
          .to(".Animation--curtain-left", .3, {x: '0%'})
          .to(".Animation--curtain-left", .7, {x: '-100%'})
          .to(".Animation--curtain-left", 2, {x: '-100%'})
          .to(".Animation--curtain-left", .7, {x: '0%'})
          .to(".Animation--curtain-left", .3, {x: '0%'}),
        persist: 1
      });
    }, []);

    return(
      <React.Fragment>
        <FixedPortal target={midgroundPortal}> 
            <div 
              className={"Panel Transition--fade Animation--curtains-scrim"}
              style={{background: "rgb(72, 46, 40)"}}
            />
            <VideoPlayer
              videoId="ofAfzauCdAU"
              fullscreen
              active={(progress > 0.3) && active}
              onEnd={() => scrollTo("next")}
            />
            
        </FixedPortal>
        <FixedPortal target={foregroundPortal}>
          <div className="Transition--fade Animation--curtains">
                <div className="Panel Animation--curtain-right" style={{
                  left: "50%"
                }}>
                  <img src={`${withPrefix('/')}img/curtain.png`} alt="" style={{
                    height: "100%", 
                    width: "auto", 
                    transform: "scaleX(-1)",
                    minWidth: "calc(100% + 25vh)",
                    position: "absolute", 
                    top: 0, 
                    maxWidth: "unset", 
                    left: "-25vh"
                  }} />  
                </div>
                <div className="Panel Animation--curtain-left" style={{
                  right: "50%"
                }}>
                  <img src={`${withPrefix('/')}img/curtain.png`} alt="" style={{
                    height: "100%", 
                    width: "auto", 
                    minWidth: "calc(100% + 25vh)",
                    position: "absolute", 
                    top: 0, 
                    maxWidth: "unset", 
                    right: "-25vh"
                  }} />  
                </div>
          </div>
        </FixedPortal>
      </React.Fragment>
)}), 
React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal, progress}) => {
    
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
        <FixedPortal target={midgroundPortal}>
            <VideoPlayer
              // videoId="GQPcG4D3Zno"
              videoId="TwXilp2mUtE"
              startTime={18}
              endTime={61}
              fullscreen
              active={(progress < 0.7) && active}
              onEnd={() => scrollTo("next")}
            />
      </FixedPortal>
      </React.Fragment>
)}), React.memo(({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal, progress}) => (
        <FixedPortal target={midgroundPortal}>
          <div className={"Panel Panel--centered Transition--slow-fade" + (active ? " isActive" : "")}>
            <div className="openingQuote">
                <figure className="quote">
                   <q>Under the cover of an evening’s relaxing entertainment, cabaret, like nothing else, suddenly dispenses a <span style={{color: '#be553d', fontStyle: 'italic'}}>poison cookie</span>. Suggestively administered and hastily swallowed, its effect reaches far beyond the harmless evening to make otherwise placid blood boil and inspire a sluggish brain to think.</q>
                   <figcaption><img src={`${withPrefix('/')}img/friedrich.jpg`} alt="" />&ensp;&mdash;&ensp;Friedrich Hollaender, 1932</figcaption>
                </figure>
            </div>
            <div className="bigborder"></div>
          </div>
        </FixedPortal>
)), React.memo(({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal, progress}) => (
            <CanvasBlend 
              use="multiply" 
              className={"Transition--slow-fade" + (active ? " isActive" : "")}
              style={{
                maxWidth: "100%"
              }}>
              <img src={`${withPrefix('/')}img/parisCanal.jpg`} alt="" />
            </CanvasBlend>
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
)), React.memo(({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal, progress}) => (
        <FixedPortal target={midgroundPortal}>
          <div style={{
            position: "absolute", 
            top:0, left:0, bottom:0, right:0, 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            textAlign: "center"
          }} >
              <div className={"Transition--slow-fade" + (active ? " isActive" : "") }>
                Eat fast, we're off to paris
              </div>
          </div>
        </FixedPortal>
))
]