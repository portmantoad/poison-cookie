import React, {useRef, useState, useLayoutEffect} from 'react'
import PropTypes from 'prop-types'
import { withPrefix } from 'gatsby'

import {useSpring, animated} from 'react-spring'
import { throttle } from 'lodash'
// import {Parallax, ParallaxLayer} from 'react-spring/renderprops-addons'
// import {Spring} from 'react-spring/renderprops'


function rafThrottle(fn) { 
  var busy = false;
  return function() { 
    if (busy) return;
    busy = true; 
    fn.apply(this, arguments); 
    window.requestAnimationFrame(function() {
      busy = false;
    });
  };
};


const ScrollSections = React.memo((
    { className,
      sections
    }) => {

    const [rootEl, setRootEl] = useState();

    const [{ offset }, set] = useSpring(() => ({ offset: 0}));


    const handleScroll = 
      rafThrottle(
        // throttle(
          () => {
            const offset = window.pageYOffset;
            set({ offset });
          }
        // , 100)
      )

    useLayoutEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        window.removeEventListener('scroll', handleScroll, { passive: true });
      };
    }, []);

    return (
      <div className="ScrollSections">
        <div className="ScrollSections__background" style={{ backgroundImage: "url(" + `${withPrefix('/')}img/paris.jpg` + ")"}}></div>
            <animated.div 
                ref={ref => setRootEl(ref)} 
                style={{
                  position: 'fixed',
                  backgroundSize: 'auto',
                  backgroundRepeat: 'no-repeat',
                  willChange: 'transform',
                  width: '100%',
                  transition: 'transform 100ms',
                  height: `calc((100vh - 40px) * ${sections.length * 0.8})`,
                  transform: offset.interpolate(o => `translateY(${o * -0.8}px)`)
                }}
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