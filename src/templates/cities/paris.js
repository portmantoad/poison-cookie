import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import VideoPlayer from '../../components/VideoPlayer'
import FixedPortal from '../../components/FixedPortal'
import CanvasBlend from '../../components/CanvasBlend'
import Postcard from '../../components/Postcard'
import { clamp } from 'lodash'
import { withPrefix } from 'gatsby'
import useMedia from 'use-media';
import {ParallaxLayer} from 'react-spring/renderprops-addons'

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

// import debounceRender from 'react-debounce-render'
// import debounceActiveRender from '../../components/debounceActiveRender'

const ParallaxLayerWrap = ({offset, sectionIndex, rootEl, ...rest}) => {
  const output = <ParallaxLayer offset={sectionIndex + offset} {...rest} />;

  if (rootEl) {
    return ReactDOM.createPortal( output, rootEl)
  } else {
    return output
  }
}

// const Layout = React.memo(({x,y,width = 'auto', height = 'auto', children}) => {
//   x = clamp(x, 0, 1);
//   y = clamp(y, 0, 1);

//   return(
//     <div style={{
//       position: 'absolute', 
//       width: '100%', 
//       height: 'calc(100vh - 40px)',
//       display: 'grid',
//       gridTemplateColumns: x + 'fr minmax( auto, ' + width + ') ' + (1 - x) + 'fr',
//       gridTemplateRows: y + 'fr minmax(auto, ' + height + ') ' + (1 - y) + 'fr'
//     }}>
//       <div style={{
//         gridColumnStart: 2,
//         gridRowStart: 2
//       }}>
//         {children}
//       </div>
//     </div>
//   )
// })

const pages = [
({sectionIndex, rootEl}) => {

    return (
    <React.Fragment>
      <FixedPortal target={rootEl}>
        <img src={`${withPrefix('/')}img/curtain.png`} alt="" className="visuallyhidden" /> 
      </FixedPortal>

            <ParallaxLayerWrap offset={0} speed={0.5} sectionIndex={sectionIndex} rootEl={rootEl}>
                <img src={`${withPrefix('/')}img/bienvenue-a-paris.png`} alt="" 
                  css={css`
                    width: calc(200px + 10%);
                    transform: rotate(-25deg);
                    position: relative;
                    z-index: 20;
                    margin-bottom: -11%;
                    align-self: flex-start;

                    @media screen and (max-width: 500px) {
                      width: 90%;
                      transform: unset;
                      align-self: center;
                      margin-bottom: 0;
                    }
                  `}
                />
            </ParallaxLayerWrap>

            <ParallaxLayerWrap offset={0} speed={-0.1} sectionIndex={sectionIndex} rootEl={rootEl}>
              <Postcard>
                <VideoPlayer
                    videoId="qdU_IKxIhAk"
                    // active={active}
                    // onEnd={() => scrollTo("next")}
                  />
              </Postcard> 
            </ParallaxLayerWrap>

          
    </React.Fragment>
  )}, 
  ({sectionIndex, rootEl}) => {

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
,({sectionIndex, rootEl}) => {

    return(
      <React.Fragment>
        <ParallaxLayerWrap offset={0} speed={0.25} sectionIndex={sectionIndex} rootEl={rootEl}>
          <img src={`${withPrefix('/')}img/paris_map.jpg`} alt="" className="drop-shadow round-corners" 
            css={css`
              width: 90%; 
              transform: rotate(1deg); 
              margin-left: 5%
            `}
          />
        </ParallaxLayerWrap>
      </React.Fragment>
)}
    // , ({sectionIndex, rootEl}) => {
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
, ({sectionIndex, rootEl}) => (
              <Postcard mask="2" card="2">                
                  <VideoPlayer
                    videoId="LkdWOkpCuTw"
                    // active={active}
                    // onEnd={() => scrollTo("next")}
                  />
              </Postcard>  
)
, ({sectionIndex, rootEl}) => {

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
// , ({sectionIndex, rootEl}) => (
//           <div className="Panel">
//             <div className={"Panel Transition--fade whereAreTheyNow" + (active ? " isActive" : "")}>
//             <div className="whereAreTheyNow__title">
//               <h2>Où sont-ils maintenant?</h2>
//               <span>(Where are they now?)</span>
//             </div>
//               <Slideshow 
//                 registerAnimation={registerAnimation}
//                 sectionIndex={sectionIndex}
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
 , ({sectionIndex, rootEl}) => {
    return(
      <React.Fragment>
        <ParallaxLayerWrap offset={0} speed={0.1} sectionIndex={sectionIndex} rootEl={rootEl}>
        <Postcard mask="1" card="2" alt="2">
            <VideoPlayer
              /* le mirilton */
              videoId="takA-zY-Tn8"
              fullscreen
              // active={active}
              // onEnd={() => scrollTo("next")}
            />
        </Postcard>
        </ParallaxLayerWrap>
      </React.Fragment>
)}
, ({sectionIndex, rootEl}) => (
       <React.Fragment>
        <ParallaxLayerWrap offset={-0.1} speed={0.25} sectionIndex={sectionIndex} rootEl={rootEl}>
          <img className="drop-shadow round-corners" 
            css={css`
              margin-right: auto;
              margin-left: 5%;
              max-height: 110vh;
              width:auto;
              transform: rotate(-.25deg);
            `} src={`${withPrefix('/')}img/paris_bruant.jpg`} alt="" />
        </ParallaxLayerWrap>

            <div className="fullscreenQuote">
                <figure className="quote">
                   <q>Those who have come to the world with a silver spoon in their mouths, 
                   I revenge myself in insulting them, in treating them worse than dogs. That makes them laugh to tears; they believe I joke when, often enough, it is a breeze from the past, miseries submitted to, dirtiness seen, which remounts on my lips and makes me speak as I do.</q>
                   <figcaption>&mdash;&ensp;Aristide Bruant (translated by Richard D. Sonne)</figcaption>
                </figure>
            </div>
            <div className="bigborder"></div>
       </React.Fragment>
)
,    ({sectionIndex, rootEl}) => {

    return(
      <React.Fragment>
        <ParallaxLayerWrap offset={0} speed={0.1} sectionIndex={sectionIndex} rootEl={rootEl}>
          <Postcard mask="2" card="1" alt="1">
              <VideoPlayer
                /* musee montmatre */
                videoId="j9ieAAvYpJU"
                fullscreen
                // active={active}
                // onEnd={() => scrollTo("next")}
              />
              
          </Postcard>
        </ParallaxLayerWrap>
      </React.Fragment>
)}
,    ({sectionIndex, rootEl}) => {
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
  
      <ParallaxLayerWrap offset={0} speed={-0.1} sectionIndex={sectionIndex} rootEl={rootEl}>
        <a href="https://museedemontmartre.fr/en/">Visit the Musee Montmartre in person or virtually!</a>
      </ParallaxLayerWrap>
      </React.Fragment>
)}
    , ({sectionIndex, rootEl}) => {

    return(
      <ParallaxLayerWrap offset={0.1} speed={0.1} sectionIndex={sectionIndex} rootEl={rootEl}>
        <Postcard mask="2" card="2" alt="3">           
          <VideoPlayer
            /* strongman lapin agile */
            videoId="-995ptoiNjw"
            fullscreen
            // active={active}
            // onEnd={() => scrollTo("next")}
          />
        </Postcard>
      </ParallaxLayerWrap>
)}
,    ({sectionIndex, rootEl}) => {
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
, ({sectionIndex, rootEl}) => {
    return(
      <React.Fragment>
        <ParallaxLayerWrap offset={0.1} speed={0.1} sectionIndex={sectionIndex} rootEl={rootEl}>
          <Postcard mask="1" card="2" alt="4">
              <VideoPlayer
                /* other minor cabarets */
                videoId="bysHS5IqVdI"
                fullscreen
                // active={active}
                // onEnd={() => scrollTo("next")}
              />
          </Postcard>
        </ParallaxLayerWrap>
      </React.Fragment>
)}
, ({sectionIndex, rootEl}) => {
    return(
      <React.Fragment>
        <Postcard mask="2" card="2">
            <VideoPlayer
              /* other minor cabarets 2 */
              videoId="jRouAXIvDrw"
              fullscreen
              // active={active}
              // onEnd={() => scrollTo("next")}
            />
        </Postcard>
      </React.Fragment>
)}
// , ({sectionIndex, rootEl}) => (
//           <div className="Panel">
//             <div className={"Panel Panel--padded Transition--fade" + (active ? " isActive" : "")} style={{flexDirection: 'column'}}>
//               <Slideshow 
//                 registerAnimation={registerAnimation}
//                 sectionIndex={sectionIndex}
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
,    ({sectionIndex, rootEl}) => {
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
,    ({sectionIndex, rootEl}) => {
    return(
      <React.Fragment>
        <ParallaxLayerWrap offset={0.1} speed={0.1} sectionIndex={sectionIndex} rootEl={rootEl}>
          <img className="drop-shadow round-corners" css={css(`position: absolute; width: 55%; left: 2.5%;`)} src={`${withPrefix('/')}img/paris_bricktop.jpg`} alt="" />
        </ParallaxLayerWrap>
        <ParallaxLayerWrap offset={0} speed={0.4} sectionIndex={sectionIndex} rootEl={rootEl}>
          <img className="drop-shadow round-corners" css={css(`position: absolute; width: 50%; right: 2.5%; transform: rotate(1deg)`)} src={`${withPrefix('/')}img/paris_josephine2.jpg`} alt=""/>
        </ParallaxLayerWrap>
        <div className="Paper" css={css(`transform: rotate(-1deg); max-width: 400px`)}><p>In the 1920s and 30s, a flood of expats in Paris created both a stream of American entertainers and American ex-pats who would flock to establishments with American artists (as did the French). A huge part of the reason was jazz’s rapid advance around the world.</p> <p>In particular, African American artists who could not perform in front of integrated audiences at home and who were appalled and exhausted at their treatment in America found refuge in Paris. This cross-cultural exchange would have a lasting impact on cabaret in both Paris and America (and also in Berlin which was not immune to the influence of Josephine Baker).</p></div>
      </React.Fragment>
)}
, ({sectionIndex, rootEl}) => (
      <React.Fragment>
        <ParallaxLayerWrap offset={0.1} speed={0.1} sectionIndex={sectionIndex} rootEl={rootEl}>
          <img src={`${withPrefix('/')}img/paris_josephine.jpg`} alt="" css={css(`max-width: 600px; position: absolute; right: 5% `)} />
        </ParallaxLayerWrap>
        <div className="fullscreenQuote">
            <figure className="quote">
               <q>One day I realized I was living in a country where I was afraid to be black. It was only a country for white people. Not black. So I left. I had been suffocating in the United States… A lot of us left, not because we wanted to leave, but because we couldn’t stand it anymore… I felt liberated in Paris.</q>
               <figcaption>&mdash;&ensp;Josephine Baker</figcaption>
            </figure>
        </div>
        <div className="bigborder"></div>
      </React.Fragment>
)
,  ({sectionIndex, rootEl}) => {
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
//   ({sectionIndex, rootEl}) => {

//     return(
//       <React.Fragment>
//         <div className={"Panel Transition--fade" + (active ? " isActive" : "")}>
//             <VideoPlayer
//               videoId="xxx"
//               fullscreen
//               sectionIndex={sectionIndex}
//               activeIndex={activeIndex}
//               onEnd={() => scrollTo("next")}
//             />
//         </div>
//       </React.Fragment>
// )})
, ({sectionIndex, rootEl}) => (
      <React.Fragment>
        <ParallaxLayerWrap offset={0} speed={0.1} sectionIndex={sectionIndex} rootEl={rootEl}>
          <Postcard mask="1" card="2" alt="4">
          <VideoPlayer
            /* Streeter [parc] */
            videoId="vrvVpZsKVYk"
            fullscreen
            // active={active}
            // onEnd={() => scrollTo("next")}
          /> 
          </Postcard>
        </ParallaxLayerWrap>
      </React.Fragment>
)
,    ({sectionIndex, rootEl}) => {
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
,    ({sectionIndex, rootEl}) => {
    return(
      <React.Fragment>
        <ParallaxLayerWrap offset={0} speed={0.1} sectionIndex={sectionIndex} rootEl={rootEl}>
          <Postcard mask="1" card="1" alt="3">
              <VideoPlayer
                /* Interview with Michel from Vieux Belleville   */
                videoId="az8ftb3NgNw"
                fullscreen
                // active={active}
                // onEnd={() => scrollTo("next")}
              />
          </Postcard>
        </ParallaxLayerWrap>
      </React.Fragment>
)}
,    ({sectionIndex, rootEl}) => {

    return(
      <React.Fragment>
        <div className="scrim"></div>
        <img src={`${withPrefix('/')}img/paris_aumagique.png`} alt="" css={css(`
          @keyframes jitter {
            0%, 9.99999% {    transform: translate3d(-0.5px, 0   , 0); }
            10%, 19.99999% {    transform: translate3d(-0.5px, -0.5px, 0); }
            20%, 29.99999% {    transform: translate3d(0   , 0   , 0); }
            30%, 39.99999% {    transform: translate3d(-0.5px, 0.5px , 0); }
            40%, 49.99999% {    transform: translate3d(0.5px , 0, 0); }
            50%, 59.99999% {    transform: translate3d(0.5px , 0.5px, 0); }
            60%, 69.99999% {    transform: translate3d(0   , 0.5px, 0); }
            70%, 79.99999% {    transform: translate3d(0   , -0.5px, 0); }
            80%, 89.99999% {    transform: translate3d(0.5px , -0.5px , 0); }
            90%, 100% {    transform: translate3d(0.5px , 0, 0); }
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
,    ({sectionIndex, rootEl}) => {

    return(
      <React.Fragment>
        <div className="scrim"></div>
            <VideoPlayer
              /* Interview_Natalie_au Magique */
              videoId="jS34OY5LCk0"
              fullscreen
              // active={active}
              // onEnd={() => scrollTo("next")}
            />
      </React.Fragment>
)}
,    ({sectionIndex, rootEl}) => {

    return(
      <React.Fragment>
        <div className="scrim"></div>
            <VideoPlayer
              /* martine au magique */
              videoId="5sS94fQ0zRo"
              fullscreen
              // active={active}
              // onEnd={() => scrollTo("next")}
            />
      </React.Fragment>
)}
// ,   ({sectionIndex, rootEl}) => {
//     return(
//       <React.Fragment>
//         <Postcard mask="2" card="2" alt="1">
//             <VideoPlayer
//               /* strongman divan japanois */
//               videoId="_7kQh0ot5Kc"
//               fullscreen
//               active={active}
//               onEnd={() => scrollTo("next")}
//             />
//         </Postcard>
//       </React.Fragment>
// )}, 
//   ({sectionIndex, rootEl}) => {

//     return(
//       <React.Fragment>
//         <Postcard mask="1" card="2" alt="3">
//             interview with Monsieur K
//         </Postcard>
//       </React.Fragment>
// )}, 
//   ({sectionIndex, rootEl}) => {

//     return(
//       <div className={"Panel Transition--fade Panel--padded" + (active ? " isActive" : "")}>
//         <div style={{flexGrow: 1, paddingRight: '3.5vw'}}>
//             <Postcard mask="1" card="1" alt="2">
//               <VideoPlayer
//                 /* music video partial song */
//                 videoId="RnyJ8nwcuOE"
//                 // fullscreen
//                 active={active}
//                 onEnd={() => scrollTo("next")}
//               />
//             </Postcard>
//         </div>
//         <div className="Paper" style={{maxWidth: "300px", transform: 'rotate(1deg)'}}>
//           Madame Arthur is named after a song by one of fin-de-siecle’s most famous chanteuses: Yvette Guilbert. Guilbert Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
//         </div>
//       </div>
// )}, 
//   ({sectionIndex, rootEl}) => {

//     return(
//       <React.Fragment>
//         <Curtains 
//           registerAnimation={registerAnimation}
//           sectionIndex={sectionIndex}
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
//   ({sectionIndex, rootEl}) => {

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
// )}, ({sectionIndex, rootEl}) => (
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
//   ({sectionIndex, rootEl}) => {

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
// )}, ({sectionIndex, rootEl}) => (
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
//   ({sectionIndex, rootEl}) => {

//     return(
//       <React.Fragment>
//         <Curtains 
//           registerAnimation={registerAnimation}
//           sectionIndex={sectionIndex}
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
// )}, ({sectionIndex, rootEl}) => (
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
