import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

interface ImageIndexProps {
  active: boolean;
}

export const Container = styled.View`
  width: 100%;
`;

export const ImageIndexes = styled.View`
  flex-direction: row;
  align-self: center;
  padding-right: 24px;
`;

export const ImageIndex = styled.View<ImageIndexProps>`
  width: 10px;
  height: 10px;

  background-color: ${({ theme, active }) =>
    active ? theme.colors.title : '#fff'
  };

  border: 1px solid ${({ theme, active }) =>
    active ? theme.colors.title : theme.colors.shape
  };

  margin-left: 10px;
  border-radius: 5px;
`;

export const CarImageWrapper = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: 132px;

  justify-content: center;
  align-items: center;
`;

export const CarImage = styled.Image`
  width: 200px;
  height: 132px;
`;
