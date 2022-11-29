//Import modules
const express = require('express');
const app = express();
const router = express.Router();

const controller = require("../controllers/todo");

//Main
router.get('/', controller.get);

//Write
router.post('/write', controller.write);

//Edit
router.get("/edit/:id", controller.edit);

//Update
router.post("/update/:id", controller.update);

//Remove
router.get("/remove/:id", controller.remove);

// module.exports > index.js에서 리팩토링 관리 가능
module.exports = router;