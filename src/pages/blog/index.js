import React from 'react'

import Layout from '../../components/Layout'
import BlogRoll from '../../components/BlogRoll'

import { kebabCase } from 'lodash'
import { Link, graphql } from 'gatsby'

const BlogIndexPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => {
    return (
      <Layout>
        <div className="Content">
          <h1 className="Content__title">
            Now.
          </h1>
        </div>

          <BlogRoll />
        
        <div className="Content">
          <div className="Content__tags">
            <h3>Tags</h3>
            <ul className="Content__taglist">
              {group.map(tag => (
                <li className="Content__taglist__tag" key={tag.fieldValue}>
                  <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                    {tag.fieldValue} ({tag.totalCount})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    )
}

export default BlogIndexPage

export const blogIndexPageQuery = graphql`
  query BlogIndexPageQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
