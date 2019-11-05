import React from 'react'
import PropTypes from 'prop-types'
import VideoPlayer from './VideoPlayer'
import ResizeDetector from 'react-resize-detector'
import FixedPortal from './FixedPortal'
import ParisBG from '../img/paris.jpg'
import { clamp, throttle, isEqual } from 'lodash'

import TweenMax from 'TweenMax';
import ScrollMagic from 'ScrollMagic';
import 'animation.gsap';
import 'debug.addIndicators';


class ScrollSections extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
 
    this.backgroundPortalRef = React.createRef();
    this.midgroundPortalRef = React.createRef();
    this.foregroundPortalRef = React.createRef();

    this.state = {
      // scrollTop: 0
      sectionActive0: true
    };

    this.registeredAnimations = [];
    this.controller = new ScrollMagic.Controller();
  }

  UNSAFE_componentWillMount() {
    if (typeof window !== `undefined`) {
      this.handleScrollThrottled();
      window.addEventListener('scroll', this.handleScrollThrottled , {passive: true});
    }

    this.registerAnimation({
      key: "bgAnim",
      // elementSelector: ".ScrollSections__background", 
      sectionIndex: 0, 
      // fromState: {y: '0%'}, 
      // toState: {y: '-' + (20 / ((20 + 100)/100)) + '%', ease: "Linear.easeNone"}, 
      tween: () => TweenMax.to(".ScrollSections__background", 1, {y: '-' + (20 / ((20 + 100)/100)) + '%', ease: "Linear.easeNone"}),
      // classToggle, 
      persist: this.props.sections.length - 1, 
      // start = 0, 
      // end = 1
    });
  }

  getAnimationSpan = (sectionIndex, persist) => {
    let span = 0
    for (let i = sectionIndex; i <= (sectionIndex + persist); i++) {
      span += this.state["sectionHeight" + i];
    }
    if (isNaN(span)) {
      return undefined
    }
    return span;
  }

  registerAnimation = (props) => {
    const anim = this.registeredAnimations.find(anim => { return anim.key === props.key});
    if (anim) {
      for (const prop of Object.keys(props)) {
        if (!isEqual(prop.prop, anim.prop)) {
          anim.prop = props.prop
        }
      }
      this.updateAnimation(anim.key);
      return
    }
    this.registeredAnimations.push({
      ...props,
      currentAnimation: this.mountAnimation(props)
    })
  }

  mountAnimation = ({key, sectionIndex, tween, classToggle, persist = 0, start = 0, end = 1}) => {
    let animationSpan = persist && persist >= 1 
    ? this.getAnimationSpan(sectionIndex, persist)
    : this.state['sectionHeight' + sectionIndex];

    if (!animationSpan) {
      setTimeout(() => this.updateAnimation(key),100);
      return
    }

    animationSpan = animationSpan;

    const scene = new ScrollMagic.Scene({
      triggerElement: ".ScrollSection--" + sectionIndex,
      duration: animationSpan * (end - start),
      offset: animationSpan * start,
    })

    if (tween) {
      scene.setTween(tween())
    }

    if (classToggle) {
      scene.setClassToggle(classToggle[0], classToggle[1])
    }
    
    return scene.addTo(this.controller);
  }

  updateAnimation = (key) => {
    if (key === 'bgAnim') console.log("updateAnimation: " + key);
    const anim = this.registeredAnimations.find(a => { return a.key === key});

    if (!anim) { return }

    const {sectionIndex, tween, classToggle, persist, start, end, currentAnimation} = anim;

    if (!currentAnimation) {
      anim.currentAnimation = this.mountAnimation(anim);
      return
    }

    const animationSpan = persist && persist >= 1 
    ? this.getAnimationSpan(sectionIndex, persist)
    : this.state['sectionHeight' + sectionIndex];

    const newTrigger = ".ScrollSection--" + sectionIndex;
    if (newTrigger !== currentAnimation.triggerElement()) {
      currentAnimation.triggerElement(newTrigger);
    }

    const newDuration = animationSpan * (end - start);
    if (!isNaN(newDuration) && newDuration !== currentAnimation.duration()) {
      currentAnimation.duration(newDuration);
      // console.log(newDuration)
    }

    const newOffset = animationSpan * start;
    if (!isNaN(newOffset) && newOffset !== currentAnimation.offset()) {
      currentAnimation.offset(newOffset);
    }

    // if (tween) {
    //   currentAnimation.setTween(tween())
    // }

    // if (classToggle) {
    //   currentAnimation.setClassToggle(classToggle[0], classToggle[1])
    // }
    
    return currentAnimation;

  }


  handleResize = () => {
    // console.log(this.registeredAnimations);
    for (const anim of this.registeredAnimations) {
      this.updateAnimation(anim.key);
    }
  }

  handleResizeThrottled = throttle(() => {
    if (this.resizeTimeout) {
      window.cancelAnimationFrame(this.resizeTimeout);
    }
    this.resizeTimeout = window.requestAnimationFrame(this.handleResize);
  }, 100).bind(this);

  getSectionOffset = (index) => {
    let offset = 0;
    for (let i = 0; i < index; i++) {
      offset += this.state["sectionHeight" + i];
    }
    return offset;
  }

  handleScroll = () => {
    if (isNaN(this.state.totalHeight) || isNaN(this.state.visibleHeight)) {
      this.handleScrollThrottled();
      return false;
    }

    const scrollTop = clamp((document.documentElement.scrollTop || document.body.scrollTop), 0, this.state.totalHeight);
    // const topPad = this.state.visibleHeight / 2;
    const newState = {};

    for (let i = 0; i < this.props.sections.length; i++) {
      const height = this.state["sectionHeight" + i];

      if (isNaN(height)) {
        this.handleScrollThrottled();
        return false;
      }

      const offset = this.getSectionOffset(i);

      if (scrollTop >= offset && (scrollTop - offset) <= height) {
        newState['sectionProgress' + i] = (scrollTop - offset) / height;
        if (!this.state['sectionActive' + i]) {
          newState['sectionActive' + i] = true;
        }
      } else if (this.state['sectionActive' + i]) {
        newState['sectionActive' + i] = false;
      }
    }

    // newState.totalProgress = scrollTop / this.state.totalHeight;

    this.setState(newState);

  }

  handleScrollThrottled = throttle(() => {
    if (this.scrollTimeout) {
      window.cancelAnimationFrame(this.scrollTimeout);
    }
    this.scrollTimeout = window.requestAnimationFrame(this.handleScroll);
  }, 100);

  componentWillUnmount(){
    if (typeof window !== `undefined`) {
      window.removeEventListener('scroll', this.handleScrollThrottled , {passive: true});
      window.cancelAnimationFrame(this.scrollTimeout);
    }
  }

  render() {
    const {
      className,
      sections,
      background = ParisBG
    } = this.props;

    return (
      <div 
        className={"ScrollSections" + (className ? ` ${className}` : "")}
        style={{padding: (this.state.visibleHeight/2) + "px 0 " + (this.state.visibleHeight/2 - 1) + "px"}}
      >

        <ResizeDetector refreshMode='debounce' handleHeight onResize={(width, height) => {
          this.setState({ totalHeight: height })
          this.handleResizeThrottled();
        }} />

       <div className="ScrollSections__fixedRoot ScrollSections__fixedRoot--background" ref={this.backgroundPortalRef}>
         <div 
           className="ScrollSections__background"
           style={{
             backgroundImage: "url(" + background + ")",
             height: (20 + 100) + "%"
           }}></div>

          <ResizeDetector refreshMode='debounce' handleHeight onResize={(width, height) => {
            this.setState({visibleHeight: height});
            this.handleResizeThrottled();
          }} /> 
        </div>

        <div className="ScrollSections__fixedRoot ScrollSections__fixedRoot--midground" ref={this.midgroundPortalRef} />

          {sections &&
            sections.map((Sect, index) => {
                    const active = this.state["sectionActive" + index];
                    return (
                      <section 
                        key={"ScrollSection--" + index}
                        className={
                          "ScrollSection ScrollSection--" + index + (active ? " isActive" : "")
                        } style = {{
                          ...(this.state.visibleHeight ? {minHeight: this.state.visibleHeight} : {})
                        }}
                      >
                        <Sect 
                          progress={this.state["sectionProgress" + index]} 
                          registerAnimation={this.registerAnimation.bind(this)}
                          sectionIndex={index}
                          active={active} 
                          foregroundPortal={this.foregroundPortalRef.current} 
                          backgroundPortal={this.backgroundPortalRef.current} 
                          midgroundPortal={this.midgroundPortalRef.current} 
                        />
                        <div className="ScrollSection__timeIndicator"></div>

                        <ResizeDetector refreshMode='debounce' handleHeight onResize={(width, height) => {
                          if (this.state["sectionHeight" + index] !== height) {
                            this.setState({ ["sectionHeight" + index]: height }, ()=>{

                              const heightDiff = this.state.visibleHeight
                              ? (height - this.state.visibleHeight) / 2
                              : 0;

                              if (heightDiff) {
                                // console.log("registerAnimation")
                                this.registerAnimation({
                                  key: ".ScrollSection__timeIndicator--" + index,
                                  sectionIndex: index, 
                                  tween: () => TweenMax.fromTo(".ScrollSection--" + index + " .ScrollSection__timeIndicator", 1, {y: -heightDiff}, {y: heightDiff, ease: "Linear.easeNone"}), 
                                  // classToggle, 
                                  // persist: 0, 
                                  // start = 0, 
                                  // end = 1
                                });
                              }
                            });
                            this.handleResizeThrottled();
                          }
                        }} />
                      </section>
                  )})
          }

          <div className="ScrollSections__fixedRoot ScrollSections__fixedRoot--foreground" ref={this.foregroundPortalRef} />
      </div>
    );
  }
}


ScrollSections.propTypes = {
  sections: PropTypes.array,
  className: PropTypes.string
}

export default ScrollSections