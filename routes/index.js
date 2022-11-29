// All Routers Exports

/*
새로운 routes 인덱스가 생길때마다
리팩토링해서 함께 관리함

ex)
const newRouter = require('./new');
router.use('/new', newRouter);
*/

const express = require("express");
const app = express();
const router = express.Router();

// Todo Router
const TodoRouter = require('./todo');

// Refactoring
router.use('/todo', TodoRouter);        //localhost:3100/todo 로 라우팅
                                        // todo > write로 가려면 http://localhost:3100/todo/write 경로로 타야함

module.exports = router;