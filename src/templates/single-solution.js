import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Img from "gatsby-image"
import { Link } from "gatsby"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  title: {
    marginBottom: ".2em",
  },
  backButton: {
    textDecoration: "none",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  savings: {
    fontSize: 14,
  },
  linkToPD: {
    textDecoration: "underline",
    color: "#6AA6D8",
  },
  expansionPanelParent:{
    boxShadow:"none"
  }
})

const BlogPage = ({ data, classes }) => {
  const { markdownRemark: post } = data

  //console.log(post.frontmatter);

  return (
    <Layout>
      <div className={classes.root}>
        <Link to="/" className={classes.backButton}>

          <Typography component="p" color="textSecondary">
            ← Back to All Solutions
          </Typography>
        </Link>

        <Grid container spacing={24} style={{paddingTop:20}}>
          <Grid item xs={9} >
          <ExpansionPanel className={classes.expansionPanelParent}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Organizations working on this Solution</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Coming soon
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel className={classes.expansionPanelParent}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Where to Read More</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Coming soon
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          </Grid>

          <Grid item xs={3}>
            <Typography
              className={classes.pos}
              variant="h4"
              color="textSecondary"
            >
              # {post.frontmatter.rank}
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
              {post.frontmatter.solution}
            </Typography>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Sector: {post.frontmatter.sector}
            </Typography>

            <Typography
              component="p"
              className={classes.title}
              color="textSecondary"
            >
              Net Cost: {post.frontmatter.net_cost_billions} Billion
            </Typography>
            <Typography
              component="p"
              className={classes.title}
              variant="subtitle1"
              color="textSecondary"
            >
              CO2 Reduction: {post.frontmatter.co2_reduction_gt} Gigatons
            </Typography>
              <Typography component="p" >
                 <a href={post.frontmatter.url} className={classes.linkToPD} target="_blank">{post.frontmatter.solution} Page on Project Drawdown </a>
              </Typography>
          
          </Grid>
        </Grid>
      </div>
    </Layout>
  )
}

export default withStyles(styles)(BlogPage)

export const BlogPageQuery = graphql`
  query BlogPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        solution
        templateKey
        rank
        title
        sector
        co2_reduction_gt
        net_cost_billions
        url
      }
    }
  }
`
