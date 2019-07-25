import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Img from "gatsby-image"
import { Link } from "gatsby"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import classNames from "classnames"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

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
  titleRed: {
    fontSize: 14,
    color: "red",
  },
  titleGreen: {
    fontSize: 14,
    color: "green",
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
  expansionPanelParent: {
    boxShadow: "none",
  },
})

const BlogPage = ({ data, classes }) => {
  const { markdownRemark: post } = data

  // var redOrGreen = classNames({

  //   'titleRed': post.frontmatter.net_cost_billions <= 0,
  //   'titleGreen': post.frontmatter.net_cost_billions > 0
  // });

  //console.log(post.frontmatter);

  return (
    <Layout>
      <div className={classes.root}>
        <Link to="/" className={classes.backButton}>
          <Typography component="p" color="textSecondary">
            ← Back to All Solutions
          </Typography>
        </Link>

        <Grid container spacing={24} style={{ paddingTop: 20 }}>
          <Grid item lg={9} xs={12}>
            <ExpansionPanel className={classes.expansionPanelParent}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  Organizations working on this Solution
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>Coming soon</Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel className={classes.expansionPanelParent}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  Where to Read More
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>Coming soon</Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>

          <Grid item lg={3} xs={12}>
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
          className={classes.savings}
          variant="subtitle1"
        >
          Cost:{" "}
          <span
            className={classNames({
              [classes.titleGreen]: parseInt(post.frontmatter.net_cost_billions) <= 0,
              [classes.titleRed]: parseInt(post.frontmatter.net_cost_billions) > 0,
            })}
          >
            {post.frontmatter.net_cost_billions}
            {post.frontmatter.net_cost_billions != "N/A" ? " Billion" : ""}
          </span>
        </Typography>
        <Typography
          component="p"
          className={classes.savings}
          variant="subtitle1"
        >
          Savings:{" "}
          <span
            className={classNames({
              [classes.titleGreen]: parseInt(post.frontmatter.net_savings_billions) > 0,
              [classes.titleRed]: parseInt(post.frontmatter.net_savings_billions) < 0,
            })}
          >
            {post.frontmatter.net_savings_billions}
            {post.frontmatter.net_savings_billions != "N/A" ? " Billion" : ""}
          </span>
        </Typography>

           

         

            <Typography component="p">
              <a
                href={post.frontmatter.url}
                className={classes.linkToPD}
                target="_blank"
              >
                {post.frontmatter.solution} Page on Project Drawdown{" "}
              </a>
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
        net_savings_billions
        url
      }
    }
  }
`
