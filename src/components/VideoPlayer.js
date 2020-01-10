import React, {useState, useEffect, useRef, useContext} from 'react'
import PropTypes from 'prop-types'
import ReactPlayer from 'react-player'
import { MutedContext } from './contexts'
import { withPrefix } from 'gatsby'
// import { Slider, FormattedTime, PlayerIcon } from 'react-player-controls'
import { debounce, clamp } from 'lodash'
import fscreen from 'fscreen'

import debounceActiveRender from './debounceActiveRender'



const VideoPlayer = debounceActiveRender(React.memo((
    { active, 
      className, 
      fullscreen, 
      videoId, 
      startTime = 0, 
      endTime, 
      onEnd,
      captions,
      thumbnail = true, //pass in image here
      ...rest
    }) => {

      const muted = useContext(MutedContext);
      const [ volume, setVolume ] = useState(1);
      const [ playing, setPlaying ] = useState(false);
      const hasBeenClicked = useRef(false);

      const handleEnd = () => {
        // if (fscreen.fullscreenElement !== null) {
        //   fscreen.exitFullscreen().then(() =>{ onEnd && setTimeout(onEnd,1000)})
        // } else {
          onEnd && onEnd();
        // }
      }

      const initialClick = () => {
        if (!hasBeenClicked.current) {
          setPlaying(true)
        } else {
          hasBeenClicked.current = true;
        }  
      }

        
      // return <div />

      return (
      <div 
        className={
          "Video" 
          + (fullscreen ? " Video--fullscreen" : "")
          + (true ? " isActive" : "") 
          // + (!onDeck ? " fullyHidden" : "") 
          + (className ? ` ${className}` : "")
        }
        {...rest}
        > 
        
        <div className="Video__wrapper">
          <div className="Video__spinner"><div></div><div></div><div></div><div></div></div>
          <ReactPlayer
            light={thumbnail}
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
            onStart={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onClick={() => initialClick()}
          />
        </div>
      </div>
  )
}), 100, { leading: false });

export default VideoPlayer



