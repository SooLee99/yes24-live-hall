import { View, Text, Pressable, StyleSheet } from 'react-native';
import { theme } from '../../theme/theme';

function BottomButton({ BottomText, pressed, onPress }) {
  return (
    <View style={pressed ? styles.pressedRootContainer : styles.rootContainer}>
      <Pressable onPress={pressed ? onPress : null}>
        <Text style={styles.bottomText}>{BottomText}</Text>
      </Pressable>
    </View>
  );
}

export default BottomButton;

const styles = StyleSheet.create({
  rootContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 15,
    backgroundColor: theme.btnBackground,
    borderColor: 'rgba(196, 196, 196, 0.15)',
    opacity: 0.5,
  },
  pressedRootContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 15,
    backgroundColor: theme.btnBackground,
    borderColor: 'rgba(196, 196, 196, 0.15)',
  },
  bottomText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
