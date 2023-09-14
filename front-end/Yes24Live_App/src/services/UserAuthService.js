import { Alert } from 'react-native';
import axios from 'axios';

export const UserAuthService = {
  // (1) 로그인 처리
  login: async (id, pw) => {
    try {
      const response = {
        status: 'OK',
        message: '로그인 성공',
        data: {
          id: id,
          message: 'generate token',
          code: 'success',
          jwt: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6ImFhYSIsImlhdCI6MTY5MzEzODcwOSwiZXhwIjoxNjkzMTQyMzA5fQ.MDZ_PgKfKPZnLNWsp1tEwDtRumePtuRh2mpy2gwdcks',
        },
      };

      // 실제 서버와의 통신은 주석 처리
      // const response = await axios.post('${API_URL}/api/login',
      // headers: {
      //  'Content-Type': 'application/json',
      // },
      //  body: JSON.stringify({
      //  userId: id,
      //  password: pw
      // }));

      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Error', error.message);
      throw error;
    }
  },

  // (1) 회원가입 시 아이디 중복 확인 및 인증번호 요청하는 함수
  verifyAndRequestEmail: async (id) => {
    try {
      //const response = await axios.post('${API_URL}/api/sign-up/send-verification-code', { id });
      // return response.data;
      return true; // <- 임시로 성공 처리
    } catch (error) {
      console.error('Request Auth Number error:', error);
      Alert.alert('Request Auth Number Error', error.message);
      throw error;
    }
  },

  // (2) 인증번호 확인 함수
  confirmVerificationCode: async (id, verificationCode) => {
    try {
      // const response = await axios.post('${API_URL}/api/sign-up/confirm-verification-code', { id, verificationCode });
      const response = { data: { success: true } }; // <- 임시로 성공 처리
      return response.data.success;
    } catch (error) {
      console.error('Submit Auth Number error:', error);
      Alert.alert('Submit Auth Number Error', error.message);
      throw error;
    }
  },

  // (3) 회원가입 처리
  signUp: async (id, pw, name, phone, birth, height, weight) => {
    console.log('회원가입 처리 완료');
    console.log(id);
    console.log(pw);
    console.log(name);
    console.log(phone);
    console.log(birth);
    console.log(height);
    console.log(weight);

    return true;
    /*try {
      const response = await axios.post('${API_URL}/api/sign-up/enter-info, {
        id,
        pw,
        name,
        phone,
        birth,
        height,
        weight,
      });
      return response.data.success; // <- 임시로 성공 처리
    } catch (error) {
      console.error('SignUp error:', error);
      Alert.alert('SignUp Error', error.message);
      throw error;
    }*/
  },

  // (1) 비밀번호 재설정 시, 인증번호를 이메일로 전송 요청하는 함수 => 현재 회원 여부 확인
  requestAuthNumber: async (id) => {
    console.log('해당 이메일로 인증번호를 요청하였습니다.');
    console.log(id);
    try {
      //const response = await axios.post('${API_URL}/api/reset-password/send-verification-code', { id });
      // return response.data;
      return true; // <- 임시로 성공 처리
    } catch (error) {
      console.error('Request Auth Number error:', error);
      Alert.alert('Request Auth Number Error', error.message);
      throw error;
    }
  },

  // (2) 인증번호 확인 함수
  submitAuthNumber: async (id, verificationCode) => {
    console.log(id);
    console.log(verificationCode);
    console.log('이메일과 인증번호를 확인하고 인증을 완료하였습니다.');
    try {
      // const response = await axios.post('${API_URL}/api/reset-password/confirm-verification-code', { id, verificationCode });
      const response = { data: { success: true } }; // <- 임시로 성공 처리
      return response.data.success;
    } catch (error) {
      console.error('Submit Auth Number error:', error);
      Alert.alert('Submit Auth Number Error', error.message);
      throw error;
    }
  },

  // (4) 비밀번호 재설정 함수
  resetPassword: async (email, newPassword) => {
    console.log('비밀번호 재설정 요청:', email, newPassword);
    try {
      // 주석 처리된 실제 API 호출 코드
      // const response = await axios.post('${API_URL}/api/reset-password/enter-info', { email, newPassword });

      // 임시로 성공 처리
      const response = {
        status: 'OK',
        message: '비밀번호가 성공적으로 재설정되었습니다.',
      };
      return response;
    } catch (error) {
      console.error('Reset Password error:', error);
      Alert.alert('Reset Password Error', error.message);
      throw error;
    }
  },

  // (8) 사용자 정보 수정
  updateUserInfo: async (name, phone, password) => {
    console.log('사용자 정보 수정 요청');
    try {
      // 실제 서버와의 통신을 위한 코드. 필요에 따라 수정해주세요.
      //const response = await axios.post(`${API_URL}/api/my-info/modify, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${jwt}`
      //   },
      //   {
      //      password: password,
      //      name: name,
      //      phone: phone
      //   }
      // });

      const response = {
        success: true,
        message: '내 정보가 성공적으로 수정되었습니다.',
        name: name,
        phone: phone,
        password: password,
        log: '실제 데이터를 전송 받을 때는 개인정보를 입력하지 않습니다!',
      };

      return response;
    } catch (error) {
      console.error('Update User Info error:', error);
      Alert.alert('Update User Info Error', error.message);
      throw error;
    }
  },
};
