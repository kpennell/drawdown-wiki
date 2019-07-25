import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { Link } from "gatsby"
import classNames from "classnames"

const styles = theme => ({
  card: {
    width: "23%",
    margin: 10,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
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
  learnMoreButton: {
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
})

function BlogItem(props) {
  const { classes, theme, post, slug } = props

  console.log(parseInt(post.net_cost_billions))

  //   templateKey: single-solution
  // rank: 54
  // solution: Walkable Cities
  // sector: Buildings and Cities
  // co2_reduction_gt: 2.92
  // net_cost_billions: N/A
  // url: 'https://www.drawdown.org/solutions/buildings-and-cities/walkable-cities'

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {post.sector}
        </Typography>
        <Typography variant="h5" component="h2">
          {post.solution}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          # {post.rank}
        </Typography>

        <Typography
          component="p"
          className={classes.savings}
          variant="subtitle1"
        >
          Cost:{" "}
          <span
            className={classNames({
              [classes.titleGreen]: parseInt(post.net_cost_billions) <= 0,
              [classes.titleRed]: parseInt(post.net_cost_billions) > 0,
            })}
          >
            {post.net_cost_billions}
            {post.net_cost_billions != "N/A" ? " Billion" : ""}
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
              [classes.titleGreen]: parseInt(post.net_savings_billions) > 0,
              [classes.titleRed]: parseInt(post.net_savings_billions) < 0,
            })}
          >
            {post.net_savings_billions}
            {post.net_savings_billions != "N/A" ? " Billion" : ""}
          </span>
        </Typography>
        <Typography
          component="p"
          className={classes.savings}
          variant="subtitle1"
        >
          CO2 Reduction: {post.co2_reduction_gt} Gigatons
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={slug} className={classes.learnMoreButton}>
          <Button size="small">Learn More</Button>
        </Link>
      </CardActions>
    </Card>
  )
}

BlogItem.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(BlogItem)
