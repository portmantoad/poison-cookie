import React from 'react'
import VideoPlayer from '../../components/VideoPlayer'
import FixedPortal from '../../components/FixedPortal'
import { Tween } from 'react-gsap'



export default [
({progress, active, foregroundPortal, backgroundPortal}) => (
        <FixedPortal target={backgroundPortal}>
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
                intro
              </div>
            </Tween>
          </div>
        </FixedPortal>
), ({progress, active, foregroundPortal, backgroundPortal}) => (
        <FixedPortal target={backgroundPortal}>   
              <VideoPlayer
                videoId="ofAfzauCdAU"
                fullscreen
                active={active}
              />
        </FixedPortal>
), ({progress, active, foregroundPortal, backgroundPortal}) => (
        <FixedPortal target={backgroundPortal}>
            <VideoPlayer
              videoId="GQPcG4D3Zno"
              startTime={18}
              endTime={61}
              fullscreen
              active={active}
            />
        </FixedPortal>
), ({progress, active, foregroundPortal, backgroundPortal}) => (
        <FixedPortal target={backgroundPortal}>
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
), ({progress, active, foregroundPortal, backgroundPortal}) => (
        <FixedPortal target={backgroundPortal}>
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
