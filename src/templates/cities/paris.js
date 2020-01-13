import React from 'react'
import VideoPlayer from '../../components/VideoPlayer'
import CanvasBlend from '../../components/CanvasBlend'
import Curtains from '../../components/Curtains'
import Postcard from '../../components/Postcard'
import Parallax from '../../components/Parallax'
import Picture from '../../components/Picture'
import Positioner from '../../components/Positioner'
import Clouds from '../../components/Clouds'
import { withPrefix } from 'gatsby'
import useMedia from 'use-media';


/** @jsx jsx */
import { css, jsx } from '@emotion/core'







const pages = [
({sectionIndex, dimensions, setContainerCss}) => {

  // const overhang = 0.1;
  const isMobile = useMedia({maxWidth: '40em'});
  setContainerCss(`min-height: calc(100vh - 40px);`)

    return (
    <React.Fragment>
    {/*
            <Parallax speed={(pages.length - 1 - overhang) * (-8/overhang)} dimensions={dimensions}>
              <div className="ScrollSections__background" css={css(`
                background-image: url( ${withPrefix('/')}img/paris.jpg);
                height: calc((100vh - 40px) * ${1 + overhang})
              `)}></div>
            </Parallax>*/}
          
            <Clouds dimensions={dimensions} />

            <Parallax speed="2" dimensions={dimensions}>
                <Positioner 
                  x="0.1" 
                  y="0.1" 
                >
                  <Picture 
                    src={`${withPrefix('/')}img/bienvenue-a-paris.png`}
                    width="calc(200px + 25%)" 
                    rotate="-25"
                    shadow={false}
                    background="transparent"
                  />
                </Positioner>
            </Parallax>

            <Parallax dimensions={dimensions}>
              <Positioner 
                x="0.6" 
                y="0.6" 
              >
                <Postcard>
                  <VideoPlayer
                      videoId="qdU_IKxIhAk"
                      thumbnail={`${withPrefix('/')}img/thumbnails/cat_streeter.jpg`}
                      // autoplay
                    />
                </Postcard>
              </Positioner>
            </Parallax>
          
    </React.Fragment>
  )}, 
  ({sectionIndex, dimensions, setContainerCss}) => {

    return(
      <React.Fragment>
        <div className="scrim"></div>

        <VideoPlayer
          /* kitty litter */
          videoId="ZS8zlMNmTEU"
          thumbnail={`${withPrefix('/')}img/thumbnails/00_intro_cat-litter_V2.jpg`}
          fullscreen
          // onEnd={() => scrollTo("next", 0)}
        />

        <Curtains />
              
      </React.Fragment>
)}
,({sectionIndex, dimensions, setContainerCss}) => {

    return(
      <React.Fragment>
        <Parallax speed="-2" dimensions={dimensions} offset={0.2}>
          <Picture src={`${withPrefix('/')}img/paris_map.jpg`} rotate={1} 
            width="90%" 
            height="140vh"
          />
        </Parallax>
      </React.Fragment>
)}
    // , ({sectionIndex, dimensions, setContainerCss}) => {
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
, ({sectionIndex, dimensions, setContainerCss}) => (
  <React.Fragment>
            <Parallax speed="3" dimensions={dimensions}>
              <Positioner x="0.4" y="0.4">
                <Postcard mask="2" card="2">                
                    <VideoPlayer
                      videoId="LkdWOkpCuTw"
                      thumbnail={`${withPrefix('/')}img/thumbnails/wig_shop.jpg`}
                    />
                </Postcard> 
              </Positioner> 
            </Parallax>
            <Parallax speed="1" dimensions={dimensions} offset={0.3}>
              <div css={css(`
                position: absolute;
                width: 100%;
                height: 100%;
                background-image: url('${withPrefix('/')}img/paris_poster-2.jpg');
                background-size: cover;
                mask-image: url('${withPrefix('/')}img/torn-edge_mask.png');
                mask-size: auto 100%;
              `)}></div>
            </Parallax>
            </React.Fragment>
)
, ({sectionIndex, dimensions, setContainerCss}) => {

    return(
      <React.Fragment>
        <Parallax dimensions={dimensions} speed="-6">
          <Positioner x="0.3">
            <Postcard mask="2" card="1" alt="3">
              <VideoPlayer
                /* Strongman chat noir */
                videoId="T6nNI2Nw9a0"
                thumbnail={`${withPrefix('/')}img/thumbnails/00_strongman_chat_noir%20v3.jpg`}
                // fullscreen
                // captions={true}
              />
            </Postcard>
          </Positioner>
        </Parallax>
      </React.Fragment>
)}
// , ({sectionIndex, dimensions, setContainerCss}) => (
//           <div className="Panel">
//             <div className={"Panel Transition--fade whereAreTheyNow" + (active ? " isActive" : "")}>
//             <div className="whereAreTheyNow__title">
//               <h2>Où sont-ils maintenant?</h2>
//               <span>(Where are they now?)</span>
//             </div>
//               <Slideshow 
//                 registerAnimation={registerAnimation}
//                 dimensions={dimensions}
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
 , ({sectionIndex, dimensions, setContainerCss}) => {
    return(
      <React.Fragment>
        <Parallax dimensions={dimensions}>
        <Positioner x="0.7">
        <Postcard mask="1" card="2" alt="2">
            <VideoPlayer
              /* le mirilton */
              videoId="takA-zY-Tn8"
              thumbnail={`${withPrefix('/')}img/thumbnails/00_le_mirliton%20v2_crop.jpg`}
            />
        </Postcard>
        </Positioner>
        </Parallax>
      </React.Fragment>
)}
, ({sectionIndex, dimensions, setContainerCss}) => (
       <React.Fragment>
       <div css={css(`
         position: absolute;
         width: 100%;
         height: 100%;
         background-image: url('${withPrefix('/')}img/paris_poster-1.jpg');
         background-size: cover;
         mask-image: url('${withPrefix('/')}img/torn-edge_mask.png');
         mask-size: auto 100%;
       `)}></div>
        <Parallax speed="2" dimensions={dimensions}>
          <Picture 
            // mask={2} 
            height="90vh"
            width="40%"
            rotate={.25}
            x="1"
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
                <figure className="quote" css={css(`color:#fff;`)}>
                   <q>Those who have come to the world with a silver spoon in their mouths, 
                   I revenge myself in insulting them, in treating them worse than dogs. That makes them laugh to tears; they believe I joke when, often enough, it is a breeze from the past, miseries submitted to, dirtiness seen, which remounts on my lips and makes me speak as I do.</q>
                   <figcaption>&mdash;&ensp;Aristide Bruant (translated by Richard D. Sonne)</figcaption>
                </figure>
            </div>
        </div>
       </React.Fragment>
)
,    ({sectionIndex, dimensions, setContainerCss}) => {

    return(
      <React.Fragment>
        <Parallax speed={-6} dimensions={dimensions}>
          <Postcard mask="2" card="1" alt="1">
              <VideoPlayer
                /* musee montmatre */
                videoId="j9ieAAvYpJU"
                thumbnail={`${withPrefix('/')}img/thumbnails/00_Musee_Montmartre%20v2.jpg`}
              />
              
          </Postcard>
        </Parallax>
      </React.Fragment>
)}
,    ({sectionIndex, dimensions, setContainerCss}) => {
    return(
      <React.Fragment>
        <div className="scrim"></div>
        <VideoPlayer
          /* interview with julia */
          videoId="sKxtbvayB50"
          thumbnail={`${withPrefix('/')}img/thumbnails/00_julia_interview%20v7.jpg`}
          fullscreen
        />
      <Curtains />
  
      <Parallax speed="1" dimensions={dimensions} offset={0.5}>
        <a href="https://museedemontmartre.fr/en/" css={css(`
          width: 230px; 
          height: 200px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          text-align: center; 
          margin-left:auto; 
          margin-right:5%;
          position: relative;
          border-radius: 100%;
          padding: 30px;
          background: #861f12;
          color: #fff;
          box-shadow: 1px 1px 8px #00000047;
          text-decoration: none;

          &:before{
            content: "";
            display: block;
            position: absolute;
            top: 5px;
            left:5px;
            bottom: 5px;
            right: 5px;
            border-radius: 100%;
            background-image: url("${withPrefix('/')}img/paris_map.jpg");
            background-size: 700% auto;
            background-position: center center;
            opacity: 0.25;
            // background-clip: content-box;
          }
        `)}>
          <div css={css(`position: relative; text-decoration: none;`)}>
            Visit the Musee Montmartre in person or <u>virtually</u>!
          </div>
        </a>
      </Parallax>
      </React.Fragment>
)}
    , ({sectionIndex, dimensions, setContainerCss}) => {

    return(
      <Parallax dimensions={dimensions}>
        <Postcard mask="2" card="2" alt="3">           
          <VideoPlayer
            /* strongman lapin agile */
            videoId="-995ptoiNjw"
            thumbnail={`${withPrefix('/')}img/thumbnails/00_strongman_Lapin%20agile_v1.jpg`}
          />
        </Postcard>
      </Parallax>
)}
,    ({sectionIndex, dimensions, setContainerCss}) => {
    return(
      <React.Fragment>
        <div className="scrim"></div> 
        <VideoPlayer
          /* lapin agile interview */
          videoId="ubFSIFzFLs8"
          thumbnail={`${withPrefix('/')}img/thumbnails/00_Lapin_agile_interview.jpg`}
          fullscreen
        />
        <Curtains />
      </React.Fragment>
)}
, ({sectionIndex, dimensions, setContainerCss}) => {
    return(
      <React.Fragment>
        <Parallax speed="2" dimensions={dimensions}>
          <div css={css(`
            width: 54%;
            margin-right: auto;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          `)}>
          <Postcard mask="1" card="2" alt="4" css={css(`margin-left: auto;`)}>
              <VideoPlayer
                /* other minor cabarets */
                videoId="bysHS5IqVdI"
                thumbnail={`${withPrefix('/')}img/thumbnails/00_Other%20Minor%20Cabarets_v2ab.jpg`}
              />
          </Postcard>
          </div>
        </Parallax>
        <Parallax speed="-0.5" dimensions={dimensions}>
        <div css={css(`
            width: 51%;
            margin-left: auto;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          `)}>
        <Postcard mask="2" card="2" css={css(`margin-right: auto;`)}>
            <VideoPlayer
              /* other minor cabarets 2 */
              videoId="jRouAXIvDrw"
              thumbnail={`${withPrefix('/')}img/thumbnails/00_Other%20Minor%20Cabarets_v2b.jpg`}
            />
        </Postcard>
        </div>
        </Parallax>
      </React.Fragment>
)}
, ({sectionIndex, dimensions, setContainerCss}) => {
    return(
      <React.Fragment>
        <Parallax dimensions={dimensions} offset={-0.1} speed="-4">
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
// , ({sectionIndex, dimensions, setContainerCss}) => (
//           <div className="Panel">
//             <div className={"Panel Panel--padded Transition--fade" + (active ? " isActive" : "")} style={{flexDirection: 'column'}}>
//               <Slideshow 
//                 registerAnimation={registerAnimation}
//                 dimensions={dimensions}
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
,    ({sectionIndex, dimensions, setContainerCss}) => {
    return(
      <React.Fragment>
        <div className="scrim"></div>
        <VideoPlayer
          /* Edith Piaf’s grave site */
          videoId="lqsW1FCVi_M"
          thumbnail={`${withPrefix('/')}img/thumbnails/00_Edith_Piafs_Grave.jpg`}
          fullscreen
        />
        <Curtains />
      </React.Fragment>
)}
,    ({sectionIndex, dimensions, setContainerCss}) => {
    return(
      <React.Fragment>
        <Parallax speed="-4" dimensions={dimensions}>
          <Picture width="55%" padding="3%" mask={1} x={0.75} css={css(`position: absolute; left: 2.5%;`)} src={`${withPrefix('/')}img/paris_bricktop.jpg`} alt="" />
        </Parallax>
        
        <Parallax speed="-2" dimensions={dimensions}>
          <Picture width="50%" padding="0.5%" background="#efefef" height="102vh" x={0.25} css={css(`position: absolute; right: 2.5%;`)} rotate={1} src={`${withPrefix('/')}img/paris_josephine2.jpg`} alt=""/>
        </Parallax>

          <div className="Paper" css={css(`transform: rotate(-1deg); max-width: 400px`)}><p>In the 1920s and 30s, a flood of expats in Paris created both a stream of American entertainers and American ex-pats who would flock to establishments with American artists (as did the French). A huge part of the reason was jazz’s rapid advance around the world.</p> <p>In particular, African American artists who could not perform in front of integrated audiences at home and who were appalled and exhausted at their treatment in America found refuge in Paris. This cross-cultural exchange would have a lasting impact on cabaret in both Paris and America (and also in Berlin which was not immune to the influence of Josephine Baker).</p></div>
      </React.Fragment>
)}
, ({sectionIndex, dimensions, setContainerCss}) => (
      <React.Fragment>
        <Parallax speed="2" dimensions={dimensions}>
          <Picture height="120vh" x={0.3} width="37.5%" fit="cover" src={`${withPrefix('/')}img/paris_josephine.jpg`} alt="" css={css(`margin-left: auto; margin-right 2.5%`)} />
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
              <div className="bigborder"></div>
          </div>
        </div>
      </React.Fragment>
)
,  ({sectionIndex, dimensions, setContainerCss}) => {
    return(
      <React.Fragment>
        <div className="scrim"></div>
        <VideoPlayer
          /*Edith piaf chanson realiste*/
          videoId="Sp0oggT2IjY"
          thumbnail={`${withPrefix('/')}img/thumbnails/00_Edith_Piaf_Chanson_Realiste_V4.jpg`}
          fullscreen
        />
        <Curtains />
      </React.Fragment>
)}
// , 
//   ({sectionIndex, dimensions, setContainerCss}) => {

//     return(
//       <React.Fragment>
//         <div className={"Panel Transition--fade" + (active ? " isActive" : "")}>
//             <VideoPlayer
//               videoId="xxx"
//               fullscreen
//               dimensions={dimensions}
//               activeIndex={activeIndex}
//               onEnd={() => scrollTo("next")}
//             />
//         </div>
//       </React.Fragment>
// )})
, ({sectionIndex, dimensions, setContainerCss}) => (
      <React.Fragment>
        <Parallax dimensions={dimensions}>
          <Postcard mask="1" card="2" alt="4">
          <VideoPlayer
            /* cafe streeter */
            videoId="vrvVpZsKVYk"
            thumbnail={`${withPrefix('/')}img/thumbnails/cafe_streeter.jpg`}
          /> 
          </Postcard>
        </Parallax>
      </React.Fragment>
)
,    ({sectionIndex, dimensions, setContainerCss}) => {
    return(
      <React.Fragment>
            <div className="scrim"></div>
            <VideoPlayer
              /* interview with gosia  */
              videoId="VxGeGeKUaU0"
              thumbnail={`${withPrefix('/')}img/thumbnails/00_interview_with_gosia-v6.jpg`}
              fullscreen
            />
            <Curtains />
      </React.Fragment>
)}
,    ({sectionIndex, dimensions, setContainerCss}) => {
    return(
      <React.Fragment>
        <Parallax speed="-4" dimensions={dimensions}>
          <Postcard mask="1" card="1" alt="3">
              <VideoPlayer
                /* Interview with Michel from Vieux Belleville   */
                videoId="az8ftb3NgNw"
                thumbnail={`${withPrefix('/')}img/thumbnails/00_interview_with_michel_v4.jpg`}
              />
          </Postcard>
        </Parallax>
      </React.Fragment>
)}
,    ({sectionIndex, dimensions, setContainerCss}) => {

    return(
      <React.Fragment>
      <Parallax speed="-1" dimensions={dimensions}>
        <div css={css(`
         position: absolute;
         top:0;
         width: 100%;
         height: 115%;
         background-image: url('${withPrefix('/')}img/paris_aumagique.jpg');
         background-size: cover;
         background-position: top center;
         mask-image: url('${withPrefix('/')}img/torn-edge_mask.png');
         mask-size: auto 100%;
       `)}></div>
      </Parallax>
        <Parallax speed="1" dimensions={dimensions}>
          <Positioner y="1" x="1" css={css(`
            width: 51%;
            margin-right: auto;
          `)}>
            <Postcard mask="1" card="1" alt="1" css={css(`margin-left: auto;`)}>
              <VideoPlayer
                /* Interview_Natalie_au Magique */
                videoId="jS34OY5LCk0"
                thumbnail={`${withPrefix('/')}img/thumbnails/00_Interview_Natalie_au_Magique_v2.jpg`}
              />
            </Postcard>
          </Positioner>
        </Parallax>
        <Parallax speed="2" dimensions={dimensions}>
          <Positioner y="1" x="0" css={css(`
            width: 54%;
            margin-left: auto;
          `)}>
            <Postcard mask="2" card="2" css={css(`margin-right: auto;`)}>
              <VideoPlayer
                /* martine au magique */
                videoId="5sS94fQ0zRo"
                thumbnail={`${withPrefix('/')}img/thumbnails/00_interview%20at%20Au%20Magique.jpg`}
              />
            </Postcard>
          </Positioner>
        </Parallax>
      </React.Fragment>
)}
,   ({sectionIndex, dimensions, setContainerCss}) => {
    return(
      <React.Fragment>
        <Parallax speed="-4" dimensions={dimensions}>
          <Postcard mask="2" card="1" alt="1">
              <VideoPlayer
                /* strongman divan japanois */
                videoId="_7kQh0ot5Kc"
                thumbnail={`${withPrefix('/')}img/thumbnails/00_strongman_divan-japanois.jpg`}
              />
          </Postcard>
        </Parallax>
      </React.Fragment>
)}
// ,    ({sectionIndex, dimensions, setContainerCss}) => {
//     return(
//       <React.Fragment>
//         <Postcard mask="1" card="2" alt="3">
//             interview with Monsieur K
//         </Postcard>
//       </React.Fragment>
// )}
,    ({sectionIndex, dimensions, setContainerCss}) => {

    return(
      <React.Fragment>
        <div css={css(`flex-grow: 1; padding-right: 3.5vw`)}>
            <Postcard mask="1" card="1" alt="2">
              <VideoPlayer
                /* music video partial song */
                videoId="RnyJ8nwcuOE"
                thumbnail={`${withPrefix('/')}img/thumbnails/Yvette_Guilbert_song.jpg`}
                // fullscreen
              />
            </Postcard>
        </div>
        <div className="Paper" css={css(`max-width: 300px; transform: rotate(1deg)`)}>
          Madame Arthur is named after a song by one of fin-de-siecle’s most famous chanteuses: Yvette Guilbert. Guilbert Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
        </div>
      </React.Fragment>
)}
,    ({sectionIndex, dimensions, setContainerCss}) => {
    return(
      <React.Fragment>
            <VideoPlayer
              /* strongman limonaire */
              videoId="2UTO67pYjpU"
              thumbnail={`${withPrefix('/')}img/thumbnails/00_strongman_limonaire_v2.jpg`}
              fullscreen
            />
      </React.Fragment>
)}
,    ({sectionIndex, dimensions, setContainerCss}) => {
    return(
      <React.Fragment>
            <VideoPlayer
              /* limonaire interview with closing */
              videoId="NHC-gkfr61Y"
              thumbnail={`${withPrefix('/')}img/thumbnails/00_limonaire_interview_with_closing_v1.jpg`}
              fullscreen
            />
      </React.Fragment>
)}
, ({sectionIndex, dimensions, setContainerCss}) => (
              <Postcard mask="2" alt="3">  
                <VideoPlayer
                    // cooking show streeter
                    videoId="1T1T3coj6BI"
                    thumbnail={`${withPrefix('/')}img/thumbnails/cooking_show.jpg`}
                  />
              </Postcard>  
)
,    ({sectionIndex, dimensions, setContainerCss}) => {
    return(
      <React.Fragment>
        <Parallax speed="-4" dimensions={dimensions}>
              <div className="TVborder">
                <CanvasBlend use="maskInverse" color={[33,73,43]} className="TVborder__img">
                  <img src={`${withPrefix('/')}img/tv.jpg`} alt=""/>
                </CanvasBlend>
                <VideoPlayer
                  /* chat noir multicam cooking  */
                  videoId="edE_LnV6Fm4"
                  thumbnail={`${withPrefix('/')}img/thumbnails/00_Chat-Noir-Multicam-cooking-v1.jpg`}
                />            
          </div>
        </Parallax>
      </React.Fragment>
)}
, ({sectionIndex, dimensions, setContainerCss}) => (
          <Parallax speed="-2" dimensions={dimensions}>
              <Postcard alt="2" card="2">  
                <VideoPlayer
                    //asshole streeter
                    videoId="ZsjrIQY16aQ"
                    thumbnail={`${withPrefix('/')}img/thumbnails/asshole_streeter.jpg`}
                  />
              </Postcard>  
          </Parallax>
)
,    ({sectionIndex, dimensions, setContainerCss}) => {
    return(
      <React.Fragment>
        <div className="scrim"></div>
        <VideoPlayer
              /* asshole singalong  */
              videoId="7Unp0PL2m8Q"
              thumbnail={`${withPrefix('/')}img/thumbnails/00_asshole-singalong.jpg`}
              fullscreen
            />
        <Curtains />
      </React.Fragment>
)}
, ({sectionIndex, dimensions, setContainerCss}) => {
  setContainerCss(`min-height: calc(100vh - 40px);`)
    return(
  <React.Fragment>
                See you in Berlin!
  </React.Fragment>
)}
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
