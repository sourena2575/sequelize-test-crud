const express = require("express");
const cors = require("cors");
const app = express();
const con = require("./connection/connection");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const profRouter = require("./routes/profile");
//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
//initial routes
app.use("/user/", userRouter);
app.use("/post/", postRouter);
app.use("/profile", profRouter);
// sync
let port = process.env.PORT || 4000;
con
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is on port ${port}`);
    });
  })
  .catch((er) => {
    console.log(er);
  });
