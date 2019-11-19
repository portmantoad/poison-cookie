import React, {useState, useEffect, useRef, useContext} from 'react'
import PropTypes from 'prop-types'
import YouTubePlayer from 'react-player/lib/players/YouTube'
import { MutedContext } from './contexts'
import { Slider, FormattedTime, PlayerIcon } from 'react-player-controls'
import { throttle, clamp } from 'lodash'
import ResizeDetector from 'react-resize-detector'


const VideoPlayer = React.memo((
    { active, 
      className, 
      fullscreen, 
      videoId, 
      startTime = 0, 
      endTime, 
      onEnd,
      ...rest
    }) => {
      const muted = useContext(MutedContext);
      const [ volume, setVolume ] = useState(1);
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

      const controlsAreDetached = fullscreen && !controlsBottomPad;
      const controlsVisible = controlsAreDetached || (active && duration && (controlsHovered || onPlayInitialTimeout || !playing));
      const controlsScrimVisible = !controlsAreDetached && controlsVisible;

      const player = useRef(null);
      const audioFadeInterval = useRef();

      const clearAudioFadeInterval = () => {
        clearInterval(audioFadeInterval.current);
        setVolume(1);
      }

      const playToggle = () => {
        playing ? pause() : play();
      }

      const play = () => {
        clearAudioFadeInterval();
        if (active) {
          if (played === 1 || (endTime && played * trueDuration >= endTime)){
            setPlayed(0)
            player.current && player.current.seekTo(startTime)
          }
          setPlaying(true);
        }
      }

      const pause = () => {
        const truePlayer = player.current && player.current.player.player.player;
        setPlaying(false);
        truePlayer && truePlayer.pauseVideo && truePlayer.pauseVideo();
        clearAudioFadeInterval();
      }

      const pauseFade = () => {
        // const backupPause = setTimeout(()=>{
        //   pause();
        // }, 300);
        clearAudioFadeInterval();
        audioFadeInterval.current = setInterval(() => {
          setVolume(vol => {
            if (vol < 0.1) {
              pause();
              return 1
            } else {
              return vol - 0.1
            }
          })
        }, 25);
      }

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
        onEnd && onEnd();
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

      useEffect(() => {
        active ? play() : pauseFade()
      }, [active]);

      return (
      <div 
        className={
          "Video" 
          + (fullscreen ? " Video--fullscreen" : "")
          + (active ? " isActive" : "") 
          + (className ? ` ${className}` : "")
        }
        onClick={() => playToggle()}
        {...rest}
        > 

        {fullscreen && (
          <ResizeDetector refreshMode='throttle' handleWidth handleHeight onResize={handleResize} />  
        )}
        
        <div className="Video__wrapper">
          <YouTubePlayer
            ref={player}
            url={'https://www.youtube.com/watch?v=' + videoId + '&start=' + startTime + (endTime ? '&end' + endTime : '')}
            volume={muted.muted ? 0 : volume}
            controls={false}
            className={
              "Video__wrapper__ytEmbed" 
              // + (playing ? " isPlaying" : "")
            }
            width="100%"
            height="200%"
            playsinline
            playing={trueDuration && playing}
            onBufferEnd={
              ()=>{
                if(!active || !playing){
                  pause()
                }
              }
            }
            onProgress={({played, loaded}) => {
              const isEnded = endTime ? (played * trueDuration >= endTime) : false;
              const isBeforeStart = startTime ? played < (startTime / trueDuration) : false;
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
              setOnPlayInitialTimeout(
                setTimeout( () => {
                  setOnPlayInitialTimeout(false)
                }, 3000)
              );
              play();
            }}
            onPause={() => pause()}
            onEnded={handleEnd}
            onDuration={duration => {
                setTrueDuration(duration);
                setDuration((endTime || duration) - startTime);
            }}
            progressInterval={100}
          />
          <div className={"Video__wrapper__playButton" + ((!playing && active) ? " isActive" : "")}><PlayerIcon.Play /></div>
          <div className={"Video__wrapper__controlsScrim" + (controlsScrimVisible ? " isActive" : "")}></div>
        </div>
        <div 
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
              <FormattedTime numSeconds={played * duration} />/<FormattedTime numSeconds={duration} />
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
          </div>
      </div>
  )
})

export default VideoPlayer