import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS, FONTSIZE, SPACING } from '../theme/theme';

const AppHeader = (props: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => props.action()}>
        <Ionicons name={props.name} style={styles.iconStyle} />
      </TouchableOpacity>
      <Text style={styles.headerText}>{props.header}</Text>
      <View style={styles.emptyContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: SPACING.space_36,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: COLORS.White,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  iconStyle: {
    color: COLORS.Black,
    fontSize: 40,
    marginLeft: 10,
  },
  headerText: {
    flex: 1,
    fontSize: FONTSIZE.size_18,
    textAlign: 'center',
    color: COLORS.Grey,
    fontWeight: 'bold',
  },
  emptyContainer: {
    height: SPACING.space_20 * 2,
    width: SPACING.space_20 * 2,
    margin: 6,
  },
});

export default AppHeader;
