import { View, Text, StyleSheet, Keyboard } from 'react-native';

import { useEffect, useState } from 'react';

import BottomButton from '../../components/common/BottomButton';
import ResetInput from '../../components/common/ResetInput';
import { UserAuthService } from '../../services/UserAuthService';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 40,
    alignItems: 'flex-start',
    paddingHorizontal: 40,
  },
  subContainer: {
    marginBottom: 25,
  },
  alertMessage: {
    color: 'red',
    textAlign: 'left',
    paddingLeft: 10,
  },
  buttonContainer: {},
});

const ResetPw = ({ navigation, route }) => {
  const emailForReset = route.params.email;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState(false);
  const [BottomPressed, setBottomPressed] = useState(false);

  function NewPWChangeHandler(enteredPw) {
    setNewPassword(enteredPw);
  }

  function ConfirmPwChangeHandler(enteredPw) {
    setConfirmPassword(enteredPw);
  }

  function goHomeScreenHandler() {
    UserAuthService.resetPassword(emailForReset, newPassword)
      .then((response) => {
        if (response.status === 'OK') {
          alert('비밀번호 재설정이 완료되었습니다.');
          navigation.goBack();
          navigation.navigate('Login');
        } else {
          alert('비밀번호 재설정에 실패하였습니다: ' + response.message);
        }
      })
      .catch((error) => {
        console.error('Error resetting password:', error);
        alert('비밀번호 재설정 중 에러가 발생하였습니다.');
      });
  }

  const newPWlength = newPassword.length;
  const confirmPWlength = confirmPassword.length;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertMessage(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [alertMessage]);

  useEffect(() => {
    if (
      newPWlength > 0 &&
      confirmPWlength >= newPWlength &&
      newPassword === confirmPassword
    ) {
      setAlertMessage(false);
      setBottomPressed(true);
    } else if (
      newPWlength === confirmPWlength &&
      newPassword !== confirmPassword
    ) {
      setAlertMessage(true);
      setBottomPressed(false);
    } else if (newPassword !== confirmPassword) {
      setBottomPressed(false);
    }
  }, [newPassword, confirmPassword]);

  return (
    <View style={styles.rootContainer}>
      <View style={styles.subContainer}>
        <ResetInput
          Information="신규 비밀번호"
          InPut="비밀번호 입력"
          onChangeText={NewPWChangeHandler}
        />
      </View>
      <View style={styles.subContainer}>
        <ResetInput
          Information="비밀번호 확인"
          InPut="비밀번호 확인"
          onChangeText={ConfirmPwChangeHandler}
        />
      </View>
      {alertMessage && (
        <Text style={styles.alertMessage}>비밀번호가 일치 하지 않습니다.</Text>
      )}
      <BottomButton
        BottomText="완료"
        pressed={BottomPressed}
        onPress={goHomeScreenHandler}
      />
    </View>
  );
};

export default ResetPw;
