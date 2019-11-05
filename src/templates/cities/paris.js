import React from 'react'
import VideoPlayer from '../../components/VideoPlayer'
import FixedPortal from '../../components/FixedPortal'

import TweenMax from 'TweenMax'
import TimelineMax from 'TimelineMax'
import { withPrefix } from 'gatsby'

export default [
React.memo(
  ({registerAnimation, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal, progress}) => {

    // console.log(registerAnimation);
    registerAnimation({
      key: "Animation--titlescreen" + sectionIndex,
      sectionIndex: sectionIndex, 
      tween:() => TweenMax.to(".Animation--titlescreen", 1, {y: '-' + (20 / ((20 + 100)/100)) + '%', opacity: 0}), 
      // classToggle, 
      // persist: 0, 
      // start = 0, 
      // end = 1
    });

    return (
    <React.Fragment>
            <FixedPortal target={midgroundPortal}>
            <div className={"Panel Transition--slow-fade" + (active ? " isActive" : "")}>
              <div className={"Panel Animation--titlescreen"} style={{
                background: "url(" + `${withPrefix('/')}img/cover.png` + ")",
                backgroundSize: "cover",
                backgroundPosition: "right 25%",
                right: "calc(15% - 50px)",
                bottom: "-20%"
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
) 
]
