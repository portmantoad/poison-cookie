import React, {useRef} from 'react'
// import PropTypes from 'prop-types'
import { clamp } from 'lodash'
import { withPrefix } from 'gatsby'

/** @jsx jsx */
import { css, jsx } from '@emotion/core'


const Scrim = React.memo(({image, children, offset, ...rest}) => {

const randomOffset = useRef(Math.random());

  return(
    <div css={css(`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url('${image ? image : `${withPrefix('/')}img/scrim.jpg`}');
      background-size: cover;
      mask-image: url('${withPrefix('/')}img/torn-edge_mask.png');
      mask-size: auto 100.1%;
      mask-position: calc( 115vh * 1920/1080 * ${offset !== undefined ? offset : randomOffset.current}) 0;
    `)} {...rest}>
        {children}
    </div>
  )
})

export default Scrim
