import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import authApi from '../api/authApi';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
    authCode: '',
  });

  const [validation, setValidation] = useState({
    email: false,
    nickname: false,
    password: false,
    confirmPassword: false,
    authCode: false,
  });

  const [isClickEmailDuplicate, setIsClickEmailDuplicate] = useState(false); // 이메일 중복 확인 버튼 클릭 여부
  const [isClickNicknameDuplicate, setIsClickNicknameDuplicate] = useState(false); // 닉네임 중복 확인 버튼 클릭 여부

  const AUTH_TYPE = {
    DEFAULT: 'default', // 초기 상태 - 인증 코드 전송 버튼 클릭 전
    SENDING: 'sending', // 인증 코드 전송 중
    SEND: 'send', // 인증 코드 전송 완료
    CONFIRMING: 'confirming', // 인증 코드 검증 중
    CONFIRM: 'confirm', // 인증 코드 검증 성공
  };

  const [authState, setAuthState] = useState(AUTH_TYPE.DEFAULT);
  const [authCodeMessage, setAuthCodeMessage] = useState(null);

  const handleClickAuthCodeButton = () => {
    if (authState === (AUTH_TYPE.DEFAULT || AUTH_TYPE.SENDING)) return handleSendAuthCode();
    if (authState === AUTH_TYPE.SEND) return handleVerifyCode();
  };

  const isSignupButtonEnabled =
    validation.email && validation.nickname && validation.password && validation.confirmPassword;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    handleValidation(name, value);
  };

  const handleValidation = (name, value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const nicknameRegex = /^[가-힣a-zA-Z0-9]{2,15}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[#?!]).{8,}$/;

    let isValid = true;
    if (name === 'email') {
      isValid = emailRegex.test(value);
    } else if (name === 'nickname') {
      isValid = nicknameRegex.test(value);
    } else if (name === 'password') {
      isValid = passwordRegex.test(value);
    } else if (name === 'confirmPassword') {
      isValid = value === formData.password;
    } else if (name === 'authCode') {
      return;
    }

    setValidation((prev) => ({
      ...prev,
      [name]: isValid,
    }));
  };

  const handleCheckEmailDuplicate = async () => {
    // 이메일 중복 확인 버튼 클릭 시 인증 코드 재검증
    setAuthState(AUTH_TYPE.DEFAULT); // 인증 코드 전송 버튼 클릭 전 상태로 초기화
    setValidation((prev) => ({ ...prev, authCode: false }));

    if (validation.email) {
      // 서버에 email 검증 요청
      try {
        const response = await authApi.checkUsername(formData.email);
        // 응답 데이터인 available 값을 적용(true(사용 가능) / false(중복))
        const isPossible = response.data.available;
        setValidation((prev) => ({
          ...prev,
          email: isPossible,
        }));
        setIsClickEmailDuplicate(true);
      } catch (e) {
        console.log(e);
        alert('이메일 중복 확인에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const handleSendAuthCode = async () => {
    // TODO : 3 minute
    setAuthState(AUTH_TYPE.SENDING); // 인증코드 전송 중
    try {
      const response = await authApi.sendAuthCode(formData.email);
      const sendCode = response.data;
      console.log(typeof sendCode, sendCode);

      if (sendCode) {
        setAuthState(AUTH_TYPE.SEND); // 인증코드 전송 성공
        setAuthCodeMessage('인증 코드 전송에 성공했습니다. 인증 코드를 입력해주세요.');
      }
      setValidation((prev) => ({ ...prev, authCode: sendCode }));
    } catch (e) {
      console.log(e);
      setAuthCodeMessage('인증 코드 전송에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleVerifyCode = async () => {
    setAuthState(AUTH_TYPE.CONFIRMING); // 인증코드 검증 중
    try {
      const response = await authApi.verifyCode(formData.email, formData.authCode);
      const isVerified = response.data.status;
      if (isVerified) {
        setAuthState(AUTH_TYPE.CONFIRM); // 인증코드 검증 성공
        setAuthCodeMessage('인증 코드 검증에 성공했습니다.');
      } else {
        setAuthState(AUTH_TYPE.SEND); // 인증코드 검증 실패
        setAuthCodeMessage('인증 코드 검증에 실패했습니다. 다시 시도해주세요.');
      }
      setValidation((prev) => ({ ...prev, authCode: isVerified }));
    } catch (e) {
      console.log(e);
    }
  };

  const handleCheckNicknameDuplicate = async () => {
    setIsClickNicknameDuplicate(true);
    try {
      const response = await authApi.checkNickname(formData.nickname);
      const isPossible = response.data.available;
      setValidation((prev) => ({
        ...prev,
        nickname: isPossible,
      }));
    } catch (e) {
      console.log(e);
      alert('닉네임 중복 확인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authApi.signup({
        username: formData.email,
        nickname: formData.nickname,
        password: formData.password,
      });
      alert('회원가입 성공');
      navigate('/');
    } catch (e) {
      console.log(e);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <section className="flex flex-col items-center mt-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-100">
        <div className="w-full">
          <div className="flex bg-gray-200 rounded-lg overflow-hidden">
            <Input
              type="email"
              name="email"
              placeholder="이메일"
              value={formData.email}
              onChange={handleChangeInput}
            />
            <Button
              text="중복확인"
              onClick={handleCheckEmailDuplicate}
              disabled={!formData.email.trim()}
            />
          </div>

          {formData.email && (
            <ValidationMessage
              message={
                validation.email
                  ? isClickEmailDuplicate
                    ? '사용 가능한 이메일입니다.'
                    : '이메일 형식이 올바릅니다.'
                  : isClickEmailDuplicate
                    ? '이메일 형식이 올바르지 않습니다.'
                    : '이미 사용 중인 이메일입니다'
              }
              isValid={validation.email}
            />
          )}
        </div>

        {isClickEmailDuplicate && (
          <div>
            <div className="flex bg-gray-200 rounded-lg overflow-hidden">
              <Input
                type="text"
                name="authCode"
                placeholder="인증 코드"
                className="rounded-lg overflow-hidden"
                value={formData.authCode}
                onChange={handleChangeInput}
                disabled={authState === AUTH_TYPE.CONFIRM} // 인증 코드 검증 성공 시 입력 불가
              />

              <Button
                text={
                  authState === (AUTH_TYPE.DEFAULT || AUTH_TYPE.SENDING)
                    ? '인증 코드 전송'
                    : '인증 코드 검증'
                }
                onClick={handleClickAuthCodeButton}
              />
            </div>
            {/* temp */}
            {/* <p>
              authState: {authState} | message : {authCodeMessage} | isValid: {validation.authCode}
            </p> */}

            {authState !== AUTH_TYPE.DEFAULT && (
              <ValidationMessage message={authCodeMessage} isValid={validation.authCode} />
            )}
          </div>
        )}

        <div>
          <div className="flex bg-gray-200 rounded-lg overflow-hidden">
            <Input
              type="text"
              name="nickname"
              placeholder="닉네임(2자 이상)"
              className="rounded-lg overflow-hidden"
              value={formData.nickname}
              onChange={handleChangeInput}
            />
            <Button text="중복확인" onClick={handleCheckNicknameDuplicate} />
          </div>

          {formData.nickname && (
            <ValidationMessage
              message={
                validation.nickname
                  ? isClickNicknameDuplicate
                    ? '사용 가능한 닉네임입니다.'
                    : '닉네임 형식이 올바릅니다. 중복 검사를 진행해주세요.'
                  : isClickNicknameDuplicate
                    ? '불가'
                    : '특수문자 제외, 2자 이상 15자 이하여야 합니다.'
              }
              isValid={validation.nickname}
            />
          )}
        </div>

        <div>
          <Input
            type="password"
            name="password"
            placeholder="비밀번호"
            className="rounded-lg"
            value={formData.password}
            onChange={handleChangeInput}
          />
          {formData.password && (
            <ValidationMessage
              message={
                validation.password
                  ? '사용 가능한 비밀번호입니다.'
                  : '8자 이상, 영문, 숫자, 특수문자(#, ?, !)가 각각 1자 이상 포함되어야 합니다.'
              }
              isValid={validation.password}
            />
          )}
        </div>

        <div>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            className="rounded-lg"
            value={formData.confirmPassword}
            onChange={handleChangeInput}
          />
          {formData.confirmPassword && (
            <ValidationMessage
              message={
                validation.confirmPassword
                  ? '비밀번호가 일치합니다.'
                  : '비밀번호가 일치하지 않습니다.'
              }
              isValid={validation.confirmPassword}
            />
          )}
        </div>

        <button
          className={twMerge(
            'h-10 mb-10 border border-gray-300 bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed',
            isSignupButtonEnabled &&
              'text-white w-full h-10 rounded px-1 py-0.5 bg-amber-500 cursor-pointer',
          )}
          disabled={!isSignupButtonEnabled}
        >
          회원가입
        </button>
      </form>
    </section>
  );
};

const Input = ({ type, name, value, placeholder, onChange, className }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={twMerge(
        'p-2 w-full h-10 border border-none bg-gray-200 text-gray-500 outline-0',
        className,
      )}
    />
  );
};

const ValidationMessage = ({ message, isValid }) => {
  return (
    <p className={twMerge('text-[12px] mt-1', isValid ? 'text-cyan-500' : 'text-red-600')}>
      {message}
    </p>
  );
};

const Button = ({ text, onClick, disabled }) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      // TODO : hover:bg-amber-500 hover:border-amber-600 필요여부 확인
      className="border text-white border-amber-500 rounded px-1 py-0.5 bg-amber-500 hover:border-2 disabled:bg-amber-500 cursor-pointer whitespace-nowrap"
    >
      {text}
    </button>
  );
};

export default Signup;
