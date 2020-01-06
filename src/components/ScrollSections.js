import React, {useRef, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { withPrefix } from 'gatsby'

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
                        <section 
                          key={"ScrollSection--" + index}
                          className={
                            "ScrollSection ScrollSection--" + index
                          } 
                        >
                          <Sect sectionIndex={index} rootEl={rootEl} />
                        </section>
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