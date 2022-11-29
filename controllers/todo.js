// Model
let TodoTask = require('../models/todoTask');

// KST Setting
let moment = require('moment-timezone');    // 현재 시간
moment.tz.setDefault("Asia/Seoul");

// 메인 페이지
exports.get = function(req, res){
    console.log("------------!!Todo!!--------------");
    TodoTask.find({sort: {date:-1}}, (err, tasks) => {    //task 조회  - {} : filter, {sort:{date: -1}} date 내림차순 정렬
        tasks.forEach(task => {
            console.table([{id: task._id, content: task.content, date: task.date}]);
        })
        res.render("todo", {todoTasks: tasks});                     // todo 페이지에 [todoTasks] 이름으로 전달
    });
};

// 작성
exports.write = async function(req, res){
    try{
        const todoTask = new TodoTask({                     //새로운 TodoTask 만듬
            content: req.body.content,                      //입력한 부분
            date: moment().format("YYYY-MM-DD HH:mm:ss")    //현재 시간
        });
        await todoTask.save();                              // save()로 DB에 저장함
        console.log("==== Success!! Save New TodoTask====");
        console.table([{id: todoTask._id, content: todoTask.content, date: todoTask.date}]);    //console.table > 테이블 형식 데이터를 테이블로 표현..
        res.redirect("/todo");  // main으로 귀환
    }catch(err){
        console.err("=== Fail!! Save TodoTask ===");
        res.redirect("/todo");
    }
};

// 편집
exports.edit = function(req, res){
    const id = req.params.id;   // 파라미터로 받은 id 별도 저장
    TodoTask.find({sort: {date:-1}}, (err, tasks) => {    // db에서 조회
        res.render("todo-edit", {todoTasks: tasks, idTask: id});    // todo-edit.ejs에 id와 함께 보냄
    });
};

// 수정
exports.update = function(req, res){
    const id = req.params.id;
    TodoTask.findByIdAndUpdate(id, {content: req.body.content}, err => {    //해당 id값의 content 변경
        if(err){
            console.log('=== Fail!! Update TodoTask ===');
            console.error(err);
        }
        console.log('=== Success!! update TodoTask ===');
        console.log('id: '+id + '\changed content : ' + req.body.content);
        res.redirect('/todo');
    });
}

// 삭제
exports.remove = function(req, res){
    const id = req.params.id;
    TodoTask.findByIdAndDelete(id, err => {             // remove 보다 delete 더 많이 써?
        if(err){
            console.log('=== Fail! Remove TodoTask ===')
            console.error(err);
        }
        console.log('=== Success!! Remove TodoTask ===');
        console.log('id: ' + id);
        res.redirect('/todo');
    });
};

