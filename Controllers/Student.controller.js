const StudentRouter = require("express").Router();
const StudentModel = require("../Models/Student.model");
const mongoose = require("mongoose");

//CREATE STUDENTS
/**
 * METHOD - POST
 * REQUEST - OBJECT<STUDENT>
 * RESPONSE - CREATEDOBJECT<STUDENT>
 * URL -  http://localhost:5000/student/create
 * BODY:
 * {  "studentName":"Sir" ,
  "subject": "Data Science",
  "mentorName":"Doremon" ,
  "Batch":"B50HTV" ,
  "mentorId": "64ca9a9132e845f09d4ff81d"
  }
 */

StudentRouter.post("/create", (request, response, next) => {
  let data = request.body;
  // console.log(data);
  const Students = new StudentModel(data);
  Students.save()
    .then((result) => {
      if (result && result._id) {
        return response.status(200).json({
          success: true,
          message: "STUDENT CREATED SUCCESSFULLY!!!",
          createdStudent: result,
        });
      }
    })
    .catch((error) => {
      if (error) {
        return response.status(401).json({
          success: false,
          message: "ERROR IN STUDENT CREATION!!!",
          Error: error,
        });
      }
    });
});

//FETCH STUDENTS WITHOUT MENTORS
/**
 * METHOD - GET
 * REQUEST - {}
 * RESPONSE - OBJECT<STUDENTS> - WITHOUT MENTORS
 * REQUEST URL - http://localhost:5000/student/wo-mentor
 */

StudentRouter.get("/wo-mentor", (request, response, next) => {
  StudentModel.find({
    mentorId: "",
  })
    .then((result) => {
      if (result) {
        return response.status(200).json({
          success: true,
          message: "STUDENTS FETCHED SUCCESSFULLY",
          Data: result,
        });
      }
    })
    .catch((error) => {
      if (error) {
        return response.status(401).json({
          success: false,
          message: "ERROR IN FETCHING DATA",
          Error: error,
        });
      }
    });
});

//ASSIGN MENTOR TO STUDENT
/**
 * METHOD - PATCH
 * REQUEST - UPDATED OBJECT<STUDENT>
 * RESPONSE - UPDATED OBJECT<STUDENT> - FROM DB
 * REQUEST URL - http://localhost:5000/student/assign-mentor
 * SAMPLE BODY DATA:
 * {
   "_id": "64ca9dc4713aa6eb8dc8ff0c",
            "studentName": "Gyan",
            "subject": "Data Science",
            "mentorName": "Doremon",
            "Batch": "B50HTV",
            "mentorId": "64ca9fc97553a8aceca47411",
            "__v": 0,
            "previousMentorName": ""
            
            }
 */

StudentRouter.patch("/assign-mentor", (request, response, next) => {
  let updateData = request.body;
  const id = request.body._id;
  // console.log(data);
  // console.log(id);
  StudentModel.findOneAndUpdate(
    { _id: id },
    { $set: updateData },
    { new: true }
  )
    .then((result) => {
      // console.log(result);
      if (result && result._id) {
        return response.status(200).json({
          success: true,
          message: "STUDENT UPDATED SUCCESSFULLY",
          UpdatedData: result,
        });
      }
    })
    .catch((err) => {
      return response.status(401).json({
        success: false,
        message: "ERROR IN UPDATING STUDENT",
        error: err,
      });
    });
});

//FETCH PREVIUOUSLY ASSIGNED MENTOR DETAILS WITH GET METHOD WITH STUDENT ID AS PARAMS
/**
 * METHOD - GET
 * REQUEST - STUDENT OBJECTID AS PARAMS
 * RESPONSE - OBJECT<STUDENT WITH PREVIOUS MENTOR>
 * REQUEST URL - http://localhost:5000/student/64ca9c9b713aa6eb8dc8fef2
 * 
 ***FOR GET ALL STUDENTS***
 * REQUEST URL - http://localhost:5000/student/
 */

StudentRouter.get("/:studentId", (request, response, next) => {
  const { studentId } = request.params;

  StudentModel.find(
    {
      _id: new mongoose.Types.ObjectId(studentId),
    },
    { studentName: 1, subject: 1, previousMentorName: 1, _id: 0 }
  )
    .then((result) => {
      if (result) {
        return response.status(200).json({
          success: true,
          message: "STUDENT FETCHED SUCCESSFULLY",
          Data: result,
        });
      }
    })
    .catch((error) => {
      if (error) {
        return response.status(401).json({
          success: false,
          message: "ERROR IN FETCHING DATA",
          Error: error,
        });
      }
    });
});


//FETCH ALL STUDENTS
/**
 * METHOD - GET
 * REQUEST - {}
 * RESPONSE - OBJECT<STUDENTS>
 * REQUEST URL - http://localhost:5000/student/
 */

StudentRouter.get("/", (request, response, next) => {
  StudentModel.find()
    .then((cursor) => {
      if (cursor && cursor.length > 0) {
        return response.status(200).json({
          success: true,
          message: "STUDENTS FETCHED SUCCESSFULLY",
          data: cursor,
        });
      }
    })
    .catch((err) => {
      return response.status(401).json({
        success: false,
        message: "ERROR IN FETCHING DATA",
        data: err,
      });
    });
});

module.exports = StudentRouter;
