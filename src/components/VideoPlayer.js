import React, {useState, useEffect, useRef, useContext} from 'react'
import PropTypes from 'prop-types'
import ReactPlayer from 'react-player'
import { MutedContext } from './contexts'
import { withPrefix } from 'gatsby'
// import { Slider, FormattedTime, PlayerIcon } from 'react-player-controls'
import { debounce, clamp } from 'lodash'
// import fscreen from 'fscreen'
import { useInView } from 'react-intersection-observer'

// import debounceActiveRender from './debounceActiveRender'\



const VideoPlayer = React.memo((
    { className, 
      fullscreen, 
      videoId, 
      startTime = 0, 
      endTime, 
      onEnd,
      autoplay = false,
      thumbnail = true, //pass in image here
      ...rest
    }) => {

      const [inViewRef, inView] = useInView({ threshold: 0 })

      const player = useRef();

      const muted = useContext(MutedContext);
      const [ volume, setVolume ] = useState(1);
      const [ playing, setPlaying ] = useState(autoplay);
      const hasBeenClicked = useRef(false);

      const handleEnd = () => {
        onEnd && onEnd();
      }

      const initialClick = () => {
        if (!hasBeenClicked.current && !autoplay) {
          setPlaying(true)
        } else {
          hasBeenClicked.current = true;
        }  
      }

      const hardPause = () => {
        const truePlayer = player.current && player.current.player && player.current.player.player && player.current.player.player.player;
        truePlayer && truePlayer.pauseVideo && truePlayer.pauseVideo();
      }

      useEffect(() => {
        if (!inView) {
          setPlaying(false);
          hardPause();
        }
      }, [inView, playing]);

        
      // return <div />

      return (
      <div 
        className={
          "Video" 
          + (fullscreen ? " Video--fullscreen" : "")
          + (inView ? " isActive" : "") 
          + (className ? ` ${className}` : "")
        }
        {...rest}
        > 
        
        <div className="Video__wrapper" ref={inViewRef}>
          <div className="Video__spinner"><div></div><div></div><div></div><div></div></div>
          <ReactPlayer
            ref={player}
            light={!autoplay && thumbnail}
            playing={playing}
            url={'http://www.youtube.com/embed/' 
              + videoId 
              // + (endTime ? '?end=' + endTime : '')
              // + '&start=' + startTime 
              // + '&autoplay=1'
              // + '&cc_lang_pref=en'
              // + '&cc_load_policy=1'
              // + '&modestbranding=1'

            }
            controls
            muted={muted.muted}
            config={{
              youtube: {
                // preload: onDeck
                // preload: true,
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
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onClick={() => initialClick()}
          />
        </div>
      </div>
  )
});

export default VideoPlayer



