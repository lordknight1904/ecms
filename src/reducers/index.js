import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import app from './app';
import role from './role';
import admin from './admin';

const rootReducer = combineReducers({
  router: routerReducer,
  form: formReducer,
  app,
  role,
  admin,
});

export default rootReducer;
