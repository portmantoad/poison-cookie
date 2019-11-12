import React, {useState} from 'react'
import { Link } from 'gatsby'
import CanvasBlend from './CanvasBlend'
import Icon from './Icon'
import { withPrefix } from 'gatsby'
import useMedia from 'use-media';
// import Headroom from 'react-headroom'

const Navbar = () => {

    const [active, setActive] = useState(false);
    const isMobile = useMedia({maxWidth: 1000})

    const volumeOn = true;
    
    return (
      <nav className="Navbar">
        <CanvasBlend use="multiply" className="Navbar__paper"><img src={`${withPrefix('/')}img/headerpaper.jpg`} alt="" /></CanvasBlend>
        <a href="https://www.beardedladiescabaret.com/" class="Navbar__logo"><img src={`${withPrefix('/')}img/nav_logo.png`} alt=""/></a>
        {isMobile 
          ? (
            <div className="Navbar__endLinks">
              {volumeOn ? <Icon use="volumeHigh" /> : <Icon use="volumeOff" />}
              <div className="Navbar__hamburger" onClick={() => setActive(!active)}>
                <Icon use="hamburger" />
              </div>
              <div 
                className={"Navbar__menuWrapper" + (active ? " isActive" : "")}
                onClick={() => setActive(!active)}
              >
                <div 
                  className={"Navbar__menu" + (active ? " isActive" : "")} 
                  onClick={event => event.stopPropagation()}
                >
                  <Link to="/cities/intro">Intro</Link>
                  <Link to="/cities/paris">Paris</Link>
                  <hr />
                  <Link to="/now">Now</Link>
                  <Link to="/about">About</Link>
                  <Icon use="youtube" />
                  <Icon use="facebook" />
                  <Icon use="twitter" />
                  <Icon use="instagram" />
                </div>
              </div>
            </div>
          ) : (
            <React.Fragment>
              <div><Link to="/cities/intro">Intro</Link>&ensp;|&ensp;<Link to="/cities/paris">Paris</Link></div>
              <div className="Navbar__endLinks">
                {volumeOn ? <Icon use="volumeHigh" /> : <Icon use="volumeOff" />}
                &emsp;<Link to="/now">Now</Link>&ensp;|&ensp;<Link to="/about">About</Link>&emsp;
                <Icon use="youtube" />
                <Icon use="facebook" />
                <Icon use="twitter" />
                <Icon use="instagram" />
              </div>
            </React.Fragment>
          )}
      </nav>
    )
}

export default Navbar
