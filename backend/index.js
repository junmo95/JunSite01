const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

// 바디 내용 받기위한 미들웨어
app.use(express.json());

// refresh 저장용 배열 (DB대용 - refresh 토큰은 보통 서버쪽 DB에 저장)
let refreshTokens = [];

const port = 5000;
const secretText = 'superSecret';
const refreshSecretText = 'superSecret2';

app.post('/login', (req, res) => {
    const username = req.body.username;

    // jwt에 쓸 payload 객체 생성(사용자 정보)
    const user = { name: username };
    // access 토큰 생성 (유효기간 포함)
    const accessToken = jwt.sign(user, secretText, {expiresIn: '30s'});
    // refresh 토큰 생성 (유효기간 포함)
    const refreshToken = jwt.sign(user, refreshSecretText, {expiresIn: '1d' })
    // 임시 DB에 refresh토큰 저장
    refreshTokens.push(refreshToken);

    // refreshToken 쿠키에 넣기 (이름, 값, 옵션)
    // httpOnly가 xxs cross 공격 방어
    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24*60*60*1000 })

    res.json({accessToken: accessToken});
})

const post = [
    {
        username: 'John',
        title: 'Post 1'
    },
    {
        username: 'Han',
        title: 'Post 2'
    }
]

app.get('/posts', authMiddleware, (req, res) => {
    res.json(post);
})

function authMiddleware(req, res, next) {
    // 토큰을 request headers에서 가져오기
    const authHeader = req.headers['authorization'];

    // 토큰 내용이 'bearer asdhlq232lsad.jlas...' 이런식으로 넘어오기에 토큰내용만 가져오기
    const token = authHeader && authHeader.split(' ')[1];
    
    // 토큰 유무 확인
    if (token == null) return res.sendStatus(401);

    // 유효한 토큰인지 확인 (토큰, 비밀키, (에러, 페이로드반환))
    jwt.verify(token, secretText, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

app.listen(port, () => {
    console.log('listing on port : ' + port);
})

