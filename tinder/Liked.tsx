import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import ONYXKEYS from '../ONYXKEYS';
import {useOnyx} from 'react-native-onyx';
import {Pokemon} from './Example';

export default function Liked() {
  const [liked] = useOnyx(ONYXKEYS.LIKED_POKEMONS);

  useEffect(() => {
    console.log(liked);
  }, [liked]);

  return (
    <View style={styles.pageWrapper}>
      {liked && liked.pokemons
        ? liked.pokemons.map(
            (p: Pokemon, index: React.Key | null | undefined) => (
              <View style={styles.pokemon} key={index}>
                <Image source={{uri: p.image}} style={styles.pokeImage} />
                <Text style={styles.pokeText}>{p.name}</Text>
              </View>
            ),
          )
        : null}
    </View>
  );
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  pokemon: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    justifyContent: 'center',
  },
  pokeImage: {
    height: 70,
    width: 50,
    resizeMode: 'cover',
    borderRadius: 20,
    alignSelf: 'center',
    marginRight: 10,
  },
  pokeText: {alignSelf: 'center', fontSize: 30},
});
