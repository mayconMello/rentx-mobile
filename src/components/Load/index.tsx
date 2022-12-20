import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native'
import { useTheme } from 'styled-components';

interface Props extends ActivityIndicatorProps {
  color?: string;
  size?: 'small' | 'large' | undefined;
  flex?: number | undefined;
}

export function Load({ color, flex = 1, size = 'large' }: Props) {
  const theme = useTheme();

  return (
    <ActivityIndicator
      color={color ? color : theme.colors.main}
      size={size}
      style={{
        flex,
      }}
    />
  );
}