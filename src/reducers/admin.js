import api from '../api/index';
export const ACTIONS = {
  ADMIN_FETCH_ADMIN: 'ADMIN_FETCH_ADMIN',
  ADMIN_SET_CURRENT_PAGE: 'ADMIN_SET_CURRENT_PAGE',
  ADMIN_SET_EDIT: 'ADMIN_SET_EDIT',
  ADMIN_LOADING: 'ADMIN_LOADING',
};

const initialState = {
  loading: false,
  admin: [],
  currentPage: 0,
  edit: {},
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.ADMIN_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ACTIONS.ADMIN_FETCH_ADMIN:
      return {
        ...state,
        admin: action.admin,
        loading: false,
      };
    case ACTIONS.ADMIN_SET_EDIT:
      return {
        ...state,
        edit: action.edit,
      };
    case ACTIONS.ADMIN_SET_CURRENT_PAGE:
      return {
        ...state,
        page: action.page,
      };
    default:
      return { ...state };
  }
};

export const adminLoading = () => ({
  type: ACTIONS.ADMIN_LOADING,
});
export const editAdmin = (admin) => () => {
  return api.callApi('admin', 'put', { admin }, 'token').then(res => {
    return res;
  });
};
export const createAdmin = (admin) => () => {
  return api.callApi('admin', 'post', { admin }, 'token').then(res => {
    return res;
  });
};
export const fetchAdmin = () => (dispatch, getState) => {
  dispatch(adminLoading());
  const { admin } = getState();
  api.callApi('admin', 'get').then(res => {
    dispatch(addAdmin(res.data));
  });
};
export const addAdmin = (admin) => ({
  type: ACTIONS.ADMIN_FETCH_ADMIN,
  admin,
});
export const setCurrentPage = (page) => ({
  type: ACTIONS.ADMIN_SET_CURRENT_PAGE,
  page,
});
export const setEdit = (edit) => ({
  type: ACTIONS.ADMIN_SET_EDIT,
  edit,
});
export const deactiveAdmin = (admin) => (dispatch, getState) => {
  // const { admin } = getState();
  return api.callApi('admin/deactive', 'put', { admin }, 'token').then(res => {
    return res;
  })
};
export const reactiveAdmin = (admin) => (dispatch, getState) => {
  // const { admin } = getState();
  return api.callApi('admin/reactive', 'put', { admin }, 'token').then(res => {
    return res;
  })
};
export const deleteAdmin = (admin) => (dispatch, getState) => {
  // const { admin } = getState();
  return api.callApi('admin', 'delete', { admin }, 'token').then(res => {
    return res;
  })
};
