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
   
  }
});

const AboutPage = ({ data, classes }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
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
        
      }
    }
  }
`
