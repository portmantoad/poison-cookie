import React, {useState} from 'react'
// import { Link } from 'gatsby'
// import CanvasBlend from './CanvasBlend'
import Icon from './Icon'
// import { withPrefix } from 'gatsby'
// import useMedia from 'use-media';

const Slideshow = ({progress, children}) => {

    const [activeIndex, setActiveIndex] = useState(0);
    const [indexSetManually, setIndexSetManually] = useState(false);

    if (!indexSetManually) {
      const newIndex = Math.floor(progress * children.length);
      if (!isNaN(newIndex) && newIndex !== activeIndex) setActiveIndex(newIndex);
    }
    
    return (
      <div className="Slideshow">
        {children && children.map((child, index) => {
          return(
            <div className={"Slideshow__item" + (index === activeIndex ? " isActive" : "")}>
              {child}
            </div>
          )
        })}
        <div className="Slideshow__controls">
          <div 
            className={"Slideshow__controls__left" + (activeIndex === 0 ? " isDisabled" : "")}
            onClick={() => {setIndexSetManually(true); setActiveIndex(activeIndex - 1)}}
          ><Icon use="arrowLeft" /></div> 
          {activeIndex + 1}/{children.length}
          <div 
            className={"Slideshow__controls__right" + (activeIndex === children.length - 1 ? " isDisabled" : "")}
            onClick={() => {setIndexSetManually(true); setActiveIndex(activeIndex + 1)}}
          ><Icon use="arrowRight" /></div>
        </div>
      </div>
    )
}

export default Slideshow
