import AdminFormPage from './Admin/Form';
import AdminEditPage from './Admin/Edit';
import DashboardPage from './Dashboard/Dashboard';
import AdminPage from './Admin/Admin';
import RolePage from './Role/Role';

import {
  Dashboard,
  Person,
  Star
} from "@material-ui/icons";


const paths = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    exact: true,
    onSide: true,
  },
  {
    path: "/admin/add",
    navbarName: "Create new Admin",
    component: AdminFormPage,
    exact: false,
    onSide: false,
  },
  {
    path: "/admin/edit",
    navbarName: "Edit new Admin",
    component: AdminEditPage,
    exact: false,
    onSide: false,
  },
  {
    path: "/admin",
    icon: Person,
    sidebarName: "Admin",
    navbarName: "Admin",
    component: AdminPage,
    exact: true,
    onSide: true,
  },
  {
    path: "/role",
    sidebarName: "Role",
    navbarName: "Role",
    icon: Star,
    component: RolePage,
    exact: true,
    onSide: true,
  },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default paths;
