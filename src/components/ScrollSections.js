import React, {useRef, useState, useEffect, useCallback} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { withPrefix } from 'gatsby'
import { PlxContext } from '../components/contexts'
import { useWindowSize } from '@react-hook/window-size'
import {useSpring, animated} from 'react-spring'
// import { useInView } from 'react-intersection-observer'
import { debounce } from 'lodash'

/** @jsx jsx */
import { Global, css, jsx } from '@emotion/core'


const ScrollSections = React.memo((
    { className,
      sections
    }) => {

    const [ windowWidth, windowHeight ] = useWindowSize();

    const [plxWrapEl, setPlxWrapEl] = useState();
    const [progress, setProgress] = useSpring(() => ({width: '0%'}));

    const sectionSize = 
      windowWidth 
      && windowHeight 
      && ((windowWidth/100*120) < (windowHeight/100*115)) 
      ? "120vw" : "115vh"; // don't change these without changing the logic above

    return (
      <div className="ScrollSections" css={css(`
          @media screen and (min-width: 40em) {
              @supports ((perspective: 1px) and (not (-webkit-overflow-scrolling: touch))) {
                bottom: 0;
                transform: translateZ(0);
              }
            }
      `)}>
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
              min-height: ${sectionSize};
            }
          `}
        />
            
            

            <PlxContext.Provider value={plxWrapEl}>
                <div 
                  className="ScrollSections__3D-scrollbox" 
                  onScroll={e => {
                    setProgress({width: (e.target.scrollTop/(e.target.scrollHeight - e.target.offsetHeight) * 100) + '%'})
                  }}
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

                          const sectionRef = useRef();

                          const setRefs = useCallback(
                            node => {
                              sectionRef.current = node;
                              updateDimensions();
                            },
                          );

                          const [dimensions, setDimensions] = React.useState({ 
                            height: 0,
                            top: 2000
                          });

                          const updateDimensions = debounce(() => {
                            setDimensions( prevDimensions => {
                              const height = sectionRef.current.offsetHeight;
                              const top = sectionRef.current.offsetTop;

                              if (prevDimensions.top !== top || prevDimensions.height !== height) {
                                return {
                                  height: height,
                                  top: top
                                }
                              } else {
                                return prevDimensions;
                              }
                            });
                          }, 15)

                          useEffect(() => {
                            window.addEventListener('resize', updateDimensions)
                            return _ => {
                              window.removeEventListener('resize', updateDimensions)
                            }
                          },[])

                          const [containerCss, setContainerCss] = useState('');

                          const output = (
                                <section 
                                  ref={setRefs}
                                  key={"ScrollSection--" + index}
                                  className={
                                    "ScrollSection ScrollSection--normalScroll ScrollSection--" + index
                                  } 
                                  css={css(`${containerCss}`)}
                                >
                                  <Sect 
                                    sectionIndex={index} 
                                    dimensions={dimensions} 
                                    setContainerCss={setContainerCss}
                                  />
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

            <animated.div className="ScrollSections__progress" style={progress} />
       </div>

    );
});

ScrollSections.propTypes = {
  sections: PropTypes.array,
  className: PropTypes.string
}

export default ScrollSections