// import Dashboard from "views/Dashboard.jsx";
// import Notifications from "views/Notifications.jsx";
// import Icons from "views/Icons.jsx";
// import Typography from "views/Typography.jsx";
// import TableList from "views/Tables.jsx";
// import Maps from "views/Map.jsx";
// import UserPage from "views/User.jsx";
// import UpgradeToPro from "views/Upgrade.jsx";

import Signup from '../src/containers/signup/index';
import Services from '../src/containers/services/index';
import Shop from '../src/containers/shops/index';
import Users from '../src/containers/users/index';
import Voucher from '../src/containers/voucher/index';
import Appointment from '../src/containers/appointment/index';

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    // component: Dashboard,
    layout: "/"
  },
   {
    path: "/users",
    name: "Vendors",
    icon: "nc-icon nc-pin-3",
    component: Users,
    layout: "/dashboard"
  },
  {
    path: "/service",
    name: "Services",
    icon: "nc-icon nc-diamond",
    component: Services,
    layout: "/dashboard"
  },
  {
    path: "/shops",
    name: "Shops",
    icon: "nc-icon nc-pin-3",
    component: Shop,
    layout: "/dashboard"
  },
  {
    path: "/appointments",
    name: "Appointments",
    icon: "nc-icon nc-diamond",
    component: Appointment,
    layout: "/dashboard"
  },
  {
    path: "/vouchers",
    name: "Vouchers",
    icon: "nc-icon nc-pin-3",
    component: Voucher,
    layout: "/dashboard"
  },
  {
    path: "/service",
    name: "Plan",
    icon: "nc-icon nc-diamond",
    component: Services,
    layout: "/dashboard"
  },
  {
    path: "/service",
    name: "Subscription",
    icon: "nc-icon nc-diamond",
    component: Services,
    layout: "/dashboard"
  },
  // {
  //   path: "/signup",
  //   name: "Icons",
  //   icon: "nc-icon nc-diamond",
  //   component: Signup,
  //   layout: "/dashboard"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   // component: Maps,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   // component: Notifications,
  //   layout: "/admin"
  // },
  
  // {
  //   path: "/user-page",
  //   name: "User Profile",
  //   icon: "nc-icon nc-single-02",
  //   component: UserPage,
  //   layout: "/admin"
  // },
  // {
  //   path: "/tables",
  //   name: "Table List",
  //   icon: "nc-icon nc-tile-56",
  //   component: TableList,
  //   layout: "/admin"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-caps-small",
  //   component: Typography,
  //   layout: "/admin"
  // },
  // {
  //   pro: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-spaceship",
  //   component: UpgradeToPro,
  //   layout: "/admin"
  // }
];
export default routes;
