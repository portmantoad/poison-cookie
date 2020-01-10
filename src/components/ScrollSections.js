import React, {useRef, useState, useLayoutEffect} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { withPrefix } from 'gatsby'
import { PlxContext, SectionSizeContext } from '../components/contexts'
import { useWindowSize } from '@react-hook/window-size'

    


/** @jsx jsx */
import { Global, css, jsx } from '@emotion/core'


const ScrollSections = React.memo((
    { className,
      sections
    }) => {

    const [ windowWidth, windowHeight ] = useWindowSize();

    const [plxWrapEl, setPlxWrapEl] = useState();

    const sectionSize = 
      windowWidth 
      && windowHeight 
      && ((windowWidth/100*70) < (windowHeight/100*105)) 
      ? "70vw" : "105vh";

    return (
      <div className="ScrollSections">
        <Global
          styles={css`
            @media screen and (min-width: 40em) {
              @supports ((perspective: 1px) and (not (-webkit-overflow-scrolling: touch))) {
                html,body {
                  overflow: hidden;
                }
              }
            }

            .ScrollSection{
              height: ${sectionSize};
            }
          `}
        />
            <div className="ScrollSections__background" css={css(`background-image: url( ${withPrefix('/')}img/paris.jpg);`)}></div>

            <PlxContext.Provider value={plxWrapEl}>
              <SectionSizeContext.Provider value={sectionSize}>

                <div 
                  className="ScrollSections__3D-scrollbox" 
                  ref={ref => setPlxWrapEl(ref)}
                  css={css(`
                    @media screen and (min-width: 40em) {
                      @supports ((perspective: 1px) and (not (-webkit-overflow-scrolling: touch))) {
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        overflow-x: hidden;
                        overflow-y: auto;
                        perspective: 8px;
                        transform-origin: 50% 100%;
                        transform-style: preserve-3d;
                      }
                    }
                  `)}
                >
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
              </SectionSizeContext.Provider>
            </PlxContext.Provider>
       </div>

    );
});

ScrollSections.propTypes = {
  sections: PropTypes.array,
  className: PropTypes.string
}

export default ScrollSections