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

const pages = [
React.memo(
  ({registerAnimation, scrollTo, sectionIndex, activeIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {

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
            <div className="videoborder__border"><img src={`${withPrefix('/')}img/card.jpg`} alt="" /></div>
            <VideoPlayer
                videoId="qdU_IKxIhAk"
                sectionIndex={sectionIndex}
                activeIndex={activeIndex}
                onEnd={() => scrollTo("next")}
              />
          </div>  
        </div>    
      </FixedPortal>
    </React.Fragment>
  )}
), React.memo(
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
              sectionIndex={sectionIndex}
              activeIndex={activeIndex}
              onEnd={() => scrollTo("next", 0)}
            />
            
        </FixedPortal>
      </React.Fragment>
)}), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, active, activeIndex, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <CanvasBlend use="multiply" style={{maxWidth: '100%'}}><img src={`${withPrefix('/')}img/parismap.jpg`} alt=""/></CanvasBlend>
      </React.Fragment>
)}), React.memo(({registerAnimation, scrollTo, sectionIndex, activeIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => (
          <FixedPortal target={midgroundPortal}>
            <div className={"Panel Panel--padded Transition--fade" + (active ? " isActive" : "")}>
              <div>The faces of cabaret in old Paris: </div>
              <Slideshow 
                registerAnimation={registerAnimation}
                sectionIndex={sectionIndex}
                // style={{flexGrow: 1}}
                // backgroundFill
              >
                <CanvasBlend use="multiplyBW"><img src={`${withPrefix('/')}img/cabaret_1.jpg`} alt="" /></CanvasBlend>
                <CanvasBlend use="multiplyBW"><img src={`${withPrefix('/')}img/cabaret_2.jpg`} alt="" /></CanvasBlend>
                <CanvasBlend use="multiplyBW"><img src={`${withPrefix('/')}img/cabaret_3.jpg`} alt="" /></CanvasBlend>
                <CanvasBlend use="multiplyBW"><img src={`${withPrefix('/')}img/cabaret_4.jpg`} alt="" /></CanvasBlend>
                <CanvasBlend use="multiplyBW"><img src={`${withPrefix('/')}img/cabaret_5.jpg`} alt="" /></CanvasBlend>
              </Slideshow>
            </div>
          </FixedPortal>
)), React.memo(({registerAnimation, scrollTo, sectionIndex, activeIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => (
          <FixedPortal target={midgroundPortal}>
            <div className={"Panel Transition--fade" + (active ? " isActive" : "")}>
              <div className="videoborder">
                <div className="videoborder__border"><img src={`${withPrefix('/')}img/card.jpg`} alt="" /></div>
                <VideoPlayer
                    videoId="LkdWOkpCuTw"
                    sectionIndex={sectionIndex}
                    activeIndex={activeIndex}
                    onEnd={() => scrollTo("next")}
                  />
              </div>  
            </div>    
          </FixedPortal>
)), React.memo(
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
              sectionIndex={sectionIndex}
              activeIndex={activeIndex}
              captions={true}
              onEnd={() => scrollTo("next")}
            />
            
        </FixedPortal>
      </React.Fragment>
)}), React.memo(({registerAnimation, scrollTo, sectionIndex, activeIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => (
          <FixedPortal target={midgroundPortal}>
            <div className={"Panel Transition--fade" + (active ? " isActive" : "")}>
              <Slideshow 
                registerAnimation={registerAnimation}
                sectionIndex={sectionIndex}
                // backgroundFill
              >
                <CanvasBlend use="screen"><img src={`${withPrefix('/')}img/paris_famouspeople_toulouselautrec.jpg`} alt="" /></CanvasBlend>
                <CanvasBlend use="screen"><img src={`${withPrefix('/')}img/paris_famouspeople_willette.jpg`} alt="" /></CanvasBlend>
                <CanvasBlend use="screen"><img src={`${withPrefix('/')}img/paris_famouspeople_andregill.jpg`} alt="" /></CanvasBlend>
                <CanvasBlend use="screen"><img src={`${withPrefix('/')}img/paris_famouspeople_bruant.jpg`} alt="" /></CanvasBlend>
                <CanvasBlend use="screen"><img src={`${withPrefix('/')}img/paris_famouspeople_claudedebussy.jpg`} alt="" /></CanvasBlend>
                <CanvasBlend use="screen"><img src={`${withPrefix('/')}img/paris_famouspeople_ericsatie.jpg`} alt="" /></CanvasBlend>
                <CanvasBlend use="screen"><img src={`${withPrefix('/')}img/paris_famouspeople_janeavril.jpg`} alt="" /></CanvasBlend>
              </Slideshow>
            </div>
          </FixedPortal>
)), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, activeIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {
    return(
      <React.Fragment>
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              /* le mirilton */
              videoId="takA-zY-Tn8"
              fullscreen
              sectionIndex={sectionIndex}
              activeIndex={activeIndex}
              onEnd={() => scrollTo("next")}
            />
        </FixedPortal>
      </React.Fragment>
)}), React.memo(({registerAnimation, scrollTo, sectionIndex, activeIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => (
       <React.Fragment>
        <CanvasBlend use="multiply" style={{marginRight: "auto"}}><img src={`${withPrefix('/')}img/paris_bruant.jpg`} alt="" /></CanvasBlend>
        <FixedPortal target={midgroundPortal}>
          <div className={"Panel Transition--slow-fade" + (active ? " isActive" : "")}>
            <div className="openingQuote">
                <figure className="quote">
                   <q>Passers-by stop and stare: ‘who the devil is that fellow?’ The answer’s simple. He is Montmartre. Montmartre personified, Montmartre, alias Aristide Bruant.</q>
                   <figcaption>&mdash;&ensp;Playwright and editor of Le Mirliton’s journal, Georges Courteline,on Bruant</figcaption>
                </figure>
            </div>
            <div className="bigborder"></div>
          </div>
        </FixedPortal>
       </React.Fragment>
)), React.memo(
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
              sectionIndex={sectionIndex}
              activeIndex={activeIndex}
              onEnd={() => scrollTo("next")}
            />
            
        </FixedPortal>
      </React.Fragment>
)}), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, activeIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              /* interview with julia */
              videoId="xxx"
              fullscreen
              sectionIndex={sectionIndex}
              activeIndex={activeIndex}
              onEnd={() => scrollTo("next")}
            />
        </FixedPortal>
      </React.Fragment>
)}), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, activeIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              /* strongman lapin agile */
              videoId="HmHbXzvqRpk"
              fullscreen
              sectionIndex={sectionIndex}
              activeIndex={activeIndex}
              onEnd={() => scrollTo("next")}
            />
        </FixedPortal>
      </React.Fragment>
)}), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, activeIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              /* lapin agile interview */
              videoId="ubFSIFzFLs8"
              fullscreen
              sectionIndex={sectionIndex}
              activeIndex={activeIndex}
              onEnd={() => scrollTo("next")}
            />
        </FixedPortal>
      </React.Fragment>
)}), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, activeIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {
    return(
      <React.Fragment>
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              /* other minor cabarets */
              videoId="vPX40vnxS6g"
              fullscreen
              sectionIndex={sectionIndex}
              activeIndex={activeIndex}
              onEnd={() => scrollTo("next")}
            />
        </FixedPortal>
      </React.Fragment>
)}), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, activeIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {
    return(
      <React.Fragment>
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              /* Edith Piaf’s grave site */
              videoId="xxx"
              fullscreen
              sectionIndex={sectionIndex}
              activeIndex={activeIndex}
              onEnd={() => scrollTo("next")}
            />
        </FixedPortal>
      </React.Fragment>
)}), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, activeIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {
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
)}), React.memo(({registerAnimation, scrollTo, sectionIndex, activeIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => (
      <React.Fragment>
        <CanvasBlend use="multiply" style={{marginLeft: "auto", maxWidth: "600px"}}><img src={`${withPrefix('/')}img/paris_josephine.jpg`} alt="" /></CanvasBlend>
        <FixedPortal target={midgroundPortal}>
          <div className={"Panel Transition--slow-fade" + (active ? " isActive" : "")}>
            <div className="openingQuote">
                <figure className="quote">
                   <q>One day I realized I was living in a country where I was afraid to be black. It was only a country for white people. Not black. So I left. I had been suffocating in the United States… A lot of us left, not because we wanted to leave, but because we couldn’t stand it anymore… I felt liberated in Paris.</q>
                   <figcaption>&mdash;&ensp;Josephine Baker</figcaption>
                </figure>
            </div>
            <div className="bigborder"></div>
          </div>
        </FixedPortal>
      </React.Fragment>
)), React.memo(
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
              videoId="xxx"
              fullscreen
              sectionIndex={sectionIndex}
              activeIndex={activeIndex}
              onEnd={() => scrollTo("next")}
            />
            
        </FixedPortal>
      </React.Fragment>
)}), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, activeIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              videoId="xxx"
              fullscreen
              sectionIndex={sectionIndex}
              activeIndex={activeIndex}
              onEnd={() => scrollTo("next")}
            />
        </FixedPortal>
      </React.Fragment>
)}), React.memo(({registerAnimation, scrollTo, sectionIndex, activeIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => (
          <FixedPortal target={midgroundPortal}>
            <div className={"Panel Transition--fade" + (active ? " isActive" : "")}>
              <div className="videoborder">
                <div className="videoborder__border"><img src={`${withPrefix('/')}img/card.jpg`} alt="" /></div>
                <VideoPlayer
                    videoId="vrvVpZsKVYk"
                    sectionIndex={sectionIndex}
                    activeIndex={activeIndex}
                    onEnd={() => scrollTo("next")}
                  />
              </div>  
            </div>    
          </FixedPortal>
)), React.memo(
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
              /* interview with gosia  */
              videoId="xxx"
              fullscreen
              sectionIndex={sectionIndex}
              activeIndex={activeIndex}
              onEnd={() => scrollTo("next")}
            />
            
        </FixedPortal>
      </React.Fragment>
)}), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, activeIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              /* Interview with Michel from Vieux Belleville   */
              videoId="az8ftb3NgNw"
              fullscreen
              sectionIndex={sectionIndex}
              activeIndex={activeIndex}
              onEnd={() => scrollTo("next")}
            />
        </FixedPortal>
      </React.Fragment>
)}), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, activeIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              /* Interview_Natalie_au Magique */
              videoId="jS34OY5LCk0"
              fullscreen
              sectionIndex={sectionIndex}
              activeIndex={activeIndex}
              onEnd={() => scrollTo("next")}
            />
        </FixedPortal>
      </React.Fragment>
)}), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, activeIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              /* martine au magique */
              videoId="5sS94fQ0zRo"
              fullscreen
              sectionIndex={sectionIndex}
              activeIndex={activeIndex}
              onEnd={() => scrollTo("next")}
            />
        </FixedPortal>
      </React.Fragment>
)}), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, activeIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              /* strongman divan japanois */
              videoId="_7kQh0ot5Kc"
              fullscreen
              sectionIndex={sectionIndex}
              activeIndex={activeIndex}
              onEnd={() => scrollTo("next")}
            />
        </FixedPortal>
      </React.Fragment>
)}), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, activeIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              /* interview with Monsieur K */
              videoId="xxx"
              fullscreen
              sectionIndex={sectionIndex}
              activeIndex={activeIndex}
              onEnd={() => scrollTo("next")}
            />
        </FixedPortal>
      </React.Fragment>
)}), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, activeIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
      <div className="Panel Panel--padded">
        <div style={{flexGrow: 1, paddingRight: '3.5vw'}}>
              <VideoPlayer
                /* music video partial song */
                videoId="RnyJ8nwcuOE"
                // fullscreen
                sectionIndex={sectionIndex}
                activeIndex={activeIndex}
                onEnd={() => scrollTo("next")}
              />
        </div>
        <div className="Paper" style={{maxWidth: "300px", transform: 'rotate(1deg)'}}>
          Madame Arthur is named after a song by one of fin-de-siecle’s most famous chanteuses: Yvette Guilbert. Guilbert Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
        </div>
      </div>
      </React.Fragment>
)}), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, activeIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {

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
              sectionIndex={sectionIndex}
              activeIndex={activeIndex}
              onEnd={() => scrollTo("next")}
            />
        </FixedPortal>
      </React.Fragment>
)}), React.memo(
  ({registerAnimation, scrollTo, sectionIndex, activeIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => {

    return(
      <React.Fragment>
        <FixedPortal target={midgroundPortal}> 
            <VideoPlayer
              /* limonaire interview with closing */
              videoId="NHC-gkfr61Y"
              fullscreen
              sectionIndex={sectionIndex}
              activeIndex={activeIndex}
              onEnd={() => scrollTo("next")}
            />
        </FixedPortal>
      </React.Fragment>
)}), React.memo(({registerAnimation, scrollTo, sectionIndex, activeIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => (
          <FixedPortal target={midgroundPortal}>
            <div className={"Panel Transition--fade" + (active ? " isActive" : "")}>
              <div className="videoborder">
                <div className="videoborder__border"><img src={`${withPrefix('/')}img/card.jpg`} alt="" /></div>
                <VideoPlayer
                    videoId="1T1T3coj6BI"
                    sectionIndex={sectionIndex}
                    activeIndex={activeIndex}
                    onEnd={() => scrollTo("next")}
                  />
              </div>  
            </div>    
          </FixedPortal>
)), React.memo(
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
              /* chat noir multicam cooking  */
              videoId="xxx"
              fullscreen
              sectionIndex={sectionIndex}
              activeIndex={activeIndex}
              onEnd={() => scrollTo("next")}
            />
            
        </FixedPortal>
      </React.Fragment>
)}), React.memo(({registerAnimation, scrollTo, sectionIndex, activeIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => (
          <FixedPortal target={midgroundPortal}>
            <div className={"Panel Transition--fade" + (active ? " isActive" : "")}>
              <div className="videoborder">
                <div className="videoborder__border"><img src={`${withPrefix('/')}img/card.jpg`} alt="" /></div>
                <VideoPlayer
                    videoId="ZsjrIQY16aQ"
                    sectionIndex={sectionIndex}
                    activeIndex={activeIndex}
                    onEnd={() => scrollTo("next")}
                  />
              </div>  
            </div>    
          </FixedPortal>
)), React.memo(
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
              sectionIndex={sectionIndex}
              activeIndex={activeIndex}
              onEnd={() => scrollTo("next")}
            />
            
        </FixedPortal>
      </React.Fragment>
)}), React.memo(({registerAnimation, scrollTo, sectionIndex, activeIndex, active, foregroundPortal, backgroundPortal, midgroundPortal}) => (
        <FixedPortal target={midgroundPortal}>
          <div className="Panel " >
              <div className={"Transition--slow-fade" + (active ? " isActive" : "") }>
                See you in Berlin!
              </div>
          </div>
        </FixedPortal>
))
]

export default pages;
