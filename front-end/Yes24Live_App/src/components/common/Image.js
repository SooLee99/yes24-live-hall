import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Container = styled.View`
  margin-bottom: 30px;
`;

const ProfileImage = styled.Image`
  background-color: ${({ theme }) => theme.imgBackground};
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

const DefaultImage = styled.Image`
  background-color: gray;
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

const Image = ({ source }) => {
  const defaultSource = require('../../assets/icon-user.png');

  return (
    <Container>
      {source ? (
        <ProfileImage source={source} />
      ) : (
        <DefaultImage source={defaultSource} />
      )}
    </Container>
  );
};

Image.propTypes = {
  source: PropTypes.object,
};

export default Image;
