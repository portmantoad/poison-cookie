import React from 'react'
import ReactDOM from 'react-dom'
// import PropTypes from 'prop-types'
import { clamp } from 'lodash'

/** @jsx jsx */
import { css, jsx } from '@emotion/core'


const Positioner = React.memo(({x = 0.5, y = 0.5, padding = 0, children, ...rest}) => {
  x = clamp(Number(x), 0, 1);
  y = clamp(Number(y), 0, 1);

  return(
    <div css={css(`
      position: absolute;
      top:${padding};
      left:${padding};
      bottom:${padding};
      right:${padding};
      height: 100%;
      display: grid;
      grid-template-columns: ${x}fr minmax(0, auto) ${(1 - x)}fr;
      grid-template-rows: ${y}fr minmax(0, auto) ${(1 - y)}fr;

      & > *{
        grid-column-start: 2;
        grid-row-start: 2;
      }
    `)} {...rest}>
        {children}
    </div>
  )

  // return(
  //   <div css={css(`
  //     position: absolute;
  //     top:0;
  //     left:0;
  //     width: 100vw;
  //     height: 100%;
  //     display: flex;
  //     flex-direction: column;
  //   `)} {...rest}>
  //     <div css={css(`height:0; flex-grow:${y}`)} />
  //     <div css={css(`display: flex;`)}>
  //       <div css={css(`height:0; flex-grow:${x}`)} />
  //       <div>
  //         {children}
  //       </div>
  //       <div css={css(`height:0; flex-grow:${1 - x}`)} />
  //     </div>
  //     <div css={css(`height:0; flex-grow:${1 - y}`)} />
  //   </div>
  // )
})

export default Positioner
