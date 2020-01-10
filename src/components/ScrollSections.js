import React, {useRef, useState, useLayoutEffect} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { withPrefix } from 'gatsby'
import { PlxContext } from '../components/contexts'
    


/** @jsx jsx */
import { css, jsx } from '@emotion/core'


const ScrollSections = React.memo((
    { className,
      sections
    }) => {

    const [plxWrapEl, setPlxWrapEl] = useState();

    return (
      <div className="ScrollSections">
            <div className="ScrollSections__background" css={css(`background-image: url( ${withPrefix('/')}img/paris.jpg);`)}></div>

            <PlxContext.Provider value={plxWrapEl}>
              <div className="ScrollSections__3D-scrollbox" ref={ref => setPlxWrapEl(ref)}>
                  {sections &&
                    sections.map((Sect, index) => {

                        const output = (
                              <section 
                                key={"ScrollSection--" + index}
                                className={
                                  "ScrollSection ScrollSection--normalScroll ScrollSection--" + index
                                } 
                              >
                                <Sect sectionIndex={index} />
                              </section>
                          );

                      if (plxWrapEl) {
                        return ReactDOM.createPortal( output, plxWrapEl)
                      } else {
                        return output
                      }
                    })
                  } 
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