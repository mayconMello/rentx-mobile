import React, { useEffect } from 'react';
import { Container } from './styles';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';
import Animated, { Extrapolate, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

export function Splash() {
  const { user } = useAuth();
  const splashAnimation = useSharedValue(0);
  const navigation = useNavigation<any>()

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        splashAnimation.value,
        [0, 50],
        [1, 0],
      ),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [0, -50],
            Extrapolate.CLAMP,
          )
        }
      ]
    };
  })

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        splashAnimation.value,
        [0, 25, 50],
        [0, .3, 1],
      ),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [-50, 0]
          )
        }
      ]
    };
  })

  function startApp() {
    navigation.navigate(
      user.id ? 'Home' : 'SignIn',
    )
  }

  useEffect(() => {
    console.log(user)
    splashAnimation.value = withTiming(
      50,
      { duration: 2000 },
      () => {
        'worklet'
        runOnJS(startApp)();
      }
    )
  }, [])

  return (
    <Container>
      <Animated.View style={[brandStyle, { position: 'absolute' }]}>
        <BrandSvg
          width={90}
          height={60}
        />
      </Animated.View>

      <Animated.View style={[logoStyle, { position: 'absolute' }]}>
        <LogoSvg
          width={180}
          height={20}
        />
      </Animated.View>
    </Container>
  );
}