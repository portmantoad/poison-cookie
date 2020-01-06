import React from 'react'
import { withPrefix } from 'gatsby'


const Postcard = ({ children, card = 1, mask = 1, alt, ...rest }) => {
  return (
    <div className="Postcard__wrap" {...rest}>
      <div className="Postcard">
        <div className="Postcard__border">
        <img className={`Postcard__img Postcard__img--mask${mask}` + (alt ? ` Postcard__img--alt${alt}` : "")}
          src={`${withPrefix('/')}img/card${card}.jpg`} alt="" /></div>
        {children}
      </div> 
    </div>
  )
}

export default Postcard
