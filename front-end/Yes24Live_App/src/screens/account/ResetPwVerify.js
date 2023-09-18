import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { EmailBox } from '../../components/common';
import { InputBox } from '../../components/common';
import { BottomButton } from '../../components/common';
import { UserAuthService } from '../../services/UserAuthService';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 4,
  },
  informationText: {
    fontSize: 12,
    alignSelf: 'flex-start',
    textAlign: 'left',
    fontWeight: 'bold',
    marginTop: 20,
    paddingLeft: '8%',
    paddingRight: '8%',
  },
  emailContainer: {
    width: windowWidth,
    marginTop: 10,
    paddingLeft: '8%',
    paddingRight: '8%',
    alignSelf: 'flex-start',
    textAlign: 'left',
    justifyContent: 'center',
  },
  inputContainer: {
    width: windowWidth,
    marginTop: 10,
    paddingLeft: '8%',
    paddingRight: '8%',
    alignSelf: 'flex-start',
    textAlign: 'left',
    justifyContent: 'center',
  },
});

const TIMER_INITIAL_VALUE = 5 * 60;

const ResetPwVerify = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [timer, setTimer] = useState(TIMER_INITIAL_VALUE);
  const [isRunning, setIsRunning] = useState(false);

  // 타이머 작동에 대한 useEffect hook
  useEffect(() => {
    // 타이머가 동작 중이 아니거나 타이머가 0이하이면 return
    if (!isRunning || timer <= 0) return;

    // 1초마다 타이머를 감소시키는 interval 설정
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    // 컴포넌트 언마운트시 interval을 정리하는 cleanup 함수
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  const handleTimerToggle = () => setIsRunning((prev) => !prev);

  const resetTimer = () => {
    setTimer(TIMER_INITIAL_VALUE);
    setIsRunning(false);
  };

  const handleEmailChange = (value) => setEmail(value);

  const handleNumberChange = (value) => {
    setNumber(value);
    if (value.length === 4) {
      handleTimerToggle();
      Keyboard.dismiss();
    }
  };

  // 인증번호 요청 핸들러
  const handleAuthRequest = async () => {
    resetTimer();
    try {
      const success = await UserAuthService.requestAuthNumber(email);
      if (success) {
        setTimeout(handleTimerToggle, 0);
      } else {
        alert('인증번호 요청에 실패했습니다.');
      }
    } catch (error) {
      alert('오류가 발생했습니다: ' + error.message);
    }
  };

  // 인증번호 제출 핸들러
  const handleAuthSubmit = async () => {
    if (number.trim().length !== 4) {
      alert('인증번호를 4자리로 입력해주세요.');
      return;
    }

    try {
      const success = await UserAuthService.submitAuthNumber(email, number);
      if (success) {
        alert('인증이 완료되었습니다.');
        navigation.replace('ResetPw', { email });
        resetForm();
      } else {
        alert('인증번호가 올바르지 않습니다.');
      }
    } catch (error) {
      alert('오류가 발생했습니다: ' + error.message);
    }
  };

  // 폼 상태 초기화 핸들러
  const resetForm = () => {
    setEmail('');
    setNumber('');
    resetTimer();
  };

  return (
    <KeyboardAvoidingView style={styles.rootContainer}>
      <Text style={styles.informationText}>휴대폰 본인 인증</Text>
      <View style={styles.emailContainer}>
        <EmailBox
          pressAuthn={handleAuthRequest}
          email={email}
          onChangeText={handleEmailChange}
        />
      </View>
      <Text style={styles.informationText}>인증번호를 입력해주세요.</Text>
      <View style={styles.inputContainer}>
        <InputBox
          number={number}
          onChangeText={handleNumberChange}
          startTimer={isRunning}
          timer={timer}
          stopTimer={handleTimerToggle}
          resetTimer={resetTimer}
        />
      </View>
      <BottomButton
        BottomText="완료"
        pressed={number.length === 4}
        onPress={handleAuthSubmit}
      />
    </KeyboardAvoidingView>
  );
};

export default ResetPwVerify;
