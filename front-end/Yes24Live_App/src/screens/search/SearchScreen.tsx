import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { COLORS, SPACING, FONTSIZE } from '../../theme/theme';
import { baseImagePath, searchMovies } from '../../api/apicalls';
import InputHeader from '../../components/InputHeader';
import SubMovieCard from '../../components/SubMovieCard';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width, height } = Dimensions.get('screen');

const SearchScreen = ({ navigation }: any) => {
  const [searchList, setSearchList] = useState([]);

  const searchMoviesFunction = async (name: string) => {
    try {
      let response = await fetch(searchMovies(name));
      let json = await response.json();
      setSearchList(json.results);
    } catch (error) {
      console.error('Something went wrong in searchMoviesFunction ', error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: COLORS.White,
            paddingTop: SPACING.space_10,
            paddingBottom: SPACING.space_10,
            borderBottomWidth: 1.2,
            borderBottomColor: COLORS.Grey0,
            shadowColor: '#000',
            shadowOffset: {
              width: 1,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name={'arrow-back-outline'} style={styles.iconStyle} />
          </TouchableOpacity>
          <InputHeader
            searchFunction={searchMoviesFunction}
            isEditable={true}
          />
          <Ionicons
            name="notifications-outline"
            color={COLORS.Black}
            size={FONTSIZE.size_30}
            style={{
              padding: 0,
              marginLeft: 6,
              marginRight: 10,
              marginTop: 6,
            }}
          />
        </View>
        <FlatList
          data={searchList}
          keyExtractor={(item: any) => item.id}
          bounces={false}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.centerContainer}
          renderItem={({ item, index }) => (
            <SubMovieCard
              shoudlMarginatedAtEnd={false}
              shouldMarginatedAround={true}
              cardFunction={() => {
                navigation.push('MovieDetails', { movieid: item.id });
              }}
              cardWidth={width / 2 - SPACING.space_18 * 2}
              title={item.original_title}
              imagePath={baseImagePath('w342', item.poster_path)}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.White,
  },
  InputHeaderContainer: {
    height: 40,
    width: width,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: SPACING.space_12,
    marginBottom: SPACING.space_28 - SPACING.space_12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  centerContainer: {
    alignItems: 'center',
  },
  iconStyle: {
    color: COLORS.Black,
    fontSize: 40,
    marginLeft: 10,
  },
});

export default SearchScreen;
