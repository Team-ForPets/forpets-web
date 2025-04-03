# 포페츠(For Pets)

유기동물을 위한 이동봉사 서비스 ForPets

<br />

## 📖 프로젝트 소개

> 프로젝트 기간 : 2025.03.10 ~ 2025.04.04
>
> 매년 약 10만 마리씩 발생하는 유기동물을 위한 이동봉사 플랫폼입니다.
> 많은 기관/단체 또는 개인들이 유기동물을 구조하고 돕기위해 노력하고 봉사하고 있습니다. 하지만 아직 많은 도움의 손길이 필요합니다. 제일 큰 문제는 봉사 요청자와 자원 봉사자를 연결해 주는 전문 매체가 없다는 것입니다. 그래서 저희는 유기동물을 위한 봉사 플랫폼을 만들기로 했습니다.
> ![메인 이미지](assets/main.png)

<br />

## ⚒️ 기술 스택 내일

- **Frontend** : React 19, Redux 9.2, Axios 1.7
- **Backend** : Spring Boot 3.4.3, Java 21, MySQL 8
- **Infra** : Docker, AWS EC2, AWS S3, GitHub Action
- **Tool** : Figma, Notion, Jira, GitHub

<br />

## ✨ 주요 기능

| 회원가입 및 로그인                                                                                                                                         | 버킷 리스트 생성                                                                                           |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| 아이디, 이메일, 비밀번호 입력으로 사용자 정보가 등록됩니다. <br /> 사용자 인증 정보를 통해 로그인합니다.                                                   | 버킷 리스트를 생성합니다.                                                                                  |
| <img src = "https://github.com/Team-ForPets/forpets-web/pull/143/files#diff-6848f89dbbee2b1ef343b7b7591220743eb33bdc799d3a2b2d545f5b454c5c02" width="300"> | <img src = "https://github.com/user-attachments/assets/6aebb13d-a950-46b3-832e-a82812b96a5e" width="300" > |

| 버킷 리스트 수정                                                                                                                                            | 버킷 리스트 필터                                                                                           |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| 버킷 리스트의 제목과 이미지를 수정합니다.                                                                                                                   | 버킷 리스트의 진행도에 따라 목록을 조회합니다.                                                             |
| <img src = "https://github.com/Team-ForPets/forpets-web/pull/143/files#diff-255ed74a9f564bd15e852c7bd165b51e7ec13b1a66df6856139723907edb8bac" width="300" > | <img src = "https://github.com/user-attachments/assets/1dc97ad3-f750-41c6-9079-d11f83087f83" width="300" > |

| 버킷 리스트 삭제                                                                                          | 투두 리스트 생성                                                                                           |
| --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| 생성한 버킷 리스트를 삭제합니다.                                                                          | 버킷 리스트의 하위 투두 리스트를 생성합니다.                                                               |
| <img src = "https://github.com/user-attachments/assets/e8237ce2-00c3-4eef-a906-70026fb13a0e" width="300"> | <img src = "https://github.com/user-attachments/assets/5aaef3d9-c557-4b8b-ac72-4e408582c89a" width="300" > |

| 투두 리스트 수정                                                                                                               | 투두 리스트 삭제                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| 투두 리스트의 내용을 수정하고, 체크박스를 표시합니다. <br /> 모든 투두 리스트를 체크할 경우, 버킷 리스트는 완료 처리가 됩니다. | 투두 리스트를 삭제합니다.                                                                                  |
| <img src = "https://github.com/user-attachments/assets/f1093f82-d20c-4bf6-98dc-792406f23ed2" width="300" >                     | <img src = "https://github.com/user-attachments/assets/34e2d8aa-f976-4ab9-b541-e8d762b9042f" width="300" > |

<br />

## 로컬 설치 및 실행 방법

- 환경변수는 /be 경로에 있는 .env.example 파일을 참고하여 작성

FrontEnd

```
cd fe/
npm install
npm run dev
```

BackEnd

```
cd be/
docker compose -f docker-compose-db.yml up
./gradlew bootrun
```

## 🏗️ 아키텍처

### 서비스 아키텍처

![서비스 아키텍처](assets/service.png)

### CI / CD

![CI / CD](assets/ci_cd_architecture.png)

### ERD 설계도

<img width="800" alt="erd" src="https://github.com/user-attachments/assets/b48555eb-3e78-49ce-abe5-3fc08fc38148" />

### 와이어프레임

![와이어프레임](assets/wireframe.png)

<br />

## 👥 팀 소개

| Frontend                                                                                                               | Frontend                                                                                                               | Backend                                                                                                                | Backend                                                                                                                | Backend                                                                                                                |
| ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/c397f043-9034-493a-942b-93288469cf54" alt="가경식" width="150" /> | <img src="https://github.com/user-attachments/assets/6695318c-5b1c-4f6b-8256-5e3aa54f3d09" alt="원성준" width="150" /> | <img src="https://github.com/user-attachments/assets/f2310c56-bf3b-41c5-8804-81ecbd27db38" alt="이상호" width="150" /> | <img src="https://github.com/user-attachments/assets/28ea1911-5242-4967-a50e-547d1ddd0c08" alt="정명훈" width="150" /> | <img src="https://github.com/user-attachments/assets/efa77d9a-79a1-412b-ad55-ed9bc59e8dda" alt="최원호" width="150" /> |
| [가경식](https://github.com/kska01)                                                                                    | [원성준](https://github.com/sungjoon92)                                                                                | [이상호](https://github.com/steve0312)                                                                                 | [정명훈](https://github.com/wag192625)                                                                                 | [최원호](https://github.com/Wonho)                                                                                     |

<br />

## 📝 문서

| 📃 리소스     | 🔗 링크                                                                                                                                                                          | 설명                        |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| 팀 노션       | [Notion 링크](https://www.notion.so/BucketDo-19d8cf3b3b228052a204e7b2f8f40099?pvs=21)                                                                                            | 프로젝트 계획 및 일정 관리  |
| 피그마 디자인 | [Figma 링크](https://www.figma.com/design/QM8vJ0pEPeqOPIAi6CDCde/%EB%94%94%EC%9E%90%EC%9D%B8-%EC%84%A4%EA%B3%84?node-id=0-1&t=Pm5B6xXHu8BQp6X8-1)                                | UI / UX 디자인              |
| Jira 백로그   | [jira 링크](https://bucket-do.atlassian.net/jira/software/projects/BD/boards/1/backlog?epics=visible&atlOrigin=eyJpIjoiOTliMThlZDg1YTUzNDNkMzhhNDk5NWE2MTBhMjg2NzIiLCJwIjoiaiJ9) | 프로젝트 개발 프로세스 관리 |
