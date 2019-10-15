import React from 'react'
import PropTypes from 'prop-types'
import { Tween, Timeline } from 'react-gsap';

class Slideshow extends React.PureComponent {
  render() {
    const {
      className,
      progress
    } = this.props;

    return (
      <div className={"Slideshow fade" + (className ? ` ${className}` : "")}>
        <style dangerouslySetInnerHTML={{__html: `
           .Slideshow{ position: fixed; top: 45%; left: 0; width: 100%; text-align: center}
           .slowfade{
            opacity:0;
            transition: opacity 1000ms;
           }
           .isActive .slowfade{ 
            opacity: 1;
           }
           .Slideshow__timeIndicator{
             height: 100vh;
             position:fixed;
             top:0;
             left:0;
           }
           .Slideshow__timeIndicator:after{
                content:'';
                display:block;
                width:8px;
                height:10%;
                position:absolute;
                top:45%;
                left:2px;
                border-radius: 5px;
                background-color: rgba(0,0,0,0.6);
                background-clip: padding-box;
                border:1px solid rgba(255,255,255,0.3);
           }
         `}} />
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
            <div className="slowfade">
              Eat my shorts <br />{progress}
            </div>
          </Tween>
          <Tween
          ease="linear"
          position="0"
            from={{
              y: '55%',
            }}
            to={{
              y: '-55%'
            }}>
            <div className="Slideshow__timeIndicator"></div>
          </Tween>
        </Timeline>
      </div>
  )}
};

// const Slideshow = ({className, progress}) => {
//   return (

//   )};

Slideshow.propTypes = {
  className: PropTypes.string,
  progress: PropTypes.number

}

export default Slideshow