import { Feather } from "@expo/vector-icons";
import React from 'react';
import {
  Calendar as CustomCalendar, CalendarProps, LocaleConfig
} from 'react-native-calendars';
import { useTheme } from 'styled-components';
import { ptBR } from './localeConfig';

LocaleConfig.locales['pt-br'] = ptBR
LocaleConfig.defaultLocale = 'pt-br'

interface MarkedDateProps {
  [date: string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disableTouchEvent?: boolean;
    marked?: boolean;
  };
}

interface DayProps {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}


function Calendar({
  markedDates,
  onDayPress,
  displayLoadingIndicator = true
}: CalendarProps) {
  const theme = useTheme();
  return (
    <CustomCalendar
      renderArrow={(direction) =>
        <Feather
          size={24}
          color={theme.colors.text}
          name={direction == 'left' ? 'chevron-left' : 'chevron-right'}
        />
      }
      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomWidth: 0.2,
        borderBottomColor: theme.colors.text_detail,
        paddingBottom: 5,
        marginBottom: 10
      }}
      theme={{
        textDayFontFamily: theme.fonts.primary_400,
        textDayHeaderFontFamily: theme.fonts.primary_500,
        textMonthFontFamily: theme.fonts.secondary_600,
        monthTextColor: theme.colors.title,
        textDayHeaderFontSize: 10,
        textDayFontSize: 12,
        textMonthFontSize: 18,
        arrowStyle: {
          marginHorizontal: -15
        },
        indicatorColor: theme.colors.title,
      }}
      firstDay={1}
      minDate={displayLoadingIndicator ? null : new Date().toDateString()}
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
      displayLoadingIndicator={displayLoadingIndicator}
      disabledByDefault={displayLoadingIndicator}
      disableMonthChange={displayLoadingIndicator}
      disableAllTouchEventsForDisabledDays={displayLoadingIndicator}
      disableAllTouchEventsForInactiveDays={displayLoadingIndicator}
    />
  );
}

export {
  Calendar,
  MarkedDateProps,
  DayProps
}