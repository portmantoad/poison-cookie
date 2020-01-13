import React, {useRef} from 'react'
import { withPrefix } from 'gatsby'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const Postcard = React.memo(({ children, card = 1, mask = 1, alt, rotate, ...rest }) => {

  const rotationAmplitude = 1.3;
  const randomRotation = useRef(Math.random() * (2*rotationAmplitude) - rotationAmplitude);

  const randomPadding = useRef(4 + (Math.random() * 4));

  return (
    <div css={css(`
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: 100%;
    `)} {...rest}>
      <div css={css(`
        position: relative;
        transform: rotate(${rotate || rotate === 0 ? 0 : randomRotation.current || -1}deg);
        max-width: calc(100% - 50px);
        pointer-events: none;
        width: 110vh;

        &:before{
          content: "";
          display: block;
          position: absolute;
          top: 1.2%;
          left: 1.1%;
          right: 1.2%;
          bottom: 1.3%;
          border-radius: 5px;
          box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.38);
        }

        .Video{
          padding: ${randomPadding.current}vmin;
        }
      `)} className="Postcard">
        <div css={css(`
          // filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.25));
          // mask-image: url("${withPrefix('/')}img/card_mask.png");
          // mask-size: 100% 100%;

          // ${("" + mask) === "2" ? `mask-image: url("${withPrefix('/')}img/card2_mask.png");` : ''}

          // background: #ffeed3;
          position:absolute;
          top:0;
          left:0;
          bottom:0;
          right:0;
        `)} className="Postcard__border">
          {/**/}
          <img 
            css={css(`
              display: block;
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              mask-image: url("${withPrefix('/')}img/card_mask.png");
              mask-size: 100% 100%;
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
})

export default Postcard