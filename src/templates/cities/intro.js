import React from 'react'
import VideoPlayer from '../../components/VideoPlayer'
import FixedPortal from '../../components/FixedPortal'
import CanvasBlend from '../../components/CanvasBlend'
import { Tween } from 'react-gsap'

import { withPrefix } from 'gatsby'



export default [
({progress, active, foregroundPortal, backgroundPortal, midgroundPortal}) => (
  <React.Fragment>
          <FixedPortal target={midgroundPortal}>
          <div className={"Panel Transition--slow-fade" + (active ? " isActive" : "")}>
            <CanvasBlend 
              use="screen" 
              style={{
                position: "absolute", 
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                minWidth: "100%", 
                minHeight: "100%"
              }}>
                <video src={`${withPrefix('/')}img/cover.mp4`} muted autoPlay loop></video>  
            </CanvasBlend>
            <Tween totalProgress={progress} paused={true}
                to={{ 
                  y: '-' + (20 / ((20 + 100)/100)) + '%', 
                  opacity: 0
                }}
              >
              <div className="Panel" style={{
                background: "url(" + `${withPrefix('/')}img/cover.webp` + ")",
                backgroundSize: "cover",
                backgroundPosition: "right top",
                right: "calc(15% - 30px)",
                bottom: "-20%"
              }}/>
            </Tween>
            <img src={`${withPrefix('/')}img/cookietitle.webp`} alt="The Poison Cookie Jar" style={{
              position: "absolute", 
              right:"5%", bottom: "5%", 
              width: "300px",
              maxWidth:"65%",
              height: "auto"}}/>

              
          </div>
        </FixedPortal>
  </React.Fragment>
), ({progress, active, foregroundPortal, backgroundPortal, midgroundPortal}) => (
        <FixedPortal target={midgroundPortal}> 
            <div className={"Panel Transition--fade" + (active ? " isActive" : "")}>  
              <VideoPlayer
                videoId="ofAfzauCdAU"
                fullscreen
                active={active}
              />
            </div>
        </FixedPortal>
), ({progress, active, foregroundPortal, backgroundPortal, midgroundPortal}) => (
        <FixedPortal target={midgroundPortal}>
          <div className={"Panel Transition--fade" + (active ? " isActive" : "")}> 
            <VideoPlayer
              videoId="GQPcG4D3Zno"
              startTime={18}
              endTime={61}
              fullscreen
              active={active}
            />
          </div>
        </FixedPortal>
), ({progress, active, foregroundPortal, backgroundPortal, midgroundPortal}) => (
        <FixedPortal target={midgroundPortal}>
          <div style={{
            position: "absolute", 
            top:0, left:0, bottom:0, right:0, 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            textAlign: "center"
          }} >
            <Tween totalProgress={progress} paused={true}
              from={{
                y: '120%',
              }}
              to={{
                y: '-120%',
                scale: 1.2
              }}
            >
              <div className={"Transition--slow-fade" + (active ? " isActive" : "") }>
                quote
              </div>
            </Tween>
          </div>
        </FixedPortal>
), ({progress, active, foregroundPortal, backgroundPortal, midgroundPortal}) => (
        <FixedPortal target={midgroundPortal}>
            <CanvasBlend 
              use="multiply" 
              className={"Transition--slow-fade" + (active ? " isActive" : "")}
              style={{
                position: "absolute", 
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                maxWidth: "100%", 
                maxHeight: "100%"
              }}>
              <img src={`${withPrefix('/')}img/parisCanal.webp`} alt="" />
            </CanvasBlend>
        </FixedPortal>
), ({progress, active, foregroundPortal, backgroundPortal, midgroundPortal}) => (
        <FixedPortal target={midgroundPortal}>
          <div style={{
            position: "absolute", 
            top:0, left:0, bottom:0, right:0, 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            textAlign: "center"
          }} >
            <Tween totalProgress={progress} paused={true}
              from={{
                y: '120%',
              }}
              to={{
                y: '-120%',
                scale: 1.2
              }}
            >
              <div className={"Transition--slow-fade" + (active ? " isActive" : "") }>
                Eat fast, we're off to paris
              </div>
            </Tween>
          </div>
        </FixedPortal>
)
]
