import React from 'react'
import PropTypes from 'prop-types'
import { Tween, Timeline } from 'react-gsap';

class Slideshow extends React.PureComponent {
  render() {
    const {
      className,
      progress,
      active
    } = this.props;

    return (
      <div className={"Slideshow" + (active ? " isActive" : "") + (className ? ` ${className}` : "")}>
        <style dangerouslySetInnerHTML={{__html: `
           .Slideshow{ position: fixed; top: 45%; left: 0; width: 100%; text-align: center}
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
            <div className={"slowfade" + (active ? " isActive" : "") }>
              Eat my shorts <br />{progress}
            </div>
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