const { Router } = require("express");
const { toDoController } = require("../controllers/toDo.controller");
cons = require("../models/middlewares/auth.middleware");

const router = Router();

// router.get("/toDo", toDoController.getToDo);
// router.post("/toDo", toDoController.postTodo);
router.patch("/toDo/:id", toDoController.patchTodo);
router.patch("/toDoText/:id", toDoController.patchTodoText);
router.get("/toDo", toDoController.getAllToDo);
router.delete("/toDo/:id", toDoController.deleteTodo);
router.post("/toDo", toDoController.createTodo);

module.exports = router;
