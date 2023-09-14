import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Container = styled.View`
  background-color: ${({ theme }) => theme.btnBackground};
  padding: 0 0 0 0;
  margin: 0 0 0 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 12px;
  font-weight: bold;
`;

const Button = ({ title, onPress, containerStyle, textStyle }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Container style={containerStyle}>
        <Title style={textStyle}>{title}</Title>
      </Container>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  containerStyle: PropTypes.object,
  textStyle: PropTypes.object,
};

export default Button;
