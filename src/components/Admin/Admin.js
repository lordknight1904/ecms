import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { withStyles } from 'material-ui';
import { withRouter } from 'react-router'
import Grid from '@material-ui/core/Grid';
import appStyle from '../../assets/jss/components/appStyle';
import RegularCard from "../../components/Cards/RegularCard";
import Table from "../../components/Table/Table";
import ItemGrid from "../../components/Grid/ItemGrid";
import CustomButton from '../CustomButtons/Button';
import { bindActionCreators } from "redux";
import moment from "moment/moment";
import Button from '@material-ui/core/Button';
import { Build, Delete, Lock, LockOpen } from "@material-ui/icons";
import {
  adminLoading,
  fetchAdmin,
  setCurrentPage,
  setEdit,
  addAdmin,
  deactiveAdmin,
  reactiveAdmin,
  deleteAdmin
} from '../../reducers/admin';

class Admin extends Component {
  state = {
    rowsPerPage: 5,
  };
  handleChangePage = (event, page) => {
    this.props.setCurrentPage(page);
  };
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
  handleFirstPageButtonClick = event => {
    this.handleChangePage(event, 0);
  };
  handleBackButtonClick = event => {
    this.handleChangePage(event, this.props.page - 1);
  };
  handleNextButtonClick = event => {
    this.handleChangePage(event, this.props.page + 1);
  };
  handleLastPageButtonClick = event => {
    this.handleChangePage(
      event,
      Math.max(0, Math.ceil(this.props.admin.admin.length / this.state.rowsPerPage) - 1),
    );
  };

  onEdit = (key) => {
    this.props.adminLoading();
    this.props.setEdit(this.props.admin.admin[key + this.state.rowsPerPage * this.props.admin.currentPage]);
  };
  onDeactiveAdmin = (key) => {
    const admin = {
      id: this.props.admin.admin[key + this.state.rowsPerPage * this.props.admin.currentPage]._id,
    };
    this.props.addAdmin([]);
    this.props.adminLoading();
    this.props.deactiveAdmin(admin).then(() => {
      this.props.fetchAdmin();
    });
  };
  onReactiveAdmin = (key) => {
    const admin = {
      id: this.props.admin.admin[key + this.state.rowsPerPage * this.props.admin.currentPage]._id,
    };
    this.props.addAdmin([]);
    this.props.adminLoading();
    this.props.reactiveAdmin(admin).then(() => {
      this.props.fetchAdmin();
    });
  };
  onDeleteAdmin = (key) => {
    const admin = {
      id: this.props.admin.admin[key + this.state.rowsPerPage * this.props.admin.currentPage]._id,
    };
    this.props.addAdmin([]);
    this.props.adminLoading();
    this.props.deleteAdmin(admin).then(() => {
      this.props.fetchAdmin();
    });
  };

  render() {
    const { classes, admin } = this.props;
    const editButton = props => (
      <Link key="edit" to={`${this.props.location.pathname}/edit`} style={{ textDecoration: 'none' }}>
        <Button key="edit" onClick={() => this.onEdit(props)} variant="fab" mini color="primary" aria-label="edit"
                classes={{ mini: classes.buttonMini }}>
          <Build />
        </Button>
      </Link>
    );
    const deActiveButton = props => (
      <Button key="deActive" variant="fab" mini color="default" aria-label="deactive"
              classes={{ mini: classes.buttonMini }} onClick={() => this.onDeactiveAdmin(props)}>
        <Lock />
      </Button>
    );
    const reActiveButton = props => (
      <Button key="reActive" variant="fab" mini color="secondary" aria-label="reactive"
              classes={{ mini: classes.buttonMini }} onClick={() => this.onReactiveAdmin(props)}>
        <LockOpen />
      </Button>
    );
    const deleteButton = props => (
      <Button key="delete" variant="fab" mini color="secondary" aria-label="delete"
              classes={{ mini: classes.buttonMini }} onClick={() => this.onDeleteAdmin(props)}>
        <Delete />
      </Button>
    );
    const data = admin.admin.map(ad => {
      return [
        ad.username,
        ad.role.name,
        moment(ad.dateCreated).format('MMMM Do YYYY, h:mm'),
        [editButton, ad.active ? deActiveButton : reActiveButton, deleteButton]
      ];
    });
    return (
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <RegularCard
            cardTitle="Admin"
            cardAction={
              <Link to={`${this.props.location.pathname}/add`} style={{ textDecoration: 'none' }}>
                <CustomButton color="rose">
                  New
                </CustomButton>
              </Link>
            }
            // cardSubtitle="Here is a subtitle for this table"
            content={
              <Table
                tableHeaderColor="primary"
                tableHead={["Username", "Role", "Date Created", "Actions"]}
                loading={admin.loading}
                tableData={data}
                page={admin.currentPage}
                rowsPerPage={this.state.rowsPerPage}
                handleChangePage={this.handleChangePage}
                handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                handleFirstPageButtonClick={this.handleFirstPageButtonClick}
                handleBackButtonClick={this.handleBackButtonClick}
                handleNextButtonClick={this.handleNextButtonClick}
                handleLastPageButtonClick={this.handleLastPageButtonClick}
              />
            }
          />
        </ItemGrid>
      </Grid>
    )
  }
}

Admin.propTypes = {
  classes: PropTypes.object.isRequired,
  admin: PropTypes.object.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  setEdit: PropTypes.func.isRequired,
  addAdmin: PropTypes.func.isRequired,
  deactiveAdmin: PropTypes.func.isRequired,
  reactiveAdmin: PropTypes.func.isRequired,
  deleteAdmin: PropTypes.func.isRequired,
  fetchAdmin: PropTypes.func.isRequired,
};

const mapStateToProps = ({ admin }) => ({
  admin,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCurrentPage,
      setEdit,
      deactiveAdmin,
      reactiveAdmin,
      deleteAdmin,
      addAdmin,
      fetchAdmin,
      adminLoading,
    },
    dispatch,
  );
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(appStyle)(Admin)));
