import React from 'react'
import { Link } from 'gatsby'
import CanvasBlend from './CanvasBlend'
import Icon from './Icon'
import { withPrefix } from 'gatsby'
// import Headroom from 'react-headroom'

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
    const volumeOn = true;
    return (
      <div className="Navbar">
        <CanvasBlend use="multiply" className="Navbar__paper"><img src={`${withPrefix('/')}img/headerpaper.jpg`} alt="" /></CanvasBlend>
        <a href="https://www.beardedladiescabaret.com/" class="Navbar__logo"><img src={`${withPrefix('/')}img/nav_logo.png`} alt=""/></a>
        <div><Link to="/cities/intro">Intro</Link>&ensp;|&ensp;<Link to="/cities/paris">Paris</Link></div>

        <div className="Navbar__endLinks">
          {volumeOn ? <Icon use="volumeHigh" /> : <Icon use="volumeOff" />}
          &emsp;<Link to="/now">Now</Link>&ensp;|&ensp;<Link to="/about">About</Link>&emsp;
          <Icon use="youtube" />
          <Icon use="facebook" />
          <Icon use="twitter" />
          <Icon use="instagram" />
        </div>
      </div>
    )
  }
}

export default Navbar
