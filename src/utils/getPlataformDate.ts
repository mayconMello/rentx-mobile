import { addDays } from 'date-fns';
import { Platform } from 'react-native';

export function getPlataformaDate(date: Date) {
  return addDays(date, 1);
}