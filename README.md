# passport-google-example
`Node.js`에서 `passport`모듈을 사용해 구글 로그인(OAuth)을 간단하게 확인하기 위한 코드입니다.

## Installation
```sh
git clone https://github.com/sejjj120/passport-google-example.git
cd passport-google-example
npm install # 혹은 yarn install
```

## Usage
구글 API를 사용하기 위해 [Google API Console](https://console.developers.google.com)에서 먼저 자신의 애플리케이션을 등록해야 합니다.
1. 새로운 프로젝트를 만든다.
2. OAuth 동의화면에서 애플리케이션 이름을 설정한다.
3. 사용자 인증 정보에서 OAuth 클라이언트 ID를 만든다.
4. 애플리케이션을 웹 애플리케이션으로, 승인된 자바스크립트 원본은 `http://localhost:3000`으로, 승인된 리디렉션 URI는 `http://localhost:3000/auth/google/callback`으로 설정한다.
5. 클라이언트 ID와 클라이언트 보안 비밀을 .env 파일에 복사한다.
```sh
npm start # 혹은 yarn start
```
