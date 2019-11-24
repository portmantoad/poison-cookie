import React, {useState, useEffect, useRef, useContext} from 'react'
import PropTypes from 'prop-types'
import YouTubePlayer from 'react-player/lib/players/YouTube'
import { MutedContext } from './contexts'
import { Slider, FormattedTime, PlayerIcon } from 'react-player-controls'
import { throttle, clamp } from 'lodash'
import ResizeDetector from 'react-resize-detector'
import fscreen from 'fscreen'
// import useMedia from 'use-media';


const VideoPlayer = React.memo((
    { sectionIndex,
      activeIndex, 
      className, 
      fullscreen, 
      videoId, 
      startTime = 0, 
      endTime, 
      onEnd,
      captions,
      ...rest
    }) => {
      const active = sectionIndex === activeIndex;
      const onDeck = sectionIndex >= (activeIndex - 1) && sectionIndex <= (activeIndex + 1);

      const muted = useContext(MutedContext);
      const [ volume, setVolume ] = useState(1);
      const [ ready, setReady ] = useState(false);
      const [ playing, setPlaying ] = useState(active);
      const [ duration, setDuration ] = useState(0);
      const [ trueDuration, setTrueDuration ] = useState(0);
      const [ played, setPlayed ] = useState(0);
      const [ loaded, setLoaded ] = useState(0);
      const [ intent, setIntent ] = useState(0);
      const [ controlsHovered, setControlsHovered ] = useState(false);
      const [ onPlayInitialTimeout, setOnPlayInitialTimeout ] = useState(false);
      const [ intentActive, setIntentActive ] = useState(false);
      const [ controlsBottomPad, setControlsBottomPad ] = useState(0);

      const [ controls, setControls ] = useState(false);
      
      // const isMobile = useMedia({maxWidth: 1000});

      const controlsAreDetached = fullscreen && !controlsBottomPad;
      const controlsVisible = controlsAreDetached || (active && duration && (controlsHovered || onPlayInitialTimeout || !playing));
      const controlsScrimVisible = controls && !controlsAreDetached && controlsVisible;

      const player = useRef(null);
      // const audioFadeInterval = useRef();

      // const clearAudioFadeInterval = () => {
      //   clearInterval(audioFadeInterval.current);
      //   setVolume(1);
      // }

      const playToggle = () => {
        playing ? pause() : play();
      }

      const play = () => {
        if (active) {
          if (played === 1 || (controls && endTime && played * trueDuration >= endTime)){
            setPlayed(0)
            player.current && player.current.seekTo(startTime)
          }
          setPlaying(true);
          // setInitialPlay(true);
        }
        // clearAudioFadeInterval();
      }

      const pause = () => {
        setPlaying(false);
        // clearAudioFadeInterval();
      }

      const hardPause = () => {
        const truePlayer = player.current && player.current.player && player.current.player.player && player.current.player.player.player;
        // console.log(truePlayer);
        truePlayer && truePlayer.pauseVideo && truePlayer.pauseVideo();
      }

      // const [ initialPlay, setInitialPlay ] = useState(false);
      // const [ scrolling, setScrolling ] = useState(false);
      // const scrollTimeout = useRef();
      // const handleScroll = throttle(()=>{
      // //  console.log("scroll")
      //   setScrolling(true);
      //   clearTimeout(scrollTimeout.current);
      //   scrollTimeout.current = setTimeout(()=>{ 
      //     setScrolling(false);
      //   },200)
      // },50)
      // useEffect(() => {
      //   window.addEventListener('scroll', handleScroll);
      //   return () => window.removeEventListener('scroll', handleScroll);
      // }, []);

      useEffect(() => {
        if (!playing && !active) {
          hardPause();
        }
      }, [playing, active]);

      const playTimeout = useRef();

      useEffect(() => {
        if (active) {
          playTimeout.current = setTimeout(play, 100);
        } else {
          clearTimeout(playTimeout.current);
          pause();
          // setInitialPlay(false);
        }
      }, [active]);

      useEffect(() => {
        onDeck && player.current && player.current.seekTo(displayPlayedToTruth(played))
      }, [onDeck]);

      const playable = !!trueDuration 
        && active 
        // && !scrolling
      ;

      


      // const pauseFade = () => {
      //   // const backupPause = setTimeout(()=>{
      //   //   pause();
      //   // }, 300);
      //   clearAudioFadeInterval();
      //   audioFadeInterval.current = setInterval(() => {
      //     setVolume(vol => {
      //       if (vol < 0.1) {
      //         pause();
      //         return 1
      //       } else {
      //         return vol - 0.1
      //       }
      //     })
      //   }, 25);
      // }

      // const playFade = () => {
      //   clearAudioFadeInterval();
      //   setVolume(0);
      //   setPlaying(true);
      //   audioFadeInterval.current = setInterval(() => {
      //     setVolume(vol => {
      //       if (vol > 0.9) {
      //         clearAudioFadeInterval();
      //         return 1
      //       } else {
      //         return vol + 0.1
      //       }
      //     })
      //   }, 50);
      // }

      const handleEnd = () => {
        if (fscreen.fullscreenElement !== null) {
          fscreen.exitFullscreen().then(() =>{ onEnd && setTimeout(onEnd,1000)})
        } else {
          onEnd && onEnd();
        }
        // player.current && player.current.seekTo(startTime);
        // pause();
        // setPlayed(0);
        // setPlaying(false)
      }

      const truePlayedToDisplay = played => {
        const start = startTime || 0;
        const end = endTime || trueDuration;
        const visibleDuration = end - start;
        return clamp( ((played * trueDuration) - start) / visibleDuration, 0, 1);
      }

      const displayPlayedToTruth = played => {
        const start = startTime || 0;
        const end = endTime || trueDuration;
        const visibleDuration = end - start;
        return ((played * visibleDuration) + start) / trueDuration;
      }

      const handleResize = (width, height) => {
        const vh = (height + 48)/100;
        const playerWidth = Math.min(width, (height - (7 * vh)) / (720 / 1280));
        const playerHeight = playerWidth / 1280 * 720;
        const playerBottomPad = (height - playerHeight)/2;
        const controlsHeight = 75;
        const controlsAreAttached = playerBottomPad < controlsHeight;
        setControlsBottomPad(controlsAreAttached ? playerBottomPad : 0);
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
        onClick={() => playToggle()}
        {...rest}
        > 

        {fullscreen && controls && (
          <ResizeDetector refreshMode='throttle' handleWidth handleHeight onResize={handleResize} />  
        )}
        
        <div className="Video__wrapper">
          {true && <YouTubePlayer
            ref={player}
            url={'https://www.youtube.com/embed/' 
              + videoId 
              // + (endTime ? '?end=' + endTime : '')
              // + '&start=' + startTime 
              // + '&autoplay=1'
              // + '&cc_lang_pref=en'
              // + '&cc_load_policy=1'
              // + '&modestbranding=1'

            }
            volume={muted.muted ? 0 : volume}
            controls={!controls}
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
              // + (ready ? " isActive" : "")
              // + (playing ? " isPlaying" : "")
            }
            // onReady={() => setReady(true)}
            width="100%"
            height="200%"
            playsinline
            playing={playable && playing}
            onBufferEnd={
              ()=>{
                setPlaying(playState => {
                  playState = playState && playable ? true : false;
                  !playState && hardPause();
                  return playState;
                })
              }
            }
            onProgress={({played, loaded}) => {
              const isEnded = controls && endTime ? (played * trueDuration >= endTime) : false;
              const isBeforeStart = controls && startTime ? played < (startTime / trueDuration) : false;
              if (isEnded) {
                handleEnd()
              } else if (isBeforeStart) {
                player.current && player.current.seekTo(startTime)
              } else {
                setPlayed(truePlayedToDisplay(played));
                setLoaded(truePlayedToDisplay(loaded));
              }
            }}
            onPlay={()=>{
              play();
              setOnPlayInitialTimeout(
                setTimeout( () => {
                  setOnPlayInitialTimeout(false)
                }, 3000)
              );
              
            }}
            onPause={() => playable && pause()}
            onEnded={handleEnd}
            onDuration={duration => {
                setTrueDuration(duration);
                setDuration((endTime || duration) - startTime);
            }}
            progressInterval={100}
          />}
          <div className={"Video__wrapper__playButton" + ((!playing && playable && active) ? " isActive" : "")}><PlayerIcon.Play /></div>
          <div className={"Video__wrapper__controlsScrim" + (controlsScrimVisible ? " isActive" : "")}></div>
        </div>
        {controls && <div 
            className={"Video__controls"
               + (controlsVisible ? " isActive" : "")
               // + (this.state.playing ? " isPlaying" : "")
            } 
            onMouseOver={() => setControlsHovered(true)}
            onMouseLeave={() => setControlsHovered(false)}
            style={{bottom: controlsBottomPad + "px"}}
          >
            <div className="Video__controls__playToggle" onClick={() => playToggle()}>
              {playing ? <PlayerIcon.Pause /> : <PlayerIcon.Play />}
            </div>
            <div className="Video__controls__time">
              <FormattedTime numSeconds={played * duration || 0} />/<FormattedTime numSeconds={duration} />
            </div>
            <div className="Video__controls__slider" onClick={event => event.stopPropagation()}>
              <Slider
                isEnabled
                className="Video__controls__slider__wrapper"
                onIntent={intent => setIntent(intent)}
                onIntentStart={intent => setIntentActive(true)}
                onIntentEnd={() => setIntentActive(false)}
                onChange={newValue => setIntent(newValue)}
                onChangeStart={startValue => setIntent(startValue)}
                onChangeEnd={endValue => {
                  player.current && player.current.seekTo(displayPlayedToTruth(endValue));
                  setPlayed(endValue);
                }}
              >
                <div className="Video__controls__slider__bar">
                  <div className="Video__controls__slider__bar__loaded" style={{width: (100 * loaded) + "%"}}></div>
                  <div className="Video__controls__slider__bar__progress" style={{width: (100 * played) + "%"}}></div>
                </div>
                <div className="Video__controls__slider__handle" style={{left: (100 * played) + "%"}}></div>
                <div className={"Video__controls__slider__intentHandle" + (intentActive ? " isActive" : "")}
                  style={{left: (100 * intent) + "%"}}>
                  <FormattedTime numSeconds={duration * intent} />
                </div>
              </Slider>
            </div>
          </div>}
      </div>
  )
})

export default VideoPlayer