import React from 'react'
import PropTypes from 'prop-types'
import Slideshow from './Slideshow'
import Video from './Slideshow'
import { Controller, Scene } from 'react-scrollmagic'
import ResizeDetector from 'react-resize-detector'
import { Tween, Timeline } from 'react-gsap';

const Components = {
  Slideshow,
  Video
};

const SectionComponent = (props) => {
  let Component = Components[ props.component ];
  return (<Component { ...props } />);
};

class ScrollSections extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
 
    this.state = {};
  }

  render() {
    console.log(this.state);
    const {
      className,
      sections,
      background = 'https://picsum.photos/id/434/3000/2500'
    } = this.props;

    return (
      <div className={"ScrollSections" + (className ? ` ${className}` : "")}>
        <style dangerouslySetInnerHTML={{__html: `
          .ScrollSections {position: absolute; top: 0; left: 0; width: 100%;}
          .ScrollSections__visibleHeightDetector{
            height: 100vh;
            position: absolute;
          }
          .ScrollSections__background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 105%;
            background-size: cover;
            opacity:0.1;
          }
          .ScrollSections__section {
            opacity: 0; 
            transition: opacity 250ms; 
            display: flex; 
            align-items: center; 
            justify-content:center;
            position: relative;
            min-height: 100vh;
          }
          .ScrollSections__section.isActive { opacity: 1;}
          .Slideshow{
            position: fixed;
            top:50%;
            left:50%;
            transform: translate(-50%, -50%);
          }
        `}} />

        <ResizeDetector handleHeight onResize={(width, height) => {
          this.setState({ totalHeight: height })
        }} />

        <div className="ScrollSections__visibleHeightDetector">
          <ResizeDetector handleHeight onResize={(width, height) => {
            const newState = {visibleHeight: height};
            if (sections) {
              for (var i = sections.length - 1; i >= 0; i--) {
                if (!this.state["sectionHeight" + i] 
                  || this.state["sectionHeight" + i] == this.state.visibleHeight
                ) {
                  newState["sectionHeight" + i] = height;
                }
              }
            }
            this.setState(newState);
            console.log(newState);
          }} /> 
        </div>

        <Controller>
          <Scene duration={this.state.totalHeight - this.state.visibleHeight || "100%"} triggerHook="onLeave">
            <Timeline>
              <Tween
              position="0"
                from={{
                  y: '0%',
                }}
                to={{
                  y: '-' + (5 / (105/100)) + '%',
                }}
              >
                <div className="ScrollSections__background" style={{background: "url(" + background + ")"}}>
                
                </div>
              </Tween>
            </Timeline>
          </Scene>

          {sections &&
            sections.map((section, index) => {
              return(
                <Scene 
                  key={"ScrollSections__section--" + index} 
                  duration={
                    this.state["sectionHeight" + index] 
                    || this.state.visibleHeight 
                    || "100%"
                  } 
                  classToggle="isActive"
                >
                    <section className={"ScrollSections__section ScrollSections__section--" + index} style={{minHeight: "100vh"}}>
                      <SectionComponent {...section} />
                      <ResizeDetector handleHeight onResize={(width, height) => {
                        if (this.state["sectionHeight" + index] !== height) {
                          this.setState({ ["sectionHeight" + index]: height })
                          console.log("sectionRender" + index);
                        }
                      }} />
                    </section>
                </Scene>
                      
                    
              )
            })
          }
          </Controller>
      </div>
    );
  }
}


ScrollSections.propTypes = {
  sections: PropTypes.array,
  className: PropTypes.string
}

export default ScrollSections