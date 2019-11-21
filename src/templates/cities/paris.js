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

const pages = [
React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {
    useEffect(() => {
      registerAnimation({
        key: ".ScrollSections__background",
        sectionIndex: 0, 
        tween: () => TweenMax.to(".ScrollSections__background", 1, {y: '-' + ((pages.length * 3) / (((pages.length * 3) + 100)/100)) + '%', ease: "Linear.easeNone"}),
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
           height: ((pages.length * 3) + 100) + "vh"
         }}></div>
      </FixedPortal>
      <FixedPortal target={midgroundPortal}>
        <div className={"Panel Panel--centered Transition--slow-fade" + (active ? " isActive" : "")}
        style={{flexDirection: "column"}}>
          <img src={`${withPrefix('/')}img/bienvenue-a-paris.png`} alt="" className="welcomeToParis" />
          <div className="videoborder">
            <div className="videoborder__border"><img src={`${withPrefix('/')}img/card.jpg`} alt="" /></div>
            <VideoPlayer
                videoId="qdU_IKxIhAk"
                active={active}
                onEnd={() => scrollTo("next")}
              />
          </div>  
        </div>    
      </FixedPortal>
    </React.Fragment>
  )}
), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <Curtains 
          registerAnimation={registerAnimation}
          sectionIndex={sectionIndex}
          activeIndex={activeIndex}
          foregroundPortal={foregroundPortal}
          backgroundPortal={backgroundPortal}
          persist={1}
        />
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              videoId="89KcuiXDKb4"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next", 0)}
            />
            
        </FixedPortal>
      </React.Fragment>
)}), React.memo(({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => (
          <FixedPortal target={midgroundPortal}>
            <div className={"Panel Transition--fade" + (active ? " isActive" : "")}>
              <Slideshow 
                registerAnimation={registerAnimation}
                sectionIndex={sectionIndex}
                backgroundFill
              >
                <CanvasBlend use="screenBW"><img src={`${withPrefix('/')}img/cabaret_1.jpg`} alt="" /></CanvasBlend>
                <CanvasBlend use="screenBW"><img src={`${withPrefix('/')}img/cabaret_2.jpg`} alt="" /></CanvasBlend>
                <CanvasBlend use="screenBW"><img src={`${withPrefix('/')}img/cabaret_3.jpg`} alt="" /></CanvasBlend>
              </Slideshow>
            </div>
          </FixedPortal>
)), React.memo(({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => (
          <FixedPortal target={midgroundPortal}>
            <div className={"Panel Panel--centered Transition--slow-fade" + (active ? " isActive" : "")}>
              <div className="videoborder">
                <div className="videoborder__border"><img src={`${withPrefix('/')}img/card.jpg`} alt="" /></div>
                <VideoPlayer
                    videoId="LkdWOkpCuTw"
                    active={active}
                    onEnd={() => scrollTo("next")}
                  />
              </div>  
            </div>    
          </FixedPortal>
)), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <Curtains 
          registerAnimation={registerAnimation}
          sectionIndex={sectionIndex}
          activeIndex={activeIndex}
          foregroundPortal={foregroundPortal}
          backgroundPortal={backgroundPortal}
          persist={2}
        />
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              videoId="W9jpiLfRLNs"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
            
        </FixedPortal>
      </React.Fragment>
)}), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              videoId="be9mHcfnLF8"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
        </FixedPortal>
      </React.Fragment>
)}), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              videoId="6NvzF1_f0Pw"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
        </FixedPortal>
      </React.Fragment>
)}), React.memo(({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => (
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
)), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <Curtains 
          registerAnimation={registerAnimation}
          sectionIndex={sectionIndex}
          activeIndex={activeIndex}
          foregroundPortal={foregroundPortal}
          backgroundPortal={backgroundPortal}
          persist={4}
        />
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              videoId="ABGiqizwCso"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
            
        </FixedPortal>
      </React.Fragment>
)}), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              videoId="Euo71tDlx4w"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
        </FixedPortal>
      </React.Fragment>
)}), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              videoId="xaqCPARmBjA"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
        </FixedPortal>
      </React.Fragment>
)}), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              videoId="jkZQ5r0Vq1o"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
        </FixedPortal>
      </React.Fragment>
)}), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              videoId="39mZ4tqemf8"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
        </FixedPortal>
      </React.Fragment>
)}), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {
    return(
      <React.Fragment>
        In the 1920s and 30s, a flood of expats in Paris created both a stream of American entertainers and American ex-pats who would flock to establishments with American artists (as did the French). A huge part of the reason was jazz’s rapid advance around the world. In particular, African American artists who could not perform in front of integrated audiences at home and who were appalled and exhausted at their treatment in America found refuge in Paris. This cross-cultural exchange would have a lasting impact on cabaret in both Paris and America (and also in Berlin which was not immune to the influence of Josephine Baker). 
      </React.Fragment>
)}), React.memo(({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => (
          <FixedPortal target={midgroundPortal}>
            <div className={"Panel Panel--centered Transition--slow-fade" + (active ? " isActive" : "")}>
              <div className="videoborder">
                <div className="videoborder__border"><img src={`${withPrefix('/')}img/card.jpg`} alt="" /></div>
                <VideoPlayer
                    videoId="vrvVpZsKVYk"
                    active={active}
                    onEnd={() => scrollTo("next")}
                  />
              </div>  
            </div>    
          </FixedPortal>
)), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <Curtains 
          registerAnimation={registerAnimation}
          sectionIndex={sectionIndex}
          activeIndex={activeIndex}
          foregroundPortal={foregroundPortal}
          backgroundPortal={backgroundPortal}
          persist={3}
        />
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              videoId="0iUTZajxlWI"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
            
        </FixedPortal>
      </React.Fragment>
)}), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              videoId="9pkLvfFZnPk"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
        </FixedPortal>
      </React.Fragment>
)}), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              videoId="azhgpelu0vY"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
        </FixedPortal>
      </React.Fragment>
)}), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              videoId="EPS2C3SYLsY"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
        </FixedPortal>
      </React.Fragment>
)})
]

export default pages;
