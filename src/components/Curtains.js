import React, {useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
// import { Tween, Timeline } from 'react-gsap';
import FixedPortal from './FixedPortal'
import { withPrefix } from 'gatsby'

const Curtains = React.memo(
  ({registerAnimation, sectionIndex, activeIndex, foregroundPortal, backgroundPortal, persist = 0}) => {
    const uniqueKey = useRef('_' + Math.random().toString(36).substr(2, 9));
    const active = activeIndex >= sectionIndex && activeIndex <= sectionIndex + persist;

    return(
      <React.Fragment>
        <FixedPortal target={backgroundPortal}> 
            <div className={"Curtains__scrim" + (active ? " isActive" : "")} />            
        </FixedPortal>
        <FixedPortal target={foregroundPortal}>
          <div className={"Curtains" + (active ? " isActive" : "")}>
                <div className={"Panel Curtains__curtain-right"} style={{
                  left: "50%"
                }}>
                  <img src={`${withPrefix('/')}img/curtain.png`} alt="" />  
                </div>
                <div className={"Panel Curtains__curtain-left"} style={{
                  right: "50%"
                }}>
                  <img src={`${withPrefix('/')}img/curtain.png`} alt="" />  
                </div>
          </div>
        </FixedPortal>
      </React.Fragment>
)})

export default Curtains