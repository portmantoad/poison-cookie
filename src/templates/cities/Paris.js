import React from 'react'
import VideoPlayer from '../../components/VideoPlayer'
import FixedPortal from '../../components/FixedPortal'
import { Tween } from 'react-gsap'

class section1 extends React.PureComponent {
  render(){
    const {progress, active, foregroundPortal, backgroundPortal} = this.props;
    return(
        <FixedPortal target={backgroundPortal}>
          <div style={{
            position: "absolute", 
            top:0, left:0, bottom:0, right:0, 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            textAlign: "center"
          }} >
            <Tween totalProgress={progress} paused={true}
              from={{
                y: '120%',
              }}
              to={{
                y: '-120%',
                scale: 1.3
              }}
            >
              <div className={"Transition--slow-fade" + (active ? " isActive" : "") }>
                Eat my shorts
              </div>
            </Tween>
          </div>
        </FixedPortal>
    )
  }
}

class section2 extends React.PureComponent {
  render(){
    const {active, foregroundPortal, backgroundPortal} = this.props;
    return(
        <FixedPortal target={backgroundPortal}>   
              <VideoPlayer
                videoId="VahZrbh8UZU"
                fullscreen
                active={active}
              />
        </FixedPortal>
    )
  }
}

class section3 extends React.PureComponent {
  render(){
    const {active, foregroundPortal, backgroundPortal} = this.props;
    return(
        <FixedPortal target={backgroundPortal}>
            <VideoPlayer
              videoId="CJHK5SWJu0k"
              fullscreen
              active={active}
            />
        </FixedPortal>
    )
  }
}

class section4 extends React.PureComponent {
  render(){
    const {active, foregroundPortal, backgroundPortal} = this.props;
    return(
        <FixedPortal target={backgroundPortal}>
            <VideoPlayer
              videoId="iOL8w2ZNOJY"
              fullscreen
              active={active}
            />
        </FixedPortal>
    )
  }
}

export default [section1, section2, section3, section1, section4, section1]




// export default [
// ({progress, active, foregroundPortal, backgroundPortal}) => (
//         <FixedPortal target={backgroundPortal}>
//           <div style={{
//             position: "absolute", 
//             top:0, left:0, bottom:0, right:0, 
//             display: "flex", 
//             alignItems: "center", 
//             justifyContent: "center", 
//             textAlign: "center"
//           }} >
//             <Tween totalProgress={progress} paused={true}
//               from={{
//                 y: '120%',
//               }}
//               to={{
//                 y: '-120%',
//                 scale: 1.2
//               }}
//             >
//               <div className={"Transition--slow-fade" + (active ? " isActive" : "") }>
//                 Eat my shorts
//               </div>
//             </Tween>
//           </div>
//         </FixedPortal>
// ), ({progress, active, foregroundPortal, backgroundPortal}) => (
//         <FixedPortal target={backgroundPortal}>   
//               <VideoPlayer
//                 videoId="VahZrbh8UZU"
//                 fullscreen
//                 active={active}
//                 scrollProgress={progress}
//               />
//         </FixedPortal>
// ), ({progress, active, foregroundPortal, backgroundPortal}) => (
//         <FixedPortal target={backgroundPortal}>
//             <VideoPlayer
//               videoId="CJHK5SWJu0k"
//               fullscreen
//               active={active}
//               scrollProgress={progress}
//             />
//         </FixedPortal>
// ), ({progress, active, foregroundPortal, backgroundPortal}) => (
//         <FixedPortal target={backgroundPortal}>
//             <VideoPlayer
//               videoId="iOL8w2ZNOJY"
//               fullscreen
//               active={active}
//               scrollProgress={progress}
//             />
//         </FixedPortal>
// ), ({progress, active, foregroundPortal, backgroundPortal}) => (
//         <FixedPortal target={backgroundPortal}>
//           <Tween totalProgress={progress} paused={true} 
//               from={{
//                 y: '120%',
//               }}
//               to={{
//                 y: '-120%',
//                 scale: 1.2
//               }}
//             >
//               <div className={"Transition--slow-fade" + (active ? " isActive" : "") }>
//                 Eat my shorts <br />{progress}
//               </div>
//           </Tween>
//         </FixedPortal>
// )
// ]
