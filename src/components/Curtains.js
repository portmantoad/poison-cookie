import React, {useEffect, useRef, useContext} from 'react'
import PropTypes from 'prop-types'
import TweenMax from 'TweenMax'
import TimelineMax from 'TimelineMax'
import FixedPortal from './FixedPortal'
import { withPrefix } from 'gatsby'
import { ASContext } from './contexts'

// const Curtains = () => <div />

const Curtains = 
React.memo(
  ({registerAnimation, activeIndex, sectionIndex, foregroundPortal, backgroundPortal, persist = 0}) => {
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
)}
    , (prevProps, nextProps) => {
    const prevActive = prevProps.activeIndex >= prevProps.sectionIndex && prevProps.activeIndex <= prevProps.sectionIndex + prevProps.persist;
    const nextActive = nextProps.activeIndex >= nextProps.sectionIndex && nextProps.activeIndex <= nextProps.sectionIndex + nextProps.persist;
    if (prevActive !== nextActive) {
      return false
    }
    return true
}
)

const CurtainsWrapped = props => {
    const activeIndex = useContext(ASContext);
    return <Curtains activeIndex={activeIndex} {...props} />
}

export default CurtainsWrapped