import React from 'react'
import PropTypes from 'prop-types'

// class Slideshow extends React.PureComponent {
//   render() {
//     const {
//       className
//     } = this.props;

//     return (
//       <div className={"Slideshow" + (className ? ` ${className}` : "")}>
//         Eat my shorts {Math.random()}
//       </div>
//   )}
// };

const Slideshow = ({className}) => {
  return (
      <div className={"Slideshow" + (className ? ` ${className}` : "")}>
        Eat my shorts {Math.random()}
      </div>
  )};

Slideshow.propTypes = {
  className: PropTypes.string
}

export default Slideshow