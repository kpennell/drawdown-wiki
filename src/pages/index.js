import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link, StaticQuery, graphql } from "gatsby"
import Grid from "@material-ui/core/Grid"
import BlogItem from "../components/BlogItem"
import { withStyles, withTheme } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"


const styles = theme => ({
  mainBlogArea: {
    paddingTop: "20px !important",
  },
  flexGrid:{
    display:"flex",
    flexWrap:"wrap"

  }

})

const IndexPage = props => {
  const { data, classes } = props
  // const { edges: posts } = data.allMarkdownRemark

  return (
    <Layout>
      <SEO title="Drawdown Wiki" keywords={[`Drawdown`, `Climate Change`]} />

      <Grid container spacing={24} className={classes.mainBlogArea}>
        <Grid item xs={12}>
          <div className={classes.flexGrid}>
          
            {data.map(item => (
              <BlogItem
                key={item.id}
                post={item.frontmatter}
                slug={item.fields.slug}
               
              />
            ))}
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
          sort: { order: ASC, fields: [frontmatter___rank] }
          filter: { frontmatter: { templateKey: { eq: "single-solution" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 40)
              id
              fields {
                slug
              }
              frontmatter {
                solution
                templateKey
                rank
                title     
                sector
                co2_reduction_gt
                net_cost_billions
                net_savings_billions
                url
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
