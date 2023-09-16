// TODO: 회원가입 시, 프로필 이미지 정보를 받아올 수 있어야 한다.

import React, { useContext, useRef, useState, useEffect } from 'react';
import styled from 'styled-components/native';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import ErrorMessage from '../../components/common/ErrorMessage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Alert } from 'react-native';
import { validateEmail, removeWhitespace } from '../../utils/utils';
import { ProgressContext } from '../../contexts';
import { useSignUp } from '../../hooks/useSignUp';
import { UserAuthService } from '../../services/UserAuthService';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 30px;
  padding-top: ${({ insets: { top } }) => top + 14}px;
  padding-bottom: ${({ insets: { bottom } }) => bottom + 14}px;
`;

const SignUp = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { spinner } = useContext(ProgressContext);

  const { signUp, loading, error } = useSignUp();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(route.params.email);
  const [birth, setBirth] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const idRef = useRef(null);
  const pwRef = useRef(null);
  const pwConfirmRef = useRef(null);
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const birthRef = useRef(null);
  const heightRef = useRef(null);
  const weightRef = useRef(null);

  const [disabled, setDisabled] = useState(true);
  const refDidMount = useRef(null);

  useEffect(() => {
    setDisabled(
      !(
        id &&
        pw &&
        pwConfirm &&
        name &&
        phone &&
        birth &&
        height &&
        weight &&
        !errorMessage
      )
    );
  }, [id, pw, pwConfirm, name, phone, birth, height, weight, errorMessage]);

  useEffect(() => {
    if (refDidMount.current) {
      let error = '';

      if (!id) {
        error = '아이디를 작성해주세요.';
      } else if (!validateEmail(id)) {
        error = '유효하지 않은 이메일 형식입니다.';
      } else if (!pw) {
        error = '비밀번호를 작성해주세요.';
      } else if (pw !== pwConfirm) {
        error = '비밀번호가 일치하지 않습니다.';
      } else if (!name) {
        error = '이름을 작성해주세요.';
      } else if (!phone) {
        error = '전화번호를 작성해주세요.';
      } else if (!birth) {
        error = '생년월일을 작성해주세요.';
      } else if (!height) {
        error = '키를 입력해주세요.';
      } else if (!weight) {
        error = '몸무게를 입력해주세요.';
      }

      setErrorMessage(error);
    } else {
      refDidMount.current = true;
    }
  }, [id, pw, pwConfirm, name, phone, birth, height, weight]);

  const handleSignUpBtnPress = async () => {
    try {
      await AuthService.signUp({ id, pw, name, phone, birth, height, weight });
    } catch (e) {
      Alert.alert('Signup Error', e.message);
    } finally {
      spinner.stop();
      Alert.alert('회원가입이 완료되었습니다.');
      navigation.navigate('Login');
    }
  };

  return (
    <KeyboardAwareScrollView extraScrollHeight={50}>
      <Container insets={insets}>
        <Input
          label="아이디(이메일)"
          placeholder="이메일을 입력해주세요."
          returnKeyType="next"
          onChangeText={(text) => setId(removeWhitespace(text))}
          isEmail
          editable={false}
          value={id}
        />
        <Input
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          returnKeyType="next"
          isPassword
          onChangeText={(text) => setPw(removeWhitespace(text))}
          onSubmitEditing={() =>
            pwConfirmRef.current && pwConfirmRef.current.focus()
          }
          ref={pwRef}
          value={pw}
        />
        <Input
          label="비밀번호 확인"
          placeholder="비밀번호를 재입력해주세요."
          returnKeyType="next"
          isPassword
          onChangeText={(text) => setPwConfirm(removeWhitespace(text))}
          onSubmitEditing={() => nameRef.current && nameRef.current.focus()}
          ref={pwConfirmRef}
          value={pwConfirm}
        />
        <Input
          label="이름"
          placeholder="이름을 입력해주세요."
          returnKeyType="next"
          onChangeText={(text) => setName(text.trim())}
          onSubmitEditing={() => phoneRef.current && phoneRef.current.focus()}
          ref={nameRef}
          value={name}
          maxLength={20}
        />
        <Input
          label="전화번호"
          placeholder="전화번호를 입력해주세요."
          returnKeyType="next"
          isNumber
          onSubmitEditing={() => birthRef.current && birthRef.current.focus()}
          ref={phoneRef}
          value={phone}
          maxLength={20}
        />
        <Input
          label="생년월일"
          placeholder="생년월일을 입력해주세요."
          returnKeyType="next"
          isNumber
          onChangeText={(text) => setBirth(removeWhitespace(text))}
          onSubmitEditing={() => heightRef.current && heightRef.current.focus()}
          ref={birthRef}
          value={birth}
        />
        <Input
          label="키"
          placeholder="키를 입력해주세요."
          returnKeyType="next"
          isNumber
          onChangeText={(text) => setHeight(removeWhitespace(text))}
          onSubmitEditing={() => weightRef.current && weightRef.current.focus()}
          ref={heightRef}
          value={height}
        />
        <Input
          label="몸무게"
          placeholder="몸무게를 입력해주세요."
          returnKeyType="done"
          isNumber
          onChangeText={(text) => setWeight(removeWhitespace(text))}
          onSubmitEditing={handleSignUpBtnPress}
          ref={weightRef}
          value={weight}
        />

        <ErrorMessage message={errorMessage} />
        <Button title="가입하기" onPress={handleSignUpBtnPress} />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default SignUp;
