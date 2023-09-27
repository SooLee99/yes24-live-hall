// TODO: 홈 화면에서 새로고침 기능과, 알림 화면을 구현해야 한다.

import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';

// 사용자 정의 테마 및 API 주소를 가져옵니다.
import { COLORS, SPACING, FONTSIZE } from '../../theme/theme';
import {
  upcomingMovies,
  nowPlayingMovies,
  popularMovies,
  baseImagePath,
} from '../../api/apicalls';

// 사용자 정의 컴포넌트들을 가져옵니다.
import InputHeader from '../../components/InputHeader';
import CategoryHeader from '../../components/CategoryHeader';
import SubMovieCard from '../../components/SubMovieCard';
import MovieCard from '../../components/MovieCard';

import Ionicons from '@expo/vector-icons/Ionicons';

// 화면의 너비와 높이를 가져옵니다.
const { width, height } = Dimensions.get('window');

// 현재 상영 중인 영화 리스트를 가져오는 함수
const getNowPlayingMoviesList = async () => {
  try {
    let response = await fetch(nowPlayingMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(
      'getNowPlayingMoviesList 함수에서 오류가 발생했습니다.',
      error
    );
  }
};

// 곧 상영될 영화 리스트를 가져오는 함수
const getUpcomingMoviesList = async () => {
  try {
    let response = await fetch(upcomingMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error('getUpcomingMoviesList 함수에서 오류가 발생했습니다.', error);
  }
};

// 인기 있는 영화 리스트를 가져오는 함수
const getPopularMoviesList = async () => {
  try {
    let response = await fetch(popularMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error('getPopularMoviesList 함수에서 오류가 발생했습니다.', error);
  }
};

// 홈 화면 컴포넌트
const HomeScreen = ({ navigation }: any) => {
  // 영화 목록들의 상태를 설정합니다.
  const [nowPlayingMoviesList, setNowPlayingMoviesList] =
    useState<any>(undefined);
  const [popularMoviesList, setPopularMoviesList] = useState<any>(undefined);
  const [upcomingMoviesList, setUpcomingMoviesList] = useState<any>(undefined);

  // 컴포넌트가 마운트될 때 영화 목록 데이터를 가져옵니다.
  useEffect(() => {
    (async () => {
      let tempNowPlaying = await getNowPlayingMoviesList();
      setNowPlayingMoviesList([
        { id: 'dummy1' },
        ...tempNowPlaying.results,
        { id: 'dummy2' },
      ]);

      let tempPopular = await getPopularMoviesList();
      setPopularMoviesList(tempPopular.results);

      let tempUpcoming = await getUpcomingMoviesList();
      setUpcomingMoviesList(tempUpcoming.results);
    })();
  }, []);

  // 영화 데이터가 아직 로드되지 않았을 경우 로딩 화면을 표시합니다.
  if (
    nowPlayingMoviesList == undefined &&
    popularMoviesList == undefined &&
    upcomingMoviesList == undefined
  ) {
    return (
      <View style={styles.container}>
        <InputHeader onPress={() => navigation.navigate('검색 화면')} />

        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.Grey} />
        </View>
      </View>
    );
  }

  // 영화 데이터가 로드되면 영화 목록을 표시합니다.
  return (
    <View style={styles.InputHeaderContainer}>
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
        <Image
          source={require('../../assets/images/yes24livehall-icon.png')}
          style={{
            resizeMode: 'contain',
            width: 40,
            height: 40,
            padding: 0,
            marginLeft: 10,
            marginTop: 2,
            marginRight: 6,
          }}
        />
        <InputHeader
          onPress={() => navigation.navigate('검색 화면')}
          isEditable={false}
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
      <ScrollView style={styles.container} bounces={false}>
        <View style={styles.InputHeaderContainer}>
          {/*<CategoryHeader title={'공연'} />*/}
          <FlatList
            data={nowPlayingMoviesList}
            keyExtractor={(item: any) => item.id}
            bounces={false}
            style={{ marginTop: 10 }}
            snapToInterval={width - 100}
            horizontal
            showsHorizontalScrollIndicator={false}
            decelerationRate={0}
            contentContainerStyle={styles.containerGap36}
            renderItem={({ item, index }) => {
              if (!item.original_title) {
                return (
                  <View
                    style={{
                      width: (width - (width * 0.7 + SPACING.space_36 * 2)) / 2,
                    }}></View>
                );
              }
              return (
                <MovieCard
                  shoudlMarginatedAtEnd={true}
                  cardFunction={() => {
                    navigation.navigate('MovieDetails', { movieid: item.id });
                  }}
                  cardWidth={width * 0.6}
                  isFirst={index == 0}
                  isLast={index == upcomingMoviesList?.length - 1}
                  title={item.original_title}
                  imagePath={baseImagePath('w780', item.poster_path)}
                  genre={item.genre_ids.slice(1, 4)}
                  vote_average={item.vote_average}
                  vote_count={item.vote_count}
                />
              );
            }}
          />
        </View>

        <View style={styles.InputHeaderContainer}>
          <CategoryHeader title={'인기 공연 랭킹'} />
          <FlatList
            data={popularMoviesList}
            keyExtractor={(item: any) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={styles.containerGap36}
            renderItem={({ item, index }) => (
              <SubMovieCard
                shoudlMarginatedAtEnd={true}
                cardFunction={() => {
                  navigation.push('MovieDetails', { movieid: item.id });
                }}
                cardWidth={width / 3}
                isFirst={index == 0}
                isLast={index == upcomingMoviesList?.length - 1}
                title={item.original_title}
                imagePath={baseImagePath('w342', item.poster_path)}
              />
            )}
          />
        </View>

        <View style={styles.InputHeaderContainer}>
          <CategoryHeader title={'예정 공연 목록'} />
          <FlatList
            data={upcomingMoviesList}
            keyExtractor={(item: any) => item.id}
            horizontal
            bounces={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.containerGap36}
            renderItem={({ item, index }) => (
              <SubMovieCard
                shoudlMarginatedAtEnd={true}
                cardFunction={() => {
                  navigation.push('MovieDetails', { movieid: item.id });
                }}
                cardWidth={width / 3}
                isFirst={index == 0}
                isLast={index == upcomingMoviesList?.length - 1}
                title={item.original_title}
                imagePath={baseImagePath('w342', item.poster_path)}
              />
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

// 스타일을 정의합니다.
const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  scrollViewContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  InputHeaderContainer: {
    //marginHorizontal: SPACING.space_36,
    marginBottom: SPACING.space_20,
    paddingBottom: SPACING.space_10,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: COLORS.White,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  containerGap36: {
    gap: SPACING.space_36,
  },
});

// HomeScreen 컴포넌트를 내보냅니다.
export default HomeScreen;
