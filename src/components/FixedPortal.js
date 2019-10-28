import React from 'react'
import ReactDOM from 'react-dom'

class FixedPortal extends React.PureComponent {
  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.props.target || document.querySelector("body")
    );
  }
}

export default FixedPortal
