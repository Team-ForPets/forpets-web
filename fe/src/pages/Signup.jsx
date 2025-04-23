import { useState, useEffect } from 'react';
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

  const [isClickEmailDuplicate, setIsClickEmailDuplicate] = useState(false);
  const [isClickNicknameDuplicate, setIsClickNicknameDuplicate] = useState(false);

  // 이메일 변경 여부 추적 상태 추가
  const [isEmailChanged, setIsEmailChanged] = useState(false);

  // 타이머 상태
  const [timer, setTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const AUTH_TYPE = {
    DEFAULT: 'default',
    SENDING: 'sending',
    SEND: 'send',
    CONFIRMING: 'confirming',
    CONFIRM: 'confirm',
    EXPIRED: 'expired',
  };

  const [authState, setAuthState] = useState(AUTH_TYPE.DEFAULT);
  const [authCodeMessage, setAuthCodeMessage] = useState(null);

  // 이메일 변경 감지 효과
  useEffect(() => {
    if (isEmailChanged && authState !== AUTH_TYPE.DEFAULT) {
      // 이메일이 변경되고, 인증 과정이 시작된 경우 인증 상태 초기화
      setAuthState(AUTH_TYPE.DEFAULT);
      setValidation((prev) => ({ ...prev, authCode: false }));
      setAuthCodeMessage(null);
      // 이메일 변경 감지 상태 초기화
      setIsEmailChanged(false);
      // 타이머 초기화
      setIsTimerActive(false);
      setTimer(0);
    }
  }, [isEmailChanged, authState]);

  // 타이머
  useEffect(() => {
    let interval;

    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTime => prevTime - 1);
      }, 1000);
    } else if (timer === 0 && isTimerActive) {
      setIsTimerActive(false);
      if (authState === AUTH_TYPE.SEND) {
        setAuthState(AUTH_TYPE.EXPIRED);
        setAuthCodeMessage('인증 시간이 만료되었습니다. 인증 코드를 재요청해주세요.');
      }
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer, authState]);

  // 회원가입 버튼 활성화 조건
  const isSignupButtonEnabled =
    validation.email &&
    validation.nickname &&
    validation.password &&
    validation.confirmPassword &&
    authState === AUTH_TYPE.CONFIRM;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    // 이메일 변경 여부 감지
    if (name === 'email' && value !== formData.email) {
      setIsEmailChanged(true);
      // 이메일 변경 시 중복 확인 상태 초기화
      setIsClickEmailDuplicate(false);
    }

    // 닉네임 변경 여부 감지
    if (name === 'nickname' && value !== formData.nickname) {
      // 닉네임 변경 시 중복 확인 상태 초기화
      setIsClickNicknameDuplicate(false);
    }

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

      // 비밀번호가 변경되면 비밀번호 확인도 재검증
      if (formData.confirmPassword) {
        setValidation((prev) => ({
          ...prev,
          confirmPassword: formData.confirmPassword === value,
        }));
      }
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
    // 이메일 중복 확인 시 인증 상태 초기화
    setAuthState(AUTH_TYPE.DEFAULT);
    setValidation((prev) => ({ ...prev, authCode: false }));
    setAuthCodeMessage(null);

    // 타이머 초기화
    setIsTimerActive(false);
    setTimer(0);

    setFormData((prev) => ({ ...prev, authCode: '' }));

    if (validation.email) {
      try {
        const response = await authApi.checkUsername(formData.email);
        const isPossible = response.data.available;
        setValidation((prev) => ({
          ...prev,
          email: isPossible,
        }));
        setIsClickEmailDuplicate(true);

        // 이메일 변경 감지 플래그 초기화
        setIsEmailChanged(false);
      } catch (e) {
        console.log(e);
        alert('이메일 중복 확인에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const handleSendAuthCode = async () => {
    setAuthState(AUTH_TYPE.SENDING);
    try {
      const response = await authApi.sendAuthCode(formData.email);
      const sendCode = response.data;

      if (sendCode) {
        setAuthState(AUTH_TYPE.SEND);
        setAuthCodeMessage('인증 코드 전송에 성공했습니다. 인증 코드를 입력해주세요.');
        setTimer(10);
        setIsTimerActive(true);
      } else {
        setAuthState(AUTH_TYPE.DEFAULT);
        setAuthCodeMessage('인증 코드 전송에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (e) {
      console.log(e);
      setAuthState(AUTH_TYPE.DEFAULT);
      setAuthCodeMessage('인증 코드 전송에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleVerifyCode = async () => {
    setAuthState(AUTH_TYPE.CONFIRMING);
    try {
      const response = await authApi.verifyCode(formData.email, formData.authCode);
      const isVerified = response.data.status;

      if (isVerified) {
        setAuthState(AUTH_TYPE.CONFIRM);
        setAuthCodeMessage('인증 코드 검증에 성공했습니다.');
        setIsTimerActive(false);
      } else {
        setAuthState(AUTH_TYPE.SEND);
        setAuthCodeMessage('인증 코드 검증에 실패했습니다. 다시 시도해주세요.');
      }

      setValidation((prev) => ({ ...prev, authCode: isVerified }));
    } catch (e) {
      console.log(e);
      setAuthState(AUTH_TYPE.SEND);
      setAuthCodeMessage('인증 코드 검증 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleClickAuthCodeButton = () => {
    // 인증 코드 전송 또는 검증 상태에 따라 해당 함수 호출
    if (authState === AUTH_TYPE.DEFAULT || authState === AUTH_TYPE.SENDING) {
      return handleSendAuthCode();
    }
    if (authState === AUTH_TYPE.SEND) {
      return handleVerifyCode();
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

    // 이메일 인증이 완료되지 않았으면 제출 금지
    if (authState !== AUTH_TYPE.CONFIRM) {
      alert('이메일 인증을 완료해주세요.');
      return;
    }

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

  // 이메일 인증 상태에 따른 버튼 텍스트
  const getAuthButtonText = () => {
    switch (authState) {
      case AUTH_TYPE.DEFAULT:
      case AUTH_TYPE.SENDING:
        return '인증 코드 전송';
      case AUTH_TYPE.SEND:
      case AUTH_TYPE.CONFIRMING:
        return '인증 코드 검증';
      case AUTH_TYPE.CONFIRM:
        return '인증 완료';
      case AUTH_TYPE.EXPIRED:
        return '인증 코드 재전송';
      default:
        return '인증 코드 전송';
    }
  };

  // 타이머 포멧팅 함수
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
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
              disabled={!formData.email.trim() || !validation.email}
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
                    ? '이미 사용 중인 이메일입니다. 다른 이메일을 사용해주세요.'
                    : '이메일 형식이 올바르지 않습니다.'
              }
              isValid={validation.email}
            />
          )}
        </div>

        {isClickEmailDuplicate && validation.email && (
          <div>
            <div className="flex bg-gray-200 rounded-lg overflow-hidden">
              <Input
                type="text"
                name="authCode"
                placeholder="인증 코드"
                className="rounded-lg overflow-hidden"
                value={formData.authCode}
                onChange={handleChangeInput}
                disabled={authState === AUTH_TYPE.CONFIRM || authState === AUTH_TYPE.DEFAULT} // 인증 완료 시 입력 불가
              />
              {isTimerActive && (
                <span className="text-red-500 text-sm px-2">{formatTime(timer)}</span>
              )}

              <Button
                text={getAuthButtonText()}
                onClick={handleClickAuthCodeButton}
                disabled={authState === AUTH_TYPE.CONFIRM} // 인증 완료 시 버튼 비활성화
              />
            </div>

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
            <Button
              text="중복확인"
              onClick={handleCheckNicknameDuplicate}
              disabled={!formData.nickname.trim() || !validation.nickname}
            />
          </div>

          {formData.nickname && (
            <ValidationMessage
              message={
                validation.nickname
                  ? isClickNicknameDuplicate
                    ? '사용 가능한 닉네임입니다.'
                    : '닉네임 형식이 올바릅니다. 중복 검사를 진행해주세요.'
                  : isClickNicknameDuplicate
                    ? '이미 사용 중인 닉네임입니다. 다른 이메일을 사용해주세요.'
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

const Input = ({ type, name, value, placeholder, onChange, className, disabled }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={twMerge(
        'p-2 w-full h-10 border border-none bg-gray-200 text-gray-500 outline-0',
        className,
        disabled && 'bg-gray-300',
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
      className={twMerge(
        'border text-white border-amber-500 rounded px-1 py-0.5 bg-amber-500 hover:border-2 cursor-pointer whitespace-nowrap focus-visible:outline-amber-600',
        disabled && 'bg-gray-400 border-gray-400 cursor-not-allowed',
      )}
    >
      {text}
    </button>
  );
};

export default Signup;
