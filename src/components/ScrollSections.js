import React, {useRef, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { withPrefix } from 'gatsby'

// import {config} from 'react-spring/renderprops'
import {Parallax, ParallaxLayer} from 'react-spring/renderprops-addons'

const ScrollSections = React.memo((
    { className,
      sections
    }) => {

    const [rootEl, setRootEl] = useState();

    return (
      <div className="ScrollSections">
        <div className="ScrollSections__background" style={{ backgroundImage: "url(" + `${withPrefix('/')}img/paris.jpg` + ")"}}></div>

        <Parallax pages={sections.length}>
            <div ref={ref => setRootEl(ref)} />
            {sections &&
              sections.map((Sect, index) => {
                      return (
                        <ParallaxLayer 
                          key={"ScrollSection--" + index}
                          className={
                            "ScrollSection ScrollSection--" + index
                          } 
                          offset={index}
                        >
                          <Sect sectionIndex={index} rootEl={rootEl} />
                        </ParallaxLayer>
                    )})
            }       
         </Parallax>
       </div>

    );
});

ScrollSections.propTypes = {
  sections: PropTypes.array,
  className: PropTypes.string
}

export default ScrollSections