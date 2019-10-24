require('dotenv').config();

const express = require('express');
const passport = require('passport');
const Strategy = require('passport-google-oauth20').Strategy;

const app = express();
app.set('views', __dirname);
app.set('view engine', 'ejs');

passport.use(new Strategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
}, (accessToken, refreshToken, profile, cb) => {
  // 구글 로그인이 성공했을 때 이 함수가 실행됩니다.
  const user = {
    name: profile.displayName,
    email: profile.emails[0].value,
    photo: profile.photos[0].value
  };
  cb(null, user)
}));

passport.serializeUser((user, cb) => {
  cb(null, user);
})

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
})

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(passport.initialize());

app.get('/', (_, res) => {
  res.render('index');
})

// 구글 로그인을 시도하기 위한 URL입니다. 보통 a태그나 버튼으로 (GET /auth/google 요청을 보냅니다.)
// 요청하는 범위를 지정할 수 있습니다.
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// 구글 로그인이 성공하면 strategy를 거쳐서 리디렉션되는 경로입니다.
// 추가로 나만의 JWT를 만드는 미들웨어를 추가할 수도 있습니다.
app.get('/auth/google/callback',
  passport.authenticate('google', {failureRedirect: '/'}),
  (req, res) => {
    res.render('profile', { user: req.user });
  }
);

app.listen(3000, () => {
  console.log("3000번 포트에서 서버 실행중");
  console.log("localhost:3000/auth/google 로 요청을 보내 로그인을 시도하세요.")
});