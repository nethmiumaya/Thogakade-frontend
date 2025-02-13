// src/navigation/AppNavigator.tsx
import React from 'react';
import DashboardScreen from '../screens/DashboardScreen';
import OrdersScreen from '../screens/OrdersScreen';
import CustomersScreen from "../screens/CustomerScreens";
import ItemsScreen from "../screens/ItemScreen";
import { createDrawerNavigator } from '@react-navigation/drawer';

export type DrawerParamList = {
    Dashboard: undefined;
    Customers: undefined;
    Items: undefined;
    Orders: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const AppNavigator: React.FC = () => {
    return (
        <Drawer.Navigator initialRouteName="Dashboard">
        <Drawer.Screen name="Dashboard" component={DashboardScreen} />
    <Drawer.Screen name="Customers" component={CustomersScreen} />
    <Drawer.Screen name="Items" component={ItemsScreen} />
    <Drawer.Screen name="Orders" component={OrdersScreen} />
    </Drawer.Navigator>
);
};

export default AppNavigator;
