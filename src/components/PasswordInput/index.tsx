import React, { useState } from 'react';
import {
  Container,
  InputText,
  IconContainer
} from './styles';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { TextInputProps } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name']
}

export function PasswordInput({ iconName, ...rest }: Props) {

  const theme = useTheme();

  const [
    isPasswordVisible,
    setIsPasswordVisible
  ] = useState(false);

  function handlePasswordVisibilityChange() {
    setIsPasswordVisible(prevState => !prevState);
  }

  return (
    <Container>
      <IconContainer>
        <Feather
          name={iconName}
          size={24}
          color={theme.colors.text}
        />
      </IconContainer>
      <InputText
        secureTextEntry={isPasswordVisible}
        {...rest}
      />

      <BorderlessButton
        onPress={handlePasswordVisibilityChange}
      >
        <IconContainer>
          <Feather
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            color={theme.colors.text}
          />
        </IconContainer>
      </BorderlessButton>
    </Container>
  );
}