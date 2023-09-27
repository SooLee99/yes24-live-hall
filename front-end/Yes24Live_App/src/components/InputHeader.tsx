import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import Ionicons from '@expo/vector-icons/Ionicons';

const InputHeader = (props: any) => {
  const [searchText, setSearchText] = useState<string>('');

  return (
    <TouchableOpacity style={styles.inputBox} onPress={props.onPress}>
      <TextInput
        style={styles.textInput}
        onChangeText={(textInput) => {
          setSearchText(textInput);
        }}
        value={searchText}
        placeholder="어떤 공연을 보고 싶으세요?"
        placeholderTextColor={COLORS.Grey1}
        editable={props.isEditable}
      />
      <TouchableOpacity
        style={styles.searchIcon}
        onPress={() => {
          props.searchFunction && props.searchFunction(searchText);
        }}>
        <Ionicons
          name="search-outline"
          color={COLORS.Black}
          size={FONTSIZE.size_24}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    display: 'flex',
    flex: 1,
    paddingHorizontal: SPACING.space_24,
    borderWidth: 1.2,
    borderColor: COLORS.Grey0,
    borderRadius: BORDERRADIUS.radius_15,
    flexDirection: 'row',
    paddingRight: 0,
    marginRight: 0,
    paddingLeft: 14,
    marginLeft: 0,
  },
  textInput: {
    flex: 1,
    fontSize: FONTSIZE.size_14,
    color: COLORS.Grey1,
  },
  searchIcon: {
    paddingTop: SPACING.space_8,
    paddingBottom: SPACING.space_8,
    marginRight: 10,
  },
});

export default InputHeader;
