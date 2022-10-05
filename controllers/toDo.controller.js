const Todo = require("../models/ToDo.model");

module.exports.toDoController = {
  // getTodo: (req, res) => {
  //     Todo.find({})
  //     .then((data) => {
  //         res.json(data);
  //     });
  // },

  getAllToDo: async (req, res) => {
    console.log(req.user);
    const todo = await Todo.find().populate('user');
    const todos = await todo

    return res.json(todos);
  },

  getToDo: async (req, res) => {
    try {
      const toDos = await Todo.find();
      res.json(toDos);
    } catch (error) {
      res.json(error.message);
    }
  },

  // postTodo: (req, res) => {
  //     Todo.create({
  //         text: req.body.text,
  //     }).then((data) => {
  //         res.json(data);
  //     })
  //     .catch((e) => {
  //         console.log(e);
  //     });
  // },

  // postTodo: async (req, res) => {
  //   try {
  //     const todo = await Todo.create({
  //       text: req.body.text,
  //     });
  //     res.json(todo);
  //   } catch (error) {
  //     res.json(error);
  //   }
  // },

  //
  createTodo: async (req, res) => {
    const { text, email } = req.body;

    try {
      const todo = await Todo.create({
        user: req.user && req.user.id,
        text: text,
        email: email,
      });
      const todos = await Todo.findById(todo._id).populate('user')
      return res.json(req.user ? todos : todo);
    } catch (e) {
      return res.status(401).json({ error: e.message + "wtf" });
    }
  },

  deleteTodo: async (req, res) => {
    const { id } = req.params;

    try {
      const todo = await Todo.findById(id);
      //!!!
      // console.log(todo.user.toString(), payload.id);

      if (todo.user.toString() === req.user.id) {
        await todo.remove();
        //ID не совпадают юзера и создателя тудушкиб поэтому невозможно удаление

        return res.json("удалено");
      }
      return res.status(401).json({ error: "Ошибка. У вас нет прав" });
    } catch (e) {
      return res.status(401).json({ error: "Ошибка" + e.message });
    }
  },

  patchTodo: async (req, res) => {
    try {
      const todo = await Todo.findByIdAndUpdate(
        req.params.id,
        {
          completed: req.body.completed,
        },
        { new: true }
      );
      res.json(todo);
    } catch (error) {
      res.json(error);
    }
  },

  patchTodoText: async (req, res) => {
    try {
      const todo = await Todo.findByIdAndUpdate(
        req.params.id,
        {
          text: req.body.text,
        },
        { new: true }
      );
      res.json(todo);
    } catch (error) {
      res.json(error);
    }
  },
};

