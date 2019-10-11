import React from 'react'
import PropTypes from 'prop-types'
import { CityTemplate } from '../../templates/city'

const CityPreview = ({ entry, widgetFor }) => {
  const data = entry.getIn(['data']).toJS()

  if (data) {
    return(
      <CityTemplate
        description={data.description}
        title={data.title}
        background={data.background}
        sections={data.sections}
      />
    )
  }
}

CityPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default CityPreview
