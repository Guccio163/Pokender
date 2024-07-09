import React, {useEffect} from 'react';
import {Image, Text, View} from 'react-native';
import {useLiked} from './LikedContextProvider';

export default function Liked() {
  const {liked} = useLiked();
  useEffect(() => {
    console.log(liked);
  }, [liked]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
      }}>
      {liked?.map((p, index) => (
        <View
          style={{
            flexDirection: 'row',
            height: 50,
            width: '100%',
            justifyContent: 'center',
          }}
          key={index}>
          <Image
            source={{uri: p.image}}
            style={{
              height: 70,
              width: 50,
              resizeMode: 'cover',
              borderRadius: 20,
              alignSelf: 'center',
              marginRight: 10,
            }}
          />
          <Text style={{alignSelf: 'center', fontSize: 30}}>{p.name}</Text>
        </View>
      ))}
    </View>
  );
}
