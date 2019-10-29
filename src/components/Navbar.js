import React from 'react'
import { Link } from 'gatsby'
import Headroom from 'react-headroom'

const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
    }
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      }
    )
  }

  render() {
    return (
      <Headroom>
        <div className="Navbar">
          <Link to="/">Home</Link>
        </div>
      </Headroom>
    )
  }
}

export default Navbar
