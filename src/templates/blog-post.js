import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import Content, { HTMLContent } from '../components/Content'

/** @jsx jsx */
import { Global, css, jsx } from '@emotion/core'

export const BlogPostTemplate = ({
  image,
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="BlogPost section">
      {helmet || ''}

      <Global
          styles={css`
            @media screen and (min-width: 40em) {
              @supports ((perspective: 1px) and (not (-webkit-overflow-scrolling: touch))) {
                html,body {
                  overflow: hidden;
                }
              }
            }
          `}
        />

      <div className="Content">
            <h1 className="BlogPost__title">
              <span className="BlogPost__title__highlight">
               {title}
              </span>
            </h1>
      </div>
      <div className="BlogPost__hero">
            <PreviewCompatibleImage
              imageInfo={{
                image: image,
                alt: `featured image for post ${title}`,
              }}
            />
      </div>
      <div className="Content BlogPost__content">
            <PostContent className="Content__inner" content={content} />
      </div>
      
      {tags && tags.length ? (
        <div className="Content">
          <div className="BlogPost__tags Content__tags">
            <h3>Tags</h3>
            <ul className="Content__taglist">
              {tags.map(tag => (
                <li className="Content__taglist__tag" key={tag + `tag`}>
                  <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
      
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <BlogPostTemplate
        image={post.frontmatter.featuredimage}
        content={post.html}
        contentComponent={HTMLContent}
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
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 1800, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
