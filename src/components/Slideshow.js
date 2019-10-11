import React from 'react'
import PropTypes from 'prop-types'

const Slideshow = ({className}) => {
  return (
      <div className={"Slideshow" + (className ? ` ${className}` : "")}>
        Eat my shorts
      </div>
  )};

Slideshow.propTypes = {
  className: PropTypes.string
}

export default Slideshow