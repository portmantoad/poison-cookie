import React from 'react'
import ReactDOM from 'react-dom'

class FixedPortal extends React.PureComponent {
  render() {
    if (this.props.target) {
    return ReactDOM.createPortal(
      this.props.children,
      this.props.target
    );
    } else {
      return(null)
    }
  }
}

export default FixedPortal
