import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;

  align-items: center;

  background-color: ${({ theme }) => theme.colors.header};

  padding-top: 96px;
  
`;

export const Title = styled.Text`
  font-size: ${RFValue(30)}px;
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  line-height: ${RFValue(48)}px;

  text-align: center;
`;

export const TitleMarked = styled.Text`
  color: ${({ theme }) => theme.colors.main};
`

export const Footer = styled.View`
  width: 100%;

  margin-top: 20px;
  padding: 24px;
`