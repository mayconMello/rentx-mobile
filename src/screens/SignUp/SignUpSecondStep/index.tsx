import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native';
import { useTheme } from 'styled-components';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { PasswordInput } from '../../../components/PasswordInput';
import {
  Container, Footer, Form,
  FormTitle, Header,
  Steps,
  Subtitle,
  Title
} from './styles';
import * as Yup from 'yup';
import { api } from '../../../service/api';

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  }
}

export function SignUpSecondStep() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigation = useNavigation<any>();
  const route = useRoute();
  const theme = useTheme()

  const { user } = route.params as Params;

  function handleBack() {
    navigation.goBack();
  }

  async function handleRegister() {
    try {
      const schema = Yup.object().shape({
        password: Yup.string()
          .min(6, 'A senha deve conter no mínimo 6 caracteres')
          .required('Informe a sua senha'),
        confirmPassword: Yup.string()
          .required('Confirme a senha')
          .oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais')
      })

      await schema.validate({
        password,
        confirmPassword
      })

      await api.post('/users', {
        name: user.name,
        email: user.email,
        driver_license: user.driverLicense,
        password,
      }).then(() => {
        navigation.navigate('Confirmation', {
          title: 'Conta criada!',
          message: `Agora é só fazer login\ne aproveitar`,
          nextScreenRoute: 'SignIn'
        })
      }).catch(() => {
        Alert.alert(
          'Erro no cadastro!',
          'Não foi possível criar um usuário'
        )
      })

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert(error.message)
      }
    }
  }

  return (
    <KeyboardAvoidingView
      behavior="position"
      enabled
    >
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
      >
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet />
              <Bullet active />
            </Steps>
          </Header>

          <Title>
            Crie sua{'\n'}conta
          </Title>
          <Subtitle>
            Faça seu cadastro de{'\n'}
            forma rápida e fácil
          </Subtitle>
          <Form>
            <FormTitle>2. Senha</FormTitle>
            <PasswordInput
              iconName="lock"
              placeholder="Digite sua senha"
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Repita sua senha"
              onChangeText={setConfirmPassword}
              value={confirmPassword}
            />
          </Form>

          <Footer>
            <Button
              title="Cadastrar"
              color={theme.colors.success}
              onPress={handleRegister}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}