import React from 'react'
import VideoPlayer from '../../components/VideoPlayer'
import FixedPortal from '../../components/FixedPortal'
import { Controller, Scene } from 'react-scrollmagic'
import { Tween, Timeline } from 'react-gsap'

export default [
({progress, active, foregroundPortal, backgroundPortal}) => (
        <div style={{position: 'fixed', top: '45%', left: 0, width: '100%', textAlign: 'center'}}>
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
              <div className={"slowfade" + (active ? " isActive" : "") }>
                Eat my shorts <br />{progress}
              </div>
            </Tween>
          </Timeline>
          <FixedPortal target={backgroundPortal}>
            <VideoPlayer
              videoId="3u3E4bXL6Jc"
              fullscreen
              active={active}
            />
          </FixedPortal>
        </div>
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
        <div style={{position: 'fixed', top: '45%', left: 0, width: '100%', textAlign: 'center'}}>
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
              <div className={"slowfade" + (active ? " isActive" : "") }>
                Eat my shorts <br />{progress}
              </div>
            </Tween>
          </Timeline>
        </div>
)
]
