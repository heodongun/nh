const express = require('express');
require('dotenv').config();
const cors = require('cors'); // CORS 라이브러리 import
const app = express();
const PORT = process.env.PORT;

const api = require('./routes/api');

// CORS 설정: 모든 도메인 허용
app.use(cors()); // 이렇게 설정하면 모든 도메인에서 요청을 허용합니다. 

// 특정 도메인만 허용하려면 아래와 같이 설정
// app.use(cors({
//     origin: 'http://example.com', // 허용할 도메인 설정
// }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', api);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
