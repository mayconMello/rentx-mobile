import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import {
  Container,
  Content,
  DateInfo,
  DateTitle,
  DateValue,
  Footer,
  Header,
  RentalPeriod,
  Title
} from './styles';

import { Alert, StatusBar } from 'react-native';
import ArrowSvg from '../../assets/arrow.svg';
import { Button } from '../../components/Button';
import { Calendar, DayProps, MarkedDateProps } from '../../components/Calendar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { generateInterval } from '../../components/Calendar/generateInterval';
import { getPlataformaDate } from '../../utils/getPlataformDate';
import { format } from 'date-fns';
import { CarDTO } from '../../dto/carDTO';
import { api } from '../../service/api';

interface RentalPeriod {
  start: number;
  startFormatted: string;
  end: number;
  endFormatted: string;
}

interface Params {
  car: CarDTO
}

export function Scheduling() {
  const route = useRoute();
  const { car } = route.params as Params;

  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps
  );
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps
  );

  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  )

  const [loading, setLoading] = useState(true);

  const theme = useTheme()

  const navigation = useNavigation<any>();

  function handleBackButton() {
    navigation.goBack();
  }

  function handleConfirmRental() {
    if (!rentalPeriod.start || !rentalPeriod.end) {
      Alert.alert('Selecione um periodo para aluguel.')
      return;
    }
    navigation.navigate(
      'SchedulingDetails', {
      car,
      dates: Object.keys(markedDates),
    }
    )
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp
      ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);

    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[
      Object.keys(interval).length - 1
    ];

    setRentalPeriod({
      start: start.timestamp,
      end: end.timestamp,
      startFormatted: format(
        getPlataformaDate(
          new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(
        getPlataformaDate(
          new Date(endDate)), 'dd/MM/yyyy')
    })
  }

  function enabledButton() {
    return !loading && !!rentalPeriod.start
  }

  useEffect(() => {
    async function fetchUnavailableDates() {
      try {
        const { data } = await api.get(
          `schedules_bycars/${car.id}`
        )

        const unavailableDates = data.unavailable_dates.reduce(
          (acc: object, date: string) => {
            acc[date] = { disabled: true };
            return acc;
          }, {}
        );

        setMarkedDates({
          ...markedDates,
          ...unavailableDates
        })
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchUnavailableDates();
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
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>
        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.start}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>
          <ArrowSvg />
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.end}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar
          markedDates={markedDates}
          onDayPress={handleChangeDate}
          displayLoadingIndicator={loading}
        />
      </Content>

      <Footer>
        <Button
          title='Confirmar'
          onPress={handleConfirmRental}
          enabled={enabledButton()}
        />
      </Footer>
    </Container>
  );
};