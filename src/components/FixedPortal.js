import React from 'react'
import ReactDOM from 'react-dom'

class FixedPortal extends React.PureComponent {
  render() {
    if (this.props.target && this.props.target.current) {
      return ReactDOM.createPortal(
        this.props.children,
        this.props.target.current
      );
    } else {
      return(null)
    }
    // return(
    //   <div style={{position: "fixed", top:0, left:0, bottom:0, right:0}}>
    //     {this.props.children}
    //   </div>
    // )
  }
}

export default FixedPortal
