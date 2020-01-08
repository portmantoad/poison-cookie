import React from 'react'
import { withPrefix } from 'gatsby'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const Postcard = ({ children, card = 1, mask = 1, alt, ...rest }) => {
  return (
    <div css={css(`
      display: flex;
      align-items: center;
      justify-content: center;
    `)} {...rest}>
      <div css={css(`
        position: relative;
        transform: rotate(-1deg);
        max-width: calc(100% - 50px);
        pointer-events: none;

        &:before{
          content: "";
          display: block;
          position: absolute;
          top: 1.2%;
          left: 1.1%;
          right: 1.2%;
          bottom: 1.3%;
          border-radius: 5px;
          box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.25);
        }

        .Video{
          width: 90%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `)} className="Postcard">
        <div css={css(`
          // filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.25));
        `)} className="Postcard__border">
          <img 
            css={css(`
              display: block;
              mask-image: url("${withPrefix('/')}img/card_mask.png");
              mask-size: 100% 100%;
              max-height: 75vh;
              margin: 0;

              ${("" + alt) === "1" ? `transform: scale(-1,1)` : ''}
              ${("" + alt) === "2" ? `transform: scale(1,-1)` : ''}
              ${("" + alt) === "3" ? `transform: scale(-1,-1)` : ''}

              ${("" + mask) === "2" ? `mask-image: url("${withPrefix('/')}img/card2_mask.png");` : ''}
            `)}
            src={`${withPrefix('/')}img/card${card}.jpg`} alt="" />
        </div>
        {children}
      </div> 
    </div>
  )
}

export default Postcard