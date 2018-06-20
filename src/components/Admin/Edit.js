import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles, Grid } from 'material-ui';
import { withRouter } from 'react-router'
import appStyle from '../../assets/jss/components/appStyle';
import RegularCard from "../../components/Cards/RegularCard";
import ItemGrid from "../../components/Grid/ItemGrid";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import Button from "../../components/CustomButtons/Button";
import { setEdit, editAdmin, fetchAdmin, addAdmin, adminLoading } from '../../reducers/admin';
import { bindActionCreators } from "redux";
import { LinearProgress } from "material-ui";

class Edit extends Component {
  state = {
    isSubmitting: false,
    username: '',
    password: '',
    newPassword: '',
    roleError: '',
    usernameError: '',
    passwordError: '',
    newPasswordError: '',
    role: '',
    _id: '',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.admin.edit.hasOwnProperty('username') && prevState.username !== nextProps.admin.edit.username) {
      return {
        username: nextProps.admin.edit.username,
        _id: nextProps.admin._id,
        password: '',
        newPassword: '',
        role: nextProps.admin.edit.role.name,
      };
    }
    return null;
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onSubmit = () => {
    const { username, password, newPassword, role } = this.state;
    const Role = this.props.role.role.find(r => r.name === role);
    this.setState({
      isSubmitting: true,
      passwordError: '',
      newPasswordError: '',
      usernameError: '',
    });
    const admin = {
      id: this.props.admin.edit._id,
      username,
      password,
      newPassword,
      role: Role ? Role._id : undefined,
    };
    this.props.addAdmin([]);
    this.props.editAdmin(admin).then(res => {
      if (!res.hasOwnProperty('errors')) {
        this.setState({
          isSubmitting: false,
          username: '',
          password: '',
          newPassword: '',
          role: '',
        });
        this.props.fetchAdmin();
        this.props.history.push('/admin');
      } else {
        let error = {};
        res.errors.map(err => {
          for (const e in err) {
            error[`${e}Error`] = err[e];
          }
        });
        this.setState({
          ...error,
          isSubmitting: false,
        });
      }
    });
  };

  componentWillUnmount() {
    this.props.setEdit({});
    this.props.fetchAdmin();
  }
  render() {
    const { role, admin } = this.props;
    const { newPassword, password, newPasswordError, passwordError, roleError, usernameError } = this.state;
    return (
      <div>
        {
          (admin.edit.hasOwnProperty('username')) ? (
            <div>
              <RegularCard
                cardTitle="Edit Admin"
                cardSubtitle="Modify the details"
                content={
                  <div>
                    <Grid container>
                      <ItemGrid xs={12} sm={12} md>
                        <CustomInput
                          labelText="Username"
                          id="username"
                          name="username"
                          onChange={this.handleChange}
                          inputProps={{
                            defaultValue: this.state.username,
                          }}
                          formControlProps={{
                            fullWidth: true,
                          }}
                          helperText={usernameError}
                        />
                      </ItemGrid>
                      <ItemGrid xs={12} sm={12} md>
                        <CustomSelect
                          value={this.state.role}
                          onChange={this.handleChange}
                          id="role"
                          name="role"
                          labelText="Role"
                          data={role.role}
                          formControlProps={{
                            fullWidth: true
                          }}
                          error={roleError.length > 0}
                          helperText={roleError}
                        />
                      </ItemGrid>
                    </Grid>
                    <Grid container>
                      <ItemGrid xs={12} sm={12} md>
                        <CustomInput
                          labelText="Password"
                          id="password"
                          name="password"
                          onChange={this.handleChange}
                          inputProps={{
                            value: password,
                            type: "password",
                          }}
                          formControlProps={{
                            fullWidth: true
                          }}
                          error={passwordError.length > 0}
                          helperText={passwordError}
                        />
                      </ItemGrid>
                      <ItemGrid xs={12} sm={12} md>
                        <CustomInput
                          labelText="New Password"
                          id="newPassword"
                          name="newPassword"
                          onChange={this.handleChange}
                          inputProps={{
                            value: newPassword,
                            type: "password",
                          }}
                          formControlProps={{
                            fullWidth: true
                          }}
                          error={newPasswordError.length > 0}
                          helperText={newPasswordError}
                        />
                      </ItemGrid>
                    </Grid>
                  </div>
                }
                footer={<Button color="primary" disabled={this.state.isSubmitting}
                                onClick={this.onSubmit}>Submit</Button>}
              />
            </div>
          ) : <LinearProgress color="secondary" variant="indeterminate" />
        }
      </div>
    )
  }
}

Edit.propTypes = {
  classes: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  role: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

const mapStateToProps = ({ app, role, admin }) => ({
  app,
  role,
  admin,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setEdit,
      editAdmin,
      fetchAdmin,
      addAdmin,
      adminLoading,
    },
    dispatch,
  );
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(appStyle)(Edit)));
