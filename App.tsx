import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Liked from './tinder/Liked';
import Example from './tinder/Example';
import {LikedContextProvider} from './tinder/LikedContextProvider';
import Icon from 'react-native-ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Onyx from 'react-native-onyx';
// import ONYXKEYS from './ONYXKEYS';

// const config = {
//   keys: ONYXKEYS,
// };

// Onyx.init(config);

export type RootStackParamList = {
  Home: undefined;
  Liked: undefined;
  SwipeScreen: undefined;
  CardScreen: undefined;
  ViceTinder: undefined;
  Example: undefined;
};

export type RootLabParamList = {
  Example: undefined;
  Liked: undefined;
};

function App() {
  // const Stack = createNativeStackNavigator<RootStackParamList>();
  const Tab = createBottomTabNavigator();
  // const Stack = createNativeStackNavigator();

  return (
    <LikedContextProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            headerShown: false,
            tabBarStyle: {
              height: 50,
              position: 'absolute',
              bottom: 30,
              left: 40,
              right: 40,
              paddingBottom: 5,
              paddingTop: 5,
              borderRadius: 20,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.4,
              shadowRadius: 6,
            },
            tabBarIcon: ({color, size}) => {
              let iconName;

              if (route.name === 'Liked') {
                iconName = 'heart';
              } else {
                iconName = 'images';
              }

              // You can return any component that you like here!
              return (
                <Icon
                  name={iconName}
                  size={size}
                  color={color}
                  // style={{marginTop: 2}}
                />
              );
            },
            tabBarActiveTintColor: '#3ee038',
            tabBarInactiveTintColor: 'gray',
          })}>
          <Tab.Screen name="Find" component={Example} />
          <Tab.Screen name="Liked" component={Liked} />
        </Tab.Navigator>
      </NavigationContainer>
    </LikedContextProvider>
  );
}

export default App;
