import express from "express"
import bodyParser from "body-parser"
import viewEngine from "./config/viewEngine"
import morgan from "morgan"
import helmet from "helmet"
import dotenv from "dotenv"
import connectDB from "./config/connectDB"
import web from "./route/web"



let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
// const userRouter = require("./routes/user.js")


dotenv.config()
let urlDb = process.env.MONGO_URL
connectDB.connectDb(urlDb);
web.initWebRountes(app);
viewEngine.configViewEngine(app);



app.listen(8080, () => { console.log("hello") });
