import React, { Component } from 'react';
import { connect } from 'react-redux';
import CustomHelmet from './CustomHelmet/CustomHelmet';
import Container from './Container';
import PropTypes from 'prop-types';
import { fetchRole } from '../reducers/role';
import { fetchAdmin } from '../reducers/admin';
import { bindActionCreators } from 'redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.fetchRole();
    this.props.fetchAdmin();
  }

  render() {
    return [
      <CustomHelmet key='helmet' />,
      <Container key='container' />
    ];
  }
}

App.propTypes = {
  fetchAdmin: PropTypes.func.isRequired,
  fetchRole: PropTypes.func.isRequired,
};

const mapStateToProps = ({ app }) => ({
  app,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchAdmin,
      fetchRole,
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(App);
