import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton

} from './styles';
import { Feather } from '@expo/vector-icons'

export function Profile() {
  const theme = useTheme()
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  function handleSignOut() { }

  return (
    <Container>
      <Header>
        <HeaderTop>
          <BackButton
            color={theme.colors.shape}
            onPress={handleBack}
          />
          <HeaderTitle>Editar Perfil</HeaderTitle>
          <LogoutButton onPress={handleSignOut}>
            <Feather
              name="power"
              size={24}
              color={theme.colors.shape}
            />
          </LogoutButton>
        </HeaderTop>
        <PhotoContainer>
          <Photo
            source={{ uri: 'https://github.com/mayconMello.png' }}
          />
          <PhotoButton onPress={() => { }}>
            <Feather
              name="camera"
              size={24}
              color={theme.colors.shape}
            />
          </PhotoButton>
        </PhotoContainer>
      </Header>
    </Container>
  );
}