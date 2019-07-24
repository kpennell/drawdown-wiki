import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from "gatsby"


const styles = theme => ({
  card: {
    width: "23%",
    margin:10,
    [theme.breakpoints.down('sm')]: {
      width: "100%",
    }
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  savings:{
    fontSize:14
  }
});

function BlogItem(props) {

  const { classes, theme, post, slug} = props;

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
      
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {post.sector}
        </Typography>
        <Typography variant="h5" component="h2">
        {post.solution}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        # {post.rank}
        </Typography>
        <Typography component="p" className={classes.savings} variant="subtitle1">
        Net Cost: {post.net_cost_billions} Billion
        </Typography>
        <Typography component="p" className={classes.savings} variant="subtitle1">
        CO2 Reduction: {post.co2_reduction_gt} Gigatons
        </Typography>

      

      </CardContent>
      <CardActions>
      <Link to={slug}>
        <Button size="small">Learn More</Button>
        </Link>
      </CardActions>
    </Card>
  );
}

BlogItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BlogItem);