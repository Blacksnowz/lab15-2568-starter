import { 
        Router,
  type Request,
  type Response,
} from "express";
import { students , courses1 } from "../db/db.js";
import {
  zStudentId,
  zStudentDeleteBody,
  zStudentPostBody,
  zStudentPutBody,
} from "../schemas/studentValidator.js";
import { success } from "zod";
const router = Router();

router.get("/students/:studentId/courses", (req: Request, res: Response )=> {

try {
    const studentId = req.params.studentIa;
    const studentresult = zStudentId.safeParse(studentId)
    // validate req.body with predefined validator
    if (!studentresult.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: studentresult.error.issues[0]?.message,
      });
    }

    //check duplicate studentId
    const foundIndex = students.findIndex(
      (student) => student.studentId === studentId
    );

    if (foundIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Student does not exist",
      });
    }

    return res.json({
      success: true,
      message: `Get courses detail of student ${studentId}`,
      data: {
        studentId,
        courses: (students.find(stud => stud.studentId === studentId)?.courses ?? [])
          .map((cid) => {
            const found = courses1.find(c => c.courseId === cid);
            if (!found) return null;
            const { instructors, ...rest } = found;
            return rest;
        })
        .filter(Boolean)
        }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something is wrong, please try again",
      error: err,
    });
  }

});

router.get("/", (req: Request, res: Response) => {
    res.send("test")
});

export default router;
