import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const StyledText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-top: 15px;
  margin-bottom: 5px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;

const ErrorMessage = ({ message }) => {
  console.log('ErrorMessage에 들어옴.');
  return <StyledText>{message}</StyledText>;
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

ErrorMessage.defaultProps = {
  message: '',
};

export default ErrorMessage;
