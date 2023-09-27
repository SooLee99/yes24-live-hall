import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import Ionicons from '@expo/vector-icons/Ionicons';

const SettingComponent = (props: any) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
        }}>
        <Ionicons name={props.icon} style={styles.iconStyle} />

        <View style={styles.settingContainer}>
          <Text style={styles.title}>{props.heading}</Text>
        </View>
        <View style={styles.iconBG}>
          <Ionicons name="arrow-forward-outline" style={styles.iconStyle} />
        </View>
      </View>
    </View>
  );
};

export default SettingComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: SPACING.space_10,
    paddingBottom: SPACING.space_10,

    borderBottomWidth: 1.2,
    borderBottomColor: COLORS.Grey0,
  },
  settingContainer: {
    flex: 1,
  },
  iconStyle: {
    color: COLORS.Grey,
    fontSize: FONTSIZE.size_24,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: SPACING.space_20,
    paddingRight: SPACING.space_20,
  },
  iconBG: {
    justifyContent: 'center',
  },
  title: {
    fontSize: FONTSIZE.size_18,
    color: COLORS.Grey,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.Grey,
    paddingLeft: 10,
  },
});
