import React, {useState, useEffect, useRef, useContext} from 'react'
import PropTypes from 'prop-types'
import { withPrefix } from 'gatsby'
import { useInView } from 'react-intersection-observer'
import {useSpring, animated} from 'react-spring'
// import { useScrollData } from "scroll-data-hook";

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

// import debounceActiveRender from './debounceActiveRender'

const Curtains = React.memo( () => {

    const [ref, open] = useInView({ threshold: 0.1 })

    const positioning = `
          position: absolute;
          top:0; left:0; bottom:0; right:0;
    `;

    const curtainShared = `
      ${positioning}
      will-change: transform;
      border-top-right-radius: 5px;
      pointer-events: none;
      display: flex;
      align-items: stretch;
      justify-content: stretch;

      img{
        height: 100%;
        width: auto;
        flex-grow:0
      }

      &:before{
        content: "";
        height: 100%;
        flex-grow: 1;
        background-image: url('${withPrefix('/')}img/curtain-inner.png');
        background-size: auto 100%;
        background-position: top right;
      }
    `;

    const overlapWidth = '7vw - 25px'

    const disableSpring = false;

    const rightSpring = disableSpring ? {} : useSpring({config: { friction: 100 }, transform: open ? `translate3d(50vw,0,0) scaleX(-1)` : `translate3d(0vw,0,0) scaleX(-1)`})
    const leftSpring = disableSpring ? {} : useSpring({config: { friction: 100 }, transform: open ? `translate3d(-50vw,0,0)` : `translate3d(0vw,0,0)`})

    
    
    return(
        <div ref={ref} css={css(`${positioning}
          // mask-image: url('${withPrefix('/')}img/paper_mask.png');
          // mask-size: 100% 100%;
        `)}>
              <animated.div css={css(`
                ${curtainShared}
                left: calc(50% - ${overlapWidth});
                ${disableSpring ? `
                    transition: transform 1000ms;
                    transform: translateX(calc((100% - ${overlapWidth}) * ${open ? 1 : 0})) scaleX(-1);
                  `: ''
                }
              `)} style={rightSpring}><img src={`${withPrefix('/')}img/curtain-outer.png`} alt=""/></animated.div>
              <animated.div css={css(`
                ${curtainShared}
                right: calc(50% - ${overlapWidth});
                ${disableSpring ? `
                    transition: transform 1000ms;
                    transform: translateX(calc((100% - ${overlapWidth}) * ${open ? -1 : 0}));
                  ` : ''
                }
              `)} style={leftSpring}><img src={`${withPrefix('/')}img/curtain-outer.png`} alt=""/></animated.div>
        </div>
)});

export default Curtains