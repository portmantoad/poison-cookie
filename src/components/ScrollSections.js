import React, {useRef, useState, useLayoutEffect} from 'react'
import PropTypes from 'prop-types'
import { withPrefix } from 'gatsby'

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

// import {useSpring, animated} from 'react-spring'
// import { throttle } from 'lodash'
// import {Parallax, ParallaxLayer} from 'react-spring/renderprops-addons'
// import {Spring} from 'react-spring/renderprops'


// function rafThrottle(fn) { 
//   var busy = false;
//   return function() { 
//     if (busy) return;
//     busy = true; 
//     fn.apply(this, arguments); 
//     window.requestAnimationFrame(function() {
//       busy = false;
//     });
//   };
// };


const ScrollSections = React.memo((
    { className,
      sections
    }) => {

    const [rootEl, setRootEl] = useState();

    // const [{ offset }, set] = useSpring(() => ({ offset: 0}));


    // const handleScroll = 
    //   rafThrottle(
    //     // throttle(
    //       () => {
    //         const offset = window.pageYOffset;
    //         set({ offset });
    //       }
    //     // , 100)
    //   )

    // useLayoutEffect(() => {
    //   window.addEventListener('scroll', handleScroll, { passive: true });

    //   return () => {
    //     window.removeEventListener('scroll', handleScroll, { passive: true });
    //   };
    // }, []);

    return (
      <div className="ScrollSections" 
      // css={css(` height: calc((100vh - 40px) * ${sections.length});`)}
      >

            <div className="ScrollSections__parallax ScrollSections__parallax--background" >
              <div className="ScrollSections__background" css={css(`
                background-image: url( ${withPrefix('/')}img/paris.jpg);
                height: calc((100vh - 40px) * ${sections.length} / 51 * 3);
                `)}></div>
            </div>
            <div 
                ref={ref => setRootEl(ref)} 
                className="ScrollSections__parallax ScrollSections__parallax--slow"
            />
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
       </div>

    );
});

ScrollSections.propTypes = {
  sections: PropTypes.array,
  className: PropTypes.string
}

export default ScrollSections