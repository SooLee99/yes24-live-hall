import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  baseImagePath,
  movieCastDetails,
  movieDetails,
} from '../../api/apicalls';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme/theme';
import AppHeader from '../../components/AppHeader';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import CategoryHeader from '../../components/CategoryHeader';
import CastCard from '../../components/CastCard';

// 영화의 상세 정보를 가져오는 함수입니다.
const getMovieDetails = async (movieid: number) => {
  try {
    let response = await fetch(movieDetails(movieid));
    let json = await response.json();
    return json;
  } catch (error) {
    console.error('getMoviesDetails 함수에서 문제가 발생했습니다.', error);
  }
};

// 영화의 출연진 정보를 가져오는 함수입니다.
const getMovieCastDetails = async (movieid: number) => {
  try {
    let response = await fetch(movieCastDetails(movieid));
    let json = await response.json();
    return json;
  } catch (error) {
    console.error('getMovieCastDetails 함수에서 문제가 발생했습니다.', error);
  }
};

// 영화 상세 화면의 주요 컴포넌트입니다.
const MovieDetailsScreen = ({ navigation, route }: any) => {
  console.log('현재 위치: MovieDetailsScreen');

  const [movieData, setMovieData] = useState<any>(undefined);
  const [movieCastData, setmovieCastData] = useState<any>(undefined);

  // 컴포넌트가 마운트 될 때 영화 상세 정보와 출연진 정보를 가져옵니다.
  useEffect(() => {
    (async () => {
      const tempMovieData = await getMovieDetails(route.params.movieid);
      setMovieData(tempMovieData);
    })();

    (async () => {
      const tempMovieCastData = await getMovieCastDetails(route.params.movieid);
      setmovieCastData(tempMovieCastData.cast);
    })();
  }, []);

  // 영화 데이터가 없을 때 로딩 화면을 보여줍니다.
  if (
    movieData == undefined &&
    movieData == null &&
    movieCastData == undefined &&
    movieCastData == null
  ) {
    return (
      <View>
        <AppHeader
          name="close"
          header={''}
          action={() => navigation.goBack()}
        />

        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollViewContainer}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={'large'} color={COLORS.Orange} />
          </View>
        </ScrollView>
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <AppHeader name="close" header={''} action={() => navigation.goBack()} />

      <ScrollView
        style={styles.container}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <View>
          <ImageBackground
            source={{
              uri: baseImagePath('w780', movieData?.backdrop_path),
            }}
            style={styles.imageBG}>
            <LinearGradient
              colors={[COLORS.WhiteRGBA32, COLORS.White]} //BlackRGB10
              style={styles.linearGradient}></LinearGradient>
          </ImageBackground>
          <View style={styles.imageBG}></View>
          <Image
            source={{ uri: baseImagePath('w342', movieData?.poster_path) }}
            style={styles.cardImage}
          />
        </View>

        <View style={styles.timeContainer}>
          <Ionicons name="time-outline" style={styles.clockIcon} />
          <Text style={styles.runtimeText}>
            {Math.floor(movieData?.runtime / 60)}h{' '}
            {Math.floor(movieData?.runtime % 60)}m
          </Text>
        </View>

        <View>
          <Text style={styles.title}>{movieData?.original_title}</Text>
          <View style={styles.genreContainer}>
            {movieData?.genres.map((item: any) => {
              return (
                <View style={styles.genreBox} key={item.id}>
                  <Text style={styles.genreText}>{item.name}</Text>
                </View>
              );
            })}
          </View>
          <Text style={styles.tagline}>{movieData?.tagline}</Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.rateContainer}>
            <Ionicons name="star-outline" style={styles.starIcon} />
            <Text style={styles.runtimeText}>
              {movieData?.vote_average.toFixed(1)} ({movieData?.vote_count})
            </Text>
            <Text style={styles.runtimeText}>
              {movieData?.release_date.substring(8, 10)}{' '}
              {new Date(movieData?.release_date).toLocaleString('default', {
                month: 'long',
              })}{' '}
              {movieData?.release_date.substring(0, 4)}
            </Text>
          </View>
          <Text style={styles.descriptionText}>{movieData?.overview}</Text>
        </View>

        <View>
          <CategoryHeader title="Top Cast" />
          <FlatList
            data={movieCastData}
            keyExtractor={(item: any) => item.id}
            horizontal
            contentContainerStyle={styles.containerGap24}
            renderItem={({ item, index }) => (
              <CastCard
                shouldMarginatedAtEnd={true}
                cardWidth={80}
                isFirst={index == 0 ? true : false}
                isLast={index == movieCastData?.length - 1 ? true : false}
                imagePath={baseImagePath('w185', item.profile_path)}
                title={item.original_name}
                subtitle={item.character}
              />
            )}
          />

          <View>
            <TouchableOpacity
              style={styles.buttonBG}
              onPress={() => {
                navigation.push('SeatBooking', {
                  BgImage: baseImagePath('w780', movieData.backdrop_path),
                  PosterImage: baseImagePath('original', movieData.poster_path),
                });
              }}>
              <Text style={styles.buttonText}>Select Seats</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.White, //
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  scrollViewContainer: {
    flex: 1,
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
  },
  imageBG: {
    width: '100%',
    aspectRatio: 3072 / 1727,
  },
  linearGradient: {
    height: '100%',
  },
  cardImage: {
    width: '60%',
    aspectRatio: 200 / 300,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  clockIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.BlackRGBA50,
    marginRight: SPACING.space_8,
  },
  timeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: SPACING.space_15,
  },
  runtimeText: {
    //fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.Black,
  },
  title: {
    //fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_24,
    color: COLORS.Black,
    marginHorizontal: SPACING.space_36,
    marginVertical: SPACING.space_15,
    textAlign: 'center',
  },
  genreContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: SPACING.space_20,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  genreBox: {
    borderColor: COLORS.BlackRGBA50,
    borderWidth: 1,
    paddingHorizontal: SPACING.space_10,
    paddingVertical: SPACING.space_4,
    borderRadius: BORDERRADIUS.radius_25,
  },
  genreText: {
    //fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.BlackRGBA75,
  },
  tagline: {
    //fontFamily: FONTFAMILY.poppins_thin,
    fontSize: FONTSIZE.size_14,
    fontStyle: 'italic',
    color: COLORS.Black,
    marginHorizontal: SPACING.space_36,
    marginVertical: SPACING.space_15,
    textAlign: 'center',
  },
  infoContainer: {
    marginHorizontal: SPACING.space_24,
  },
  rateContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  starIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.Yellow,
  },
  descriptionText: {
    //fontFamily: FONTFAMILY.poppins_light,
    fontSize: FONTSIZE.size_14,
    color: COLORS.Black,
  },
  containerGap24: {
    gap: SPACING.space_24,
  },
  buttonBG: {
    alignItems: 'center',
    marginVertical: SPACING.space_24,
  },
  buttonText: {
    borderRadius: BORDERRADIUS.radius_25 * 2,
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_10,
    backgroundColor: COLORS.Orange,
    //fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.Black,
  },
});

export default MovieDetailsScreen;
