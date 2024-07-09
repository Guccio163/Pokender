import {PropsWithChildren, useState} from 'react';
import {Dimensions} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  SharedValue,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withSpring,
} from 'react-native-reanimated';
import Tint from './Tint';

type TinderItemProps = PropsWithChildren<{
  activeIndex: SharedValue<number>;
  index: number;
  panEnabled: boolean;
  likeItem: (_arg: number) => void;
}>;

const {width} = Dimensions.get('window');
// const _itemSize = width * 0.6;
const _defaultTilt = 15;
const _rotationDeg = 3;
const minVelocity = 500;
const minTranslateX = width / 4;

export default function TinderItem({
  activeIndex,
  index,
  panEnabled,
  children,
  likeItem,
}: TinderItemProps) {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const rotation = useSharedValue(0);
  const [isPositive, setPositive] = useState(x.value > 0);
  const pan = Gesture.Pan()
    .enabled(panEnabled)
    .onChange(e => {
      x.value += e.changeX;
      runOnJS(setPositive)(x.value > 0);
      y.value += e.changeY;
      // console.log(x.value);
      rotation.value += e.changeX * 0.03;
    })
    .onEnd(e => {
      if (
        Math.abs(e.velocityX) > minVelocity ||
        Math.abs(e.translationX) > minTranslateX
      ) {
        x.value = withSpring(width * 2 * Math.sign(e.velocityX));
        y.value = withDecay({
          velocity: e.velocityY,
        });
        activeIndex.value = withSpring(activeIndex.value + 1, {
          mass: 1,
          damping: 45,
          stiffness: 200,
          overshootClamping: false,
        });
        if (Math.sign(e.velocityX) > 0) {
          runOnJS(likeItem)(activeIndex.value);
        }
      } else {
        // Come back to initial values
        x.value = withSpring(0);
        y.value = withSpring(0);
        rotation.value = withSpring(0);
      }
    });
  const stylez = useAnimatedStyle(() => {
    // [visible items + 1 (hidden), third (right), second(left), first(center)]
    const inputRange = [index - 3, index - 2, index - 1, index];
    return {
      position: 'absolute',
      zIndex: panEnabled ? 10 : activeIndex.value - index,
      transform: [
        {
          rotate: `${interpolate(activeIndex.value, inputRange, [
            0,
            _rotationDeg,
            -_rotationDeg,
            rotation.value,
          ])}deg`,
        },
        {
          translateX:
            interpolate(activeIndex.value, inputRange, [
              0,
              _defaultTilt,
              -_defaultTilt,
              0,
            ]) + x.value,
        },
        {
          translateY: y.value,
        },
      ],
      opacity: interpolate(activeIndex.value, [index - 3, index - 2.5], [0, 1]),
      // width: '100%',
      // height: '100%',
      marginTop: 0,
    };
  });
  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={stylez}>
        <Tint tilt={x} isPositive={isPositive} />
        {children}
      </Animated.View>
    </GestureDetector>
  );
}
