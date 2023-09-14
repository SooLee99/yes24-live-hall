import React, { useContext, useState, useRef, useEffect } from 'react';
import { styled, ThemeContext } from 'styled-components/native';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import ButtonText from '../../components/common/ButtonText';
import ErrorMessage from '../../components/common/ErrorMessage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useLogin } from '../../hooks/useLogin';
import { Alert } from 'react-native';
import { validateEmail, removeWhitespace } from '../../utils/utils';
import { ProgressContext } from '../../contexts';
import { Image, Dimensions } from 'react-native';
import { theme } from '../../theme/theme';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding-left: 10%;
  padding-right: 10%;
  padding-top: ${({ insets: { top } }) => top}px;
  padding-bottom: ${({ insets: { bottom } }) => bottom + 20}px;
`;

const StyledText = styled.Text`
  font-size: 40px;
  font-style: 'bold';
  color: #111111;
  font-weight: bold;
  padding-bottom: 30%;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 0;
`;

const commonBtnTextStyle = {
  backgroundColor: 'transparent',
};

const commonTextStyle = (theme) => ({
  color: theme.inputLabel,
  fontSize: 15,
});

const Login = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const theme = useContext(ThemeContext);
  const { spinner } = useContext(ProgressContext);

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const refPassword = useRef(null);
  const { login, loading, error } = useLogin();

  useEffect(() => {
    setDisabled(!(id && pw && !errorMessage && !error));
    if (errorMessage == '') {
      if (errorMessage) {
        setErrorMessage(errorMessage.message);
      } else if (error) {
        setErrorMessage(error.message);
      }
    }
  }, [id, pw, error]);

  const _handleIdChange = (id) => {
    const changedId = removeWhitespace(id);
    setId(changedId);
    setErrorMessage(
      validateEmail(changedId) ? '' : '이메일 형식을 작성해주세요.'
    );
  };

  const _handlePwChange = (pw) => {
    const changedPw = removeWhitespace(pw);
    setPw(changedPw);
  };

  const _handleLoginBtnPress = async () => {
    try {
      spinner.start();
      const user = await login(id, pw);
      if (user) {
        navigation.navigate('Main', { user });
      }
    } catch (e) {
      Alert.alert('Login Error', e.message);
    } finally {
      spinner.stop();
    }
  };

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={20}
      contentContainerStyle={{ flex: 1 }}>
      <Container
        insets={insets}
        style={{ flex: 1, justifyContent: 'flex-start' }}>
        <Image
          source={require('../../assets/images/yes24livehall-logo.png')}
          style={{
            resizeMode: 'contain',
            width: Dimensions.get('window').width - 80,
            padding: 0,
            flex: 0.35,
            marginTop: 120,
            marginBottom: 54,
          }}
        />
        <Input
          label="E-mail Address"
          placeholder="이메일을 입력해주세요."
          returnKeyType="next"
          value={id}
          isEmail={true}
          onChangeText={_handleIdChange}
          onSubmitEditing={() => refPassword.current.focus()}
        />
        <Input
          ref={refPassword}
          label="Password"
          placeholder="비밀번호를 입력해주세요."
          returnKeyType="done"
          value={pw}
          onChangeText={_handlePwChange}
          isPassword={true}
          onSubmitEditing={_handleLoginBtnPress}
        />
        <Row>
          <ButtonText
            title="비밀번호 재설정"
            onPress={() => navigation.navigate('ResetPwVerify')}
            containerStyle={commonBtnTextStyle}
            textStyle={commonTextStyle(theme)}
          />
          <ButtonText
            title="회원가입"
            onPress={() => navigation.navigate('SignUpVerify')}
            containerStyle={commonBtnTextStyle}
            textStyle={commonTextStyle(theme)}
          />
        </Row>
        <ErrorMessage message={errorMessage} />
        <Button
          title="로그인"
          onPress={_handleLoginBtnPress}
          disabled={disabled}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Login;
