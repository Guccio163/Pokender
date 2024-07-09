import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ViceTinder from './ViceTinder';
import {useLiked} from './LikedContextProvider';

export type Pokemon = {
  id: string;
  key: string;
  name: string;
  type: string;
  image: string;
  caption: string;
};

export default function Example() {
  const [index, setActiveIndex] = useState(0);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const [offset, setOffset] = useState(0);
  const limit = 5;
  const {setLiked} = useLiked();

  const nextSource = useMemo(() => {
    return `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  }, [offset]);

  const addPokemon = useCallback((oldLink: string) => {
    const pokeId = oldLink.split('/').reverse()[1];
    let link = `https://pokeapi.co/api/v2/pokemon/${pokeId}`;
    fetch(link)
      .then(response => response.json())
      .then(async json => {
        let image = json.sprites.front_default;
        let name = json.forms[0].name;
        let type = json.types[0].type.name;
        getDescription(pokeId).then(description => {
          let newPokemon: Pokemon = {
            id: pokeId,
            key: pokeId,
            type: type,
            name: name,
            image: image,
            caption: description,
          };
          setPokemons(img => [...img, newPokemon]);
        });
      });
  }, []);

  async function getDescription(id: string) {
    let url = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;
    try {
      const response = await fetch(url);
      const json = await response.json();
      const result = json.flavor_text_entries[0].flavor_text;
      const resultRedacted = result.replace(/\n/g, ' ').replace(/\f/g, ' ');
      return result ? resultRedacted : 'no caption';
    } catch (error) {
      console.error('Failed to fetch description: ', error);
      return 'no caption';
    }
  }

  useEffect(() => {
    if (pokemons.length - index < 5) {
      setOffset(o => o + limit);
    }
  }, [pokemons.length, index]);

  useEffect(() => {
    console.log('fetching...');
    fetch(nextSource)
      .then(response => response.json())
      .then(json => {
        json.results.map((pokemon: {[x: string]: string}) => {
          addPokemon(pokemon.url);
        });
      });
  }, [addPokemon, nextSource]);

  return (
    <SafeAreaView style={styles.pageWrapper}>
      <StatusBar hidden />
      <ViceTinder
        data={pokemons}
        style={styles.tinderWrapper}
        onChange={index => {
          setActiveIndex(index);
        }}
        likeItem={_arg => setLiked(l => [...l, pokemons[_arg]])}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Image
              source={require('../assets/background.webp')}
              style={styles.backgroundImage}
            />
            <Image
              source={{
                uri: item.image,
              }}
              style={styles.pokemonImage}
            />
            <View style={styles.textWrapper}>
              <Text style={styles.name}>
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </Text>
              <Text style={styles.type}>Type: {item.type}</Text>
              <Text style={styles.caption}>~ {item.caption}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageWrapper: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tinderWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: -70,
  },
  card: {
    width: Dimensions.get('window').width * 0.9,
    aspectRatio: 1 / 1.9,
    // Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 10,
    borderRadius: 20,
    backgroundColor: 'black',
    // borderWidth: 2,
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    resizeMode: 'cover',
    borderRadius: 20,
  },
  pokemonImage: {
    flex: 0.6,
    borderRadius: 12,
    borderColor: 'rgba(0,0,0,0.1)',
    marginTop: '5%',
  },
  textWrapper: {
    borderRadius: 40,
    flex: 0.6,
  },
  name: {
    fontSize: 30,
    fontWeight: '500',
    marginLeft: '15%',
    marginTop: '15%',
  },
  type: {
    fontSize: 22,
    fontWeight: '500',
    marginLeft: '10%',
    marginTop: '5%',
  },
  caption: {
    fontSize: 20,
    fontWeight: '400',
    marginLeft: '10%',
    marginTop: '5%',
  },
});
