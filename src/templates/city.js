import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import ScrollSections from '../components/ScrollSections'

export const CityTemplate = ({
  description,
  title,
  helmet,
  background,
  sections
}) => {
  return (
    <div className={"City City--" + title.replace(/\s/g, '')}>
      {helmet || ''}
      {sections ? <ScrollSections sections={sections} /> : null}
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