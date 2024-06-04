require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connection = require("./config/database");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const userRouter = require("./routes/userRouter");
const courseRouter = require("./routes/coursesRouter");
const instructorsRouter = require("./routes/instructorsRouter");
const blogRouter = require("./routes/blogRouter");
const commentRouter = require("./routes/commentRouter");
const app = express();
const port = process.env.PORT || 8001;
const hostname = process.env.HOST_NAME;

app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true }));
app.use(morgan("common"));

app.use("/api", userRouter);
app.use("/api", courseRouter);
app.use("/api", instructorsRouter);
app.use("/api", blogRouter);
app.use("/api", courseRouter);
app.use("/api", commentRouter);
connection();

app.listen(port, hostname, () => {
  console.log(`Example app listening on port  ${port}`);
});
