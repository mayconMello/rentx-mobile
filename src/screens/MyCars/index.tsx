import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StatusBar, FlatList, Alert } from 'react-native';
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
import { Load } from '../../components/Load';
import { LoadAnimation } from '../../components/LoadAnimation';

interface CarProps {
  id: string;
  user: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
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
        const { data } = await api.get(
          '/schedules_byuser?user_id=1'
        )
        setCars(data);
      } catch (error) {
        Alert.alert(
          'Ocorreu um erro ao carregar os dados'
        );
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
          <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
        </Appointments>
        {
          loading ?
            <LoadAnimation /> :
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
                      <CarFooterDate>{item.startDate}</CarFooterDate>
                      <AntDesign
                        name="arrowright"
                        size={20}
                        color={theme.colors.title}
                        style={{ marginHorizontal: 10 }}
                      />
                      <CarFooterDate>{item.endDate}</CarFooterDate>
                    </CarFooterPeriod>
                  </CarFooter>
                </CarWrapper>
              }
            />
        }
      </Content>
    </Container >
  );
}