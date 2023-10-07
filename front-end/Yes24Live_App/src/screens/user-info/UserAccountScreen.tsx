// TODO: 내 정보에서 프로필 이미지를 읽어오고, 수정할 수 있어야 한다.

import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { COLORS, FONTSIZE, SPACING } from '../../theme/theme';
import AppHeader from '../../components/AppHeader';
import SettingComponent from '../../components/SettingComponent';

const UserAccountScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        name="arrow-back-outline"
        header={'내 정보'}
        action={() => navigation.goBack()}
      />

      <ScrollView style={styles.scrollView}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../../assets/images/avatar.png')}
            style={styles.avatarImage}
          />
          <Text style={styles.avatarText}>닉네임입니당</Text>
        </View>

        <View style={styles.infoContainer}>
          <SettingComponent icon="person-circle-outline" heading="계정 관리" />
          <SettingComponent icon="settings-outline" heading="앱 설정" />
          <SettingComponent icon="card-outline" heading="Offers & Refferrals" />
          <SettingComponent icon="information-circle-outline" heading="About" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
  },
  scrollView: {},

  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: SPACING.space_10,
    paddingBottom: SPACING.space_10,
    paddingLeft: SPACING.space_16,
    paddingRight: SPACING.space_16,

    borderBottomWidth: 1.2,
    borderBottomColor: COLORS.Grey0,
  },

  infoContainer: {
    alignItems: 'center',
  },
  avatarImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginRight: 20,
  },
  avatarText: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.Grey,
  },
});

export default UserAccountScreen;
