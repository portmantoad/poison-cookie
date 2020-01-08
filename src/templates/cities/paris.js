import React, { useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
import VideoPlayer from '../../components/VideoPlayer'
import CanvasBlend from '../../components/CanvasBlend'
import Postcard from '../../components/Postcard'
import { clamp } from 'lodash'
import { withPrefix } from 'gatsby'
import useMedia from 'use-media';
import { PlxContext } from '../../components/contexts'

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const Parallax = ({offset, speed = 'slow', children, ...rest}) => {
  const context = useContext(PlxContext);
  const rootEl = (speed === 'slow') ? context.slow : context.fast;

  const factor = (speed === 'slow') ? -1 : 1;
  const perspective = 4;
  const scalefactor = 1 + (factor * -1) / perspective;

  const magicOffsetNumber = (speed === 'slow') ? 
  // -.1645 : .505; //perspective 2
  -0.096 : 0.171; //perspective 4

  const output = <div className="ScrollSection" css={css(`
    position: absolute;
    left: 0;
    width: 100%;

    top: calc((100vh - 40px) * ${offset});

    @media screen and (min-width: 40em) {
      @supports ((perspective: 1px) and (not (-webkit-overflow-scrolling: touch))) {
        top: calc((100vh - 40px) * (${offset} / ${scalefactor} + ${magicOffsetNumber}));
      }
    }
  `)} {...rest}>
      {children}
  </div>

  if (rootEl) {
    return ReactDOM.createPortal( output, rootEl)
  } else {
    return output
  }
}

const Picture = ({
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

  x = clamp(x, 0, 1);
  y = clamp(y, 0, 1);

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
}

// const Layout = React.memo(({x,y, children}) => {
//   x = clamp(x, 0, 1);
//   y = clamp(y, 0, 1);

//   return(
//     <div css={css(`
//       position: absolute;
//       width: 100%;
//       height: calc(100vh - 40px);
//       display: grid;
//       gridTemplateColumns: ${x}fr auto ${(1 - x)}fr;
//       gridTemplateRows: ${y}fr auto ${(1 - y)}fr;
//     `)}>
//       <div style={css(`
//         gridColumnStart: 2;
//         gridRowStart: 2;
//       `)}>
//         {children}
//       </div>
//     </div>
//   )
// })

const pages = [
({sectionIndex}) => {

    return (
    <React.Fragment>

            <Parallax speed="fast" offset={sectionIndex}>
              <div css={css(`margin: 5% auto auto 0;`)}>
                <Picture 
                  src={`${withPrefix('/')}img/bienvenue-a-paris.png`}
                  width="calc(200px + 25%)" 
                  rotate="-25"
                  shadow={false}
                  background="transparent"
                />
              </div>
            </Parallax>

            <Parallax offset={sectionIndex}>
              <Postcard>
                <VideoPlayer
                    videoId="qdU_IKxIhAk"
                    // active={active}
                    // onEnd={() => scrollTo("next")}
                  />
              </Postcard> 
            </Parallax>

          
    </React.Fragment>
  )}, 
  ({sectionIndex}) => {

    return(
      <React.Fragment>
        <div className="scrim"></div>

        <VideoPlayer
          /* kitty litter */
          videoId="ZS8zlMNmTEU"
          fullscreen
          // active={active}
          // onEnd={() => scrollTo("next", 0)}
        />
              
      </React.Fragment>
)}
,({sectionIndex}) => {

    return(
      <React.Fragment>
        <Parallax speed="fast" offset={sectionIndex}>
          <Picture src={`${withPrefix('/')}img/paris_map.jpg`} rotate={1} 
            width="90%" 
            height="120vh"
          />
        </Parallax>
      </React.Fragment>
)}
    // , ({sectionIndex}) => {
//     const isMobile = useMedia({maxWidth: 700});
//     // const isMobile = false;

//     useEffect(() => {
//       registerAnimation({
//         key: ".Animation__BookScroll1--outer",
//         sectionIndex: sectionIndex, 
//         tween: () => TweenMax.to(".Animation__BookScroll1--outer", 1, {x: '100%', ease: "Quad.easeInOut"}),
//       });

//       registerAnimation({
//         key: ".Animation__BookScroll1--inner",
//         sectionIndex: sectionIndex, 
//         tween: () => TweenMax.to(".Animation__BookScroll1--inner", 1, {x: '-100%', ease: "Quad.easeInOut"}),
//       });
//     }, []);
//       return(
//             <div className={(isMobile ? "Panel Transition--fade" : "") + (active ? " isActive" : "")}>
//               <div className={"BookScroll" + (isMobile ? " Animation__BookScroll1--outer" : " BookScroll--scroll")}>
//                 <img className={"BookScroll__img" + (isMobile ? " Animation__BookScroll1--inner" : "")} src={`${withPrefix('/')}img/paris_book-1.jpg`} alt=""
//                   style={{
//                     WebkitMaskImage: `url('${withPrefix('/')}img/paris_book-1_mask.png')`,
//                     WebkitMaskSize: '100% 100%'
//                   }} 
//                 />
//               </div>
//             </div>
// )}
, ({sectionIndex}) => (
              <Postcard mask="2" card="2">                
                  <VideoPlayer
                    videoId="LkdWOkpCuTw"
                    // active={active}
                    // onEnd={() => scrollTo("next")}
                  />
              </Postcard>  
)
, ({sectionIndex}) => {

    return(
      <React.Fragment>
        <div className="scrim"></div>
        <VideoPlayer
          /* Strongman chat noir */
          videoId="T6nNI2Nw9a0"
          fullscreen
          // active={active}
          // captions={true}
          // onEnd={() => scrollTo("next")}
        />
      </React.Fragment>
)}
// , ({sectionIndex}) => (
//           <div className="Panel">
//             <div className={"Panel Transition--fade whereAreTheyNow" + (active ? " isActive" : "")}>
//             <div className="whereAreTheyNow__title">
//               <h2>Où sont-ils maintenant?</h2>
//               <span>(Where are they now?)</span>
//             </div>
//               <Slideshow 
//                 registerAnimation={registerAnimation}
//                 offset={sectionIndex}
//                 // backgroundFill
//               >
//                 <img src={`${withPrefix('/')}img/paris_famouspeople_toulouselautrec.jpg`} alt="" />
//                 <img src={`${withPrefix('/')}img/paris_famouspeople_willette.jpg`} alt="" />
//                 <img src={`${withPrefix('/')}img/paris_famouspeople_andregill.jpg`} alt="" />
//                 <img src={`${withPrefix('/')}img/paris_famouspeople_bruant.jpg`} alt="" />
//                 <img src={`${withPrefix('/')}img/paris_famouspeople_claudedebussy.jpg`} alt="" />
//                 <img src={`${withPrefix('/')}img/paris_famouspeople_ericsatie.jpg`} alt="" />
//                 <img src={`${withPrefix('/')}img/paris_famouspeople_janeavril.jpg`} alt="" />
//               </Slideshow>
//             </div>
//           </div>
// ) 
 , ({sectionIndex}) => {
    return(
      <React.Fragment>
        <Parallax offset={sectionIndex}>
        <Postcard mask="1" card="2" alt="2">
            <VideoPlayer
              /* le mirilton */
              videoId="takA-zY-Tn8"
              // active={active}
              // onEnd={() => scrollTo("next")}
            />
        </Postcard>
        </Parallax>
      </React.Fragment>
)}
, ({sectionIndex}) => (
       <React.Fragment>
        <Parallax speed="fast" offset={sectionIndex}>
          <Picture 
            // mask={2} 
            height="110vh"
            width="40%"
            rotate={.25}
            css={css`margin-right: auto;`} 
            src={`${withPrefix('/')}img/paris_bruant.jpg`} 
            alt="" 
          />
        </Parallax>

        <div css={css(`
          width: 60%; 
          height: 100%; 
          display: flex; 
          align-items: center;
          justify-content: center;
          margin-left: auto; 
          position: relative;
        `)}>
            <div className="fullscreenQuote">
                <figure className="quote">
                   <q>Those who have come to the world with a silver spoon in their mouths, 
                   I revenge myself in insulting them, in treating them worse than dogs. That makes them laugh to tears; they believe I joke when, often enough, it is a breeze from the past, miseries submitted to, dirtiness seen, which remounts on my lips and makes me speak as I do.</q>
                   <figcaption>&mdash;&ensp;Aristide Bruant (translated by Richard D. Sonne)</figcaption>
                </figure>
            </div>
            <div className="bigborder"></div>
        </div>
       </React.Fragment>
)
,    ({sectionIndex}) => {

    return(
      <React.Fragment>
        <Parallax offset={sectionIndex}>
          <Postcard mask="2" card="1" alt="1">
              <VideoPlayer
                /* musee montmatre */
                videoId="j9ieAAvYpJU"
                // active={active}
                // onEnd={() => scrollTo("next")}
              />
              
          </Postcard>
        </Parallax>
      </React.Fragment>
)}
,    ({sectionIndex}) => {
    return(
      <React.Fragment>
        <div className="scrim"></div>
        <VideoPlayer
          /* interview with julia */
          videoId="sKxtbvayB50"
          fullscreen
          // active={active}
          // onEnd={() => scrollTo("next")}
        />
  
      <Parallax speed="fast" offset={sectionIndex}>
        <a href="https://museedemontmartre.fr/en/">Visit the Musee Montmartre in person or virtually!</a>
      </Parallax>
      </React.Fragment>
)}
    , ({sectionIndex}) => {

    return(
      <Parallax offset={sectionIndex}>
        <Postcard mask="2" card="2" alt="3">           
          <VideoPlayer
            /* strongman lapin agile */
            videoId="-995ptoiNjw"
            // active={active}
            // onEnd={() => scrollTo("next")}
          />
        </Postcard>
      </Parallax>
)}
,    ({sectionIndex}) => {
    return(
      <React.Fragment>
      <div className="scrim"></div> 
      <VideoPlayer
        /* lapin agile interview */
        videoId="ubFSIFzFLs8"
        fullscreen
        // active={active}
        // onEnd={() => scrollTo("next")}
      />
      </React.Fragment>
)}
, ({sectionIndex}) => {
    return(
      <React.Fragment>
        <Parallax speed="fast" offset={sectionIndex}>
          <div css={css(`
            width: 50%;
            margin-right: auto;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          `)}>
          <Postcard mask="1" card="2" alt="4">
              <VideoPlayer
                /* other minor cabarets */
                videoId="bysHS5IqVdI"
                // active={active}
                // onEnd={() => scrollTo("next")}
              />
          </Postcard>
          </div>
        </Parallax>
        <div css={css(`
            width: 50%;
            margin-left: auto;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          `)}>
        <Postcard mask="2" card="2">
            <VideoPlayer
              /* other minor cabarets 2 */
              videoId="jRouAXIvDrw"
              // active={active}
              // onEnd={() => scrollTo("next")}
            />
        </Postcard>
        </div>
      </React.Fragment>
)}
, ({sectionIndex}) => {
    return(
      <React.Fragment>
        <Parallax offset={sectionIndex - 0.1}>
          <Picture 
            width="100%"
            shadow={false}
            height="calc((100vh - 40px) * 1.2)"
            mask={`${withPrefix('/')}img/paris_book-1_mask.png`} 
            src={`${withPrefix('/')}img/paris_book-1.jpg`} 
          />
        </Parallax>
      </React.Fragment>
)}
// , ({sectionIndex}) => (
//           <div className="Panel">
//             <div className={"Panel Panel--padded Transition--fade" + (active ? " isActive" : "")} style={{flexDirection: 'column'}}>
//               <Slideshow 
//                 registerAnimation={registerAnimation}
//                 offset={sectionIndex}
//                 style={{minWidth: '300px'}}
//                 // backgroundFill
//               >
//                 <CanvasBlend use="multiplyBW"><img src={`${withPrefix('/')}img/cabaret_1.jpg`} alt="" /></CanvasBlend>
//                 <CanvasBlend use="multiplyBW"><img src={`${withPrefix('/')}img/cabaret_2.jpg`} alt="" /></CanvasBlend>
//                 <CanvasBlend use="multiplyBW"><img src={`${withPrefix('/')}img/cabaret_3.jpg`} alt="" /></CanvasBlend>
//                 <CanvasBlend use="multiplyBW"><img src={`${withPrefix('/')}img/cabaret_4.jpg`} alt="" /></CanvasBlend>
//                 <CanvasBlend use="multiplyBW"><img src={`${withPrefix('/')}img/cabaret_5.jpg`} alt="" /></CanvasBlend>
//               </Slideshow>
//               <div style={{marginTop: "10px"}}>The faces of cabaret in old Paris</div>
//             </div>
//           </div>
// )
,    ({sectionIndex}) => {
    return(
      <React.Fragment>
        <div className="scrim"></div>
        <VideoPlayer
          /* Edith Piaf’s grave site */
          videoId="lqsW1FCVi_M"
          fullscreen
          // active={active}
          // onEnd={() => scrollTo("next")}
        />
      </React.Fragment>
)}
,    ({sectionIndex}) => {
    return(
      <React.Fragment>
        <Parallax offset={sectionIndex}>
          <Picture width="55%" padding="3%" mask={1} x={0.75} css={css(`position: absolute; left: 2.5%;`)} src={`${withPrefix('/')}img/paris_bricktop.jpg`} alt="" />
        </Parallax>
        
        <Picture width="50%" padding="0.5%" background="#efefef" height="102vh" x={0.25} css={css(`position: absolute; right: 2.5%;`)} rotate={1} src={`${withPrefix('/')}img/paris_josephine2.jpg`} alt=""/>
        
        <Parallax speed="fast" offset={sectionIndex}>
          <div className="Paper" css={css(`transform: rotate(-1deg); max-width: 400px`)}><p>In the 1920s and 30s, a flood of expats in Paris created both a stream of American entertainers and American ex-pats who would flock to establishments with American artists (as did the French). A huge part of the reason was jazz’s rapid advance around the world.</p> <p>In particular, African American artists who could not perform in front of integrated audiences at home and who were appalled and exhausted at their treatment in America found refuge in Paris. This cross-cultural exchange would have a lasting impact on cabaret in both Paris and America (and also in Berlin which was not immune to the influence of Josephine Baker).</p></div>
        </Parallax>
      </React.Fragment>
)}
, ({sectionIndex}) => (
      <React.Fragment>
        <Parallax speed="fast" offset={sectionIndex}>
          <Picture height="120vh" fit="cover" x={0.3} width="40%" src={`${withPrefix('/')}img/paris_josephine.jpg`} alt="" css={css(`margin-left: auto`)} />
        </Parallax>

        <div css={css(`
          width: 60%; 
          height: 100%; 
          display: flex; 
          align-items: center;
          justify-content: center;
          margin-right: auto; 
          position: relative;
        `)}>
          <div className="fullscreenQuote">
              <figure className="quote">
                 <q>One day I realized I was living in a country where I was afraid to be black. It was only a country for white people. Not black. So I left. I had been suffocating in the United States… A lot of us left, not because we wanted to leave, but because we couldn’t stand it anymore… I felt liberated in Paris.</q>
                 <figcaption>&mdash;&ensp;Josephine Baker</figcaption>
              </figure>
          </div>

          <div className="bigborder"></div>
        </div>
      </React.Fragment>
)
,  ({sectionIndex}) => {
    return(
      <React.Fragment>
        <div className="scrim"></div>
        <VideoPlayer
          /*Edith piaf chanson realiste*/
          videoId="Sp0oggT2IjY"
          fullscreen
          // active={active}
          // onEnd={() => scrollTo("next")}
        />
      </React.Fragment>
)}
// , 
//   ({sectionIndex}) => {

//     return(
//       <React.Fragment>
//         <div className={"Panel Transition--fade" + (active ? " isActive" : "")}>
//             <VideoPlayer
//               videoId="xxx"
//               fullscreen
//               offset={sectionIndex}
//               activeIndex={activeIndex}
//               onEnd={() => scrollTo("next")}
//             />
//         </div>
//       </React.Fragment>
// )})
, ({sectionIndex}) => (
      <React.Fragment>
        <Parallax offset={sectionIndex}>
          <Postcard mask="1" card="2" alt="4">
          <VideoPlayer
            /* Streeter [parc] */
            videoId="vrvVpZsKVYk"
            // active={active}
            // onEnd={() => scrollTo("next")}
          /> 
          </Postcard>
        </Parallax>
      </React.Fragment>
)
,    ({sectionIndex}) => {
    return(
      <React.Fragment>
            <div className="scrim"></div>
            <VideoPlayer
              /* interview with gosia  */
              videoId="VxGeGeKUaU0"
              fullscreen
              // active={active}
              // onEnd={() => scrollTo("next")}
            />
      </React.Fragment>
)}
,    ({sectionIndex}) => {
    return(
      <React.Fragment>
        <Parallax offset={sectionIndex}>
          <Postcard mask="1" card="1" alt="3">
              <VideoPlayer
                /* Interview with Michel from Vieux Belleville   */
                videoId="az8ftb3NgNw"
                // active={active}
                // onEnd={() => scrollTo("next")}
              />
          </Postcard>
        </Parallax>
      </React.Fragment>
)}
,    ({sectionIndex}) => {

    return(
      <React.Fragment>
        <div className="scrim"></div>
        <img src={`${withPrefix('/')}img/paris_aumagique.png`} alt="" css={css(`
          @keyframes jitter {
            0%, 9.99999% {    transform: translate3d(-0.3px, 0   , 0); }
            10%, 19.99999% {    transform: translate3d(-0.3px, -0.3px, 0); }
            20%, 29.99999% {    transform: translate3d(0   , 0   , 0); }
            30%, 39.99999% {    transform: translate3d(-0.3px, 0.3px , 0); }
            40%, 49.99999% {    transform: translate3d(0.3px , 0, 0); }
            50%, 59.99999% {    transform: translate3d(0.3px , 0.3px, 0); }
            60%, 69.99999% {    transform: translate3d(0   , 0.3px, 0); }
            70%, 79.99999% {    transform: translate3d(0   , -0.3px, 0); }
            80%, 89.99999% {    transform: translate3d(0.3px , -0.3px , 0); }
            90%, 100% {    transform: translate3d(0.3px , 0, 0); }
          }

            animation: jitter 300ms infinite;
            position: absolute;
            top:0;
            left:3.5vh;
            bottom:0;
            right:3.5vh;
            width: calc(100% - 7vh);
            height: 100%;
            object-fit: contain;
            object-position: center center;
        `)} />
      </React.Fragment>
)}
,    ({sectionIndex}) => {

    return(
      <React.Fragment>
        <Parallax offset={sectionIndex}>
          <div css={css(`
            width: 50%;
            margin-right: auto;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          `)}>
            <Postcard mask="1" card="1" alt="1">
              <VideoPlayer
                /* Interview_Natalie_au Magique */
                videoId="jS34OY5LCk0"
                // active={active}
                // onEnd={() => scrollTo("next")}
              />
            </Postcard>
          </div>
        </Parallax>
          <div css={css(`
            width: 50%;
            margin-left: auto;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          `)}>
            <Postcard mask="2" card="2" >
              <VideoPlayer
                /* martine au magique */
                videoId="5sS94fQ0zRo"
                // active={active}
                // onEnd={() => scrollTo("next")}
              />
            </Postcard>
          </div>
      </React.Fragment>
)}
,   ({sectionIndex}) => {
    return(
      <React.Fragment>
        <Parallax speed="fast" offset={sectionIndex}>
          <Postcard mask="2" card="1" alt="1">
              <VideoPlayer
                /* strongman divan japanois */
                videoId="_7kQh0ot5Kc"
                fullscreen
                // active={active}
                // onEnd={() => scrollTo("next")}
              />
          </Postcard>
        </Parallax>
      </React.Fragment>
)}
// ,    ({sectionIndex}) => {
//     return(
//       <React.Fragment>
//         <Postcard mask="1" card="2" alt="3">
//             interview with Monsieur K
//         </Postcard>
//       </React.Fragment>
// )}
,    ({sectionIndex}) => {

    return(
      <React.Fragment>
        <div css={css(`flex-grow: 1; padding-right: 3.5vw`)}>
            <Postcard mask="1" card="1" alt="2">
              <VideoPlayer
                /* music video partial song */
                videoId="RnyJ8nwcuOE"
                // fullscreen
                // active={active}
                // onEnd={() => scrollTo("next")}
              />
            </Postcard>
        </div>
        <div className="Paper" css={css(`max-width: 300px; transform: rotate(1deg)`)}>
          Madame Arthur is named after a song by one of fin-de-siecle’s most famous chanteuses: Yvette Guilbert. Guilbert Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
        </div>
      </React.Fragment>
)}
// ,    ({sectionIndex}) => {

//     return(
//       <React.Fragment>
//         <Curtains 
//           registerAnimation={registerAnimation}
//           offset={sectionIndex}
//           activeIndex={activeIndex}
//           foregroundPortal={foregroundPortal}
//           midgroundPortal={midgroundPortal}
//           persist={1}
//         />
//         <div className={"Panel Transition--curtain-delay Transition--fade" + (active ? " isActive" : "")}>
//             <VideoPlayer
//               /* strongman limonaire */
//               videoId="2UTO67pYjpU"
//               fullscreen
//               active={active}
//               onEnd={() => scrollTo("next")}
//             />
//         </div>
//       </React.Fragment>
// )}, 
//   ({sectionIndex}) => {

//     return(
//       <React.Fragment>
//         <div className={"Panel Transition--curtain-delay Transition--fade" + (active ? " isActive" : "")}>
//             <VideoPlayer
//               /* limonaire interview with closing */
//               videoId="NHC-gkfr61Y"
//               fullscreen
//               active={active}
//               onEnd={() => scrollTo("next")}
//             />
//         </div>
//       </React.Fragment>
// )}, ({sectionIndex}) => (
//           <div className="Panel">
//             <div className={"Panel Transition--fade" + (active ? " isActive" : "")}>
//               <Postcard mask="2" alt="3">  
//                 <VideoPlayer
//                     videoId="1T1T3coj6BI"
//                     active={active}
//                     onEnd={() => scrollTo("next")}
//                   />
//               </Postcard>  
//             </div>    
//           </div>
// ), 
//   ({sectionIndex}) => {

//     return(
//       <React.Fragment>
//         <div className={"Panel Transition--fade" + (active ? " isActive" : "")}>
//           <div className={"Panel Transition--fade" + (active ? " isActive" : "")}>
//             <div className="TVborder">
//               <CanvasBlend use="maskInverse" color={[122,95,70]} className="TVborder__img">
//                 <img src={`${withPrefix('/')}img/tv.jpg`} alt=""/>
//               </CanvasBlend>
//               <VideoPlayer
//                 /* chat noir multicam cooking  */
//                 videoId="HzUIUTatyZI"
//                 active={active}
//                 onEnd={() => scrollTo("next")}
//               />
//             </div>
//           </div>


            
//         </div>
//       </React.Fragment>
// )}, ({sectionIndex}) => (
//           <div className="Panel">
//             <div className={"Panel Transition--fade" + (active ? " isActive" : "")}>
//               <Postcard alt="2" card="2">  
//                 <VideoPlayer
//                     videoId="ZsjrIQY16aQ"
//                     active={active}
//                     onEnd={() => scrollTo("next")}
//                   />
//               </Postcard>  
//             </div>    
//           </div>
// ), 
//   ({sectionIndex}) => {

//     return(
//       <React.Fragment>
//         <Curtains 
//           registerAnimation={registerAnimation}
//           offset={sectionIndex}
//           activeIndex={activeIndex}
//           foregroundPortal={foregroundPortal}
//           midgroundPortal={midgroundPortal}
//           persist={0}
//         />
//         <div className={"Panel Transition--curtain-delay Transition--fade" + (active ? " isActive" : "")}>
//             <VideoPlayer
//               /* asshole singalong  */
//               videoId="7Unp0PL2m8Q"
//               fullscreen
//               active={active}
//               onEnd={() => scrollTo("next")}
//             />
            
//         </div>
//       </React.Fragment>
// )}, ({sectionIndex}) => (
//         <div className="Panel">
//           <div className="Panel " >
//               <div className={"Transition--slow-fade" + (active ? " isActive" : "") }>
//                 See you in Berlin!
//               </div>
//           </div>
//         </div>
// )
]

// const updateFunction = (prevProps, nextProps) => {
//     if (prevProps.active !== nextProps.active) {
//       return false
//     }

//     if (
//         prevProps.foregroundPortal !== nextProps.foregroundPortal ||
//         prevProps.backgroundPortal !== nextProps.backgroundPortal ||
//         prevProps.registerAnimation !== nextProps.registerAnimation
//     ) {
//       return false 
//     }

//     return true
// }


// const namedPages = pages.map((page, i) => {
//   return debounceActiveRender(React.memo(page, updateFunction), 200, { leading: false })
// })


export default pages;
