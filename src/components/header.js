import { Link } from "gatsby"
import React from "react"
import { withStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import Typography from '@material-ui/core/Typography';

import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"


const styles = {
  root: {
    flexGrow: "1 !important",
  },
  appbar: {
    backgroundColor: "#55A8DD",
  },
  grow:{
    flexGrow:1,
    textTransform:"uppercase"

  },
  link: {
    color: `white`,
    textDecoration: `none`,
  },
}

class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appbar}>
          <Toolbar>
            <div className={classes.grow}>
              <Link to='/'  className={classes.link}>
            
              <Typography variant="h6" color="inherit">
           Drawdown Wiki 
          </Typography>
          <Typography style={{fontSize:9,color:"white"}}>(Unofficial)</Typography>
              </Link>
            </div>
            <div>
              <Link to="/about" className={classes.link}>
                <Button color="inherit">About</Button>
              </Link>


            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(Header)
