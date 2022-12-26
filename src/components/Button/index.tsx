import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { Load } from '../Load';
import { Container, Content, Title } from './styles';

interface Props extends RectButtonProps {
  title: string;
  color?: string;
  enabled?: boolean;
  loading?: boolean;
  light?: boolean;
}

export function Button({
  title,
  color,
  enabled = true,
  loading = false,
  light = false,
  ...rest
}: Props) {

  const theme = useTheme()

  function enabledButton() {
    return enabled && !loading
  }
  return (
    <Container
      {...rest}
      color={color}
      enabled={enabled}
      style={{ opacity: enabledButton() ? 1 : .5 }}
    >
      <Content>
        <Title light={light}>{title}</Title>
        {loading &&
          <Load
            size='small'
            color={theme.colors.shape}
            flex={0}
          />
        }
      </Content>
    </Container>
  );
}