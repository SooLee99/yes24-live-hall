import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import EmailBox from '../../components/common/EmailBox';
import InputBox from '../../components/common/InputBox';
import BottomButton from '../../components/common/BottomButton';
import { UserAuthService } from '../../services/UserAuthService';
import { validateEmail, removeWhitespace } from '../../utils/utils';
import ErrorMessage from '../../components/common/ErrorMessage';
import { theme } from '../../theme/theme';

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
// 타이머 초기값 설정
const TIMER_INITIAL_VALUE = 5 * 60;

const SignUpVerify = ({ navigation }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [timer, setTimer] = useState(TIMER_INITIAL_VALUE);
  const [isRunning, setIsRunning] = useState(false);

  // 타이머 작동에 대한 useEffect hook
  useEffect(() => {
    if (!isRunning || timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  const handleTimerToggle = () => setIsRunning((prev) => !prev);
  const resetTimer = () => {
    setTimer(TIMER_INITIAL_VALUE);
    setIsRunning(false);
  };

  // 이메일 값 변경 핸들러
  const handleEmailChange = (value) => {
    setEmail(value);
    setErrorMessage(validateEmail(value) ? '' : '이메일 형식을 작성해주세요.');
  };

  // 인증번호 값 변경 핸들러
  const handleNumberChange = (value) => {
    setNumber(value);
    if (value.length === 4) {
      handleTimerToggle();
      Keyboard.dismiss();
    }
  };

  // 인증번호 요청 핸들러
  const handleAuthRequest = async () => {
    try {
      resetTimer();
      const success = await UserAuthService.confirmVerificationCode(
        email,
        number
      );
      // 인증번호 요청 성공 시, 타이머를 시작
      if (success) {
        alert('해당 전화번호로 인증번호를 전송하였습니다.');
      } else {
        alert('인증번호 요청에 실패했습니다.');
      }
    } catch (e) {
      alert('인증번호 요청에 실패했습니다.');
    } finally {
      setTimeout(handleTimerToggle, 0);
    }
  };

  // 인증번호 제출 핸들러
  const handleAuthSubmit = async () => {
    if (number.trim().length !== 4) {
      alert('인증번호를 4자리로 입력해주세요.');
      return;
    }

    let success = false;
    try {
      success = await UserAuthService.submitAuthNumber(email, number);
      if (success) {
        alert('인증이 완료되었습니다.');
        navigation.navigate('SignUp', { email: email });
        resetForm();
      } else {
        alert('인증번호가 다릅니다. 다시 확인해주세요.');
      }
    } catch (e) {
      alert('인증이 실패했습니다.');
    } finally {
      setTimeout(handleTimerToggle, 0);
    }
    if (!success) {
      alert('인증번호 전송에 실패했습니다.');
    }
  };

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
        {/*<ErrorMessage message={errorMessage} style={styles.informationText} />*/}
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

export default SignUpVerify;
