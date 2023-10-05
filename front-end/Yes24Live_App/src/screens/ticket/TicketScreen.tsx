import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';

import AppHeader from '../../components/AppHeader';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme/theme';

import { LinearGradient } from 'expo-linear-gradient';
import QRCode from 'react-native-qrcode-svg';

const { width, height } = Dimensions.get('screen');

const TicketScreen = ({ navigation, route }: any) => {
  const [ticketData, setTicketData] = useState<any>(route.params);

  useEffect(() => {
    (async () => {
      try {
        const ticket = await SecureStore.getItemAsync('ticket');
        if (ticket !== undefined && ticket !== null) {
          setTicketData(JSON.parse(ticket));
        }
      } catch (error) {
        console.error('Something went wrong while getting Data', error);
      }
    })();
  }, []);

  if (ticketData !== route.params && route.params != undefined) {
    setTicketData(route.params);
  }

  if (ticketData == undefined || ticketData == null) {
    return (
      <View style={styles.container}>
        <View style={styles.appHeaderContainer}>
          <AppHeader
            name="close"
            header={'나의 티켓 현황'}
            action={() => navigation.goBack()}
          />
        </View>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        <AppHeader
          name="arrow-back-outline"
          header={'나의 티켓 현황'}
          action={() => navigation.goBack()}
        />
        <ScrollView style={styles.scrollView}>
          <View style={styles.ticketContainer}>
            <ImageBackground
              source={{ uri: ticketData?.ticketImage }}
              style={styles.ticketBGImage}>
              <LinearGradient
                colors={[COLORS.OrangeRGBA0, COLORS.Blue]}
                style={styles.linearGradient}>
                <View
                  style={[
                    styles.blackCircle,
                    { position: 'absolute', bottom: -40, left: -40 },
                  ]}></View>
                <View
                  style={[
                    styles.blackCircle,
                    { position: 'absolute', bottom: -40, right: -40 },
                  ]}></View>
              </LinearGradient>
            </ImageBackground>
            <View style={styles.linear}></View>

            <View style={styles.ticketFooter}>
              <View
                style={[
                  styles.blackCircle,
                  { position: 'absolute', top: -40, left: -40 },
                ]}></View>
              <View
                style={[
                  styles.blackCircle,
                  { position: 'absolute', top: -40, right: -40 },
                ]}></View>

              <View
                style={{
                  marginTop: 26,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.dateTitle}>Blue Beetle</Text>
                <View
                  style={{
                    margin: 14,
                  }}>
                  <QRCode
                    size={100}
                    logoSize={300}
                    logoBackgroundColor="transparent"
                  />
                </View>
              </View>
              <View style={styles.ticketDateContainer}>
                <Text style={styles.subtitle}>장소: 예스24 라이브홀</Text>
                <Text style={styles.subtitle}>
                  일시: 2023년 10월 {ticketData?.day || '22'}일
                </Text>
                <Text style={styles.subtitle}>시간: {ticketData?.time}</Text>
                <Text style={styles.subtitle}>
                  좌석: A열 {ticketData?.seatArray}번
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.White,
  },
  scrollView: {},
  appHeaderContainer: {
    paddingTop: SPACING.space_10,
    width: width,
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: SPACING.space_10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  ticketContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  ticketBGImage: {
    alignSelf: 'center',
    width: width * 0.75,
    aspectRatio: 270 / 280,
    borderTopLeftRadius: BORDERRADIUS.radius_25,
    borderTopRightRadius: BORDERRADIUS.radius_25,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  linearGradient: {
    height: '70%',
  },
  linear: {
    borderTopColor: COLORS.White,
    borderTopWidth: 2.5,
    width: width * 0.75,
    alignSelf: 'center',
    backgroundColor: COLORS.Blue,
    borderStyle: 'dashed',
  },
  ticketFooter: {
    backgroundColor: COLORS.Blue,
    width: width * 0.75,
    alignItems: 'center',
    paddingBottom: SPACING.space_20,
    alignSelf: 'center',
    borderBottomLeftRadius: BORDERRADIUS.radius_25,
    borderBottomRightRadius: BORDERRADIUS.radius_25,
  },
  ticketDateContainer: {
    flexDirection: 'column',
    gap: SPACING.space_2,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  ticketSeatContainer: {
    flexDirection: 'row',
    gap: SPACING.space_36,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.space_10,
  },
  dateTitle: {
    fontSize: 22,
    color: COLORS.White,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  subheading: {
    fontSize: FONTSIZE.size_18,
    color: COLORS.White,
  },
  subtitleContainer: {
    flexDirection: 'row',
  },
  clockIcon: {
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
    marginRight: 8,
  },
  barcodeImage: {
    height: 50,
    aspectRatio: 158 / 52,
  },
  blackCircle: {
    height: 70,
    width: 70,
    borderRadius: 70,
    backgroundColor: COLORS.White,
  },
});

export default TicketScreen;
