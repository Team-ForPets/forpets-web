import React, { useEffect, useState } from 'react';
import authApi from '../api/authApi';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    nickname: '',
    password: '',
    duplicate: '',
    authCode: '',
  });
  // console.log(formData);
  const [error, setError] = useState('');
  /**
   * email
   * isClicked - 중복확인 버튼이 클릭되면 값 변경
   * status - 중복확인이 된 후 사용가능하면 'OK'값이 저장됨

   * nickname
   * isValid - 닉네임 유효성,
   * isTouched (+ onBlur) - 입력란에서 벗어나 다른 곳에 포커스가 옮겨가면 오류 메시지가 나타나도록 설정

   * password
   * isValid - 비밀번호 유효성
   * isTouched (+ onFocus) - 입력란에 포커스가 됐을 때 오류 메시지가 나타나도록 설정
   * isEqual - 입력된 두 비밀번호가 같은지 확인
   * verifiedValue - 비밀번호 확인 입력란에 입력된 비밀번호
   */

  const [validation, setValidation] = useState({
    username: { isClicked: false, status: '', message: '', sendCode: false, verifiedCode: false },
    nickname: { isValid: false, isTouched: false, status: '', isClicked: false, message: '' },
    password: { isValid: false, isTouched: false, isEqual: false, verifiedValue: '', message: '' },
    passwordCheck: { message: '' },
  });

  // 회원가입 버튼 활성화(모두 적어야 활성화)
  const isSignupButtonEnabled =
    formData.username.trim() !== '' &&
    validation.nickname.isValid &&
    validation.password.isValid &&
    validation.password.isEqual &&
    validation.username.status === 'true' &&
    validation.username.verifiedCode === 'true';

  // 위 조건 채웠을 때 버튼 활성화 상태
  const enabledClasses =
    // 'border cursor-pointer border-blue bg-amber-200 text-white hover:bg-secondary w-full h-10 rounded-lg mt-10';
    'border text-white border-amber-500 w-full h-10 rounded px-1 py-0.5 bg-amber-500 hover:bg-amber-500 hover:border-amber-600 hover:border-2';
  const disabledClasses =
    'border border-gray-300 bg-gray-200 text-gray-500 w-full h-10 rounded-lg mt-10 cursor-not-allowed';

  // 이메일 인증 탭 활성화
  const isVerificationTapEnabled =
    formData.username.trim() !== '' && validation.username.status === 'true';

  // 전체 input 입력값
  const handleFormInput = async (e) => {
    e.preventDefault();

    if (validation.username.status === '') {
      setValidation((prev) => ({
        ...prev,
        username: { ...prev.username, message: '아이디 중복 검사가 필요합니다.' },
      }));
    }
    if (validation.nickname.status === '') {
      setValidation((prev) => ({
        ...prev,
        nickname: { ...prev.nickname, message: '닉네임 중복 검사가 필요합니다.' },
      }));
    }
    try {
      await authApi.signup(formData);
      alert('회원가입 성공');
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };
  // ====================================================================
  useEffect(() => {
    // 이메일 유효성 검사
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setValidation((prev) => ({
      ...prev,
      username: {
        ...prev.username,
        isTouched: true,
        // status: formData.username !== prev.username ? '' : prev.username.status,
        message:
          formData.username === ''
            ? ''
            : emailRegex.test(formData.username)
              ? prev.username.status === true
                ? '사용 가능한 이메일입니다.'
                : '이메일 형식이 올바릅니다. 중복 검사를 진행해주세요.'
              : '이메일 형식에 맞춰주세요.',
      },
    }));
    // 닉네임 유효성 검사
    const nicknameRegex = /^[가-힣a-zA-Z0-9]{2,15}$/;
    setValidation((prev) => ({
      ...prev,
      nickname: {
        ...prev.nickname,
        isValid: nicknameRegex.test(formData.nickname),
        isTouched: true,
        message:
          formData.nickname === ''
            ? ''
            : nicknameRegex.test(formData.nickname)
              ? prev.nickname.status === true
                ? '사용 가능한 닉네임입니다.'
                : '닉네임 형식이 올바릅니다. 중복 검사를 진행해주세요.'
              : '특수문자 제외, 2자 이상 15자 이하여야 합니다.',
      },
    }));
    // 비밀번호 유효성 검사
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[#?!]).{8,}$/;
    setValidation((prev) => ({
      ...prev,
      password: {
        ...prev.password,
        isValid: passwordRegex.test(formData.password),
        isTouched: true,
        message:
          formData.password === ''
            ? ''
            : passwordRegex.test(formData.password)
              ? '사용 가능한 비밀번호입니다.'
              : '8자 이상, 영문, 숫자, 특수문자(#, ?, !)가 각각 1자 이상 포함되어야 합니다.',
        verifiedValue: formData.password, // 비밀번호 확인용 저장
      },
    }));

    // 비밀번호 확인
    setValidation((prev) => ({
      ...prev,
      password: {
        ...prev.password,
        isEqual: formData.duplicate === validation.password.verifiedValue,
        // isEqual: formData.password !== '' && formData.duplicate === prev.password.verifiedValue, // 비밀번호가 지워지면 false
      },
      passwordCheck: {
        message:
          formData.duplicate === ''
            ? ''
            : // : formData.duplicate === validation.password.verifiedValue
              formData.duplicate !== '' && formData.duplicate === prev.password.verifiedValue
              ? '비밀번호가 일치합니다.'
              : '비밀번호가 일치하지 않습니다.',
      },
    }));
    // console.log(
    //   '중복 여부',
    //   validation.username.status,
    //   '닉네임 유효성',
    //   validation.nickname.isValid,
    //   '비밀번호 확인',
    //   validation.password.isEqual,
    //   '비밀번호 유효성',
    //   validation.password.isValid,
    // );
  }, [
    formData.username,
    formData.nickname,
    formData.password,
    formData.password,
    formData.duplicate,
  ]);

  // 이메일 인증 코드 전송 요청
  const handleSendCode = async () => {
    setError('');
    if (!validation.username.sendCode === '') {
      setValidation((prev) => ({
        ...prev,
        username: { ...prev.username, message: '이메일 인증을 진행해주세요.' },
      }));
      return;
    } else {
      try {
        console.log('인증코드 전송');
        const response = await authApi.sendAuthCode(formData.username);
        // 응답 데이터인 available 값을 적용(true(사용 가능) / false(중복))
        const sendCode = response.data;
        setValidation((prev) => ({
          ...prev,
          username: {
            ...prev.username,
            isClicked: true,
            sendCode: true,
            verifiedCode: false,
            message: '인증 코드 전송에 성공했습니다.',
          },
        }));
      } catch (err) {
        setError(err.message);
        setValidation((prev) => ({
          ...prev,
          username: {
            ...prev.username,
            isClicked: true,
            sendCode: '',
            message: '인증 코드 전송에 실패했습니다.',
          },
        }));
        console.log(err.message);
      }
    }
  };
  // 이메일 인증 코드 검증
  const handleCodeVerified = async () => {
    setError('');
    if (validation.username.sendCode === '') {
      setValidation((prev) => ({
        ...prev,
        username: { ...prev.username, message: '코드 입력 시간이 지났습니다. 다시 인증해주세요.' },
      }));
      return;
    }
    try {
      // 이메일 인증 코드 검증 요청
      console.log('인증코드 검증');
      const response = await authApi.verifyCode(formData.username, formData.authCode);
      console.log('유저네임과 인증코드 : ', formData.username, formData.authCode);
      // 응답 데이터인 available 값을 적용(true(사용 가능) / false(중복))
      const isVerified = response.data.status;

      console.log(isVerified);
      setValidation((prev) => ({
        ...prev,
        username: {
          ...prev.username,
          isClicked: true,
          verifiedCode: isVerified ? 'true' : (validation.username.sendCode = ''),
          message: isVerified ? '인증 성공' : '유효하지 않은 인증 코드',
        },
      }));
    } catch (err) {
      setError(err.message);
      setValidation((prev) => ({
        ...prev,
        username: {
          ...prev.username,
          isClicked: true,
          sendCode: '',
          message: '이메일 인증에 실패했습니다.',
        },
      }));
      console.log(err.message);
    }
  };
  // 이메일 중복 확인 버튼
  const handleCheckUsername = async () => {
    setError('');
    // const userName = formData.username;
    if (formData.username === '') {
      setValidation((prev) => ({
        ...prev,
        username: { ...prev.username, message: '이메일을 입력해주세요.' },
      }));
      return;
    }
    try {
      // 서버에 username 검증 요청
      const response = await authApi.checkUsername(formData.username);
      // 응답 데이터인 available 값을 적용(true(사용 가능) / false(중복))
      const isPossible = response.data.available;

      console.log(isPossible);
      setValidation((prev) => ({
        ...prev,
        username: {
          ...prev.username,
          isClicked: true,
          status: isPossible ? 'true' : '',
          message: isPossible ? 'db에 없는 이메일입니다.' : '이미 사용 중인 이메일입니다.',
        },
      }));
    } catch (err) {
      setError(err.message);
      setValidation((prev) => ({
        ...prev,
        username: { ...prev.username, isClicked: true, status: '' },
      }));
      console.log(err.message);
    }
  };

  // 닉네임 중복 확인 버튼
  const handleCheckNickname = async () => {
    setError('');
    // const userName = formData.username;
    if (formData.nickname === '') {
      setValidation((prev) => ({
        ...prev,
        nickname: { ...prev.nickname, message: '닉네임을 입력해주세요.' },
      }));
      return;
    }
    try {
      // 서버에 username 검증 요청
      const response = await authApi.checkNickname(formData.nickname);
      // 응답 데이터인 available 값을 적용(true(사용 가능) / false(중복))
      const isPossible = response.data.available;

      // console.log(isPossible);
      setValidation((prev) => ({
        ...prev,
        nickname: {
          ...prev.nickname,
          isClicked: true,
          status: isPossible ? 'true' : '',
          message: isPossible ? 'db에 없는 닉네임입니다.' : '이미 사용 중인 닉네임입니다.',
        },
      }));
    } catch (err) {
      setError(err.message);
      setValidation((prev) => ({
        ...prev,
        nickname: { ...prev.nickname, isClicked: true, status: '' },
      }));
      console.log(err.message);
    }
  };
  const toHome = () => {
    navigate('/');
  };

  return (
    <section className="flex flex-col items-center gap-15 mt-10">
      {/* <h1 className="text-6xl font-semibold" onClick={toHome}>
        회원가입
      </h1> */}

      {/* -------------------------------------------------------------- */}
      {/* 이메일 */}
      {/* -------------------------------------------------------------- */}

      <section className="w-100">
        <form onSubmit={handleFormInput}>
          <section className="flex justify-between border border-gray-300 bg-gray-200 text-gray-500 w-full h-10 rounded-lg mt-10 cursor-not-allowed">
            <input
              type="email"
              name="username"
              placeholder="이메일"
              autoComplete="email"
              // className="w-80 px-2 focus:outline-none"
              className="w-80 px-2 focus:border-2 focus:border-amber-500 focus:outline focus:outline-amber-500 rounded "
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />

            <button
              type="button"
              className="border text-white border-amber-500 rounded w-20 px-1 py-0.5 bg-amber-500 hover:bg-amber-500 hover:border-amber-600 hover:border-2"
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleCheckUsername}
            >
              중복확인
            </button>
          </section>
          <section className="max-h-1">
            {/* 유효성 검사 메시지 출력 */}
            {validation.username.message && (
              <p
                className={`text-[12px] mt-1 ${
                  validation.username.message.includes('가능')
                    ? 'text-primary text-[12px] mt-1 mb-0 ' // 사용 가능 메시지는 파란색
                    : 'text-red-600 text-[12px] mt-1 mb-0' // 에러 메시지는 빨간색
                }`}
              >
                {validation.username.message}
              </p>
            )}
          </section>

          {/* -------------------------------------------------------------- */}
          {/* 이메일 검증*/}
          {/* -------------------------------------------------------------- */}

          <section
            className={`${isVerificationTapEnabled ? 'block' : 'hidden'} flex justify-between border border-gray-300 bg-gray-200 text-gray-500 w-full h-10 rounded-lg mt-10 cursor-not-allowed`}
          >
            <input
              type="text"
              placeholder="인증 코드"
              value={formData.authCode}
              onChange={(e) => setFormData({ ...formData, authCode: e.target.value })}
              // className={{isVerificationTapEnabled ? 'block' : 'hidden'}
              className={` w-80 px-2 focus:border-2 focus:border-amber-500 focus:outline focus:outline-amber-500 rounded`}
            />
            {/* 이메일 전송/ 코드 검증(검증 시간 설정) 삼항연산자 써야 함 */}
            <button
              type="button"
              className="border  text-white border-amber-500 rounded w-36 px-1 py-0.5 bg-amber-500 hover:bg-amber-500 hover:border-amber-600 hover:border-2"
              onMouseDown={(e) => e.preventDefault()}
              onClick={!validation.username.sendCode ? handleSendCode : handleCodeVerified}
            >
              {!validation.username.sendCode ? '인증 코드 전송' : '인증 코드 검증'}
            </button>
          </section>

          {/* -------------------------------------------------------------- */}
          {/* 닉네임 */}
          {/* -------------------------------------------------------------- */}

          <section className="flex justify-between border-gray-300 bg-gray-200 text-gray-500 w-full h-10 rounded-lg mt-10 cursor-not-allowed">
            <input
              type="text"
              name="nickname"
              placeholder="닉네임(2자 이상)"
              autoComplete="username"
              value={formData.nickname}
              onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
              onBlur={() =>
                setValidation((prev) => ({
                  ...prev,
                  nickname: { ...prev.nickname },
                }))
              }
              className="w-80 px-2 focus:border-2 focus:border-amber-500 focus:outline focus:outline-amber-500 rounded "
              required
            />
            <button
              type="button"
              className="border text-white border-amber-500 rounded w-20 px-1 py-0.5 bg-amber-500 hover:bg-amber-500 hover:border-amber-600 hover:border-2"
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleCheckNickname}
            >
              중복확인
            </button>
          </section>

          {validation.nickname.message && (
            <p
              className={`text-[12px] mt-1 ${
                validation.nickname.message.includes('가능')
                  ? 'text-primary text-[12px] mt-1 mb-0 ' // 사용 가능 메시지는 파란색
                  : 'text-red-600 text-[12px] mt-1 mb-0' // 에러 메시지는 빨간색
              }`}
            >
              {validation.nickname.message}
            </p>
          )}

          {/* -------------------------------------------------------------- */}
          {/* 비밀번호 */}
          {/* -------------------------------------------------------------- */}
          <section className="flex justify-between border border-gray-300 bg-gray-200 text-gray-500 w-full h-10 rounded-lg mt-10 cursor-not-allowed">
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              autoComplete="current-password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              onFocus={() =>
                setValidation((prev) => ({
                  ...prev,
                  password: { ...prev.password, isTouched: true },
                }))
              }
              // className="px-2 w-100 focus:outline-none"
              className="w-80 px-2 focus:border-2 focus:border-amber-500 focus:outline focus:outline-amber-500 rounded "
              required
            />
          </section>

          {validation.password.message && (
            <p
              className={`text-[12px] mt-1 ${
                validation.password.message.includes('가능')
                  ? 'text-primary text-[12px] mt-2 mb-0 ' // 사용 가능 메시지는 파란색
                  : 'text-red-600 text-[12px] mt-2 mb-0' // 에러 메시지는 빨간색
              }`}
            >
              {/* <p className="text-red-600 text-[12px] mb-2  invisible"> */}
              {validation.password.message}
            </p>
          )}

          {/* -------------------------------------------------------------- */}
          {/* 비밀번호 확인 */}
          {/* -------------------------------------------------------------- */}
          <section className="flex justify-between border border-gray-300 bg-gray-200 text-gray-500 w-full h-10 rounded-lg mt-10 cursor-not-allowed">
            <input
              type="password"
              name="verifyPassword"
              placeholder="비밀번호 확인"
              autoComplete="new-password"
              value={formData.duplicate}
              onChange={(e) => setFormData({ ...formData, duplicate: e.target.value })}
              // onChange={(e) => setValidation({ ...validation, verifiedValue: e.target.value })}
              // onBlur={() =>
              //   setValidation((prev) => ({
              //     ...prev,
              //     password: { ...prev.password, isTouched: true },
              //   }))
              // }
              className={
                validation.password.isEqual
                  ? 'w-80 px-2 focus:border-2 focus:border-amber-500 focus:outline focus:outline-amber-500 rounded'
                  : 'w-80 px-2 focus:border-2 focus:border-amber-500 focus:outline focus:outline-amber-500 rounded'
              }
              required
            />
          </section>

          {validation.passwordCheck.message && (
            <p
              className={`text-[12px] mt-1 ${
                validation.passwordCheck.message.includes('일치합')
                  ? 'text-primary text-[12px] mt-2 mb-0 ' // 사용 가능 메시지는 파란색
                  : 'text-red-600 text-[12px] mt-2 mb-0' // 에러 메시지는 빨간색
              }`}
            >
              {/* <p className="text-red-600 text-[12px] mb-2  invisible"> */}
              {validation.passwordCheck.message}
            </p>
          )}

          {/* -------------------------------------------------------------- */}
          {/* 회원가입 버튼  */}
          {/* -------------------------------------------------------------- */}

          {/* <hr className="mb-10 mt-0.5" /> */}
          <button
            className={isSignupButtonEnabled ? enabledClasses : disabledClasses}
            disabled={!isSignupButtonEnabled}
          >
            회원가입
          </button>
        </form>
      </section>
    </section>
  );
}

export default Signup;
