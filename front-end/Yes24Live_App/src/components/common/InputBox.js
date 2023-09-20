import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Alert,
  Pressable,
  Dimensions,
} from 'react-native';
import { useState, useEffect } from 'react';
import { theme } from '../../theme/theme';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  rootContainer: {
    height: 50,
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.background,
    borderWidth: 1.4,
    borderRadius: 15,
    borderColor: 'rgba(0, 0, 0, 0.37)',
  },
  input: {
    width: windowWidth - 180,
  },
  timerContainer: {
    padding: 0,
  },
  timerText: {
    color: 'red',
  },
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function InputBox({ number, onChangeText, startTimer, stopTimer }) {
  const [timer, setTimer] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }

    if (startTimer) {
      const id = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(id);
            Alert.alert('인증시간 초과', '인증시간이 초과되었습니다.');
            stopTimer();
            return null;
          }
          return prevTimer - 1;
        });
      }, 1000);

      setTimer(5 * 60);
      setIntervalId(id);
    }
  }, [startTimer]);

  function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60).toString();
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  return (
    <View style={styles.centeredContainer}>
      <Pressable style={styles.rootContainer}>
        <TextInput
          style={styles.input}
          placeholder="인증번호 입력"
          keyboardType="number-pad"
          value={number}
          onChangeText={onChangeText}
        />
        {timer !== null && (
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>{formatTime(timer)}</Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}

export default InputBox;
