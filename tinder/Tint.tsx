import React from 'react';
// import Ionicons from '@react-native-vector-icons/ionicons';
// import Icon from 'react-native-vector-icons/Ionicons'; // Przykład z Ionicons
import Icon from 'react-native-ionicons';

import Animated, {SharedValue, useAnimatedStyle} from 'react-native-reanimated';

type Props = {
  tilt: SharedValue<number>;
  isPositive: any;
};

export default function Tint({tilt, isPositive}: Props) {
  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: tilt.value ? Math.abs(tilt.value) * 0.003 : 0,
      // backgroundColor: tilt.value > 0 ? 'green' : 'red',
    };
  });

  return (
    <Animated.View
      style={[
        animatedStyles,
        {
          width: '100%',
          height: '100%',
          zIndex: 1,
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 20,
          backgroundColor: isPositive ? 'green' : 'red',
        },
      ]}>
      {isPositive ? (
        <Icon name="heart" color="#ffffff" size={140} />
      ) : (
        <Icon name="close" color="#ffffff" size={140} />
      )}
    </Animated.View>
  );
}
