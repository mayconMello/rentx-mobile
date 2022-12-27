import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider/indext';

import { useNavigation, useRoute } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { Button } from '../../components/Button';
import { CarDTO } from '../../dto/carDTO';
import { getAccessoriesIcon } from '../../utils/getAccessoriesIcons';
import {
  Accessories,
  Brand, CalendarIcon, CarImages,
  Container,
  Content, DateInfo,
  DateTitle,
  DateValue, Description,
  Details,
  Footer,
  Header,
  Name,
  Period,
  Price,
  Rent,
  RentalPeriod,
  RentalPrice,
  RentalPriceDetails,
  RentalPriceLabel,
  RentalPriceQuota,
  RentalPriceTotal
} from './styles';
import { format } from 'date-fns/esm';
import { getPlataformaDate } from '../../utils/getPlataformDate';
import { api } from '../../service/api';
import { Alert } from 'react-native';

interface Params {
  car: CarDTO,
  dates: string[];
}
interface RentalPeriod {
  start: string;
  end: string;
}

export function SchedulingDetails() {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  const [loading, setLoading] = useState(false);

  const route = useRoute();
  const { car, dates } = route.params as Params;

  const rentTotal = Number(dates.length * car.price)

  const theme = useTheme();

  const navigation = useNavigation<any>();

  function handleBackButton() {
    navigation.goBack();
  }

  async function handleConfirmRental() {
    setLoading(true);
    const { data } = await api.get(
      `/schedules_bycars/${car.id}`,
    )

    const unavailableDates = [
      ...data.unavailable_dates,
      ...dates
    ];

    try {
      await api.post(`/schedules_byuser`, {
        user_id: 1,
        car,
        startDate: format(getPlataformaDate(
          new Date(dates[0])), 'dd/MM/yyyy'
        ),
        endDate: format(getPlataformaDate(
          new Date(dates[dates.length - 1])
        ), 'dd/MM/yyyy'),
      });

      await api.put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates: unavailableDates
      })

      navigation.navigate('Confirmation', {
        title: 'Carro alugado!',
        message: `Agora você só precisa ir\naté a concessionária da RENTX`,
        nextScreenRoute: 'Home'
      })
    } catch (error) {
      Alert.alert(
        'Ocorreu um erro ao incluir o agendamento'
      );
      setLoading(false);
    }
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlataformaDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(getPlataformaDate(
        new Date(dates[dates.length - 1])
      ), 'dd/MM/yyyy'),
    })
  }, [])

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
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
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
        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>
          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>
          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />
          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>
        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>
              R$ {car.price} x{dates.length} diárias
            </RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button
          title='Alugar Agora'
          color={theme.colors.success}
          onPress={handleConfirmRental}
          loading={loading}
        />
      </Footer>
    </Container >
  );
}