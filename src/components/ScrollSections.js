import React from 'react'
import PropTypes from 'prop-types'
import Slideshow from './Slideshow'
import Video from './Slideshow'
import { Controller, Scene } from 'react-scrollmagic'
import ResizeDetector from 'react-resize-detector'

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
    const {
      className,
      sections
    } = this.props;

    return (
      <div className={"ScrollSections" + (className ? ` ${className}` : "")}>
        <Controller>
          {sections &&
            sections.map((section, index) => {
              return(
                <Scene key={"ScrollSections__section--" + index} duration={this.state["sectionLength" + index] || "100%"} classToggle='yellow'>
                  {(progress, event) => (
                    <section className={"ScrollSections__section ScrollSections__section--" + index}> 
                      <SectionComponent {...section} progress={progress} />
                      <ResizeDetector handleHeight onResize={(width, height) => {
                        this.setState({ ["sectionLength" + index]: height })
                      }} />
                    </section>
                  )}
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