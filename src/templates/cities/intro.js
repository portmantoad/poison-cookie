import React, { useEffect } from 'react'
import VideoPlayer from '../../components/VideoPlayer'
import CanvasBlend from '../../components/CanvasBlend'
import Curtains from '../../components/Curtains'
import Postcard from '../../components/Postcard'
import Parallax from '../../components/Parallax'
import Picture from '../../components/Picture'
import Positioner from '../../components/Positioner'
import Scrim from '../../components/Scrim'
import Clouds from '../../components/Clouds'
import { clamp } from 'lodash'
import { withPrefix, Link } from 'gatsby'

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

export default [

React.memo(
  ({sectionIndex, dimensions, setContainerCss}) => {
    setContainerCss(`min-height: calc((100vh - 40px) * 1.2)`);
    return (
    <React.Fragment>
      <Clouds dimensions={dimensions} />
      <Parallax speed="-2" dimensions={dimensions}>
        <Picture 
          src={`${withPrefix('/')}img/cover-optim.png`} 
          width="100%" 
          height="calc((100vh - 40px) * 1.2)" 
          fit="cover"
          shadow={false}
          x="0.6"
          y="0.25"
          background="transparent"
          css={css(`
            mask-image: url('${withPrefix('/')}img/torn-edge_mask.png');
            mask-size: 100% 100%;
            // max-width: 100vh;
            margin-right: auto;
          `)} />
      </Parallax>
      <Positioner x="0.9" y="0.9" css={css(`height: calc(100vh - 40px); bottom: unset;`)} >
        <img 
          src={`${withPrefix('/')}img/cookietitle.png`} 
          alt="The Poison Cookie Jar"
          
          css={css(`width: 18vw; min-width: 215px; display: block;`)} />
      </Positioner>
    </React.Fragment>
  )}
), 

React.memo(
  ({sectionIndex, dimensions, setContainerCss}) => {
    return(
      <React.Fragment>
            <Scrim />
            <VideoPlayer
              videoId={["0GWlYInjOCI"]}
              thumbnail={`${withPrefix('/')}img/thumbnails/intro/beard_cave.jpg`}
              fullscreen
            />           
            <Curtains />
      </React.Fragment>
)})
, React.memo(({sectionIndex, dimensions, setContainerCss}) => (
        <React.Fragment>
        <Parallax speed="-4" dimensions={dimensions}>
            <div className="fullscreenQuote">
                <figure className="quote">
                   <q>Under the cover of an evening’s relaxing entertainment, cabaret, like nothing else, suddenly dispenses a <span style={{color: '#be553d', fontStyle: 'italic'}}>poison cookie</span>. Suggestively administered and hastily swallowed, its effect reaches far beyond the harmless evening to make otherwise placid blood boil and inspire a sluggish brain to think.</q>
                   <figcaption css={css(`transform: rotate(-3deg);`)}><img src={`${withPrefix('/')}img/friedrich.jpg`} alt="" />&ensp;&mdash;&ensp;Friedrich Hollaender, 1932</figcaption>
                </figure>
                <div className="bigborder"></div>
            </div>
        </Parallax>
            
        </React.Fragment>
))
, React.memo(
  ({sectionIndex, dimensions, setContainerCss}) => {
    setContainerCss(`min-height: calc((100vh - 40px) * 0.6)`)
    return (
      <React.Fragment>
        <Parallax speed="2" dimensions={dimensions}>
          <Positioner x="0.35">
            <Postcard>
              <VideoPlayer
                videoId={["xl5eTt4Qusw"]}
                thumbnail={`${withPrefix('/')}img/thumbnails/intro/dressing_room.jpg`}
              />
            </Postcard>
          </Positioner>
        </Parallax>
      </React.Fragment>
)})
, React.memo(({sectionIndex, dimensions, setContainerCss}) => {
  setContainerCss(`min-height: calc(100vh - 40px)`)
  return(
        <React.Fragment>
          <Link to="/cities/paris" css={css(`
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
                `)} autoPlay muted loop src={`${withPrefix('/')}img/john-eats.mp4`} />
                <img 
                src={`${withPrefix('/')}img/intro_bite-me.png`} 
                alt="Bite Me to get to Paris"
                
                css={css(`width: 425px; max-width: 90%; display: block;`)} />
          </Link>
        </React.Fragment>
)})
]