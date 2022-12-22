import React, { useContext } from 'react';
import { Alert, useWindowDimensions } from 'react-native';
import LogoSvg from '../../assets/logo.svg';
import BackgroundLogo from '../../assets/logo_background_gray.svg';
import { SignInSocialButton } from '../../components/SignInButton';
import { Container, Title, TitleMarked, Footer } from './styles';
import GoogleSvg from '../../assets/google.svg';
import { useAuth } from '../../hooks/auth';
import { useNavigation } from '@react-navigation/native';

export function SignIn() {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<any>()

  const { signIn, setUserStorageLoading, user } = useAuth()

  async function handleSignInWithGoogle() {
    try {
      setUserStorageLoading(true);
      await signIn();

      navigation.navigate('Home')
    } catch (error) {
      console.log(error)
      Alert.alert('Não foi possível conectar a conta Google!')
    }
  }

  return (
    <Container>
      <LogoSvg
        width={140}
        height={40}
      />
      <BackgroundLogo
        width={width}
      />
      <Title>
        A <TitleMarked>maior</TitleMarked> plataforma {'\n'}
        de aluguél de carros {'\n'}
        do <TitleMarked>Brasil</TitleMarked> {'\n'}
      </Title>

      <Footer>
        <SignInSocialButton
          svg={GoogleSvg}
          title="Entrar com Google"
          onPress={handleSignInWithGoogle}
        >
        </SignInSocialButton>
      </Footer>
    </Container>
  );
}