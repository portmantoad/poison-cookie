import React, {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import FixedPortal from './FixedPortal'
import { clamp } from 'lodash'
import Lethargy from './Lethargy'

// import TweenMax from 'TweenMax';

const SlideSections = React.memo(({className, sections}) => {
 
    const backgroundPortalRef = useRef();
    const foregroundPortalRef = useRef();
    const UIPortalRef = useRef();

    const [activeSection, setActiveSectionDirectly] = useState(0);

    const setActiveSection = (input) => {
      if (input === "prev") {
        setActiveSectionDirectly(section => Math.max(section - 1, 0));
      } else if (input === "next") {
        setActiveSectionDirectly(section => Math.min(section + 1, sections.length - 1));
      } else {
        setActiveSectionDirectly(clamp(input, 0, sections.length - 1));
      }
    }
    
    const handleKeydown = event => {
      if (event.isComposing || event.keyCode === 229) {
        return;
      }
      //right arrow
      if (event.keyCode === 39) {
        setActiveSection("next");
      }
      //left arrow
      if (event.keyCode === 37) {
        setActiveSection("prev");
      }
      //spacebar
      if(event.keyCode === 32) {
        event.preventDefault();
        setActiveSection("next");
      }
    }

    const handleScroll = event => {
      console.log("scroll");
      event.preventDefault()
      event.stopPropagation();
      const movement = Lethargy.check(event);
      if (movement === 1) {
        setActiveSection("prev");
      } else if (movement === -1) {
        setActiveSection("next");
      }
    }

    useEffect(() => {
      window.addEventListener("keydown", handleKeydown);
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("keydown", handleKeydown);
        window.removeEventListener("scroll", handleScroll);
      }
    }, [])

    return (
      <div className={"SlideSections" + (className ? ` ${className}` : "")}>

        <div className="SlideSections__fixedRoot SlideSections__fixedRoot--background" ref={backgroundPortalRef} />
        <div className="SlideSections__fixedRoot SlideSections__fixedRoot--midground">
          {sections &&
            sections.map((Sect, index) => {
              const active = activeSection === index;
              return (
                  <Sect 
                    key={"SlideSection--" + index}
                    sectionIndex={index}
                    activeIndex={activeSection} 
                    active={active}
                    foregroundPortal={foregroundPortalRef.current} 
                    backgroundPortal={backgroundPortalRef.current} 
                    setActiveSection={setActiveSection}
                  />
            )})
          }
        </div>
        <div className="SlideSections__fixedRoot SlideSections__fixedRoot--foreground" ref={foregroundPortalRef} />
        <div className="SlideSections__fixedRoot SlideSections__fixedRoot--UI" ref={UIPortalRef}>
          <div className={"SlideSections__prevButton" + (activeSection !== 0 ? ' isActive' : '')} onClick={() => setActiveSection("prev")}></div>
          <div className={"SlideSections__nextButton" + (activeSection !== sections.length - 1 ? ' isActive' : '')} onClick={() => setActiveSection("next")}></div>
          <div className="SlideSections__pageCount">{activeSection + 1}/{sections.length}</div>
        </div>
      </div>
    );
});


SlideSections.propTypes = {
  sections: PropTypes.array,
  className: PropTypes.string
}

export default SlideSections