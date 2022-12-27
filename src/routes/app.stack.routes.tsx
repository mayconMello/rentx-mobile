import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CarDetails } from '../screens/CarDetails';
import { Confirmation } from '../screens/Confirmation';
import { Home } from '../screens/Home';
import { MyCars } from '../screens/MyCars';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppStackRoutes() {
  return (
    <Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="HomeStack"
    >
      <Screen
        name="HomeStack"
        component={Home}
        options={{
          gestureEnabled: false,
        }}
      />
      <Screen
        name="CarDetails"
        component={CarDetails}
      />
      <Screen
        name="Scheduling"
        component={Scheduling}
      />
      <Screen
        name="SchedulingDetails"
        component={SchedulingDetails}
      />
      <Screen
        name="Confirmation"
        component={Confirmation}
      />
      <Screen
        name="MyCars"
        component={MyCars}
      />
    </Navigator>

  )
}