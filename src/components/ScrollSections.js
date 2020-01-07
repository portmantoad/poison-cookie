import React, {useRef, useState, useLayoutEffect} from 'react'
import PropTypes from 'prop-types'
import { withPrefix } from 'gatsby'
import { PlxContext } from '../components/contexts'
    


/** @jsx jsx */
import { css, jsx } from '@emotion/core'


const ScrollSections = React.memo((
    { className,
      sections
    }) => {

    const [plxSlowEl, setPlxSlowEl] = useState();
    const [plxFastEl, setPlxFastEl] = useState();

    return (
      <div className="ScrollSections">
            <div className="ScrollSections__background" css={css(`background-image: url( ${withPrefix('/')}img/paris.jpg);`)}></div>

            <PlxContext.Provider value={{slow: plxSlowEl, fast: plxFastEl}}>
              <div className="ScrollSections__3D-scrollbox">
                <div 
                    ref={ref => setPlxSlowEl(ref)} 
                    className="ScrollSections__parallax ScrollSections__parallax--slow"
                />
                <div className="ScrollSections__normalScroll">
                  {sections &&
                    sections.map((Sect, index) => {
                            return (
                              <section 
                                key={"ScrollSection--" + index}
                                className={
                                  "ScrollSection ScrollSection--" + index
                                } 
                              >
                                <Sect sectionIndex={index} />
                              </section>
                          )})
                  } 
                </div>
                <div 
                    ref={ref => setPlxFastEl(ref)} 
                    className="ScrollSections__parallax ScrollSections__parallax--fast"
                />      
              </div>
            </PlxContext.Provider>
       </div>

    );
});

ScrollSections.propTypes = {
  sections: PropTypes.array,
  className: PropTypes.string
}

export default ScrollSections