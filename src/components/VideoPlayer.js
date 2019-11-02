import React from 'react'
import PropTypes from 'prop-types'
import YouTubePlayer from 'react-player/lib/players/YouTube'
import { Slider, FormattedTime, PlayerIcon } from 'react-player-controls'
import { debounce, clamp } from 'lodash'
import ResizeDetector from 'react-resize-detector'


class VideoPlayer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      volume: 1,
      playing: false,
      duration: 0,
      played: 0,
      loaded: 0,
      intent: 0,
      controlsHovered: false,
      onPlayInitialTimeout: false,
      intentActive: false,
      controlsBottomPad: 0
    };

    if (this.props.active) {
      this.play();
    }

  }

  handleInitialScrollEnd = debounce(() => this.play(), 200)

  componentDidUpdate(nextProps) {
   const { active } = this.props
   if (nextProps.active !== active) {
    if (active) {
      this.handleInitialScrollEnd();
      if (typeof window !== `undefined`) {
        window.addEventListener('scroll', this.handleInitialScrollEnd , false);
      } else {
        this.play()
      }
    } else {
      this.pauseFade()
      setTimeout(this.pause, 1000);
    }
   }
  }

  componentWillUnmount(){
    if (typeof window !== `undefined`) {
      window.removeEventListener('scroll', this.handleInitialScrollEnd , false);
    }
  }


  clearAudioFadeInterval = () => {
    clearInterval(this.audioFadeInterval);
  }

  playToggle = () => {
    if (this.state.playing) {
      this.pause();
    } else {
      this.play();
    }
  }

  play = () => {
    this.clearAudioFadeInterval();
    this.props.active && this.setState({volume: 1, playing: true});
    window.removeEventListener('scroll', this.handleInitialScrollEnd , false);
  }

  pause = () => {
    this.clearAudioFadeInterval();
    this.setState({volume: 0, playing: false});
  }

  pauseFade = () => {
    this.vol = this.state.volume;
    this.clearAudioFadeInterval();
    this.audioFadeInterval = setInterval(() => {
        if (this.vol < 0.1) {
            this.setState({
              volume: 0,
              playing: false
            });
            this.clearAudioFadeInterval();
        } else {
            this.vol -= 0.1
            this.setState({volume: this.vol});
        }
    }, 50);
  }

  playFade = () => {
    this.vol = 0;
    this.setState({volume: this.vol, playing: true});
    this.clearAudioFadeInterval();
    this.audioFadeInterval = setInterval(() => {
        if (this.vol > 0.9) {
            this.setState({ volume: 1 });
            this.clearAudioFadeInterval();
        } else {
            this.vol += 0.1
            this.setState({volume: this.vol});
        }
    }, 50);
  }

  ref = player => {
    this.player = player
  }

  handleEnd = () => {
    const start = this.props.startTime || 0;
    this.player && this.player.seekTo(start);
    this.setState({playing: false, played: 0});
  }

  truePlayedToDisplay = played => {
    const start = this.props.startTime || 0;
    const end = this.props.endTime || this.state.trueDuration;
    const totalDuration = this.state.trueDuration;
    const visibleDuration = end - start;

    return clamp( ((played * totalDuration) - start) / visibleDuration, 0, 1);
  }

  displayPlayedToTruth = played => {
    const start = this.props.startTime || 0;
    const end = this.props.endTime || this.state.trueDuration;
    const totalDuration = this.state.trueDuration;
    const visibleDuration = end - start;

    return ((played * visibleDuration) + start) / totalDuration;
  }

  handleResize = (width, height) => {
    const vh = (height + 48)/100;
    const playerWidth = Math.min(width, (height - (7 * vh)) / (720 / 1280));
    const playerHeight = playerWidth / 1280 * 720;
    const playerBottomPad = (height - playerHeight)/2;
    const controlsHeight = 75;
    const controlsAreAttached = playerBottomPad < controlsHeight;

    this.setState({controlsBottomPad: controlsAreAttached ? playerBottomPad : 0})
  }

  render() {
    const {
      className,
      fullscreen,
      active,
      videoId,
      scrollProgress,
      startTime = 0,
      endTime,
      ...rest
    } = this.props;

    const controlsAreDetached = fullscreen && !this.state.controlsBottomPad;
    const controlsVisible = controlsAreDetached || (active && this.state.duration && (this.state.controlsHovered || this.state.onPlayInitialTimeout || !this.state.playing));
    const controlsScrimVisible = !controlsAreDetached && controlsVisible;

    return (
      <div 
        className={
          "Video" 
          + (fullscreen ? " Video--fullscreen" : "")
          + (active ? " isActive" : "") 
          + (className ? ` ${className}` : "")
        }
        onClick={this.playToggle}
        {...rest}
        > 

        {fullscreen && (
          <ResizeDetector handleWidth handleHeight onResize={this.handleResize} />  
        )}
        
        <div className="Video__wrapper">
          <YouTubePlayer
            ref={this.ref}
            url={'https://www.youtube.com/watch?v=' + videoId + '&start=' + startTime + (endTime ? '&end' + endTime : '')}
            volume={this.state.volume}
            controls={false}
            className={
              "Video__wrapper__ytEmbed" 
              // + (this.state.playing ? " isPlaying" : "")
            }
            width="100%"
            height="200%"
            playsinline
            playing={this.state.playing}
            onProgress={({played, loaded}) => {
              const isEnded = endTime ? (played * this.state.trueDuration >= endTime) : false;
              const isBeforeStart = startTime ? played < (startTime / this.state.trueDuration) : false;
              if (isEnded) {
                this.handleEnd()
              } else if (isBeforeStart) {
                this.player && this.player.seekTo(startTime)
              } else {
                this.setState({ played: this.truePlayedToDisplay(played), loaded: this.truePlayedToDisplay(loaded)})
              }
            }}
            onPlay={()=>{
              this.setState({
                onPlayInitialTimeout:
                  setTimeout( () => {
                    this.setState({onPlayInitialTimeout: false})
                  }, 3000),
                volume: 1,
                playing: true
              })
            }}
            onPause={this.pause}
            onEnded={this.handleEnd}
            onDuration={duration => {
              this.setState({
                trueDuration: duration,
                duration: (endTime || duration) - startTime
              })
            }}
            progressInterval={100}
          />
          <div className={"Video__wrapper__playButton" + ((!this.state.playing && active) ? " isActive" : "")}><PlayerIcon.Play /></div>
          <div className={"Video__wrapper__controlsScrim" + (controlsScrimVisible ? " isActive" : "")}></div>
        </div>
        <div 
            className={"Video__controls"
               + (controlsVisible ? " isActive" : "")
               // + (this.state.playing ? " isPlaying" : "")
            } 
            onMouseOver={() => this.setState({controlsHovered: true})} 
            onMouseLeave={() => this.setState({controlsHovered: false})}
            style={{bottom: this.state.controlsBottomPad + "px"}}
          >
            <div className="Video__controls__playToggle" onClick={this.playToggle}>
              {this.state.playing ? <PlayerIcon.Pause /> : <PlayerIcon.Play />}
            </div>
            <div className="Video__controls__time">
              <FormattedTime numSeconds={this.state.played * this.state.duration} />/<FormattedTime numSeconds={this.state.duration} />
            </div>
            <div className="Video__controls__slider" onClick={event => event.stopPropagation()}>
              <Slider
                isEnabled
                className="Video__controls__slider__wrapper"
                onIntent={intent => this.setState({intent: intent})}
                onIntentStart={intent => this.setState({intentActive: true})}
                onIntentEnd={() => this.setState({intentActive: false})}
                onChange={newValue => this.setState({intent: newValue})}
                onChangeStart={startValue => this.setState({intent: startValue})}
                onChangeEnd={endValue => {
                  this.player && this.player.seekTo(this.displayPlayedToTruth(endValue))
                  this.setState({played: endValue})
                }}
              >
                <div className="Video__controls__slider__bar">
                  <div className="Video__controls__slider__bar__loaded" style={{width: (100 * this.state.loaded) + "%"}}></div>
                  <div className="Video__controls__slider__bar__progress" style={{width: (100 * this.state.played) + "%"}}></div>
                </div>
                <div className="Video__controls__slider__handle" style={{left: (100 * this.state.played) + "%"}}></div>
                <div className={"Video__controls__slider__intentHandle" + (this.state.intentActive ? " isActive" : "")}
                  style={{left: (100 * this.state.intent) + "%"}}>
                  <FormattedTime numSeconds={this.state.duration * this.state.intent} />
                </div>
              </Slider>
            </div>
          </div>
      </div>
  )}
}

VideoPlayer.propTypes = {
  className: PropTypes.string,
  progress: PropTypes.number

}

export default VideoPlayer