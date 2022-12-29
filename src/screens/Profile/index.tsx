import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import * as ImagePicker from 'expo-image-picker';
import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section
} from './styles';
import { Feather } from '@expo/vector-icons'
import { Input } from '../../components/Input';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { PasswordInput } from '../../components/PasswordInput';
import { useAuth } from '../../hooks/auth';
import { Button } from '../../components/Button';
import * as Yup from 'yup';

export function Profile() {
  const { user, signOut, updateUser } = useAuth();

  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);

  const theme = useTheme()
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
    setOption(optionSelected);
  }

  async function handleSelectAvatar() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1
    })
    if (result.canceled) return;

    if (result.assets) {
      setAvatar(result.assets[0].uri);
    }

  }

  async function handleProfileUpdate() {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Informe o seu nome completo'),
        driver_license: Yup.string().required('Informe a sua CNH'),
      })

      await schema.validate({
        name,
        driver_license: driverLicense
      });

      await updateUser({
        ...user,
        name,
        avatar,
        driver_license: driverLicense
      })

      Alert.alert('Perfil atualizado com sucesso!');

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert(error.message);
        return;
      }
      Alert.alert('Não foi possível atualizar o perfil');
    }
  }

  async function handleSignOut() {
    Alert.alert(
      'Tem certeza ?',
      'Se você sair, irá precisar de internet para conectar-se novamente',
      [
        {
          text: 'Não',
          style: 'cancel',
          onPress: () => { }
        },
        {
          text: 'Sim',
          onPress: () => {
            signOut()
          }
        }
      ]
    )
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
              {!!avatar && <Photo
                source={{ uri: avatar }}
              />
              }
              <PhotoButton onPress={handleSelectAvatar}>
                <Feather
                  name="camera"
                  size={24}
                  color={theme.colors.shape}
                />
              </PhotoButton>
            </PhotoContainer>
          </Header>
          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <Options>
              <Option
                active={option === 'dataEdit'}
                onPress={() => handleOptionChange('dataEdit')}
              >
                <OptionTitle active={option === 'dataEdit'}>Dados</OptionTitle>
              </Option>
              <Option
                active={option === 'passwordEdit'}
                onPress={() => handleOptionChange('passwordEdit')}
              >
                <OptionTitle active={option === 'passwordEdit'}>Trocar Senha</OptionTitle>
              </Option>
            </Options>
            {
              option === "dataEdit" ?
                <Section>
                  <Input
                    iconName="user"
                    placeholder="Nome Completo"
                    autoCorrect={false}
                    defaultValue={user.name}
                    onChangeText={setName}
                  />
                  <Input
                    iconName="mail"
                    editable={false}
                    autoCorrect={false}
                    defaultValue={user.email}
                  />
                  <Input
                    iconName="credit-card"
                    placeholder="CNH"
                    keyboardType="number-pad"
                    defaultValue={user.driver_license}
                    onChangeText={setDriverLicense}
                  />
                </Section>
                :
                <Section>
                  <PasswordInput
                    iconName="lock"
                    placeholder="Senha"
                  />
                  <PasswordInput
                    iconName="lock"
                    placeholder="Confirme a senha"
                  />
                </Section>
            }
          </Content>
          <Button
            title="Salvar Alterações"
            onPress={handleProfileUpdate}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}