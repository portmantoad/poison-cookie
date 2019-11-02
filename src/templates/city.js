import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import ScrollSections from '../components/ScrollSections'

import Intro from '../templates/cities/intro.js'
import Paris from '../templates/cities/paris.js'


const cities = {
  Intro,
  Paris
}

export const CityTemplate = ({
  description,
  title,
  helmet
}) => {
  return (
    <div className={"City City--" + title.replace(/\s/g, '')}>
      {helmet || ''}
      <ScrollSections sections={cities[title.replace(/\s/g, '')]} />
    </div>
  )
}

CityTemplate.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const City = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <CityTemplate
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

City.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default City

export const pageQuery = graphql`
  query CityByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        description
      }
    }
  }
`
