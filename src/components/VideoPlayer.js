import React, {useState, useEffect, useRef, useContext} from 'react'
import PropTypes from 'prop-types'
import ReactPlayer from 'react-player'
import { MutedContext } from './contexts'
import { withPrefix } from 'gatsby'
import Icon from './Icon'
// import { Slider, FormattedTime, PlayerIcon } from 'react-player-controls'
import { debounce, clamp } from 'lodash'
import fscreen from 'fscreen'
import { useInView } from 'react-intersection-observer'

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

// import debounceActiveRender from './debounceActiveRender'\



const VideoPlayer = React.memo((
    { className, 
      fullscreen, 
      videoIds, 
      startTime = 0, 
      endTime, 
      onEnd,
      autoplay = false,
      thumbnail = true, //pass in image here
      aspectRatio = (1280/720),
      ...rest
    }) => {

      const [inViewRef, inView] = useInView({ threshold: 0 })

      const player = useRef();

      const muted = useContext(MutedContext);
      const [ volume, setVolume ] = useState(1);
      const [ playing, setPlaying ] = useState(autoplay);
      const [ currentVid, setCurrentVid ] = useState(0);
      const [ hasBeenClicked, setHasBeenClicked] = useState(false);

      const setCurrentVidClamped = (index) => {
        setCurrentVid(clamp(index, 0, (videoIds.length - 1)));
        setPlaying(true);
      }

      const handleEnd = () => {
        if (currentVid < (videoIds.length - 1)) {
          setCurrentVidClamped(currentVid + 1);
        } else {
          onEnd && onEnd();
        }
      }

      const initialClick = () => {
        if (!hasBeenClicked && !autoplay) {
          setPlaying(true);
        } 
        setHasBeenClicked(true);
      }

      const hardPause = () => {
        const truePlayer = player.current && player.current.player && player.current.player.player && player.current.player.player.player;
        truePlayer && truePlayer.pauseVideo && truePlayer.pauseVideo();
      }

      useEffect(() => {
        if (!inView && fscreen.fullscreenElement === null) {
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
        css={css(`max-width: calc((100vh - 40px - 7vh) / ${1/aspectRatio});`)}
        {...rest}
        > 
        
        <div className="Video__wrapper" ref={inViewRef} css={css(`
          padding-top: calc(100% / ${aspectRatio});
          border-radius: 1% / calc(1% * ${aspectRatio});
        `)}>
          <div className="Video__spinner"><div></div><div></div><div></div><div></div></div>
          <ReactPlayer
            ref={player}
            light={!autoplay && thumbnail}
            playing={playing}
            url={'http://www.youtube.com/embed/' + videoIds[currentVid]}
            controls
            muted={muted.muted}
            config={{
              youtube: {
                // preload: onDeck
                // preload: true,
                playerVars: {
                  ...(startTime ? {start: startTime} : {}), 
                  ...(endTime ? {end: endTime} : {}),
                  cc_lang_pref: 'en',
                  cc_load_policy: 1,
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

        {(videoIds.length > 1 && hasBeenClicked) ? <div className="Video__multiple-controls">
          <div 
            className={"Video__multiple-controls__left" + (currentVid === 0 ? " isDisabled" : "")}
            onClick={(event) => {event.preventDefault(); setCurrentVidClamped(currentVid - 1)}}
          ><Icon use="arrowLeft" /></div> 
          {currentVid + 1}/{videoIds.length}
          <div 
            className={"Video__multiple-controls__right" + (currentVid === videoIds.length - 1 ? " isDisabled" : "")}
            onClick={(event) => {event.preventDefault(); setCurrentVidClamped(currentVid + 1)}}
          ><Icon use="arrowRight" /></div>
        </div> : null }
      </div>
  )
});

export default VideoPlayer



