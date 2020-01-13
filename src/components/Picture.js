import React from 'react'
import ReactDOM from 'react-dom'
// import PropTypes from 'prop-types'
import { clamp } from 'lodash'
import { withPrefix } from 'gatsby'

/** @jsx jsx */
import { css, jsx } from '@emotion/core'


const Picture = React.memo(({
  src = "", 
  alt = "", 
  padding = 0, 
  shadow = true, 
  mask, 
  fit = 'contain',
  x = 0.5,
  y = 0.5, 
  width,
  height,
  rotate,
  background = '#eeddbc',
  className
}) => {

  x = clamp(Number(x), 0, 1);
  y = clamp(Number(y), 0, 1);

  if (mask === 1) mask = `${withPrefix('/')}img/paper_mask.png`;
  if (mask === 2) mask = `${withPrefix('/')}img/paper-smooth_mask.png`;

  return (
    // <div />
    <div className={className} css={css(`
      ${width ? `width: ${width};` : ''}
      ${height ? `height: ${height};` : ''}
      display: grid;
      grid-template-columns: minmax(0, ${x}fr) auto minmax(0, ${(1 - x)}fr);
      grid-template-rows: minmax(0, ${y}fr) auto minmax(0, ${(1 - y)}fr);
      position: relative;
      ${shadow && mask && false ? `filter: drop-shadow(0px 1px 5px rgba(0, 0, 0, 0.15));` : ''}
    `)}> 

        <img css={css(`
          grid-column-start: 2;
          grid-row-start: 2;
          background: ${background};
          overflow: hidden;
          ${height ? `max-height: ${height};` : ''}
          max-width: 100%;
          ${fit === 'cover' ? `
            width: 100%;
            ${height ? `height: ${height};` : ''}
          ` : ''}
          ${mask ? `
            mask-image: url("${mask}");
            mask-size: 100% 100%;
          ` : `
            border-radius: 4px;
            ${shadow ? `box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.15);` : ''}
          `}
          padding: ${padding};
          display: block;
          object-fit: ${fit};
          object-position: ${x*100}% ${y*100}%;
          ${rotate ? `transform: rotate(${rotate}deg);` : ''}
        `)} src={src} alt={alt} />
      </div>
  )
})

export default Picture
