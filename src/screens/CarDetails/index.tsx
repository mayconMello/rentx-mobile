import React from 'react';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider/indext';


import { useNavigation, useRoute } from '@react-navigation/native';
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
      <Header>
        <BackButton onPress={handleBackButton} />
      </Header>
      <CarImages>
        <ImageSlider
          imagesUrl={car.photos}
        />
      </CarImages>

      <Content>
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
          {car.about}
        </About>
      </Content>
      <Footer>
        <Button
          onPress={handleConfirmRental}
          title='Escolher periodo de Aluguel'
        />
      </Footer>
    </Container>
  );
}