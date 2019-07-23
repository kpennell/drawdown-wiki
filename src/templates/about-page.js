import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  heroText: {
    color:'white',
    textAlign: 'center',
    lineHeight:7,
    marginTop:-20
  },
  mainBlogCopy: {
    marginTop: theme.spacing.unit,
  },
  blogText:{
    color:theme.palette.primary.main
  }
});

const AboutPage = ({ data, classes }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <div style={{
        backgroundImage: `url(${post.frontmatter.image.childImageSharp.fluid.src})`,
        height:300
      }}>
      <h1 className={classes.heroText}>{post.frontmatter.title}</h1>
      </div>
      <div className={classes.mainBlogCopy}>
       <p className={classes.blogText} dangerouslySetInnerHTML={{ __html: post.html }}/> 
      </div>
      
    </Layout>
  )
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default withStyles(styles)(AboutPage);

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 1400, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
