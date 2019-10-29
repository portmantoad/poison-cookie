import React from 'react'
import PropTypes from 'prop-types'
import YouTubePlayer from 'react-player/lib/players/YouTube'
import { Slider, FormattedTime, PlayerIcon } from 'react-player-controls'
import { Tween } from 'react-gsap'


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
      intentActive: false
    };

    if (this.props.active) {
      this.play();
    }

  }

  handleInitialScrollEnd = event => {
    window.clearTimeout(this.isScrolling);
    this.isScrolling = setTimeout(() => {
      this.play()
    }, 200);
  };

  componentDidUpdate(nextProps) {
   const { active } = this.props
   if (nextProps.active !== active) {
    if (active) {
      this.handleInitialScrollEnd();
      window.addEventListener('scroll', this.handleInitialScrollEnd , false);
    } else {
      this.pauseFade()
      setTimeout(this.pause, 1000);
    }
   }
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleInitialScrollEnd , false);
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
    const vid = this.player;
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
    const vid = this.player;
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

  render() {
    const {
      className,
      fullscreen,
      active,
      videoId,
      scrollProgress,
      ...rest
    } = this.props;

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
        
        <div className="Video__wrapper">
          <YouTubePlayer
            ref={this.ref}
            url={'https://www.youtube.com/watch?v=' + videoId}
            volume={this.state.volume}
            controls={false}
            className="Video__wrapper__ytEmbed"
            width="100%"
            height="200%"
            playsinline
            playing={this.state.playing}
            onProgress={({played, loaded}) => {this.setState({played: played, loaded: loaded})}}
            onPlay={()=>{
              this.setState({onPlayInitialTimeout:
                setTimeout( () => {
                  this.setState({onPlayInitialTimeout: false})
                }, 3000)})
            }}
            onPause={() => {this.setState({playing: false})}}
            onEnded={() => {
              this.setState({playing: false})
              this.player && this.player.seekTo(0)
            }}
            onDuration={duration => {
              this.setState({duration: duration})
            }}
            progressInterval={100}
          />
          <div className={"Video__wrapper__playButton" + (!this.state.playing ? " isActive" : "")}><PlayerIcon.Play /></div>
          <div 
            className={"Video__controls" + (this.state.duration && (this.state.controlsHovered || this.state.onPlayInitialTimeout || !this.state.playing) ? " isActive" : "")} 
            onMouseOver={() => this.setState({controlsHovered: true}, () => console.log(this.state.controlsHovered))} 
            onMouseLeave={() => this.setState({controlsHovered: false})}
          >
            <div className="Video__controls__playToggle" onClick={this.playToggle}>
              {this.state.playing ? <PlayerIcon.Pause /> : <PlayerIcon.Play />}
            </div>
            <div className="Video__controls__time">
              <FormattedTime numSeconds={this.state.duration * this.state.played} />/<FormattedTime numSeconds={this.state.duration} />
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
                  this.player && this.player.seekTo(endValue)
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
      </div>
  )}
}

VideoPlayer.propTypes = {
  className: PropTypes.string,
  progress: PropTypes.number

}

export default VideoPlayer