import React from 'react'
import ReactDOM from 'react-dom'
// import PropTypes from 'prop-types'
import { withPrefix } from 'gatsby'
import CanvasBlend from './CanvasBlend'
import Parallax from './Parallax'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useInView } from 'react-intersection-observer'




const wrapperStyles=`
  position: absolute;
  top:0;
  left:0;
  display:flex;
`;

const imgStyles=`min-width: 100vw; min-height: 100vh;`;

const Clouds = React.memo(({dimensions, color = [241,244,198]}) => {

const [inViewRef, inView] = useInView({ threshold: 0 })
  return(
    <React.Fragment>
      <Parallax speed="-12" dimensions={dimensions}>
        <div css={css(`
          @keyframes clouds2 {
            from {
              transform: translateX(-50%);
            }

            to {
              transform: translateX(0%);
            }
          }
          ${wrapperStyles}
          ${inView ? 'animation: 120s linear infinite clouds2;' : ''}
        `)}>
          <CanvasBlend use="mask" color={color} css={css(`${imgStyles}`)} >
            <img src={`${withPrefix('/')}img/clouds2.jpg`} alt=""/>
          </CanvasBlend>
          <CanvasBlend use="mask" color={color} css={css(`${imgStyles}`)} >
            <img src={`${withPrefix('/')}img/clouds2.jpg`} alt=""/>
          </CanvasBlend>
        </div>
        </Parallax>
        <Parallax speed="-8" dimensions={dimensions}>
        <div ref={inViewRef} css={css(`
          @keyframes clouds {
            from {
              transform: translateX(0%);
            }

            to {
              transform: translateX(-50%);
            }
          }
          ${wrapperStyles}
          ${inView ? 'animation: 60s linear infinite clouds;' : ''}
        `)} >
          <CanvasBlend use="screenBW" css={css(`${imgStyles}`)} >
            <img src={`${withPrefix('/')}img/clouds.jpg`} alt=""/>
          </CanvasBlend>
          <CanvasBlend use="screenBW" css={css(`${imgStyles}`)} >
            <img src={`${withPrefix('/')}img/clouds.jpg`} alt=""/>
          </CanvasBlend>
        </div>
      </Parallax>
    </React.Fragment>
  )
})

export default Clouds
