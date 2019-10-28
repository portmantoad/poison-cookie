import React from 'react'
import VideoPlayer from '../../components/VideoPlayer'
import FixedPortal from '../../components/FixedPortal'
import { Controller, Scene } from 'react-scrollmagic'
import { Tween, Timeline } from 'react-gsap'

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
          <Timeline totalProgress={progress} paused={true}>
            <Tween
            position="0"
              from={{
                y: '120%',
              }}
              to={{
                y: '-120%',
                scale: 1.2
              }}
            >
              <div className={"Transition--slow-fade" + (active ? " isActive" : "") }>
                Eat my shorts <br />{progress}
              </div>
            </Tween>
          </Timeline>
          </div>
        </FixedPortal>
), ({progress, active, foregroundPortal, backgroundPortal}) => (
        <FixedPortal target={backgroundPortal}>
            <VideoPlayer
              videoId="VahZrbh8UZU"
              fullscreen
              active={active}
            />
        </FixedPortal>
), ({progress, active, foregroundPortal, backgroundPortal}) => (
        <FixedPortal target={backgroundPortal}>
            <VideoPlayer
              videoId="CJHK5SWJu0k"
              fullscreen
              active={active}
            />
        </FixedPortal>
), ({progress, active, foregroundPortal, backgroundPortal}) => (
        <FixedPortal target={backgroundPortal}>
            <VideoPlayer
              videoId="iOL8w2ZNOJY"
              fullscreen
              active={active}
            />
        </FixedPortal>
), ({progress, active, foregroundPortal, backgroundPortal}) => (
        <FixedPortal target={backgroundPortal}>
          <Timeline totalProgress={progress} paused={true}>
            <Tween
            position="0"
              from={{
                y: '120%',
              }}
              to={{
                y: '-120%',
                scale: 1.2
              }}
            >
              <div className={"Transition--slow-fade" + (active ? " isActive" : "") }>
                Eat my shorts <br />{progress}
              </div>
            </Tween>
          </Timeline>
        </FixedPortal>
)
]
