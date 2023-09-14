import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Keyboard,
  Dimensions,
} from 'react-native';
import styled from 'styled-components/native';
import validator from 'validator';

const Container = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;
`;

const InputEmail = styled.TextInput`
  height: 46px;
  flex: 7;
  border-width: 1.2px;
  border-radius: 15px;
  padding-left: 10px;
  background-color: white;
  border-color: ${({ theme, isFocused }) =>
    isFocused ? theme.text : theme.inputBorder};
`;

const SuggestButton = styled(TouchableOpacity)`
  background-color: ${(props) =>
    props.isValid ? '#00FEEF' : 'rgba(0, 0, 0, 0.37)'};
  border-color: ${(props) =>
    props.isValid ? '#00FEEF' : 'rgba(0, 0, 0, 0.37)'};
  height: 46px;
  flex: 3;
  border-radius: 15px;
  margin-left: 10px;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
`;

const SuggestText = styled.Text`
  color: ${(props) => (props.isValid ? '#FFFFFF' : '#000000')};
  font-weight: bold;
`;

function EmailBox({ pressAuthn, onChangeText }) {
  const [phone, setPhone] = useState('');

  const handleEmailChange = (text) => {
    setPhone(text);
    onChangeText(text);
  };

  const handlePress = () => {
    pressAuthn();
    Keyboard.dismiss();
  };

  return (
    <Container>
      <InputEmail
        placeholder="핸드폰 번호를 입력해주세요."
        keyboardType="phone-pad"
        autoCapitalize="none"
        value={phone}
        onChangeText={handleEmailChange}
      />

      <SuggestButton onPress={handlePress}>
        <SuggestText>인증요청</SuggestText>
      </SuggestButton>
    </Container>
  );
}
export default EmailBox;
