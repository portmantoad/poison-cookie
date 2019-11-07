import React from 'react'
import PropTypes from 'prop-types'
import VideoPlayer from './VideoPlayer'
import FixedPortal from './FixedPortal'
import { throttle } from 'lodash'

import TweenMax from 'TweenMax';
import ScrollMagic from 'ScrollMagic';
import 'animation.gsap';
import 'debug.addIndicators';

import ResizeObserver from 'resize-observer-polyfill';


class ScrollSections extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
 
    this.backgroundPortalRef = React.createRef();
    this.midgroundPortalRef = React.createRef();
    this.foregroundPortalRef = React.createRef();

    this.sectionRefs = [];
    this.sectionHeights = [];
    this.sectionOffsets = [];

    this.resizeObserver = new ResizeObserver(() => {
      this.handleResizeThrottled()
    });

    this.state = {
      sectionActive0: true
    };

    this.registeredAnimations = [];
    if (typeof window !== `undefined`) {
      this.controller = new ScrollMagic.Controller();
    } else {
      this.controller = {};
    }

    this.mounted = false;
  }

  updateSectionHeights = () => {
    for (var i = 0; i <= this.sectionRefs.length - 1; i++) {
      const rect = this.sectionRefs[i].getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      this.sectionHeights[i] = rect.height;
      this.sectionOffsets[i] = rect.top + scrollTop;

      this.visibleHeight = this.backgroundPortalRef.current.getBoundingClientRect().height;

    }
  }

  componentDidMount() {
    this.updateSectionHeights();
    this.mounted = true; 

    if (typeof window !== `undefined`) {
      this.handleScroll();
      window.addEventListener('scroll', this.handleScrollThrottled , {passive: true});
    }

    this.resizeObserver.observe(this.wrapperElement)

    for (let i = this.props.sections.length - 1; i >= 0; i--) {
      
      this.registerAnimation({
        key: ".ScrollSection__timeIndicator--" + i,
        sectionIndex: i, 
        tween: () => TweenMax.fromTo(".ScrollSection__timeIndicator--" + i, 1, {y: '-50%'}, {y: '50%', ease: "Linear.easeNone"}),
      });
    }
  }

  getAnimationSpan = (sectionIndex, persist) => {
    let span = 0
    for (let i = sectionIndex; i <= (sectionIndex + persist); i++) {
      span += this.sectionHeights[i];
    }
    if (isNaN(span)) {
      return undefined
    }
    return span;
  }

  registerAnimation = (props) => {
    const anim = this.registeredAnimations.find(anim => { return anim.key === props.key});
    if (anim) {
      this.updateAnimation(props.key, props);
      return
    }

    if (!props.persist) props.persist = 0;
    if (props.persist === 'all') props.persist = this.props.sections.length - 1 - props.sectionIndex;
    if (!props.start) props.start = 0;
    if (!props.end) props.end = 1;
    this.registeredAnimations.push({
      ...props,
      currentAnimation: this.mountAnimation(props)
    })
  }

  mountAnimation = ({key, sectionIndex, tween, classToggle, persist, start, end}) => {
    if (typeof window !== `undefined`) {

      let animationSpan = persist && persist >= 1 
      ? this.getAnimationSpan(sectionIndex, persist)
      : this.sectionHeights[sectionIndex];

      document.querySelector(key)

      if (!animationSpan || !this.mounted || !document.querySelector(key)) {
        setTimeout(() => this.updateAnimation(key),100);
        return
      }

      const scene = new ScrollMagic.Scene({
        triggerElement: ".ScrollSection--" + sectionIndex,
        duration: animationSpan * (end - start),
        offset: animationSpan * start,
      })

      // console.log(key)

      if (tween) {
        scene.setTween(tween())
      }

      if (classToggle) {
        scene.setClassToggle(classToggle[0], classToggle[1])
      }
      
      return scene.addTo(this.controller);
    }
  }

  updateAnimation = (key, newProps = {}) => {
    const anim = this.registeredAnimations.find(a => { return a.key === key});

    if (!anim) { return }

    let {sectionIndex, tween, classToggle, persist, start, end} = newProps;
    const currentAnimation = anim.currentAnimation;
    const tweenHasChanged = !!tween;
    const classToggleHasChanged = !!classToggle

    anim.sectionIndex = sectionIndex = sectionIndex || anim.sectionIndex;
    anim.tween = tween = tween || anim.tween;
    anim.classToggle = classToggle = classToggle || anim.classToggle;
    anim.persist = persist = persist || anim.persist;
    anim.start = start = start || anim.start;
    anim.end = end = end || anim.end;
    
    if (!currentAnimation) {
      anim.currentAnimation = this.mountAnimation(anim);
      return
    }

    // console.log('update:' + key)

    const animationSpan = persist && persist >= 1 
    ? this.getAnimationSpan(sectionIndex, persist)
    : this.sectionHeights[sectionIndex];


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

    if (tweenHasChanged) {
      currentAnimation.setTween(tween())
    }

    if (classToggleHasChanged) {
      currentAnimation.setClassToggle(classToggle[0], classToggle[1])
    }
    
    return currentAnimation;

  }

  updateAllAnimations = () => {
    for (const anim of this.registeredAnimations) {
      this.updateAnimation(anim.key);
    }
  }


  handleResize = () => {
    this.updateSectionHeights();
    this.updateAllAnimations();
    this.handleScroll();
  }

  handleResizeThrottled = throttle(() => {
    if (this.resizeTimeout) {
      window.cancelAnimationFrame(this.resizeTimeout);
    }
    this.resizeTimeout = window.requestAnimationFrame(this.handleResize);
  }, 100);

  handleScroll = () => {
    if (isNaN(this.visibleHeight)) {
      this.handleScrollThrottled();
      return false;
    }

    const scrollTop = Math.max(window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0, 0);
    // const topPad = this.state.visibleHeight / 2;
    const newState = {};

    for (let i = 0; i < this.props.sections.length; i++) {
      const height = this.sectionHeights[i];

      if (isNaN(height)) {
        this.handleScrollThrottled();
        return false;
      }

      const offset = this.sectionOffsets[i];
      const topPad = this.visibleHeight/2 + 48;

      if (
        scrollTop >= offset - topPad
        && ((scrollTop - (offset - topPad)) <= height || i === this.props.sections.length - 1)
      ) {
        newState['sectionProgress' + i] = (scrollTop - (offset - topPad)) / height;
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
  }, 50);

  componentWillUnmount(){
    this.mounted = false;
    if (typeof window !== `undefined`) {
      window.removeEventListener('scroll', this.handleScrollThrottled , {passive: true});
      window.cancelAnimationFrame(this.scrollTimeout);
      window.cancelAnimationFrame(this.resizeTimeout);
    }
    this.ResizeObserver.disconnect();
  }

  render() {
    const {
      className,
      sections
    } = this.props;

    return (
      <div 
        className={"ScrollSections" + (className ? ` ${className}` : "")}
        // style={{padding: (this.state.visibleHeight/2) + "px 0 " + (this.state.visibleHeight/2 - 1) + "px"}}
        ref={el => this.wrapperElement = el}
      >

       <div className="ScrollSections__fixedRoot ScrollSections__fixedRoot--background" ref={this.backgroundPortalRef} />

        <div className="ScrollSections__fixedRoot ScrollSections__fixedRoot--midground" ref={this.midgroundPortalRef} />

          {sections &&
            sections.map((Sect, index) => {
                    const active = this.state["sectionActive" + index];
                    return (
                      <section 
                        key={"ScrollSection--" + index}
                        ref={el => this.sectionRefs[index] = el}
                        className={
                          "ScrollSection ScrollSection--" + index + (active ? " isActive" : "")
                        } 
                        // style = {{...(this.state.visibleHeight ? {minHeight: this.state.visibleHeight} : {})}}
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
                        <FixedPortal target={this.foregroundPortalRef.current}>
                          <div className={"ScrollSection__timeIndicator ScrollSection__timeIndicator--" + index + (active ? " isActive" : "")}></div>
                        </FixedPortal>
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