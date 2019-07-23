import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Img from "gatsby-image"
import { Link } from "gatsby"
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  title:{
    marginBottom:'.2em'
  },
  backButton: {
    textDecoration:'none'
  },
  bigAvatar: {
    '& img':{
      margin: 10,
      width: 60,
      height: 60,
    },
    width:100,
    height:100,
    border:'1px solid grey'
  
  },
});

const CoursePage = ({ data, classes }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
       <Link to='/courses' className={classes.backButton}>
      <p>← Back to Courses</p>

      </Link>
      
      <Grid container spacing={24}>
       
        <Grid item xs={9}>
          <h1 className={classes.title}>{post.frontmatter.title}</h1>
          <h4>{post.frontmatter.date}</h4>
          <p dangerouslySetInnerHTML={{ __html: post.html }}/>  
        </Grid>    
        <Grid item xs={3}>
        <Avatar src={post.frontmatter.image.childImageSharp.fluid.src} className={classes.bigAvatar} />
       
        </Grid>   
      </Grid>
  
    </Layout>
  )
}

export default withStyles(styles)(CoursePage);


export const CoursePageQuery = graphql`
  query CoursePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 500, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
