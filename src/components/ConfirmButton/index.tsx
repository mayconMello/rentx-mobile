import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { Container, Title } from './style';

interface Props extends RectButtonProps {
  title: String;
}

export function ConfirmButton({ title, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}