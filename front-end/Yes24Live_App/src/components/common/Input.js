import React, { useState, forwardRef } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Container = styled.View`
  flex-direction: column;
  width: 100%;
  margin: 6px 0;
`;

const Label = styled.Text`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 5px;
  color: ${({ theme, isFocused }) =>
    isFocused ? theme.text : theme.inputLabel};
`;

const StyledInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.inputPlaceholder,
}))`
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  padding: 5px 5px;
  font-size: 15px;
  padding: 10px;
  border-width: 1.4px;
  border-radius: 15px;
  border-color: ${({ theme, isFocused }) =>
    isFocused ? theme.text : theme.inputBorder};
`;

const Input = forwardRef(
  (
    {
      label,
      value,
      onChangeText,
      onSubmitEditing,
      onBlur,
      placeholder,
      returnKeyType,
      maxLength,
      isPassword,
      isEmail,
      isNumber,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    let keyboardType = 'default';
    if (isEmail) {
      keyboardType = 'email-address';
    } else if (isNumber) {
      keyboardType = 'numeric';
    }

    return (
      <Container>
        <Label isFocused={isFocused}>{label}</Label>

        <StyledInput
          ref={ref}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          onBlur={() => {
            setIsFocused(false);
            onBlur();
          }}
          placeholder={placeholder}
          returnKeyType={returnKeyType}
          maxLength={maxLength}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="none"
          isFocused={isFocused}
          onFocus={() => setIsFocused(true)}
          secureTextEntry={isPassword}
          keyboardType={keyboardType}
        />
      </Container>
    );
  }
);

Input.defaultProps = {
  onBlur: () => {},
};

Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  returnKeyType: PropTypes.oneOf(['done', 'next']),
  maxLength: PropTypes.number,
  isPassword: PropTypes.bool,
  isEmail: PropTypes.bool,
  isNumber: PropTypes.bool,
};

export default Input;
