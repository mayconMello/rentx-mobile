import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { AntDesign } from '@expo/vector-icons';
import { Car } from '../../components/Car';
import { CarDTO } from '../../dto/carDTO';
import { api } from '../../service/api';
import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate

} from './styles';

interface CarProps {
  id: string;
  user: string;
  car: CarDTO;
}

export function MyCars() {
  const navigation = useNavigation<any>();
  const theme = useTheme();

  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true)

  function handleBackButton() {
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const { data } = await api.get('/schedules_byuser?user_id=1')
        setCars(data);
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchCars()
  }, [])

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <BackButton
          color={theme.colors.shape}
          onPress={handleBackButton}
        />

        <Title>
          Seus agendamentos, {'\n'}
          estão aqui.
        </Title>
        <SubTitle>Conforto, segurança e praticidade.</SubTitle>
      </Header>

      <Content>
        <Appointments>
          <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
          <AppointmentsQuantity>02</AppointmentsQuantity>
        </Appointments>

        <FlatList
          data={cars}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) =>
            <CarWrapper>
              <Car
                data={item.car}
              />
              <CarFooter>
                <CarFooterTitle>Período</CarFooterTitle>
                <CarFooterPeriod>
                  <CarFooterDate>18/06/2021</CarFooterDate>
                  <AntDesign
                    name="arrowright"
                    size={20}
                    color={theme.colors.title}
                    sytle={{ marginHorizontal: 10 }}
                  />
                  <CarFooterDate>18/06/2021</CarFooterDate>
                </CarFooterPeriod>
              </CarFooter>
            </CarWrapper>
          }
        />
      </Content>
    </Container >
  );
}