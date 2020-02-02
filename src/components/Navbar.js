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
        <a href="https://www.beardedladiescabaret.com/" className="Navbar__logo" style={{marginRight: "15px"}}><img src={`${withPrefix('/')}img/nav_logo.png`} alt=""/></a>
        <Link className="Navbar__logo" onClick={() => setActive(false)} to="/"><img src={`${withPrefix('/')}img/nav_logo2.png`} alt=""/></Link>
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
                  <Link className="Navbar__link" onClick={() => setActive(false)} to="/">Intro</Link>
                  <Link className="Navbar__link" onClick={() => setActive(false)} to="/paris">Paris</Link>
                  <hr />
                  <Link className="Navbar__link" onClick={() => setActive(false)} to="/blog">Now</Link>
                  <Link className="Navbar__link" onClick={() => setActive(false)} to="/about">About</Link>
                  <hr />
                  <a className="Navbar__link" onClick={() => setActive(false)} href="https://www.youtube.com/channel/UCocplzddcJFWoOACLkMaG-Q"><Icon use="youtube" />&ensp;YouTube</a>
                  <a className="Navbar__link" onClick={() => setActive(false)} href=""><Icon use="facebook" />&ensp;Facebook</a>
                  <a className="Navbar__link" onClick={() => setActive(false)} href=""><Icon use="twitter" />&ensp;Twitter</a>
                  <a className="Navbar__link" onClick={() => setActive(false)} href=""><Icon use="instagram" />&ensp;Instagram</a>
                </div>
              </div>
            </div>
          ) : (
            <React.Fragment>
              <div><Link className="Navbar__link Navbar__link--offset" to="/">Intro</Link>&ensp;|&ensp;<Link className="Navbar__link Navbar__link--offset" to="/paris">Paris</Link></div>
              <div className="Navbar__endLinks">
                <Icon onClick={muted.toggleMuted} use={muted.muted ? "volumeOff" : "volumeHigh"} />
                &emsp;<Link className="Navbar__link" to="/blog">Now</Link>&ensp;|&ensp;<Link className="Navbar__link" to="/about">About</Link>&emsp;
                <a className="Navbar__link" href="https://www.youtube.com/channel/UCocplzddcJFWoOACLkMaG-Q"><Icon use="youtube" /></a>
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
