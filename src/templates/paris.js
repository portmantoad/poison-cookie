import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Layout from '../components/Layout'
import ScrollSections from '../components/ScrollSections'
import VideoPlayer from '../components/VideoPlayer'
import CanvasBlend from '../components/CanvasBlend'
import Curtains from '../components/Curtains'
import Postcard from '../components/Postcard'
import Parallax from '../components/Parallax'
import Picture from '../components/Picture'
import Scrim from '../components/Scrim'
import Positioner from '../components/Positioner'
import Clouds from '../components/Clouds'
import { withPrefix, Link, graphql } from 'gatsby'
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
                    width="calc(200px + 20vw)" 
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
                      videoIds={["qdU_IKxIhAk"]}
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
        
          <Scrim image={`${withPrefix('/')}img/paris_kitties.jpg`} css={css(`background-position: center bottom;`)} />
        

        <Parallax speed="2" dimensions={dimensions} offset={0}>
          <Postcard mask="2" card="1" alt="3"> 
            <VideoPlayer
              /* kitty litter */
              videoIds={["ZS8zlMNmTEU"]}
              thumbnail={`${withPrefix('/')}img/thumbnails/00_intro_cat-litter_V2.jpg`}
            />
          </Postcard>
        </Parallax>
              
      </React.Fragment>
)}
, ({sectionIndex, dimensions, setContainerCss}) => {
  setContainerCss(`min-height: calc((30vw + 150px) * (286/935) )`)
  return (
          <React.Fragment>
            <Parallax speed="-4" dimensions={dimensions}>
              <Positioner x="0.5" y="0.5">
                <Picture
                  background="transparent"
                  shadow={false}
                  width="calc(30vw + 150px);" 
                  src={`${withPrefix('/')}img/paris_titles_firstcabaret.png`} 
                 />
              </Positioner> 
            </Parallax>
          </React.Fragment>
  )
}
, ({sectionIndex, dimensions, setContainerCss}) => (
          <React.Fragment>
            <Parallax speed="-2" dimensions={dimensions}>
              <Positioner x="0.6" y="0.5">
                <Postcard mask="2" card="2">                
                    <VideoPlayer
                      videoIds={["LkdWOkpCuTw"]}
                      thumbnail={`${withPrefix('/')}img/thumbnails/wig_shop.jpg`}
                    />
                </Postcard> 
              </Positioner> 
            </Parallax>
          </React.Fragment>
)
, ({sectionIndex, dimensions, setContainerCss}) => (
          <React.Fragment>
            <Parallax speed="1" dimensions={dimensions} offset={0}>
              <Scrim image={`${withPrefix('/')}img/paris_poster-2.jpg`} css={css(`background-position: right center;`)} />
            </Parallax>
            <Parallax speed="2" dimensions={dimensions}>
              <Positioner x="0.4" y="0.4">
                <Postcard mask="2" card="2">                
                    <VideoPlayer
                      // Intro strongman cemetary
                      videoIds={["9IJph4x7ySg"]}
                      thumbnail={`${withPrefix('/')}img/thumbnails/00_CemetaryV3.jpg`}
                    />
                </Postcard> 
              </Positioner> 
            </Parallax>
          </React.Fragment>
)
, ({sectionIndex, dimensions, setContainerCss}) => {

    return(
      <React.Fragment>
        <Parallax dimensions={dimensions} speed="-5">
          <Positioner x="0.7" y="0.4">
            <Postcard mask="2" card="1" alt="3">
              <VideoPlayer
                /* Strongman chat noir */
                videoIds={["T6nNI2Nw9a0"]}
                thumbnail={`${withPrefix('/')}img/thumbnails/00_strongman_chat_noir%20v3.jpg`}
                // fullscreen
                // captions={true}
              />
            </Postcard>
          </Positioner>
        </Parallax>
      </React.Fragment>
)}
, ({sectionIndex, dimensions, setContainerCss}) => {
setContainerCss(`max-height: calc(100vh - 40px)`)
  return(
          <React.Fragment>
          <Parallax dimensions={dimensions} speed="-4">
            <Positioner x="1" y="0.15" padding="3.5vh">
                <img src={`${withPrefix('/')}img/paris_wherearetheynow.png`} alt="Where are they now?" css={css(`width: calc(25vw + 100px); max-width: 100%;`)}/>
            </Positioner>
          </Parallax>

            
            <Parallax dimensions={dimensions} speed="0"><Positioner padding="3.5vh" x="0"><Picture height="110vh" width="25vw" y="0.3" rotate="-1" src={`${withPrefix('/')}img/paris_famouspeople_eric-satie.jpg`} /></Positioner></Parallax>
            <Parallax dimensions={dimensions} speed="-2.5"><Positioner padding="3.5vh" x="1"><Picture height="90vh" width="45vw" y="0.8" rotate="2" src={`${withPrefix('/')}img/paris_famouspeople_toulouse-lautrec.jpg`} /></Positioner></Parallax>
            <Parallax dimensions={dimensions} speed="-4"><Positioner padding="3.5vh" x="0.4"><Picture height="90vh" width="40vw" y="0.5" rotate="-2" src={`${withPrefix('/')}img/paris_famouspeople_andre-gill.jpg`} /></Positioner></Parallax>

          </React.Fragment>
)}
 , ({sectionIndex, dimensions, setContainerCss}) => {
    return(
      <React.Fragment>
        <Parallax dimensions={dimensions} speed="-2">
        <Positioner x="0.7">
        <Postcard mask="1" card="2" alt="2">
            <VideoPlayer
              /* le mirilton */
              videoIds={["takA-zY-Tn8"]}
              thumbnail={`${withPrefix('/')}img/thumbnails/00_le_mirliton%20v2_crop.jpg`}
            />
        </Postcard>
        </Positioner>
        </Parallax>
      </React.Fragment>
)}
, ({sectionIndex, dimensions, setContainerCss}) => (
       <React.Fragment>
       <Scrim image={`${withPrefix('/')}img/paris_poster-1.jpg`} />
        <Parallax speed="2" dimensions={dimensions}>
          <Picture 
            // mask={2} 
            height="90vh"
            width="37.5vw"
            rotate={.25}
            x="1"
            css={css`margin-right: auto; margin-left:3.5vh`} 
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
, ({sectionIndex, dimensions, setContainerCss}) => {
  setContainerCss(`min-height: calc((100vw) * (286/1683) )`)
  return (
          <React.Fragment>
            <Parallax speed="-4" dimensions={dimensions}>
              <Positioner x="0.5" y="0.5">
                <Picture
                  background="transparent"
                  shadow={false}
                  width="calc(30vw + 150px);" 
                  src={`${withPrefix('/')}img/paris_titles_masteringartoffrenchcabaret.png`} 
                 />
              </Positioner> 
            </Parallax>
          </React.Fragment>
  )
}
, ({sectionIndex, dimensions, setContainerCss}) => {
    return(
      <React.Fragment>
        <Parallax dimensions={dimensions} speed="-6">
          <Picture 
            width="100vw"
            shadow={false}
            height="calc((100vh - 40px) * 1.2)"
            mask={`${withPrefix('/')}img/paris_book-1_mask.png`} 
            src={`${withPrefix('/')}img/paris_book-1.jpg`} 
          />
        </Parallax>
        <Parallax dimensions={dimensions} speed="4">
          <Positioner x="0.3" y="0.5">
            <Picture
              width="calc(30vw + 150px);" 
              shadow
              rotate={-1}
              src={`${withPrefix('/')}img/paris_recipe_alexandre.jpg`} 
            />
          </Positioner>
        </Parallax>
      </React.Fragment>
)}
,    ({sectionIndex, dimensions, setContainerCss}) => {

    return(
      <React.Fragment>
        <Parallax speed={-6} dimensions={dimensions}>
          <Postcard mask="2" card="1" alt="1">
              <VideoPlayer
                /* musee montmatre */
                videoIds={["j9ieAAvYpJU"]}
                thumbnail={`${withPrefix('/')}img/thumbnails/00_Musee_Montmartre%20v2.jpg`}
              />
              
          </Postcard>
        </Parallax>
      </React.Fragment>
)}
,    ({sectionIndex, dimensions, setContainerCss}) => {
    return(
      <React.Fragment>
        <Scrim offset="0" />
        <VideoPlayer
          /* interview with julia */
          videoIds={["p3GpNMbGbEs"]}
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
            background-image: url("${withPrefix('/')}img/paris_montmartre.jpg");
            background-size: cover;
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
      <React.Fragment>
        <Parallax dimensions={dimensions} offset={-0.2} speed="-6">
          <Picture 
            width="100vw"
            shadow={false}
            height="calc((100vh - 40px) * 1.2)"
            mask={`${withPrefix('/')}img/paris_book-2_mask.png`} 
            src={`${withPrefix('/')}img/paris_book-2.jpg`} 
          />
        </Parallax>
        <Parallax dimensions={dimensions} offset={-0.2} speed="4">
          <Positioner x="0.7" y="0.5">
            <Picture
              width="calc(30vw + 150px);" 
              height="90vh"
              y="0.5"
              shadow
              rotate={-1}
              src={`${withPrefix('/')}img/paris_recipe_neant.jpg`} 
            />
          </Positioner>
        </Parallax>
      </React.Fragment>
)}
    , ({sectionIndex, dimensions, setContainerCss}) => {

    return(
      <Parallax dimensions={dimensions}>
        <Postcard mask="2" card="2" alt="3">           
          <VideoPlayer
            /* strongman lapin agile */
            videoIds={["-995ptoiNjw" ]}
            thumbnail={`${withPrefix('/')}img/thumbnails/00_strongman_Lapin%20agile_v1.jpg`}
          />
        </Postcard>
      </Parallax>
)}
,    ({sectionIndex, dimensions, setContainerCss}) => {
    return(
      <React.Fragment>
        <Scrim /> 
        <VideoPlayer
          /* lapin agile interview */
          videoIds={["Lv5TdkvVx6s"]}
          thumbnail={`${withPrefix('/')}img/thumbnails/00_Lapin_agile_interview.jpg`}
          fullscreen
        />
        <Curtains />
      </React.Fragment>
)}
// , ({sectionIndex, dimensions, setContainerCss}) => {
// // setContainerCss(`max-height: calc(100vh - 40px)`)
//   return(
//           <React.Fragment>
//           <Parallax dimensions={dimensions} speed="-2">
//             <Positioner x="0.9" y="0.15" padding="3.5vh">
//               <img src={`${withPrefix('/')}img/paris_wherearetheynow.png`} alt="Where are they now?" css={css(`width: calc(25vw + 100px); max-width: 100%;`)}/>
//             </Positioner>
//           </Parallax>

//             <Parallax dimensions={dimensions} speed="2"><Positioner padding="3.5vh" x="0.1"><Picture height="90vh" width="35vw" y="0.8" rotate="2" src={`${withPrefix('/')}img/paris_famouspeople_claude-debussy.jpg`} /></Positioner></Parallax>
//             <Parallax dimensions={dimensions} speed="0"><Positioner padding="3.5vh" x="0.8"><Picture height="90vh" width="50vw" y="0.8" rotate="2" src={`${withPrefix('/')}img/paris_famouspeople_paul-verlaine.jpg`} /></Positioner></Parallax>

//           </React.Fragment>
// )}
,    ({sectionIndex, dimensions, setContainerCss}) => {

    return(
      <React.Fragment>
        <Parallax speed="-2" dimensions={dimensions}>
              <Scrim image={`${withPrefix('/')}img/paris_poster-guilbert.jpg`} css={css(`background-position: center top;`)} />
            </Parallax>
        <Parallax speed="2" dimensions={dimensions}>
            <Positioner x="1" css={css(`width:60%; right: unset;`)}>
              <Postcard mask="1" card="1" alt="2" caption="Madame Arthur is named after a song by one of fin-de-siecle’s most famous chanteuses: Yvette Guilbert">
                <VideoPlayer
                  /* music video partial song */
                  videoIds={["RnyJ8nwcuOE"]}
                  thumbnail={`${withPrefix('/')}img/thumbnails/guilbert.jpg`}
                  // fullscreen
                />
              </Postcard>
            </Positioner>
         </Parallax>
         <Parallax speed="0" dimensions={dimensions}>
         <Positioner x="0" padding="3.5vh" css={css(`width:calc(40% - 3.5vh); left: unset;`)}>
          <div className="Paper" css={css(`max-width: 500px; transform: rotate(1deg)`)}>
            <h2>Yvette Guilbert</h2>
            Early cabaret was dominated by men. The women and queer artists who would come to dominate the stages in the 20th century were not yet . Except for one. Yvette Guilbert. She dressed in yellow and wore long black gloves, dyed her hair red and painted her face white. In a city used to seeing female entertainers as decorative (and silent) objects, Guilbert refused to be easily categorized. The first in a long line of cabaret women who would stand still while they performed, the most movement she allowed was a gesture of her arms. She sang more frequently in music halls (the Moulin Rouge, the Divan Japonois) than cabarets, but frequently took a turn on cabaret stages, and the intimate, word-driven method of her delivery fits perfectly into the cabaret vernacular. Guilbert wrote her own songs and sang the songs of others, raunchy ballads, and patter songs. Her poison was of the under-the-sink variety: songs about domestic disputes and the working class people she grew up with, songs about love, especially when it went wrong. And more than anything, her poison lay in the fact that men were conflicted about how to receive her. She was sometimes referred to as the Queen of Paris and sometimes as the Lean Witch. In cabaret, she was the first, but she wouldn't be the only.   
          </div>
        </Positioner>
        </Parallax>
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
                videoIds={["bysHS5IqVdI"]}
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
              videoIds={["jRouAXIvDrw"]}
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
        <Parallax dimensions={dimensions} speed="-6">
          <Picture 
            width="100vw"
            shadow={false}
            height="calc((100vh - 40px) * 1.2)"
            mask={`${withPrefix('/')}img/paris_book-3_mask.png`} 
            src={`${withPrefix('/')}img/paris_book-3.jpg`} 
          />
        </Parallax>
      </React.Fragment>
)}
// ,    ({sectionIndex, dimensions, setContainerCss}) => {
//     return(
//       <React.Fragment>
//         <Scrim />
//         <VideoPlayer
//           /* Edith Piaf’s grave site */
//           videoIds={["lqsW1FCVi_M"]}
//           thumbnail={`${withPrefix('/')}img/thumbnails/00_Edith_Piafs_Grave.jpg`}
//           fullscreen
//         />
//         <Curtains />
//       </React.Fragment>
// )}

, ({sectionIndex, dimensions, setContainerCss}) => {
  setContainerCss(`min-height: calc((30vw + 150px) * (286/935) )`)
  return (
          <React.Fragment>
            <Parallax speed="-4" dimensions={dimensions}>
              <Positioner x="0.5" y="0.5">
                <Picture
                  background="transparent"
                  shadow={false}
                  width="calc(30vw + 150px);" 
                  src={`${withPrefix('/')}img/paris_titles_betweenthewars.png`} 
                 />
              </Positioner> 
            </Parallax>
          </React.Fragment>
  )
}
,    ({sectionIndex, dimensions, setContainerCss}) => {

    return(
      <React.Fragment>
        <Parallax speed="-1.5" dimensions={dimensions}>
          <Scrim image={`${withPrefix('/')}img/paris_poster-5.jpg`} />
        </Parallax>
        <Positioner x="0" padding="3.5vh" css={css(`width:calc(35% - 3.5vh); right: unset;`)}>
          <div className="Paper" css={css(`width: 500px; max-width: 100%; transform: rotate(1deg)`)}>
          <h2>Marie Dubas</h2>
           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum        
          </div>
        </Positioner>
        
        <Parallax speed="2" dimensions={dimensions}>
          <Positioner x="0.5" y="0.3" padding="3.5vh" css={css(`width:40%; left: unset;`)}>
            <Picture width="100vw" height="90vh" y="0.3" src={`${withPrefix('/')}img/paris_mary-dubas.jpg`}></Picture>
          </Positioner>
        </Parallax>
        <Parallax speed="4" dimensions={dimensions}>
          <Positioner x="0.25" y="0.6" padding="3.5vh" css={css(`width:25%; left: 40%; right: unset;`)}>
            <Picture 
              width="100vw" 
              height="90vh"
              y="0.6"
              src={`${withPrefix('/')}img/paris_mary-dubas2.jpg`}
              mask={`${withPrefix('/')}img/paris_mary-dubas2_mask.png`}
            ></Picture>
          </Positioner>
        </Parallax>
      </React.Fragment>
)}
,    ({sectionIndex, dimensions, setContainerCss}) => {
    return(
      <React.Fragment>
        <Parallax speed="-4" dimensions={dimensions}>
          <Picture width="40vw" padding="3%" mask={1} x={0.75} css={css(`position: absolute; left: 2.5%;`)} src={`${withPrefix('/')}img/paris_bricktop.jpg`} alt="" />
        </Parallax>
        
        <Parallax speed="-2" dimensions={dimensions}>
          <Picture width="40vw" padding="0.5%" background="#efefef" height="102vh" x={0.25} css={css(`position: absolute; right: 2.5%;`)} rotate={1} src={`${withPrefix('/')}img/paris_josephine2.jpg`} alt=""/>
        </Parallax>

          <div className="Paper" css={css(`width: 400px; max-width: 100%; transform: rotate(-1deg);`)}>
          <h2>Jazz in Paris</h2>
            After WWI, African American soldiers weighed their options between staying in Europe or returning home. A number of them stayed, and settled in Paris. Jazz fever swept France, bringing with it a new appreciation for Americans generally and African Americans specifically. Musicians, writers, and visual artists all made their way across the ocean for opportunities denied them at home. All of them remarked on how welcome they seemed in France: “ They had a freedom you didn’t get [in America]. Over there you didn’t have to hide away,” remembered jazz musician Elliot Carpenter. These expats included dancer Josephine Baker, who became a European sensation, poet Langston Hughes, who washed dishes in Montmartre cabarets while honing his writer’s voice, and cabaret owner Ada Bricktop Smith whose nightclub Bricktop’s was the gathering place for American expats. This cross-cultural exchange would have a lasting impact on cabaret in Paris, Berlin, and America.
          </div>
      </React.Fragment>
)}
,    ({sectionIndex, dimensions, setContainerCss}) => {
    setContainerCss(`max-height: calc(100vh - 40px)`);
    return(
      <React.Fragment>
        <Parallax speed="-1" dimensions={dimensions}>
          <Scrim image={`${withPrefix('/')}img/paris_poster-4.jpg`} />
        </Parallax>
        <Parallax speed="2" dimensions={dimensions}>
            <Positioner x="1" css={css(`width:60%; right: unset;`)}>
              <Postcard mask="1" card="1" alt="2">
                <VideoPlayer
                  /* Bricktop */
                  videoIds={["mco73mfFUgo"]}
                  aspectRatio={4/3}
                  thumbnail={`${withPrefix('/')}img/thumbnails/bricktop.jpg`}
                  // fullscreen
                />
              </Postcard>
            </Positioner>
         </Parallax>
         <Parallax speed="0" dimensions={dimensions}>
         <Positioner x="0" padding="3.5vh" css={css(`width:calc(40% - 3.5vh); left: unset;`)}>
        <div className="Paper" css={css(`width: 500px; max-width: 100%; transform: rotate(1deg);`)}>
        <h2>Ada Bricktop Smith</h2>
        Bricktop’s was a combination mail-drop, bank, rehearsal hall, club house—even a neighborhood bar. But it was always chic.” Bricktop on her cabaret. People who frequented Bricktop’s: F. Scott & Zelda Fitzgerald, Ernest Hemingway, Gertrude Stein, the Duke and Duchess of Windsor, Evelyn Waugh, and T. S. Eliot. People who performed there: Django Reinhardt, Fred and Adele Astair, Jasha Heifitz, Duke Ellington, and Josephine Baker (whose son alleges that Baker told him she and Bricktop had an affair). Mabel Mercer was her assistant and Cole Porter her patron.        
        </div>
        </Positioner>
        </Parallax>
      </React.Fragment>
)}
, ({sectionIndex, dimensions, setContainerCss}) => (
      <React.Fragment>
        <Parallax speed="2" dimensions={dimensions}>
          <Picture height="120vh" x={0.3} width="37.5vw" fit="cover" src={`${withPrefix('/')}img/paris_josephine.jpg`} alt="" css={css(`margin-left: auto; margin-right 2.5%`)} />
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


, ({sectionIndex, dimensions, setContainerCss}) => {
    return(
      <React.Fragment>
        <Parallax dimensions={dimensions} speed="-6">
          <Picture 
            width="100vw"
            shadow={false}
            height="calc((100vh - 40px) * 1.2)"
            mask={`${withPrefix('/')}img/paris_book-3_mask.png`} 
            src={`${withPrefix('/')}img/paris_book-3.jpg`} 
          />
        </Parallax>
        <Parallax dimensions={dimensions} speed="4">
          <Positioner x="0.3" y="0.5">
            <Picture
              width="calc(30vw + 150px);" 
              shadow
              rotate={-1}
              src={`${withPrefix('/')}img/paris_recipe_alexandre.jpg`} 
            />
          </Positioner>
        </Parallax>
      </React.Fragment>
)}

,  ({sectionIndex, dimensions, setContainerCss}) => {
    return(
      <React.Fragment>
        <Parallax speed="-2" dimensions={dimensions}>
        <Positioner x="0.6">
          <Postcard mask="2" card="2" >
          <VideoPlayer
            /*Edith piaf chanson realiste*/
            videoIds={["nqgnmYe-o-8"]}
            thumbnail={`${withPrefix('/')}img/thumbnails/00_Edith_Piaf_Chanson_Realiste_V4.jpg`}
            fullscreen
          />
          </Postcard>
        </Positioner>
        </Parallax>
      </React.Fragment>
)}

, ({sectionIndex, dimensions, setContainerCss}) => {
  setContainerCss(`min-height: calc((30vw + 150px) * (286/935) )`)
  return (
          <React.Fragment>
            <Parallax speed="-4" dimensions={dimensions}>
              <Positioner x="0.5" y="0.5">
                <Picture
                  background="transparent"
                  shadow={false}
                  width="calc(30vw + 150px);" 
                  src={`${withPrefix('/')}img/paris_titles_contemporaryparis.png`} 
                 />
              </Positioner> 
            </Parallax>
          </React.Fragment>
  )
}

, ({sectionIndex, dimensions, setContainerCss}) => (
      <React.Fragment>
        <Parallax dimensions={dimensions}>
          <Postcard mask="1" card="2" alt="4">
          <VideoPlayer
            /* cafe streeter */
            videoIds={["vrvVpZsKVYk"]}
            thumbnail={`${withPrefix('/')}img/thumbnails/cafe_streeter.jpg`}
          /> 
          </Postcard>
        </Parallax>
      </React.Fragment>
)
,    ({sectionIndex, dimensions, setContainerCss}) => {
    return(
      <React.Fragment>
          <Postcard>
            <VideoPlayer
              /* strongman limonaire */
              videoIds={["mO8tjnfsgqE"]}
              thumbnail={`${withPrefix('/')}img/thumbnails/00_strongman_limonaire_v2.jpg`}
            />
          </Postcard>
      </React.Fragment>
)}
,    ({sectionIndex, dimensions, setContainerCss}) => {
    return(
      <React.Fragment>
        <Scrim />
         <VideoPlayer
              /* limonaire interview with closing */
              videoIds={["NHC-gkfr61Y"]}
              thumbnail={`${withPrefix('/')}img/thumbnails/00_limonaire_interview_with_closing_v1.jpg`}
              fullscreen
            />
        <Curtains />
      </React.Fragment>
)}

,    ({sectionIndex, dimensions, setContainerCss}) => {

    return(
      <React.Fragment>
      <Parallax speed="-1" dimensions={dimensions}>
        <Scrim image={`${withPrefix('/')}img/paris_aumagique2.jpg`} css={css(`
         background-position: top center;
       `)}/>
      </Parallax>
        <Parallax speed="1" dimensions={dimensions}>
          <Positioner y="0.9" x="1" css={css(`
            width: 51%;
            margin-right: auto;
          `)}>
            <Postcard mask="1" card="1" alt="1" css={css(`margin-left: auto;`)}>
              <VideoPlayer
                /* Interview_Natalie_au Magique */
                videoIds={["ZoqKiCB40Dk"]}
                thumbnail={`${withPrefix('/')}img/thumbnails/00_Interview_Natalie_au_Magique_v2.jpg`}
              />
            </Postcard>
          </Positioner>
        </Parallax>
        <Parallax speed="2" dimensions={dimensions}>
          <Positioner y="0.9" x="0" css={css(`
            width: 54%;
            margin-left: auto;
          `)}>
            <Postcard mask="2" card="2" css={css(`margin-right: auto;`)}>
              <VideoPlayer
                /* martine au magique */
                videoIds={["5sS94fQ0zRo"]}
                thumbnail={`${withPrefix('/')}img/thumbnails/00_interview%20at%20Au%20Magique.jpg`}
              />
            </Postcard>
          </Positioner>
        </Parallax>
      </React.Fragment>
)}
,    ({sectionIndex, dimensions, setContainerCss}) => {
    return(
      <React.Fragment>
            <Scrim />
            <VideoPlayer
              /* interview with gosia  */
              videoIds={["yufGrVm2sMc", "0KzUzFwpp2U"]}
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
                // Interview with Michel from Vieux Belleville   
                videoIds={["az8ftb3NgNw"]}
                thumbnail={`${withPrefix('/')}img/thumbnails/00_interview_with_michel_v4.jpg`}
              />
          </Postcard>
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
                videoIds={["_7kQh0ot5Kc"]}
                thumbnail={`${withPrefix('/')}img/thumbnails/00_strongman_divan-japanois.jpg`}
              />
          </Postcard>
        </Parallax>
      </React.Fragment>
)}
,    ({sectionIndex, dimensions, setContainerCss}) => {
    return(
      <React.Fragment>
          <Scrim />
            <VideoPlayer
              /* interview with Monsieur K */
              videoIds={["stTQeQuWA_Y"]}
              thumbnail={`${withPrefix('/')}img/thumbnails/00_monsieur_K.jpg`}
              fullscreen
            />
          <Curtains />
      </React.Fragment>
)}

,    ({sectionIndex, dimensions, setContainerCss}) => {
    return(
      <React.Fragment>
        <Parallax speed="-4" dimensions={dimensions}>
          <Positioner x="0.3">
            <Postcard>
              <VideoPlayer
                /* John missing strongman */
                videoIds={["dqLS2IFEL18"]}
                thumbnail={`${withPrefix('/')}img/thumbnails/00_Edith_Piafs_Grave.jpg`}
              />
            </Postcard>
          </Positioner>
        </Parallax>
      </React.Fragment>
)}
, ({sectionIndex, dimensions, setContainerCss}) => {
  setContainerCss(`min-height: calc((30vw + 150px) * (286/935) )`)
  return (
          <React.Fragment>
            <Parallax speed="-4" dimensions={dimensions}>
              <Positioner x="0.5" y="0.5">
                <Picture
                  background="transparent"
                  shadow={false}
                  width="calc(30vw + 150px);" 
                  src={`${withPrefix('/')}img/paris_titles_makingcookies.png`} 
                 />
              </Positioner> 
            </Parallax>
          </React.Fragment>
  )
}
, ({sectionIndex, dimensions, setContainerCss}) => (
            <Positioner x="0.7">
              <Postcard mask="2" alt="3">  
                <VideoPlayer
                    // cooking show streeter
                    videoIds={["1T1T3coj6BI"]}
                    thumbnail={`${withPrefix('/')}img/thumbnails/cooking_show.jpg`}
                  />
              </Postcard> 
            </Positioner> 
)
,    ({sectionIndex, dimensions, setContainerCss}) => {
    return(
      <React.Fragment>
        <Parallax speed="-4" dimensions={dimensions}>
              <div css={css(`
                width: calc(100% - 3.5vh);
                max-width: calc((100vh - 40px - 7vh) / (802 / 1549));
                position: relative;
                background: #265231;
                border-radius: 2.1vw;

                &:after{
                  content: "";
                  display: block;
                  padding-top: calc(100% / (1549 / 802));
                }
              `)}>
                <CanvasBlend use="maskInverse" color={[20,20,20]} css={css(`
                  position: absolute;
                  bottom:.2vw;
                  left:.2vw;
                  width: 119.121447028%;
                `)}>
                  <img src={`${withPrefix('/')}img/tv.jpg`} alt=""/>
                </CanvasBlend>
                <VideoPlayer
                  /* chat noir multicam cooking  */
                  videoIds={["y-CQeCRA0mU", "p0Oi-M1ltlI"]}
                  thumbnail={`${withPrefix('/')}img/thumbnails/00_Chat-Noir-Multicam-cooking-v1.jpg`}
                  css={css(`
                    position: absolute;
                    bottom: 9.25%;
                    left: 5.25%;
                    width: 75%;
                  `)}
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
                    videoIds={["ZsjrIQY16aQ"]}
                    thumbnail={`${withPrefix('/')}img/thumbnails/asshole_streeter.jpg`}
                  />
              </Postcard>  
          </Parallax>
)
,    ({sectionIndex, dimensions, setContainerCss}) => {
    return(
      <React.Fragment>
        <Postcard alt="1" card="1" mask="2">  
        <VideoPlayer
              /* asshole singalong  */
              videoIds={["7Unp0PL2m8Q"]}
              thumbnail={`${withPrefix('/')}img/thumbnails/00_asshole-singalong.jpg`}
            />
        </Postcard> 
      </React.Fragment>
)}
, ({sectionIndex, dimensions, setContainerCss}) => {
  setContainerCss(`min-height: calc(100vh - 40px);`)
    return(
  <React.Fragment>
            <Link to="/berlin" css={css(`
              display: flex;
              justify-content: center;
              align-items: center;
              font-family: 'IM Fell Double Pica', serif;
              font-weight: bold;
              text-rendering: optimizeLegibility;
              font-size: 1.8746rem;
              line-height: 1.1;
              @media screen and (max-width: 600px){
                flex-direction: column;
              }
          `)}  >
                <video css={css(`
                  border-radius: 50%; 
                  width: 200px;
                  mask-image: url('${withPrefix('/')}img/cookie_mask.png');
                  mask-size: 100% 100%;
                `)} autoPlay muted loop src={`${withPrefix('/')}img/john-runs.mp4`} />
                <img 
                src={`${withPrefix('/')}img/paris_see-you.png`} 
                alt="See you in Berlin"
                
                css={css(`width: 365px; max-width: 90%; display: block;`)} />
          </Link>
  </React.Fragment>
)}
]

export const ParisTemplate = ({
  description,
  title,
  helmet
}) => {
  return (
    <div className={"Paris"}>
      {helmet || ''}
      <ScrollSections sections={pages} />
    </div>
  )
}

ParisTemplate.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const Paris = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <ParisTemplate
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

Paris.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default Paris

export const pageQuery = graphql`
  query Paris($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        description
      }
    }
  }
`
