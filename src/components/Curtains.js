import React, {useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import TweenMax from 'TweenMax'
import TimelineMax from 'TimelineMax'
import FixedPortal from './FixedPortal'
import { withPrefix } from 'gatsby'

const Curtains = React.memo(
  ({registerAnimation, sectionIndex, activeIndex, foregroundPortal, backgroundPortal, persist = 0}) => {
    const uniqueKey = useRef('_' + Math.random().toString(36).substr(2, 9));
    const active = activeIndex >= sectionIndex && activeIndex <= sectionIndex + persist;

    useEffect(() => {

      registerAnimation({
        key: ".Animation--curtain-right" + uniqueKey.current,
        sectionIndex: sectionIndex, 
        tween: () => new TimelineMax()
          .to(".Animation--curtain-right" + uniqueKey.current, .05, {x: '0%'})
          .to(".Animation--curtain-right" + uniqueKey.current, .2, {x: '100%', ease: "Quad.easeOut"})
          .to(".Animation--curtain-right" + uniqueKey.current, (.5 + persist), {x: '100%'})
          .to(".Animation--curtain-right" + uniqueKey.current, .2, {x: '0%', ease: "Quad.easeIn"})
          .to(".Animation--curtain-right" + uniqueKey.current, .05, {x: '0%'}),
        persist: persist
      });

      registerAnimation({
        key: ".Animation--curtain-left" + uniqueKey.current,
        sectionIndex: sectionIndex, 
        tween: () => new TimelineMax()
          .to(".Animation--curtain-left" + uniqueKey.current, .05, {x: '0%'})
          .to(".Animation--curtain-left" + uniqueKey.current, .2, {x: '-100%', ease: "Quad.easeOut"})
          .to(".Animation--curtain-left" + uniqueKey.current, (.5 + persist), {x: '-100%'})
          .to(".Animation--curtain-left" + uniqueKey.current, .2, {x: '0%', ease: "Quad.easeIn"})
          .to(".Animation--curtain-left" + uniqueKey.current, .05, {x: '0%'}),
        persist: persist
      });
    }, [persist]);

    return(
      <React.Fragment>
        <FixedPortal target={backgroundPortal}> 
            <div 
              className={"Panel Transition--fade" + (active ? " isActive" : "")}
              style={{background: "rgba(0,0,0,0.8)"}}
            />            
        </FixedPortal>
        <FixedPortal target={foregroundPortal}>
          <div className={"Transition--fade" + (active ? " isActive" : "")}>
                <div className={"Panel Animation--curtain-right" + uniqueKey.current} style={{
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
                <div className={"Panel Animation--curtain-left" + uniqueKey.current} style={{
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
)})

export default Curtains