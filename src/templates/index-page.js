import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Layout from '../components/Layout'
import ScrollSections from '../components/ScrollSections'
import VideoPlayer from '../components/VideoPlayer'
import CanvasBlend from '../components/CanvasBlend'
import Curtains from '../components/Curtains'
import Postcard from '../components/Postcard'
import Parallax from '../components/Parallax'
import Picture from '../components/Picture'
import Scrim from '../components/Scrim'
import Positioner from '../components/Positioner'
import Clouds from '../components/Clouds'
import { withPrefix, Link, graphql } from 'gatsby'
import useMedia from 'use-media';


/** @jsx jsx */
import { css, jsx } from '@emotion/core'


const pages = [React.memo(
  ({sectionIndex, dimensions, setContainerCss}) => {
    setContainerCss(`min-height: calc((100vh - 40px) * 1.2)`);
    return (
    <React.Fragment>
      <Clouds dimensions={dimensions} />
      <Parallax speed="-2" dimensions={dimensions}>
        <Picture 
          src={`${withPrefix('/')}img/intro/cover-optim.png`} 
          width="100%" 
          height="calc((100vh - 40px) * 1.2)" 
          fit="cover"
          shadow={false}
          x="0.6"
          y="0.25"
          background="transparent"
          css={css(`
            mask-image: url('${withPrefix('/')}img/torn-edge_mask.png');
            mask-size: 100% 100%;
            // max-width: 100vh;
            margin-right: auto;
          `)} />
      </Parallax>
      <Positioner x="0.9" y="0.9" css={css(`height: calc(100vh - 40px); bottom: unset;`)} >
        <img 
          src={`${withPrefix('/')}img/intro/cookietitle.png`} 
          alt="The Poison Cookie Jar"
          
          css={css(`width: 18vw; min-width: 215px; display: block;`)} />
      </Positioner>
    </React.Fragment>
  )}
), 

React.memo(
  ({sectionIndex, dimensions, setContainerCss}) => {
    return(
      <React.Fragment>
            <Scrim />
            <VideoPlayer
              videoIds={["0GWlYInjOCI"]}
              thumbnail={`${withPrefix('/')}img/thumbnails/intro/beard_cave.jpg`}
              fullscreen
            />           
            <Curtains />
      </React.Fragment>
)})
, React.memo(({sectionIndex, dimensions, setContainerCss}) => (
        <React.Fragment>
        <Parallax speed="-4" dimensions={dimensions}>
            <div className="fullscreenQuote">
                <figure className="quote">
                   <q>Under the cover of an evening’s relaxing entertainment, cabaret, like nothing else, suddenly dispenses a <span style={{color: '#be553d', fontStyle: 'italic'}}>poison cookie</span>. Suggestively administered and hastily swallowed, its effect reaches far beyond the harmless evening to make otherwise placid blood boil and inspire a sluggish brain to think.</q>
                   <figcaption css={css(`transform: rotate(-3deg);`)}><img src={`${withPrefix('/')}img/intro/friedrich.jpg`} alt="" />&ensp;&mdash;&ensp;Friedrich Hollaender, 1932</figcaption>
                </figure>
                <div className="bigborder"></div>
            </div>
        </Parallax>
            
        </React.Fragment>
))
, React.memo(
  ({sectionIndex, dimensions, setContainerCss}) => {
    setContainerCss(`min-height: calc((100vh - 40px) * 0.6)`)
    return (
      <React.Fragment>
        <Parallax speed="2" dimensions={dimensions}>
          <Positioner x="0.35">
            <Postcard>
              <VideoPlayer
                videoIds={["xl5eTt4Qusw"]}
                thumbnail={`${withPrefix('/')}img/thumbnails/intro/dressing_room.jpg`}
              />
            </Postcard>
          </Positioner>
        </Parallax>
      </React.Fragment>
)})
, React.memo(({sectionIndex, dimensions, setContainerCss}) => {
  setContainerCss(`min-height: calc(100vh - 40px)`)
  return(
        <React.Fragment>
          <Link to="/paris" css={css(`
              display: flex;
              justify-content: center;
              align-items: center;
              font-family: 'IM Fell Double Pica', serif;
              font-weight: bold;
              text-rendering: optimizeLegibility;
              font-size: 1.8746rem;
              line-height: 1.1;
              @media screen and (max-width: 600px){
                flex-direction: column;
              }
          `)}  >
                <video css={css(`
                  border-radius: 50%; 
                  width: 200px;
                  mask-image: url('${withPrefix('/')}img/cookie_mask.png');
                  mask-size: 100% 100%;
                `)} autoPlay muted loop src={`${withPrefix('/')}img/intro/john-eats.mp4`} />
                <img 
                src={`${withPrefix('/')}img/intro/bite-me.png`} 
                alt="Bite Me to get to Paris"
                
                css={css(`width: 425px; max-width: 90%; display: block;`)} />
          </Link>
        </React.Fragment>
)})
]

export const IndexTemplate = ({
  description,
  title,
  helmet
}) => {
  return (
    <div className={"Index"}>
      {helmet || ''}
      <ScrollSections sections={pages} />
    </div>
  )
}

IndexTemplate.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const Index = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <IndexTemplate
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

Index.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default Index

export const pageQuery = graphql`
  query IndexPage($id: String!) {
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
