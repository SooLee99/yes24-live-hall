import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  informationText: {
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    width: windowWidth - 72,
    borderWidth: 1,
    backgroundColor: 'rgba(196, 196, 196, 0.15)',
    borderColor: 'rgba(196, 196, 196, 0.15)',
    marginTop: 7,
    paddingLeft: 10,
  },
});

function ResetInput({ Information, InPut, onChangeText }) {
  return (
    <View>
      <Text style={styles.informationText}>{Information}</Text>
      <TextInput
        style={styles.input}
        placeholder={InPut}
        onChangeText={onChangeText}
        secureTextEntry={true}
      />
    </View>
  );
}

export default ResetInput;
