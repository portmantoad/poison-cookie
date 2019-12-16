import React, { useEffect } from 'react'
import VideoPlayer from '../../components/VideoPlayer'
import FixedPortal from '../../components/FixedPortal'
import CanvasBlend from '../../components/CanvasBlend'
import Curtains from '../../components/Curtains'
import Slideshow from '../../components/Slideshow'
import { clamp } from 'lodash'
import TweenMax from 'TweenMax'
import TimelineMax from 'TimelineMax'
import { withPrefix } from 'gatsby'

// import debounceRender from 'react-debounce-render'
import debounceActiveRender from '../../components/debounceActiveRender'

const pages = [
({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    // const bgLength = 6;
    // const bgLength = pages.length;

    useEffect(() => {
      registerAnimation({
        key: ".ScrollSections__background",
        sectionIndex: 0, 
        tween: () => TweenMax.to(".ScrollSections__background", 1, {y: '-' + (60 / ((60 + 100)/100)) + '%', ease: "Linear.easeNone"}),
        persist: 'all', 
      });
    }, []);

    return (
    <React.Fragment>
      <FixedPortal target={backgroundPortal}>
        <img src={`${withPrefix('/')}img/curtain.png`} alt="" className="visuallyhidden" /> 
        <div 
         className="ScrollSections__background"
         style={{
           backgroundImage: "url(" + `${withPrefix('/')}img/paris.jpg` + ")",
           // height: (60 + 100) + "%"
           height: (60 + 100) + "vh"
         }}></div>
      </FixedPortal>

      <CanvasBlend use="multiply" style={{maxWidth: '40%', marginLeft: 'auto'}}><img src={`${withPrefix('/')}img/gentlemen.jpg`} alt=""/></CanvasBlend>

      <FixedPortal target={foregroundPortal}>
        <div className={"Panel Transition--fade" + (active ? " isActive" : "")}
        style={{flexDirection: "column"}}>
          <img src={`${withPrefix('/')}img/bienvenue-a-paris.png`} alt="" className="welcomeToParis" />
          <div className="videoborder">
            <div className="videoborder__border">
            <img className="videoborder__img" src={`${withPrefix('/')}img/card.jpg`} alt="" /></div>
            <VideoPlayer
                videoId="qdU_IKxIhAk"
                active={active}
                onEnd={() => scrollTo("next")}
              />
          </div>  
        </div>    
      </FixedPortal>
    </React.Fragment>
  )}, 
  ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <Curtains 
          registerAnimation={registerAnimation}
          sectionIndex={sectionIndex}
          activeIndex={activeIndex}
          foregroundPortal={foregroundPortal}
          backgroundPortal={backgroundPortal}
          persist={0}
        />
        <div className={"Panel Transition--curtain-delay Transition--fade" + (active ? " isActive" : "")}>

            <VideoPlayer
              /* kitty litter */
              videoId="ZS8zlMNmTEU"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next", 0)}
            />
            
        </div>
      </React.Fragment>
)}, 
  ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <CanvasBlend use="multiply" style={{maxWidth: '100%'}}><img src={`${withPrefix('/')}img/parismap.jpg`} alt=""/></CanvasBlend>
      </React.Fragment>
)}, ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => (
          <div className="Panel">
            <div className={"Panel Panel--padded Transition--fade" + (active ? " isActive" : "")} style={{flexDirection: 'column'}}>
              <Slideshow 
                registerAnimation={registerAnimation}
                sectionIndex={sectionIndex}
                style={{minWidth: '300px'}}
                // backgroundFill
              >
                <CanvasBlend use="multiplyBW"><img src={`${withPrefix('/')}img/cabaret_1.jpg`} alt="" /></CanvasBlend>
                <CanvasBlend use="multiplyBW"><img src={`${withPrefix('/')}img/cabaret_2.jpg`} alt="" /></CanvasBlend>
                <CanvasBlend use="multiplyBW"><img src={`${withPrefix('/')}img/cabaret_3.jpg`} alt="" /></CanvasBlend>
                <CanvasBlend use="multiplyBW"><img src={`${withPrefix('/')}img/cabaret_4.jpg`} alt="" /></CanvasBlend>
                <CanvasBlend use="multiplyBW"><img src={`${withPrefix('/')}img/cabaret_5.jpg`} alt="" /></CanvasBlend>
              </Slideshow>
              <div style={{marginTop: "10px"}}>The faces of cabaret in old Paris</div>
            </div>
          </div>
), ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => (
          <div className="Panel">
            <div className={"Panel Transition--fade" + (active ? " isActive" : "")}>
              <div className="videoborder">
                <div className="videoborder__border">
                <img className="videoborder__img videoborder__img--mask2" src={`${withPrefix('/')}img/card2.jpg`} alt="" /></div>
                <VideoPlayer
                    videoId="LkdWOkpCuTw"
                    active={active}
                    onEnd={() => scrollTo("next")}
                  />
              </div>  
            </div>    
          </div>
), 
  ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <Curtains 
          registerAnimation={registerAnimation}
          sectionIndex={sectionIndex}
          activeIndex={activeIndex}
          foregroundPortal={foregroundPortal}
          backgroundPortal={backgroundPortal}
          persist={0}
        />
        <div className={"Panel Transition--curtain-delay Transition--fade" + (active ? " isActive" : "")}>
            <VideoPlayer
              /* Strongman chat noir */
              videoId="T6nNI2Nw9a0"
              fullscreen
              active={active}
              captions={true}
              onEnd={() => scrollTo("next")}
            />
            
        </div>
      </React.Fragment>
)}, ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => (
          <div className="Panel">
            <div className={"Panel Transition--fade whereAreTheyNow" + (active ? " isActive" : "")}>
            <div className="whereAreTheyNow__title">
              <h2>Où sont-ils maintenant?</h2>
              <span>(Where are they now?)</span>
            </div>
              <Slideshow 
                registerAnimation={registerAnimation}
                sectionIndex={sectionIndex}
                // backgroundFill
              >
                <img src={`${withPrefix('/')}img/paris_famouspeople_toulouselautrec.jpg`} alt="" />
                <img src={`${withPrefix('/')}img/paris_famouspeople_willette.jpg`} alt="" />
                <img src={`${withPrefix('/')}img/paris_famouspeople_andregill.jpg`} alt="" />
                <img src={`${withPrefix('/')}img/paris_famouspeople_bruant.jpg`} alt="" />
                <img src={`${withPrefix('/')}img/paris_famouspeople_claudedebussy.jpg`} alt="" />
                <img src={`${withPrefix('/')}img/paris_famouspeople_ericsatie.jpg`} alt="" />
                <img src={`${withPrefix('/')}img/paris_famouspeople_janeavril.jpg`} alt="" />
              </Slideshow>
            </div>
          </div>
), 
  ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => {
    return(
      <React.Fragment>
        <div className={"Panel Transition--fade" + (active ? " isActive" : "")}>
            <VideoPlayer
              /* le mirilton */
              videoId="takA-zY-Tn8"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
        </div>
      </React.Fragment>
)}, ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => (
       <React.Fragment>
        <CanvasBlend use="multiply" style={{marginRight: "auto"}}><img src={`${withPrefix('/')}img/paris_bruant.jpg`} alt="" /></CanvasBlend>
        <div className="Panel">
          <div className={"Panel Transition--slow-fade" + (active ? " isActive" : "")}>
            <div className="fullscreenQuote">
                <figure className="quote">
                   <q>Those who have come to the world with a silver spoon in their mouths, I revenge myself in insulting them, in treating them worse than dogs. That makes them laugh to tears; they believe I joke when, often enough, it is a breeze from the past, miseries submitted to, dirtiness seen, which remounts on my lips and makes me speak as I do.</q>
                   <figcaption>&mdash;&ensp;Aristide Bruant (translated by Richard D. Sonne)</figcaption>
                </figure>
            </div>
            <div className="bigborder"></div>
          </div>
        </div>
       </React.Fragment>
), 
  ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <div className={"Panel Transition--fade" + (active ? " isActive" : "")}>
            <VideoPlayer
              /* musee montmatre */
              videoId="j9ieAAvYpJU"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
            
        </div>
      </React.Fragment>
)}, 
  ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <div className={"Panel Transition--fade" + (active ? " isActive" : "")}>
            <VideoPlayer
              /* interview with julia */
              videoId="sKxtbvayB50"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
          "Visit the Musee Montmartre in person or virtually!" - https://museedemontmartre.fr/en/
        </div>

      </React.Fragment>
)}, 
  ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <Curtains 
          registerAnimation={registerAnimation}
          sectionIndex={sectionIndex}
          activeIndex={activeIndex}
          foregroundPortal={foregroundPortal}
          backgroundPortal={backgroundPortal}
          persist={1}
        />
        <div className={"Panel Transition--curtain-delay Transition--fade" + (active ? " isActive" : "")}>
            <VideoPlayer
              /* strongman lapin agile */
              videoId="-995ptoiNjw"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
        </div>
      </React.Fragment>
)}, 
  ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <div className={"Panel Transition--curtain-delay Transition--fade" + (active ? " isActive" : "")}>
            <VideoPlayer
              /* lapin agile interview */
              videoId="ubFSIFzFLs8"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
        </div>
      </React.Fragment>
)}, 
  ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => {
    return(
      <React.Fragment>
         <CanvasBlend use="multiply" style={{maxWidth: '100%'}}><img src={`${withPrefix('/')}img/parismap.jpg`} alt=""/></CanvasBlend>
      </React.Fragment>
)}, 
  ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => {
    return(
      <React.Fragment>
        <div className={"Panel Transition--fade" + (active ? " isActive" : "")}>
            <VideoPlayer
              /* other minor cabarets */
              videoId="bysHS5IqVdI"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
        </div>
      </React.Fragment>
)}, 
  ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => {
    return(
      <React.Fragment>
        <div className={"Panel Transition--fade" + (active ? " isActive" : "")}>
            <VideoPlayer
              /* other minor cabarets 2 */
              videoId="jRouAXIvDrw"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
        </div>
      </React.Fragment>
)}, ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => (
          <div className="Panel">
            <div className={"Panel Panel--padded Transition--fade" + (active ? " isActive" : "")} style={{flexDirection: 'column'}}>
              <Slideshow 
                registerAnimation={registerAnimation}
                sectionIndex={sectionIndex}
                style={{minWidth: '300px'}}
                // backgroundFill
              >
                <CanvasBlend use="multiplyBW"><img src={`${withPrefix('/')}img/cabaret_1.jpg`} alt="" /></CanvasBlend>
                <CanvasBlend use="multiplyBW"><img src={`${withPrefix('/')}img/cabaret_2.jpg`} alt="" /></CanvasBlend>
                <CanvasBlend use="multiplyBW"><img src={`${withPrefix('/')}img/cabaret_3.jpg`} alt="" /></CanvasBlend>
                <CanvasBlend use="multiplyBW"><img src={`${withPrefix('/')}img/cabaret_4.jpg`} alt="" /></CanvasBlend>
                <CanvasBlend use="multiplyBW"><img src={`${withPrefix('/')}img/cabaret_5.jpg`} alt="" /></CanvasBlend>
              </Slideshow>
              <div style={{marginTop: "10px"}}>The faces of cabaret in old Paris</div>
            </div>
          </div>
), 
  ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => {
    return(
      <React.Fragment>
        <Curtains 
          registerAnimation={registerAnimation}
          sectionIndex={sectionIndex}
          activeIndex={activeIndex}
          foregroundPortal={foregroundPortal}
          backgroundPortal={backgroundPortal}
          persist={0}
        />
        <div className={"Panel Transition--curtain-delay Transition--fade" + (active ? " isActive" : "")}>
            <VideoPlayer
              /* Edith Piaf’s grave site */
              videoId="lqsW1FCVi_M"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
        </div>
      </React.Fragment>
)}, 
  ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => {
    return(
      <React.Fragment>
        <div className="Panel">
          <div className={"Panel Transition--fade" + (active ? " isActive" : "")}>
          <CanvasBlend use="multiply" style={{marginLeft: "auto", maxWidth: "600px"}}><img src={`${withPrefix('/')}img/paris_bricktop.jpg`} alt="" /></CanvasBlend>
          <CanvasBlend use="multiply" style={{marginLeft: "auto", maxWidth: "600px"}}><img src={`${withPrefix('/')}img/paris_josephine2.jpg`} alt="" /></CanvasBlend>
          </div>
        </div>
        <div className="Paper" style={{transform: 'rotate(-1deg)', maxWidth: '400px'}}><p>In the 1920s and 30s, a flood of expats in Paris created both a stream of American entertainers and American ex-pats who would flock to establishments with American artists (as did the French). A huge part of the reason was jazz’s rapid advance around the world.</p> <p>In particular, African American artists who could not perform in front of integrated audiences at home and who were appalled and exhausted at their treatment in America found refuge in Paris. This cross-cultural exchange would have a lasting impact on cabaret in both Paris and America (and also in Berlin which was not immune to the influence of Josephine Baker).</p></div>
      </React.Fragment>
)}, ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => (
      <React.Fragment>
        <CanvasBlend use="multiply" style={{marginLeft: "auto", maxWidth: "600px"}}><img src={`${withPrefix('/')}img/paris_josephine.jpg`} alt="" /></CanvasBlend>
        <div className="Panel">
          <div className={"Panel Transition--slow-fade" + (active ? " isActive" : "")}>
            <div className="fullscreenQuote">
                <figure className="quote">
                   <q>One day I realized I was living in a country where I was afraid to be black. It was only a country for white people. Not black. So I left. I had been suffocating in the United States… A lot of us left, not because we wanted to leave, but because we couldn’t stand it anymore… I felt liberated in Paris.</q>
                   <figcaption>&mdash;&ensp;Josephine Baker</figcaption>
                </figure>
            </div>
            <div className="bigborder"></div>
          </div>
        </div>
      </React.Fragment>
), 
  ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <div className={"Panel Transition--fade" + (active ? " isActive" : "")}>
          <div className={"Panel Transition--fade" + (active ? " isActive" : "")}>
            <div className="DecollageBorder">
              <img src={`${withPrefix('/')}img/paris_decollage2.jpg`} alt="" className="DecollageBorder__img" />
              <VideoPlayer
                /*Edith piaf chanson realiste*/
                videoId="Sp0oggT2IjY"
                active={active}
                onEnd={() => scrollTo("next")}
              />
            </div>
          </div>


            
        </div>
      </React.Fragment>
)}
// , 
//   ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => {

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
, ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => (
      <React.Fragment>
        <Curtains 
          registerAnimation={registerAnimation}
          sectionIndex={sectionIndex}
          activeIndex={activeIndex}
          foregroundPortal={foregroundPortal}
          backgroundPortal={backgroundPortal}
          persist={1}
        />
        <div className={"Panel Transition--curtain-delay Transition--fade" + (active ? " isActive" : "")}>                
          <VideoPlayer
            /* Streeter [parc] */
            videoId="vrvVpZsKVYk"
            fullscreen
            active={active}
            onEnd={() => scrollTo("next")}
          />
        </div>  
      </React.Fragment>
), 
  ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <div className={"Panel Transition--curtain-delay Transition--fade" + (active ? " isActive" : "")}>
            <VideoPlayer
              /* interview with gosia  */
              videoId="VxGeGeKUaU0"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
        </div>
      </React.Fragment>
)}, 
  ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <div className={"Panel Transition--fade" + (active ? " isActive" : "")}>
            <VideoPlayer
              /* Interview with Michel from Vieux Belleville   */
              videoId="az8ftb3NgNw"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
        </div>
      </React.Fragment>
)}, 
  ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <Curtains 
          registerAnimation={registerAnimation}
          sectionIndex={sectionIndex}
          activeIndex={activeIndex}
          foregroundPortal={foregroundPortal}
          backgroundPortal={backgroundPortal}
          persist={2}
        />
        <div className={"Panel Transition--curtain-delay Transition--fade" + (active ? " isActive" : "")}>
              <CanvasBlend use="screenBW" className="Interstitial"> 
                <img src={`${withPrefix('/')}img/paris_aumagique.png`} alt=""/>
              </CanvasBlend>
        </div>
      </React.Fragment>
)}, 
  ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <div className={"Panel Transition--curtain-delay Transition--fade" + (active ? " isActive" : "")}>
            <VideoPlayer
              /* Interview_Natalie_au Magique */
              videoId="jS34OY5LCk0"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
        </div>
      </React.Fragment>
)}, 
  ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <div className={"Panel Transition--curtain-delay Transition--fade" + (active ? " isActive" : "")}>
            <VideoPlayer
              /* martine au magique */
              videoId="5sS94fQ0zRo"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
        </div>
      </React.Fragment>
)}, 
  ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <div className={"Panel Transition--fade" + (active ? " isActive" : "")}>
            <VideoPlayer
              /* strongman divan japanois */
              videoId="_7kQh0ot5Kc"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
        </div>
      </React.Fragment>
)}, 
  ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <div className={"Panel Transition--fade" + (active ? " isActive" : "")}>
            interview with Monsieur K
        </div>
      </React.Fragment>
)}, 
  ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <div className={"Panel Transition--fade Panel--padded" + (active ? " isActive" : "")}>
        <div style={{flexGrow: 1, paddingRight: '3.5vw'}}>
              <VideoPlayer
                /* music video partial song */
                videoId="RnyJ8nwcuOE"
                // fullscreen
                active={active}
                onEnd={() => scrollTo("next")}
              />
        </div>
        <div className="Paper" style={{maxWidth: "300px", transform: 'rotate(1deg)'}}>
          Madame Arthur is named after a song by one of fin-de-siecle’s most famous chanteuses: Yvette Guilbert. Guilbert Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
        </div>
      </div>
)}, 
  ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <Curtains 
          registerAnimation={registerAnimation}
          sectionIndex={sectionIndex}
          activeIndex={activeIndex}
          foregroundPortal={foregroundPortal}
          backgroundPortal={backgroundPortal}
          persist={1}
        />
        <div className={"Panel Transition--curtain-delay Transition--fade" + (active ? " isActive" : "")}>
            <VideoPlayer
              /* strongman limonaire */
              videoId="2UTO67pYjpU"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
        </div>
      </React.Fragment>
)}, 
  ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <div className={"Panel Transition--curtain-delay Transition--fade" + (active ? " isActive" : "")}>
            <VideoPlayer
              /* limonaire interview with closing */
              videoId="NHC-gkfr61Y"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
        </div>
      </React.Fragment>
)}, ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => (
          <div className="Panel">
            <div className={"Panel Transition--fade" + (active ? " isActive" : "")}>
              <div className="videoborder">
                <div className="videoborder__border">
                <img className="videoborder__img videoborder__img--mask2 videoborder__img--alt3" src={`${withPrefix('/')}img/card.jpg`} alt="" /></div>
                <VideoPlayer
                    videoId="1T1T3coj6BI"
                    active={active}
                    onEnd={() => scrollTo("next")}
                  />
              </div>  
            </div>    
          </div>
), 
  ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <div className={"Panel Transition--fade" + (active ? " isActive" : "")}>
          <div className={"Panel Transition--fade" + (active ? " isActive" : "")}>
            <div className="TVborder">
              <CanvasBlend use="maskInverse" color={[122,95,70]} className="TVborder__img">
                <img src={`${withPrefix('/')}img/tv.jpg`} alt=""/>
              </CanvasBlend>
              <VideoPlayer
                /* chat noir multicam cooking  */
                videoId="HzUIUTatyZI"
                active={active}
                onEnd={() => scrollTo("next")}
              />
            </div>
          </div>


            
        </div>
      </React.Fragment>
)}, ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => (
          <div className="Panel">
            <div className={"Panel Transition--fade" + (active ? " isActive" : "")}>
              <div className="videoborder">
                <div className="videoborder__border">
                <img className="videoborder__img videoborder__img--alt1" src={`${withPrefix('/')}img/card2.jpg`} alt="" /></div>
                <VideoPlayer
                    videoId="ZsjrIQY16aQ"
                    active={active}
                    onEnd={() => scrollTo("next")}
                  />
              </div>  
            </div>    
          </div>
), 
  ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <Curtains 
          registerAnimation={registerAnimation}
          sectionIndex={sectionIndex}
          activeIndex={activeIndex}
          foregroundPortal={foregroundPortal}
          backgroundPortal={backgroundPortal}
          persist={0}
        />
        <div className={"Panel Transition--curtain-delay Transition--fade" + (active ? " isActive" : "")}>
            <VideoPlayer
              /* asshole singalong  */
              videoId="7Unp0PL2m8Q"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
            
        </div>
      </React.Fragment>
)}, ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => (
        <div className="Panel">
          <div className="Panel " >
              <div className={"Transition--slow-fade" + (active ? " isActive" : "") }>
                See you in Berlin!
              </div>
          </div>
        </div>
)
]

const updateFunction = (prevProps, nextProps) => {
    if (prevProps.active !== nextProps.active) {
      return false
    }

    if (
        prevProps.foregroundPortal !== nextProps.foregroundPortal ||
        prevProps.backgroundPortal !== nextProps.backgroundPortal ||
        prevProps.registerAnimation !== nextProps.registerAnimation
    ) {
      return false 
    }

    return true
}


const namedPages = pages.map((page, i) => {
  return debounceActiveRender(React.memo(page, updateFunction), 500, { leading: false })
})


export default namedPages;
