import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class BlogRoll extends React.Component {
  render() {
    const { data, posts = data.allMarkdownRemark.edges } = this.props;
    
    return (
      <div className={`BlogRoll`}>
        {posts &&
          posts.map(({ node: post }) => (
            <article className={`BlogRoll__post ${!post.frontmatter.featuredimage ? 'BlogRoll__post--no-image' : ''}`} key={post.id}>

                  {post.frontmatter.featuredimage ? (
                    <div className="BlogRoll__post__featured-thumbnail">
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: post.frontmatter.featuredimage,
                          alt: `featured image thumbnail for post ${post.title}`,
                        }}
                      />
                    </div>
                  ) : null}
                  <div className="BlogRoll__post__description">
                    <Link className="BlogRoll__post__title" to={post.fields.slug}>
                      <h2>{post.frontmatter.title}</h2>
                    </Link>
                    <p className="BlogRoll__post__subtitle">
                      {post.frontmatter.date}
                    </p>
                  
                <p className="BlogRoll__post__excerpt">{post.excerpt}</p>
                  <Link className="BlogRoll__post__button" to={post.fields.slug}>
                    Keep Reading →
                  </Link>
                
                </div>
            </article>
          ))}
      </div>
    )
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
  posts: PropTypes.array
}

export default (props) => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 600, quality: 65) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} {...props} />}
  />
)
