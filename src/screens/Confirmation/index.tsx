import React from 'react';
import { Container, Content, Title, Message, Footer } from './styles';
import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import { StatusBar, useWindowDimensions } from 'react-native';
import { ConfirmButton } from '../../components/ConfirmButton';
import { useNavigation, useRoute } from '@react-navigation/native';

interface Params {
  title: string;
  message: string;
  nextScreenRoute: string;
}

export function Confirmation() {
  const { width } = useWindowDimensions()

  const navigation = useNavigation<any>();
  const route = useRoute();

  const { title, message, nextScreenRoute } = route.params as Params;

  function handleBackToHome() {
    navigation.navigate(nextScreenRoute);
  }
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <LogoSvg
        width={width}
      />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>{title}</Title>

        <Message>
          {message}
        </Message>
      </Content>

      <Footer>
        <ConfirmButton title="Ok" onPress={handleBackToHome} />
      </Footer>
    </Container>
  );
}