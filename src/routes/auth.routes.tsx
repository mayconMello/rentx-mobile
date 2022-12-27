import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '../hooks/auth';
import { Confirmation } from '../screens/Confirmation';
import { SignIn } from '../screens/SignIn';
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep';
import { SignUpSecondStep } from '../screens/SignUp/SignUpSecondStep';
import { Splash } from '../screens/Splash';

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
  const { user } = useAuth()

  return (
    <Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Splash"
    >
      <Screen
        name="Splash"
        component={Splash}
      />
      <Screen
        name="SignIn"
        component={SignIn}
      />
      <Screen
        name="SignUpFirstStep"
        component={SignUpFirstStep}
      />
      <Screen
        name="SignUpSecondStep"
        component={SignUpSecondStep}
      />
      <Screen
        name="Confirmation"
        component={Confirmation}
      />
    </Navigator>

  )
}