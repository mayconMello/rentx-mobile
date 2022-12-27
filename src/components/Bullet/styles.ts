import styled from 'styled-components/native';

interface Props {
  active: boolean;
}

export const Container = styled.View<Props>`
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