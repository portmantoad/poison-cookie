import React, {useRef, useState, useEffect} from 'react'
// import { Link } from 'gatsby'
// import CanvasBlend from './CanvasBlend'
import Icon from './Icon'
// import TweenMax from "TweenMax"
import { throttle } from 'lodash'
// import { withPrefix } from 'gatsby'
// import useMedia from 'use-media';

const Slideshow = () => <div />

// const Slideshow = React.memo(({registerAnimation, sectionIndex, backgroundFill, style, children}) => {

//     const uniqueKey = useRef('_' + Math.random().toString(36).substr(2, 9));

//     const [indexSetByScroll, setIndexSetByScroll] = useState(0);
//     const [indexSetManually, setIndexSetManually] = useState(null);

//     const callbackThrottled = throttle(event => {
//           if (event.state === "DURING"){
//             const newIndex = Math.floor(event.progress * Math.min(children.length, 3));
//             if (!isNaN(newIndex)) setIndexSetByScroll(newIndex);
//           }
//         }, 50)

//     useEffect(() => {
//       registerAnimation({
//         key: ".Animation--slideshow" + uniqueKey.current,
//         sectionIndex: sectionIndex, 
//         callback: ["progress", callbackThrottled]
//       });
//     }, []);

//     const activeIndex = indexSetManually === null ? indexSetByScroll : indexSetManually;
    
//     return (
//       <div className={"Slideshow Animation--slideshow" + uniqueKey.current} style={style}>
//         {children && children.map((child, index) => {
//           return(
//             <div key={"Slideshow--" + index} className={"Slideshow__item" + (backgroundFill ? " Slideshow__item--backgroundFill" : "") + (index === activeIndex ? " isActive" : "")}>
//               {child}
//             </div>
//           )
//         })}
//         <div className="Slideshow__controls">
//           <div 
//             className={"Slideshow__controls__left" + (activeIndex === 0 ? " isDisabled" : "")}
//             onClick={(event) => {event.preventDefault(); setIndexSetManually(activeIndex - 1)}}
//           ><Icon use="arrowLeft" /></div> 
//           {activeIndex + 1}/{children.length}
//           <div 
//             className={"Slideshow__controls__right" + (activeIndex === children.length - 1 ? " isDisabled" : "")}
//             onClick={(event) => {event.preventDefault(); setIndexSetManually(activeIndex + 1)}}
//           ><Icon use="arrowRight" /></div>
//         </div>
//       </div>
//     )
// })

export default Slideshow
