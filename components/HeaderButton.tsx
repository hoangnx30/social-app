import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export const CustomHeaderButtonMCI = (props: any) => {
  return <HeaderButton IconComponent={MaterialCommunityIcons} {...props} iconSize={32} />;
};

export const CustomHeaderButtonMI = (props: any) => {
  return <HeaderButton IconComponent={MaterialIcons} {...props} iconSize={32} />;
};
