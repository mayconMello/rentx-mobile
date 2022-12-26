import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { Container, Header, Title, Form, Subtitle, Footer } from './styles';

export function SignIn() {
  const theme = useTheme();

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <Title>
          Estamos{'\n'}quase lá.
        </Title>
        <Subtitle>
          Faça seu login para começar {'\n'}
          uma experiência incrível.
        </Subtitle>
      </Header>

      <Form>
        <Input
          iconName="mail"
          placeholder="E-mail"
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
        />
        <PasswordInput
          iconName="lock"
          placeholder="Senha"
        />
      </Form>

      <Footer>
        <Button title="Login" enabled={false} />
        <Button
          title="Criar conta gratuita"
          enabled={false}
          color={theme.colors.background_secondary}
          light
        />
      </Footer>
    </Container >
  );
}