import React from 'react';
import ThankYou from './views/dashboard/Components/ThenkYou/ThankYou';
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));


const routes = [
  { path: '/', exact: true, name: 'Login', component: Dashboard  },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/thankYou', name: 'Dashboard', component: ThankYou },
];

export default routes;
