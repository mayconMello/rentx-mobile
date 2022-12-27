import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import {
  Container,
  Footer,
  Form,
  FormTitle,
  Header,
  Steps,
  Subtitle,
  Title
} from './styles';

import * as Yup from 'yup';

export function SignUpFirstStep() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState('');

  const navigation = useNavigation<any>();

  function handleBack() {
    navigation.goBack();
  }

  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        name: Yup.string()
          .required('Informe seu nome completo'),
        email: Yup.string()
          .email('E-mail inválido')
          .required('Informe o seu e-mail'),
        driverLicense: Yup.string()
          .required('Informe a sua CNH')
          .min(11, 'A CNH deve conter 11 dígitos')
          .max(11, 'A CNH deve conter 11 dígitos')
      })

      const user = { name, email, driverLicense }

      await schema.validate(user);

      navigation.navigate('SignUpSecondStep', { user })
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
              <Bullet active />
              <Bullet />
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
            <FormTitle>1. Dados</FormTitle>
            <Input
              iconName="user"
              placeholder="Nome"
              onChangeText={setName}
              value={name}
            />
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="number-pad"
              onChangeText={setDriverLicense}
              value={driverLicense}
            />
          </Form>

          <Footer>
            <Button
              title="Próximo"
              onPress={handleNextStep}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}