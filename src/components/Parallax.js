import React, {useContext} from 'react'
import ReactDOM from 'react-dom'
// import PropTypes from 'prop-types'
import { PlxContext } from './contexts'

/** @jsx jsx */
import { css, jsx } from '@emotion/core'


const Parallax = React.memo(({offset = 0, dimensions = {top: 0, height: 0}, speed = -2, children, className, ...rest}) => {
  speed = Number(speed);
  offset = Number(offset);
  offset = isNaN(offset) ? 0 : offset;
  const factor = isNaN(speed) ? -2 : Math.min(speed,7);
  const perspective = 8;
  const scalefactor = 1 + (factor * -1) / perspective;

  const output = <div css={css(`
    position: absolute;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    z-index: ${Math.round(factor * 100)};

    top: ${dimensions.top}px;
    height: ${dimensions.height}px;
    transform: translateY(${offset * 100}%);

    @media screen and (min-width: 40em) {
      @supports ((perspective: 1px) and (not (-webkit-overflow-scrolling: touch))) {
        transform: 
          translate3D(
            ${(factor/2 / perspective)}%,
            ${(-100/perspective * factor/2) - (factor/2) + (offset * 100)}%,
            ${factor}px
          ) 
          scale(${scalefactor})
        ;
        transform-origin: 50% 100%;
    }
  `)} {...rest}>
      {children}
  </div>

  const rootEl = useContext(PlxContext);
  if (rootEl) {
    return ReactDOM.createPortal( output, rootEl)
  } else {
    return output
  }
})

export default Parallax
