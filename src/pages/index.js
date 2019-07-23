import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link, StaticQuery, graphql } from "gatsby"
import Grid from "@material-ui/core/Grid"
import BlogItem from "../components/BlogItem"
import { withStyles, withTheme } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


const styles = theme => ({
  mainBlogArea: {
    paddingTop: '20px !important',

  },
  redBox:{
    padding:30,
    paddingTop:50,
    height:200,
    backgroundColor:'#AC4839',
    marginBottom:30
  },
  greyBox:{
    padding:30,
    paddingTop:50,
    height:200,
    backgroundColor:'#D9D8D8'
  },
  blackButton:{
    backgroundColor:'black',
    color:'white'

  },
  redButton:{
    backgroundColor:'#AC4839',
    color:'white'

  },
  TabsSection:{
    marginTop:30,
    backgroundColor:'white',
    border:'1px solid grey',
    height:300,
  },
  Tab:{
      width:10
  }

  
})

const IndexPage = props => {
  const { data, classes } = props
  // const { edges: posts } = data.allMarkdownRemark

  return (
    <Layout>
      <SEO title="appendTo Home" keywords={[`Courses`, `Training`, `react`]} />

      <Grid container spacing={24}  className={classes.mainBlogArea}>
        <Grid item xs={8}>
          <div >
            {data.map(item => (
              <BlogItem
                key={item.id}
                post={item.frontmatter}
                image={item.frontmatter.image.childImageSharp.fluid.src}
                slug={item.fields.slug}
                date={item.frontmatter.date}
              />
            ))}
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className={classes.redBox}>
            <Typography variant="h5" style={{color:'white'}}>
              Custom Private Courses
            </Typography>
            <Button variant="contained" className={classes.blackButton}>
              Get Started
            </Button>
          </div>

          <div className={classes.greyBox}>
          <Typography variant="h5">
              Live Public Courses
            </Typography>
            <Button variant="contained" className={classes.redButton}>
              Sign Up Today
            </Button>
          </div>

          <div className={classes.TabsSection} >
          <AppBar position="static">
            <Tabs>
              <Tab label="Popular" className={classes.Tab} />
              <Tab label="Recent" className={classes.Tab} />
        
            </Tabs>
            </AppBar>


          </div>
        </Grid>
      </Grid>
    </Layout>
  )
}

const StyledUpIndexPage = withStyles(styles)(IndexPage)

export default () => (
  <StaticQuery
    query={graphql`
      query IndexPageQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "single-blog" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 40)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
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
        }
      }
    `}
    render={data => (
      <StyledUpIndexPage
        data={data.allMarkdownRemark.edges.map(item => item.node)}
      />
    )}
  />
)
