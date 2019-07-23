import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from "gatsby"

const styles = theme => ({
  CourseItemParent: {
    
  },


  card: {
    maxWidth: 345,
    marginBottom:40
  },
  media: {
    height: 140,
  },
 
});

function CourseItem(props) {
  const { classes, theme, post, slug, excerpt} = props;

  console.log(props);

  return (
    <div className={classes.CourseItemParent}>
        <Card className={classes.card}>
     
        <CardMedia
            className={classes.media}
            image={props.image}
            title="course image"
        />
        <CardContent>
        <Link to={slug}>
            <Typography gutterBottom variant="h5" component="h2">
            {post.title}
            </Typography>
            </Link>
            <Typography component="p">
            {excerpt}
            </Typography>
        </CardContent>
     
  
        </Card>
    </div>
  );
}


export default withStyles(styles)(CourseItem);
