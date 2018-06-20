import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Switch, Route, Redirect } from "react-router-dom";
import { withStyles } from 'material-ui';
import appStyle from '../../assets/jss/components/appStyle';

class Dashboard extends Component {
  render() {
    // const { classes, app } = this.props;
    return (
      <div>
        Dashboard
      </div>
    )
  }
}
Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
};

const mapStateToProps = ({ app }) => ({
  app,
});
export default connect(mapStateToProps)(withStyles(appStyle)(Dashboard));
