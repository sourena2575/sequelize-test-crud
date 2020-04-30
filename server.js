const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 4000;
const app = express();
const con = require("./connection/connection");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
//initial routes
app.use("/user/", userRouter);
app.use("/post/", postRouter);
// sync
con
  .sync({})
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is on port ${port}`);
    });
  })
  .catch((er) => {
    console.log(er);
  });
