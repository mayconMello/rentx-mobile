import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface ButtonProps {
  color: string
}

interface ButtonTextProps {
  light: boolean;
}

export const Container = styled(RectButton) <ButtonProps>`
  width: 100%;

  padding: 19px;
  align-items: center;
  justify-content: center;

  margin-bottom: 8px;
  
  background-color: ${({ color, theme }) => color ? color : theme.colors.main};
`;

export const Title = styled.Text<ButtonTextProps>`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
  color: ${({ theme, light }) =>
    light ? theme.colors.header : theme.colors.shape
  };
  
  margin-right: 10px;
`;

export const Content = styled.View`
  flex-direction: row;
  align-items: center;
`