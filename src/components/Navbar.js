import React, {useState, useContext} from 'react'
import { Link } from 'gatsby'
import { MutedContext } from './contexts'
import Icon from './Icon'
import { withPrefix } from 'gatsby'
import useMedia from 'use-media';

// import Headroom from 'react-headroom'

const Navbar = () => {

    const [active, setActive] = useState(false);
    const isMobile = useMedia({maxWidth: 1000});
    const muted = useContext(MutedContext);
    // console.log(MutedContext)
    
    return (
      <nav className="Navbar">
        <img className="Navbar__paper" src={`${withPrefix('/')}img/headerpaper.png`} alt="" />
        <a href="https://www.beardedladiescabaret.com/" className="Navbar__logo"><img src={`${withPrefix('/')}img/nav_logo.png`} alt=""/></a>
        {isMobile 
          ? (
            <div className="Navbar__endLinks">
              <Icon onClick={muted.toggleMuted} use={muted.muted ? "volumeOff" : "volumeHigh"} />
              <div className="Navbar__hamburger" onClick={() => setActive(true)}>
                <Icon use="hamburger" />
              </div>
              <div 
                className={"Navbar__menuWrapper" + (active ? " isActive" : "")}
                onClick={() => setActive(false)}
              >
                <div 
                  className={"Navbar__menu" + (active ? " isActive" : "")} 
                  onClick={event => event.stopPropagation()}
                >
                  <Link className="Navbar__link" onClick={() => setActive(false)} to="/cities/intro">Intro</Link>
                  <Link className="Navbar__link" onClick={() => setActive(false)} to="/cities/paris">Paris</Link>
                  <hr />
                  <Link className="Navbar__link" onClick={() => setActive(false)} to="/now">Now</Link>
                  <Link className="Navbar__link" onClick={() => setActive(false)} to="/about">About</Link>
                  <hr />
                  <a className="Navbar__link" onClick={() => setActive(false)} href=""><Icon use="youtube" />&ensp;YouTube</a>
                  <a className="Navbar__link" onClick={() => setActive(false)} href=""><Icon use="facebook" />&ensp;Facebook</a>
                  <a className="Navbar__link" onClick={() => setActive(false)} href=""><Icon use="twitter" />&ensp;Twitter</a>
                  <a className="Navbar__link" onClick={() => setActive(false)} href=""><Icon use="instagram" />&ensp;Instagram</a>
                </div>
              </div>
            </div>
          ) : (
            <React.Fragment>
              <div><Link className="Navbar__link Navbar__link--offset" to="/cities/intro">Intro</Link>&ensp;|&ensp;<Link className="Navbar__link Navbar__link--offset" to="/cities/paris">Paris</Link></div>
              <div className="Navbar__endLinks">
                <Icon onClick={muted.toggleMuted} use={muted.muted ? "volumeOff" : "volumeHigh"} />
                &emsp;<Link className="Navbar__link" to="/now">Now</Link>&ensp;|&ensp;<Link className="Navbar__link" to="/about">About</Link>&emsp;
                <a className="Navbar__link" href=""><Icon use="youtube" /></a>
                <a className="Navbar__link" href=""><Icon use="facebook" /></a>
                <a className="Navbar__link" href=""><Icon use="twitter" /></a>
                <a className="Navbar__link" href=""><Icon use="instagram" /></a>
              </div>
            </React.Fragment>
          )}
      </nav>
    )
}

export default Navbar
