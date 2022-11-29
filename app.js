// Import Modules
const express = require("express"); // 웹 프레임워크, express 서버 사용
const bodyParser = require("body-parser");  // post body 데이터의 파라미터를 읽을 때 사용, 하지만 express에서 제공해주기때문에 이제 굳이 사용하지 않아도 됨
const mongoose = require('mongoose');       // MongoDB Node.js용 확장 모듈
const path = require('path');       // 파일,폴더,디렉토리 경로를 편리하게 설정 (node.js 기본 탑재되어있어 별도 설치 필요 없음)


const app = express();

app.set("views", path.join(__dirname, 'views'));    // 사용하는 엔진이 있는 디렉토리 설정
app.set("view engine", "ejs");  // 뷰 엔진 설정(템플릿 엔진) > ejs

app.use(express.static('./public'));  //정적 데이터들의 디렉토리 위치 설정
app.set("css1", path.join('./public/stylesheet'));

//app.use(bodyparser.urlencoded({extended: false}));
app.use(express.urlencoded({extended: false}));  //body의 인코딩을 utf-8로 받아 처리, 
                                                 //extended: true일 경우 url-encoded data와 querystring libarary 또는 qs 라이브러리 사이의 파싱 선택 가능(false = express 자체적으로 처리)
//app.use(bodyparser.json());
app.use(express.json());
 

// Router Setting
const router = require('./routes/index');
app.use(router);

// Connect to DB
mongoose.connect("mongodb+srv://sehyun:0720@cluster0.ken63ir.mongodb.net/?retryWrites=true&w=majority", function(err){
    if(err){
        console.error('DB connection error', err);
    }
    console.log("DB Connected!");

    //Server Open
    app.listen(3100, function(){
        console.log("Server listening on port 3100");
    });
});

module.exports = router;