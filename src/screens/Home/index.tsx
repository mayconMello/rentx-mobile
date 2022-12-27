import React, { useEffect, useState } from 'react';
import { BackHandler, StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  CardList,
  Container,
  Header,
  HeaderContent, TotalCars
} from './styles';

import Logo from '../../assets/logo.svg';
import { api } from '../../service/api';

import { useNavigation } from '@react-navigation/native';
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';
import { CarDTO } from '../../dto/carDTO';

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<any>();

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const { data } = await api.get('/cars');
        setCars(data);

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, [])

  useEffect(() => {
    BackHandler.addEventListener(
      'hardwareBackPress', () => {
        return true;
      })
  })

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo
            width={RFValue(108)}
            height={RFValue(12)}
          />
          {!loading &&
            <TotalCars>
              Total de {cars.length} carros
            </TotalCars>
          }
        </HeaderContent>
      </Header>
      {
        loading ? <LoadAnimation /> :
          <CardList
            data={cars}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Car
              data={item}
              onPress={() => handleCarDetails(item)}
            />}
          />
      }
    </Container>
  );
}