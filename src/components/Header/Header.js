import React from "react";
import PropTypes from "prop-types";
import { Menu } from "@material-ui/icons";
import { withRouter } from 'react-router';
import {
  withStyles,
  AppBar,
  Toolbar,
  IconButton,
  Hidden,
  Button
} from "material-ui";
import { KeyboardArrowLeft } from "@material-ui/icons";
import cx from "classnames";

import headerStyle from "../../assets/jss/components/headerStyle.js";

import HeaderLinks from "./HeaderLinks";

function Header({ ...props }) {
  function makeBrand() {
    let name;
    props.paths.map((prop, key) => {
      if (prop.path === props.location.pathname) {
        name = prop.navbarName;
      }
      return null;
    });
    return name;
  }
  const { classes, color, goBack, history } = props;
  const appBarClasses = cx({
    [" " + classes[color]]: color
  });
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          <Button className={classes.noMinWidth} onClick={goBack}>
            <KeyboardArrowLeft />
          </Button>
          <Button className={classes.title}>
            {makeBrand()}
          </Button>
        </div>
        <Hidden smDown implementation="css">
          <HeaderLinks />
        </Hidden>
        <Hidden mdUp>
          <IconButton
            className={classes.appResponsive}
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  goBack: PropTypes.func,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};

export default withRouter(withStyles(headerStyle)(Header));
