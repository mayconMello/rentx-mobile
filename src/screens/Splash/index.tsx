import React from 'react';
import { Container } from './styles';
import Animated from 'react-native-reanimated';
import { Button } from '../../components/Button';

export function Splash() {
  return (
    <Container>
      <Animated.View />
      <Button title='Mover' />
    </Container>
  );
}