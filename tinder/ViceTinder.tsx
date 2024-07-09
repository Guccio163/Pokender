import React, {useMemo, useState} from 'react';
import {View, ViewStyle} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
} from 'react-native-reanimated';
import TinderItem from './TinderItem.tsx';
// Constants
const _visibleItemsLength = 3;

// Types
type ViceTinderProps<T> = {
  data: T[];
  renderItem: ({item, index}: {item: T; index: number}) => React.ReactNode;
  onEndReached?: () => void;
  onChange?: (index: number) => void;
  style?: ViewStyle;
  initialItem?: number;
  likeItem: (_arg: number) => void;
};

export default function ViceTinder<T>({
  data,
  onEndReached,
  renderItem,
  onChange,
  style,
  initialItem = 0,
  likeItem,
}: ViceTinderProps<T & {key: string}>) {
  const activeIndex = useSharedValue(initialItem);
  const [activeIndexState, setActiveIndexState] = useState(() => initialItem);
  useAnimatedReaction(
    () => {
      return Math.round(activeIndex.value);
    },
    v => {
      if (v + _visibleItemsLength > data.length - 1 && onEndReached) {
        runOnJS(onEndReached)();
      }
      if (onChange) {
        runOnJS(onChange)(v);
      }
      runOnJS(setActiveIndexState)(v);
    },
  );
  const visibleItems = useMemo(() => {
    return data.slice(
      activeIndexState,
      activeIndexState + _visibleItemsLength + 1,
    );
  }, [data, activeIndexState]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={style}>
        {visibleItems.map((item, index) => (
          <TinderItem
            key={item.key}
            activeIndex={activeIndex}
            index={index + activeIndexState}
            panEnabled={activeIndexState === index + activeIndexState}
            likeItem={(_arg: number) => {
              likeItem(_arg);
            }}>
            {renderItem({item, index: index + activeIndexState})}
          </TinderItem>
        ))}
      </View>
    </GestureHandlerRootView>
  );
}
