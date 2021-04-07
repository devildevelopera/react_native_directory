import { Dimensions } from 'react-native';

export const dimensions = Dimensions.get('window');
export const imageHeight = Math.round(dimensions.width * 9 / 16);
export const imageWidth = dimensions.width;