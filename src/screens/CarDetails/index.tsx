import React from 'react';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider/indext';


import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { Button } from '../../components/Button';
import { CarDTO } from '../../dto/carDTO';
import { getAccessoriesIcon } from '../../utils/getAccessoriesIcons';
import {
  About,
  Accessories,
  Brand,
  CarImages,
  Container,
  Content,
  Description,
  Details,
  Footer,
  Header,
  Name,
  Period,
  Price,
  Rent
} from './styles';

interface Params {
  car: CarDTO
}

export function CarDetails() {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { car } = route.params as Params;

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  })

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      ),
    }
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 150],
        [1, 0],
        Extrapolate.CLAMP
      )
    }
  });

  function handleBackButton() {
    navigation.goBack();
  }

  function handleConfirmRental() {
    navigation.navigate('Scheduling', {
      car,
    })
  }

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Animated.View
        style={[headerStyleAnimation]}
      >
        <Header>
          <BackButton onPress={handleBackButton} />
        </Header>
        <CarImages style={sliderCarsStyleAnimation}>
          <ImageSlider
            imagesUrl={car.photos}
          />
        </CarImages>
      </Animated.View>

      <Content onScroll={scrollHandler}>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>
        <Accessories>
          {
            car.accessories.map(
              accessory => (
                <Accessory
                  key={accessory.type}
                  name={accessory.name}
                  icon={getAccessoriesIcon(accessory.type)}
                />
              )
            )
          }
        </Accessories>
        <About>
          {car.about} {'\n'}
          {car.about} {'\n'}
          {car.about} {'\n'}
          {car.about} {'\n'}
          {car.about} {'\n'}
        </About>
      </Content>
      <Footer>
        <Button
          onPress={handleConfirmRental}
          title='Escolher periodo de Aluguel'
        />
      </Footer>
    </Container >
  );
}