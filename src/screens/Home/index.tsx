import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { BackHandler, StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  CardList,
  Container,
  Header,
  HeaderContent, MyCarsButton, TotalCars
} from './styles';

import Logo from '../../assets/logo.svg';
import { api } from '../../service/api';

import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';
import { CarDTO } from '../../dto/carDTO';
import { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const myCarsButtonStyleAnimated = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ]
    }
  })

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any) {
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    }
  })

  const theme = useTheme();
  const navigation = useNavigation<any>();

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
  }

  function handleOpenMyCars() {
    navigation.navigate('MyCars');
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
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <MyCarsButton
          style={[myCarsButtonStyleAnimated]}
          onPress={handleOpenMyCars}
        >
          <Ionicons
            name="ios-car-sport"
            size={32}
            color={theme.colors.shape}
          />
        </MyCarsButton>
      </PanGestureHandler>
    </Container>
  );
}