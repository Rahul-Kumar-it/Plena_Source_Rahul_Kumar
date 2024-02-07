import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {GroceryHome} from '../pages/groceryHome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationDock} from '../components/navigationDock';
import {ProductDetail} from '../pages/productDetail';
import {Cart} from '../pages/cart';
import {DummyTab} from '../pages/dummyTab';
import {CONSOLE_MODE} from '../api/apiVars/constants';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const options = {
  headerShown: false,
  statusBarTranslucent: true,
  statusBarStyle: 'dark',
  statusBarColor: 'transparent',
};

/* Bottom tab component */
export const TabNav = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={options}
        initialRouteName="Main-Home"
        tabBar={props => <NavigationDock {...props} />}>
        <Tab.Screen name="Main-Home" component={GroceryHome} />
        <Tab.Screen name="Dummy-Tab" component={DummyTab} />
        {/* Rest of tab routes can be declare here */}
      </Tab.Navigator>
    </>
  );
};

export const RouteList = () => {
  /* Consoles handler */
  if (CONSOLE_MODE.mode === 'production') {
    console.log = function () {};
  }

  return (
    <>
      <Stack.Navigator screenOptions={options}>
        <Stack.Screen name="Tab-Nav" component={TabNav} />
        <Tab.Screen name="Product-Detail" component={ProductDetail} />
        <Stack.Screen name="Cart" component={Cart} />
        {/* Rest of application routes can be declare here */}
      </Stack.Navigator>
    </>
  );
};
