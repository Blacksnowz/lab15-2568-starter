import { Router, type Request, type Response} from "express"
import express from "express";
import morgan from 'morgan';

import router from "./routes/studentRoutes.js";
import courseRouter from "./routes/courseRoutes.js";

const app: any = express();

//Middleware
app.use(express.json());
app.use(morgan('dev'));

app.get("/", (_req: Request, res: Response) => {
  return res.json({
    success: true,
    message: "lab 15 API service successfully",
  });
});

app.use("/api/v2", router);
app.use("/api/v2", courseRouter);
app.get("/", (req: Request, res: Response) => {
  return res.json(
    {
      "success": true,
      "message": "Student Information",
      "data": {
        "studentsId": "670610701",
        "firstName": "Tanapat",
        "LastName": "Hedegaard",
        "program": "CPE",
        "section": "001"


      }
    }
  )
});

app.listen(3000, () =>
  console.log("🚀 Server running on http://localhost:3000")
);


export default app;
