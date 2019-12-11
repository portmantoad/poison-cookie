import React, {useState, useEffect, useRef, useContext} from 'react'
import PropTypes from 'prop-types'
import YouTubePlayer from 'react-player/lib/players/YouTube'
import { MutedContext } from './contexts'
import { Slider, FormattedTime, PlayerIcon } from 'react-player-controls'
import { throttle, clamp } from 'lodash'
import ResizeDetector from 'react-resize-detector'
import fscreen from 'fscreen'
// import useMedia from 'use-media';

import debounceRender from 'react-debounce-render'

const VideoPlayer = debounceRender(React.memo((
    { active, 
      className, 
      fullscreen, 
      videoId, 
      startTime = 0, 
      endTime, 
      onEnd,
      captions,
      ...rest
    }) => {

      const muted = useContext(MutedContext);
      const [ volume, setVolume ] = useState(1);
      const [ playing, setPlaying ] = useState(active);
      // const [ duration, setDuration ] = useState(0);
      // const [ trueDuration, setTrueDuration ] = useState(0);
      // const [ played, setPlayed ] = useState(0);
      // const [ loaded, setLoaded ] = useState(0);
      // const [ intent, setIntent ] = useState(0);
      // const [ controlsHovered, setControlsHovered ] = useState(false);
      // const [ onPlayInitialTimeout, setOnPlayInitialTimeout ] = useState(false);
      // const [ intentActive, setIntentActive ] = useState(false);
      // const [ controlsBottomPad, setControlsBottomPad ] = useState(0);

      // const controls = false;
      
      // const controlsAreDetached = fullscreen && !controlsBottomPad;
      // const controlsVisible = controls && (controlsAreDetached || (active && duration && (controlsHovered || onPlayInitialTimeout || !playing)));
      // const controlsScrimVisible = controls && !controlsAreDetached && controlsVisible;

      const player = useRef(null);

      const play = () => {
        setPlaying(true);
      }

      const pause = () => {
        setPlaying(false);
        hardPause();
      }

      const hardPause = () => {
        const truePlayer = player.current && player.current.player && player.current.player.player && player.current.player.player.player;
        truePlayer && truePlayer.pauseVideo && truePlayer.pauseVideo();
      }

      // useEffect(() => {
      //   if (!active) {
      //     setTimeout(hardPause,0);
      //   }
      // }, [active]);

      // const playTimeout = useRef();

      useEffect(() => {
        if (active) {
          // playTimeout.current = setTimeout(() => {
            play();
          // }, 50);
        } else {
          // clearTimeout(playTimeout.current);
          pause();
        }
      }, [active]);

      const handleEnd = () => {
        if (fscreen.fullscreenElement !== null) {
          fscreen.exitFullscreen().then(() =>{ onEnd && setTimeout(onEnd,1000)})
        } else {
          onEnd && onEnd();
        }
      }

        
      // return <div />

      return (
      <div 
        className={
          "Video" 
          + (fullscreen ? " Video--fullscreen" : "")
          + (active ? " isActive" : "") 
          // + (!onDeck ? " fullyHidden" : "") 
          + (className ? ` ${className}` : "")
        }
        {...rest}
        > 
        
        <div className="Video__wrapper">
          <YouTubePlayer
            ref={player}
            light
            url={'http://www.youtube.com/embed/' 
              + videoId 
              // + (endTime ? '?end=' + endTime : '')
              // + '&start=' + startTime 
              // + '&autoplay=1'
              // + '&cc_lang_pref=en'
              // + '&cc_load_policy=1'
              // + '&modestbranding=1'

            }
            playing={active && playing}
            controls
            onBufferEnd={
              ()=>{
                setPlaying(playState => {
                  playState = playState && active ? true : false;
                  !playState && hardPause();
                  return playState;
                })
              }
            }

            volume={muted.muted ? 0 : volume}
            config={{
              youtube: {
                // preload: onDeck
                preload: true,
                playerVars: {
                  ...(startTime ? {start: startTime} : {}), 
                  ...(endTime ? {end: endTime} : {}),
                  // cc_lang_pref: 'en',
                  // cc_load_policy: 1,
                  // modestbranding: 1
                }

              }
            }}
            className={
              "Video__wrapper__ytEmbed"
            }
            width="100%"
            height="100%"
            style={{top: 0}}
            playsinline
            onEnded={handleEnd}
          />
        </div>
      </div>
  )
}), 100, { leading: false });

export default VideoPlayer



