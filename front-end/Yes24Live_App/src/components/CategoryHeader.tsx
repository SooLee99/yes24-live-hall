import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';

const CategoryHeader = (props: any) => {
  return <Text style={styles.text}>{props.title}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: FONTSIZE.size_18,
    fontWeight: 'bold',
    color: COLORS.Grey1,
    textAlign: 'center',
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_10,
    paddingBottom: SPACING.space_10,
  },
});

export default CategoryHeader;
