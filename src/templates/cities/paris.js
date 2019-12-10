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

const updateFunction = (prevProps, nextProps) => {
    if (prevProps.active !== nextProps.active) {
      return false
    }

    // if (
    //     prevProps.foregroundPortal !== nextProps.foregroundPortal ||
    //     prevProps.backgroundPortal !== nextProps.backgroundPortal ||
    //     prevProps.registerAnimation !== nextProps.registerAnimation
    // ) {
    //   return false 
    // }

    return true
}

const pages = [
React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    // const bgLength = 6;
    // const bgLength = pages.length;

    useEffect(() => {
      registerAnimation({
        key: ".ScrollSections__background",
        sectionIndex: 0, 
        tween: () => TweenMax.to(".ScrollSections__background", 1, {y: '-' + (40 / ((40 + 100)/100)) + '%', ease: "Linear.easeNone"}),
        persist: 'all', 
      });
    }, []);

    return (
    <React.Fragment>
      <FixedPortal target={backgroundPortal}>
        <div 
         className="ScrollSections__background"
         style={{
           backgroundImage: "url(" + `${withPrefix('/')}img/paris.jpg` + ")",
           // height: (40 + 100) + "%"
           height: (40 + 100) + "vh"
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
  )}
, updateFunction), React.memo(
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
        <FixedPortal target={midgroundPortal}> 

            <VideoPlayer
              /* kitty litter */
              videoId="ZS8zlMNmTEU"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next", 0)}
            />
            
        </FixedPortal>
      </React.Fragment>
)}, updateFunction), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <CanvasBlend use="multiply" style={{maxWidth: '100%'}}><img src={`${withPrefix('/')}img/parismap.jpg`} alt=""/></CanvasBlend>
      </React.Fragment>
)}, updateFunction), React.memo(({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => (
          <FixedPortal target={midgroundPortal}>
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
          </FixedPortal>
), updateFunction), React.memo(({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => (
          <FixedPortal target={midgroundPortal}>
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
          </FixedPortal>
), updateFunction), React.memo(
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
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              /* Strongman chat noir */
              videoId="reWxXdcKJoI"
              fullscreen
              active={active}
              captions={true}
              onEnd={() => scrollTo("next")}
            />
            
        </FixedPortal>
      </React.Fragment>
)}, updateFunction), React.memo(({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => (
          <FixedPortal target={midgroundPortal}>
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
          </FixedPortal>
), updateFunction), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {
    return(
      <React.Fragment>
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              /* le mirilton */
              videoId="takA-zY-Tn8"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
        </FixedPortal>
      </React.Fragment>
)}, updateFunction), React.memo(({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => (
       <React.Fragment>
        <CanvasBlend use="multiply" style={{marginRight: "auto"}}><img src={`${withPrefix('/')}img/paris_bruant.jpg`} alt="" /></CanvasBlend>
        <FixedPortal target={midgroundPortal}>
          <div className={"Panel Transition--slow-fade" + (active ? " isActive" : "")}>
            <div className="fullscreenQuote">
                <figure className="quote">
                   <q>Passers-by stop and stare: ‘who the devil is that fellow?’ The answer’s simple. He is Montmartre. Montmartre personified, Montmartre, alias Aristide Bruant.</q>
                   <figcaption>&mdash;&ensp;Playwright and editor of Le Mirliton’s journal, Georges Courteline,on Bruant</figcaption>
                </figure>
            </div>
            <div className="bigborder"></div>
          </div>
        </FixedPortal>
       </React.Fragment>
), updateFunction), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <Curtains 
          registerAnimation={registerAnimation}
          sectionIndex={sectionIndex}
          activeIndex={activeIndex}
          foregroundPortal={foregroundPortal}
          backgroundPortal={backgroundPortal}
          persist={5}
        />
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              /* musee montmatre */
              videoId="j9ieAAvYpJU"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
            
        </FixedPortal>
      </React.Fragment>
)}, updateFunction), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              /* interview with julia */
              videoId="xxx"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
        </FixedPortal>
      </React.Fragment>
)}, updateFunction), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              /* strongman lapin agile */
              videoId="HmHbXzvqRpk"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
        </FixedPortal>
      </React.Fragment>
)}, updateFunction), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              /* lapin agile interview */
              videoId="ubFSIFzFLs8"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
        </FixedPortal>
      </React.Fragment>
)}, updateFunction), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {
    return(
      <React.Fragment>
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              /* other minor cabarets */
              videoId="vPX40vnxS6g"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
        </FixedPortal>
      </React.Fragment>
)}, updateFunction), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {
    return(
      <React.Fragment>
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              /* Edith Piaf’s grave site */
              videoId="lqsW1FCVi_M"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
        </FixedPortal>
      </React.Fragment>
)}, updateFunction), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {
    return(
      <React.Fragment>
        <FixedPortal target={midgroundPortal}>
          <div className={"Panel Transition--fade" + (active ? " isActive" : "")}>
          <CanvasBlend use="multiply" style={{marginLeft: "auto", maxWidth: "600px"}}><img src={`${withPrefix('/')}img/paris_bricktop.jpg`} alt="" /></CanvasBlend>
          <CanvasBlend use="multiply" style={{marginLeft: "auto", maxWidth: "600px"}}><img src={`${withPrefix('/')}img/paris_josephine2.jpg`} alt="" /></CanvasBlend>
          </div>
        </FixedPortal>
        <div className="Paper" style={{transform: 'rotate(-1deg)', maxWidth: '400px'}}><p>In the 1920s and 30s, a flood of expats in Paris created both a stream of American entertainers and American ex-pats who would flock to establishments with American artists (as did the French). A huge part of the reason was jazz’s rapid advance around the world.</p> <p>In particular, African American artists who could not perform in front of integrated audiences at home and who were appalled and exhausted at their treatment in America found refuge in Paris. This cross-cultural exchange would have a lasting impact on cabaret in both Paris and America (and also in Berlin which was not immune to the influence of Josephine Baker).</p></div>
      </React.Fragment>
)}, updateFunction), React.memo(({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => (
      <React.Fragment>
        <CanvasBlend use="multiply" style={{marginLeft: "auto", maxWidth: "600px"}}><img src={`${withPrefix('/')}img/paris_josephine.jpg`} alt="" /></CanvasBlend>
        <FixedPortal target={midgroundPortal}>
          <div className={"Panel Transition--slow-fade" + (active ? " isActive" : "")}>
            <div className="fullscreenQuote">
                <figure className="quote">
                   <q>One day I realized I was living in a country where I was afraid to be black. It was only a country for white people. Not black. So I left. I had been suffocating in the United States… A lot of us left, not because we wanted to leave, but because we couldn’t stand it anymore… I felt liberated in Paris.</q>
                   <figcaption>&mdash;&ensp;Josephine Baker</figcaption>
                </figure>
            </div>
            <div className="bigborder"></div>
          </div>
        </FixedPortal>
      </React.Fragment>
), updateFunction), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <FixedPortal target={midgroundPortal}> 
          <div className={"Panel Transition--fade" + (active ? " isActive" : "")}>
            <div className="DecollageBorder">
              <img src={`${withPrefix('/')}img/paris_decollage2.jpg`} alt="" className="DecollageBorder__img" />
              <VideoPlayer
                /*Edith piaf chanson realiste*/
                videoId="uOiQOKthi7g"
                active={active}
                onEnd={() => scrollTo("next")}
              />
            </div>
          </div>


            
        </FixedPortal>
      </React.Fragment>
)}, updateFunction)
// , React.memo(
//   ({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {

//     return(
//       <React.Fragment>
//         <FixedPortal target={midgroundPortal}> 
//             <VideoPlayer
//               videoId="xxx"
//               fullscreen
//               sectionIndex={sectionIndex}
//               activeIndex={activeIndex}
//               onEnd={() => scrollTo("next")}
//             />
//         </FixedPortal>
//       </React.Fragment>
// )})
, React.memo(({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => (
          <FixedPortal target={midgroundPortal}>
            <div className={"Panel Transition--fade" + (active ? " isActive" : "")}>
              <div className="videoborder">
                <div className="videoborder__border">
                <img className="videoborder__img videoborder__img--alt3" src={`${withPrefix('/')}img/card.jpg`} alt="" /></div>
                <VideoPlayer
                    videoId="vrvVpZsKVYk"
                    active={active}
                    onEnd={() => scrollTo("next")}
                  />
              </div>  
            </div>    
          </FixedPortal>
), updateFunction), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <Curtains 
          registerAnimation={registerAnimation}
          sectionIndex={sectionIndex}
          activeIndex={activeIndex}
          foregroundPortal={foregroundPortal}
          backgroundPortal={backgroundPortal}
          persist={6}
        />
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              /* interview with gosia  */
              videoId="uUspDjAhVSo"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
            
        </FixedPortal>
      </React.Fragment>
)}, updateFunction), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              /* Interview with Michel from Vieux Belleville   */
              videoId="az8ftb3NgNw"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
        </FixedPortal>
      </React.Fragment>
)}, updateFunction), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <FixedPortal target={midgroundPortal}> 
            <div className={"Panel Transition--fade" + (active ? " isActive" : "")}>
              <img className="Interstitial" src={`${withPrefix('/')}img/paris_aumagique.png`} alt="" />
            </div>
        </FixedPortal>
      </React.Fragment>
)}, updateFunction), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              /* Interview_Natalie_au Magique */
              videoId="jS34OY5LCk0"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
        </FixedPortal>
      </React.Fragment>
)}, updateFunction), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              /* martine au magique */
              videoId="5sS94fQ0zRo"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
        </FixedPortal>
      </React.Fragment>
)}, updateFunction), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              /* strongman divan japanois */
              videoId="_7kQh0ot5Kc"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
        </FixedPortal>
      </React.Fragment>
)}, updateFunction), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              /* interview with Monsieur K */
              videoId="xxx"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
        </FixedPortal>
      </React.Fragment>
)}, updateFunction), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
      <div className="Panel Panel--padded">
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
      </React.Fragment>
)}, updateFunction), React.memo(
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
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              /* strongman limonaire */
              videoId="2UTO67pYjpU"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
        </FixedPortal>
      </React.Fragment>
)}, updateFunction), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              /* limonaire interview with closing */
              videoId="NHC-gkfr61Y"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
        </FixedPortal>
      </React.Fragment>
)}, updateFunction), React.memo(({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => (
          <FixedPortal target={midgroundPortal}>
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
          </FixedPortal>
), updateFunction), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <FixedPortal target={midgroundPortal}> 
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


            
        </FixedPortal>
      </React.Fragment>
)}, updateFunction), React.memo(({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => (
          <FixedPortal target={midgroundPortal}>
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
          </FixedPortal>
), updateFunction), React.memo(
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
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              /* asshole singalong  */
              videoId="7Unp0PL2m8Q"
              fullscreen
              active={active}
              onEnd={() => scrollTo("next")}
            />
            
        </FixedPortal>
      </React.Fragment>
)}, updateFunction), React.memo(({registerAnimation, scrollTo, sectionIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => (
        <FixedPortal target={midgroundPortal}>
          <div className="Panel " >
              <div className={"Transition--slow-fade" + (active ? " isActive" : "") }>
                See you in Berlin!
              </div>
          </div>
        </FixedPortal>
), updateFunction)
]


export default pages;
