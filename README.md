# 포페츠(For Pets)

유기동물을 위한 이동봉사 서비스 ForPets

### 유기동물을 위한 이동봉사 서비스 ForPets

![포페츠](https://github.com/user-attachments/assets/9ed5489b-3fad-469a-adbf-b29f89c8d024)

<br />

## 📖 프로젝트 소개

> 프로젝트 기간 : 2025.03.10 ~ 2025.04.04
>
> 매년 약 10만 마리씩 발생하는 유기동물을 위한 이동봉사 플랫폼입니다.
> 많은 기관/단체 또는 개인들이 유기동물을 구조하고 돕기위해 노력하고 봉사하고 있습니다. 하지만 아직 많은 도움의 손길이 필요합니다. 제일 큰 문제는 봉사 요청자와 자원 봉사자를 연결해 주는 전문 매체가 없다는 것입니다. 그래서 저희는 유기동물을 위한 봉사 플랫폼을 만들기로 했습니다.
> ![메인 이미지](assets/main.png)
> 그래서 우리는 유기동물을 위한 이동봉사 플랫폼을 만들었습니다.
> 도움이 필요한 곳에 손길이 닿을 수 있도록, 더 많은 유기동물이 안전한 보금자리를 찾을 수 있도록 돕고 싶습니다.

<br />

## ⚒️ 기술 스택

- **Frontend** : React 19, React-Router 7.4.0, Redux 9.2.0, TailWindcss 4.0.14
- **Backend** : Spring Boot 3.4.3, Spring Security 6.4.3, Java 21, SMTP, WebSocket/STOMP 6.2.3
- **Database** : MySQL 8.0.4, Redis 7.4.2
- **Infra** : Docker 20.0.3, AWS(EC2, S3), GitHub Actions
- **Tool** : GitHub, Jira, PostMan, Figma, Notion

<br />


## ✨ 주요 기능
### 로그인
https://github.com/user-attachments/assets/53ad57f8-6c28-4468-b734-042655b0d72d
### 나의 아이 등록
https://github.com/user-attachments/assets/eea38825-6759-46f6-9521-3ed305d0d36f
### 나의 아이 정보 수정
https://github.com/user-attachments/assets/98d3372d-1625-4726-ac5f-4263530337a6

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

<img width="800" alt="서비스 아키텍처 " src="https://github.com/user-attachments/assets/59072921-30c3-4f14-8aac-970103d7fc0d" />

### CI / CD

<img width="800" alt="CD" src="https://github.com/user-attachments/assets/e494bb82-6252-43e9-9764-35d0e8f38dce" />

### ERD 설계도

<img width="800" alt="erd" src="https://github.com/user-attachments/assets/b48555eb-3e78-49ce-abe5-3fc08fc38148" />

<img width="800" alt="erd" src="https://github.com/user-attachments/assets/eebd2686-1d55-4404-8492-debd68ae3c46" />

### 와이어프레임

<img width="800" alt="figma250403" src="https://github.com/user-attachments/assets/66c08002-b98c-40ca-b88d-07c609a90f64" />

<br />
<br />
<br />

## 로컬 설치 및 실행 방법

- 환경변수는 Root(최상단), fe, be 경로에 있는 .env.example 파일을 참고하여 작성

FrontEnd

```
cd fe/
npm install
npm run dev
```

BackEnd

```
cd be/
docker compose -f docker-compose.yml up
./gradlew bootrun (실행 권한 설정 : chmod +x gradlew)
```

<br />
<br />

## 👥 팀 소개

| FE / BE                                                                                                                | FE                                                                                                                     | FE / BE                                                                                                                | FE / BE                                                                                                                | FE / BE                                                                                                                |
| ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/c397f043-9034-493a-942b-93288469cf54" alt="가경식" width="150" /> | <img src="https://github.com/user-attachments/assets/6695318c-5b1c-4f6b-8256-5e3aa54f3d09" alt="원성준" width="150" /> | <img src="https://github.com/user-attachments/assets/f2310c56-bf3b-41c5-8804-81ecbd27db38" alt="이상호" width="150" /> | <img src="https://github.com/user-attachments/assets/28ea1911-5242-4967-a50e-547d1ddd0c08" alt="정명훈" width="150" /> | <img src="https://github.com/user-attachments/assets/efa77d9a-79a1-412b-ad55-ed9bc59e8dda" alt="최원호" width="150" /> |
| <p align="center">[가경식](https://github.com/kska01)</p>                                                              | <p align="center">[원성준](https://github.com/sungjoon92)</p>                                                          | <p align="center">[이상호](https://github.com/steve0312)</p>                                                           | <p align="center">[정명훈](https://github.com/wag192625)</p>                                                           | <p align="center">[최원호](https://github.com/Wonho)</p>                                                               |

<br />

## 📝 문서

| 📃 리소스         | 🔗 링크                                                                                                                                                                                | 설명                        |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| API 명세서        | [Notion 링크](https://www.notion.so/ForPets-API-1cac0c1bb1f780ceb6a6e6eac45a2eaa?pvs=4)                                                                                                | 포페츠 API 명세서           |
| 피그마 화면설계서 | [Figma 링크](https://www.figma.com/design/BXiVXtG8drnWt52oj1GYIF/for-pets.me-%ED%94%BC%EA%B7%B8%EB%A7%88?node-id=0-1&t=4SduUsj2BBmxsjeZ-1)                                             | UI / UX 디자인              |
| Jira 백로그       | [jira 링크](https://project-forpets.atlassian.net/jira/software/projects/FR/boards/2/backlog?epics=visible&atlOrigin=eyJpIjoiZTBmMDIwODdlNzZmNGNkNDkwNWIwNTRiMDExZTliNDQiLCJwIjoiaiJ9) | 프로젝트 개발 프로세스 관리 |
