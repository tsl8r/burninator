import { createDrawerNavigator } from 'react-navigation';
import Dashboard from './containers/Dashboard';
import SelectProject from './containers/SelectProject';
import TeamSetup from './containers/TeamSetup';

export default createDrawerNavigator(
  {
    Dashboard,
    SelectProject,
    TeamSetup,
  },
  {
    initialRouteName: 'Dashboard',
  },
);