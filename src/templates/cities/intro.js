import React from 'react'
import VideoPlayer from '../../components/VideoPlayer'
import FixedPortal from '../../components/FixedPortal'
import CanvasBlend from '../../components/CanvasBlend'
import { Tween } from 'react-gsap'
import { clamp } from 'lodash'

import { withPrefix } from 'gatsby'


export default [

React.memo(({progress, active, foregroundPortal, backgroundPortal, midgroundPortal}) => (
  <React.Fragment>
          <FixedPortal target={midgroundPortal}>
          <div className={"Panel Transition--slow-fade" + (active ? " isActive" : "")}>

            <Tween totalProgress={progress} paused={true} ease='Cubic.easeOut'
                to={{ 
                  y: '-' + (20 / ((20 + 100)/100)) + '%', 
                  opacity: 0
                }}
              >
              <div className="Panel" style={{
                background: "url(" + `${withPrefix('/')}img/cover.png` + ")",
                backgroundSize: "cover",
                backgroundPosition: "right 25%",
                right: "calc(15% - 50px)",
                bottom: "-20%"
              }}/>
            </Tween>
            <img src={`${withPrefix('/')}img/cookietitle.png`} alt="The Poison Cookie Jar" style={{
              position: "absolute", 
              right:"5%", bottom: "5%", 
              width: "250px",
              maxWidth:"65%",
              height: "auto"}}/>

              
          </div>
        </FixedPortal>
  </React.Fragment>
)), React.memo(({progress, active, foregroundPortal, backgroundPortal, midgroundPortal}) => (
      <React.Fragment>
        <FixedPortal target={midgroundPortal}> 
            <div 
              className={"Panel Transition--crossfade" + (active ? " isActive" : "")}
              style={{background: "rgb(72, 46, 40)"}}
            >

              <VideoPlayer
                videoId="ofAfzauCdAU"
                fullscreen
                active={(progress > 0.3) && active}
              />
              <Tween totalProgress={clamp((progress - 0.1) / 0.3, 0, 1)} paused={true} to={{x: '100%'}} ease='Quint.easeInOut'>
                <div className="Panel" style={{
                  transform: "scaleX(-1)",
                  left: "50%"
                }}>
                  <img src={`${withPrefix('/')}img/curtain.png`} alt="" style={{
                    height: "100%", 
                    width: "auto", 
                    minWidth: "calc(100% + 25vh)",
                    position: "absolute", 
                    top: 0, 
                    maxWidth: "unset", 
                    right: "-25vh"
                  }} />  
                </div>
              </Tween> 
              <Tween totalProgress={clamp((progress - 0.1) / 0.3, 0, 1)} paused={true} to={{x: '-100%'}} ease='Quint.easeInOut'>
                <div className="Panel" style={{
                  right: "50%"
                }}>
                  <img src={`${withPrefix('/')}img/curtain.png`} alt="" style={{
                    height: "100%", 
                    width: "auto", 
                    minWidth: "calc(100% + 25vh)",
                    position: "absolute", 
                    top: 0, 
                    maxWidth: "unset", 
                    right: "-25vh"
                  }} />  
                </div>
              </Tween> 
            </div>
        </FixedPortal>
        <div style={{height: "calc((100vh - 48px) * 1.42857142857)"}}></div>
      </React.Fragment>
)), React.memo(({progress, active, foregroundPortal, backgroundPortal, midgroundPortal}) => (
      <React.Fragment>
        <FixedPortal target={midgroundPortal}>
            <div 
              className={"Panel Transition--crossfade" + (active ? " isActive" : "")}
              style={{background: "rgb(72, 46, 40)"}}
            >
            <VideoPlayer
              // videoId="GQPcG4D3Zno"
              videoId="TwXilp2mUtE"
              startTime={18}
              endTime={61}
              fullscreen
              active={(progress < 0.7) && active}
            />
              <Tween totalProgress={clamp((progress - 0.7) / 0.2, 0, 1)} paused={true} from={{x: '100%'}} ease='Quint.easeInOut'>
                <div className="Panel" style={{
                  transform: "scaleX(-1)",
                  left: "50%"
                }}>
                  <img src={`${withPrefix('/')}img/curtain.png`} alt="" style={{
                    height: "100%", 
                    width: "auto", 
                    minWidth: "calc(100% + 25vh)",
                    position: "absolute", 
                    top: 0, 
                    maxWidth: "unset", 
                    right: "-25vh"
                  }} />  
                </div>
              </Tween> 
              <Tween totalProgress={clamp((progress - 0.7) / 0.2, 0, 1)} paused={true} from={{x: '-100%'}} ease='Quint.easeInOut'>
                <div className="Panel" style={{
                  right: "50%"
                }}>
                  <img src={`${withPrefix('/')}img/curtain.png`} alt="" style={{
                    height: "100%", 
                    width: "auto", 
                    minWidth: "calc(100% + 25vh)",
                    position: "absolute", 
                    top: 0, 
                    maxWidth: "unset", 
                    right: "-25vh"
                  }} />  
                </div>
              </Tween> 
          </div>
      </FixedPortal>
      <div style={{height: "calc((100vh - 48px) * 1.42857142857)"}}></div>
      </React.Fragment>
)), React.memo(({progress, active, foregroundPortal, backgroundPortal, midgroundPortal}) => (
        <FixedPortal target={midgroundPortal}>
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
                scale: 1.2
              }}
            >
              <div className={"Transition--slow-fade" + (active ? " isActive" : "") }>
                quote
              </div>
            </Tween>
          </div>
        </FixedPortal>
)), React.memo(({progress, active, foregroundPortal, backgroundPortal, midgroundPortal}) => (
        <FixedPortal target={midgroundPortal}>
            <CanvasBlend 
              use="multiply" 
              active={active}
              className={"Transition--slow-fade" + (active ? " isActive" : "")}
              style={{
                position: "absolute", 
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                maxWidth: "100%", 
                maxHeight: "100%"
              }}>
              <img src={`${withPrefix('/')}img/parisCanal.jpg`} alt="" />
            </CanvasBlend>
        </FixedPortal>
)), React.memo(({progress, active, foregroundPortal, backgroundPortal, midgroundPortal}) => (
        <FixedPortal target={midgroundPortal}>
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
                scale: 1.2
              }}
            >
              <div className={"Transition--slow-fade" + (active ? " isActive" : "") }>
                Eat fast, we're off to paris
              </div>
            </Tween>
          </div>
        </FixedPortal>
))
]




// export default [
// ({progress, active, foregroundPortal, backgroundPortal, midgroundPortal}) => (
//   <React.Fragment>
//           <FixedPortal target={midgroundPortal}>
//           <div className={"Panel Transition--slow-fade" + (active ? " isActive" : "")}>

//             <Tween totalProgress={progress} paused={true}
//                 to={{ 
//                   y: '-' + (20 / ((20 + 100)/100)) + '%', 
//                   opacity: 0
//                 }}
//               >
//               <div className="Panel" style={{
//                 background: "url(" + `${withPrefix('/')}img/cover.png` + ")",
//                 backgroundSize: "cover",
//                 backgroundPosition: "right top",
//                 right: "calc(15% - 30px)",
//                 bottom: "-20%"
//               }}/>
//             </Tween>
//             <img src={`${withPrefix('/')}img/cookietitle.png`} alt="The Poison Cookie Jar" style={{
//               position: "absolute", 
//               right:"5%", bottom: "5%", 
//               width: "300px",
//               maxWidth:"65%",
//               height: "auto"}}/>

              
//           </div>
//         </FixedPortal>
//   </React.Fragment>
// ), ({progress, active, foregroundPortal, backgroundPortal, midgroundPortal}) => (
//         <FixedPortal target={midgroundPortal}> 
//             <div 
//               className={"Panel Transition--slow-fade" + (active ? " isActive" : "")}
//               style={{background: "rgb(72, 46, 40)"}}
//             >

//               <VideoPlayer
//                 videoId="ofAfzauCdAU"
//                 fullscreen
//                 active={((progress < 0.9) && (progress > 0.3)) && active}
//               />
//               <Tween totalProgress={progress / 0.3} paused={true} to={{x: '100%'}} ease='Quint.easeInOut'>
//                 <div className="Panel" style={{
//                   transform: "scaleX(-1)",
//                   left: "50%"
//                 }}>
//                   <img src={`${withPrefix('/')}img/curtain.png`} alt="" style={{
//                     height: "100%", 
//                     width: "auto", 
//                     position: "absolute", 
//                     top: 0, 
//                     maxWidth: "unset", 
//                     right: "-25vh"
//                   }} />  
//                 </div>
//               </Tween> 
//               <Tween totalProgress={progress / 0.3} paused={true} to={{x: '-100%'}} ease='Quint.easeInOut'>
//                 <div className="Panel" style={{
//                   right: "50%"
//                 }}>
//                   <img src={`${withPrefix('/')}img/curtain.png`} alt="" style={{
//                     height: "100%", 
//                     width: "auto", 
//                     position: "absolute", 
//                     top: 0, 
//                     maxWidth: "unset", 
//                     right: "-25vh"
//                   }} />  
//                 </div>
//               </Tween> 
//             </div>
//         </FixedPortal>
// ), ({progress, active, foregroundPortal, backgroundPortal, midgroundPortal}) => (
//         <FixedPortal target={midgroundPortal}>
//           <div className={"Panel Transition--slow-fade" + (active ? " isActive" : "")}
//             style={{background: "rgb(72, 46, 40)"}}> 
//             <VideoPlayer
//               videoId="GQPcG4D3Zno"
//               startTime={18}
//               endTime={61}
//               fullscreen
//               active={((progress < 0.7) && (progress > 0.1)) && active}
//             />
//             {console.log(Power2)}
//               <Tween totalProgress={clamp((progress - 0.7) / 0.3, 0, 1)} paused={true} from={{x: '100%'}} ease='Quint.easeInOut'>
//                 <div className="Panel" style={{
//                   transform: "scaleX(-1)",
//                   left: "50%"
//                 }}>
//                   <img src={`${withPrefix('/')}img/curtain.png`} alt="" style={{
//                     height: "100%", 
//                     width: "auto", 
//                     position: "absolute", 
//                     top: 0, 
//                     maxWidth: "unset", 
//                     right: "-25vh"
//                   }} />  
//                 </div>
//               </Tween> 
//               <Tween totalProgress={clamp((progress - 0.7) / 0.3, 0, 1)} paused={true} from={{x: '-100%'}} ease='Quint.easeInOut'>
//                 <div className="Panel" style={{
//                   right: "50%"
//                 }}>
//                   <img src={`${withPrefix('/')}img/curtain.png`} alt="" style={{
//                     height: "100%", 
//                     width: "auto", 
//                     position: "absolute", 
//                     top: 0, 
//                     maxWidth: "unset", 
//                     right: "-25vh"
//                   }} />  
//                 </div>
//               </Tween> 
//           </div>
//         </FixedPortal>
// ), ({progress, active, foregroundPortal, backgroundPortal, midgroundPortal}) => (
//         <FixedPortal target={midgroundPortal}>
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
//                 quote
//               </div>
//             </Tween>
//           </div>
//         </FixedPortal>
// ), ({progress, active, foregroundPortal, backgroundPortal, midgroundPortal}) => (
//         <FixedPortal target={midgroundPortal}>
//             <CanvasBlend 
//               use="multiply" 
//               active={active}
//               className={"Transition--slow-fade" + (active ? " isActive" : "")}
//               style={{
//                 position: "absolute", 
//                 top: "50%",
//                 left: "50%",
//                 transform: "translate(-50%, -50%)",
//                 maxWidth: "100%", 
//                 maxHeight: "100%"
//               }}>
//               <img src={`${withPrefix('/')}img/parisCanal.jpg`} alt="" />
//             </CanvasBlend>
//         </FixedPortal>
// ), ({progress, active, foregroundPortal, backgroundPortal, midgroundPortal}) => (
//         <FixedPortal target={midgroundPortal}>
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
//                 Eat fast, we're off to paris
//               </div>
//             </Tween>
//           </div>
//         </FixedPortal>
// )
// ]
