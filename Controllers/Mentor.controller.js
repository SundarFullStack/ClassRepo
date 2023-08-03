const MentorRouter = require("express").Router();
const MentorModel = require("../Models/Mentor.model");
const mongoose = require("mongoose");

//CREATING MENTOR USING POST METHOD

/**
 * MEHTHOD- POST
 * REQUEST - OBJECT<MENTOR>
 * RESPONSE - CREATEDOBJECT<MENTOR>
 * REQUEST URL - http://localhost:5000/mentor/create
 * SAMPLE BODY:
 * {
     "mentorName":"Jackie Chan" ,
  "subject":"FSD" ,
  "studentsList":[] ,
  "Batch":"B48CTV" 
}
 */

MentorRouter.post("/create", (request, response, next) => {
  let data = request.body;
  // console.log(data);
  const Mentors = new MentorModel(data);
  Mentors.save()
    .then((result) => {
      if (result && result._id) {
        return response.status(200).json({
          success: true,
          message: "MENTOR CREATED SUCCESSFULLY!!!",
          createdMentor: result,
        });
      }
    })
    .catch((error) => {
      if (error) {
        return response.status(401).json({
          success: false,
          message: "ERROR IN MENTOR CREATION!!!",
          Error: error,
        });
      }
    });
});

//FETCH ALL MENTORS
/**
 * METHOD - GET
 * REQUEST - {}
 * RESPONSE - OBJECT<MENTORS>
 * REQUEST URL - http://localhost:5000/mentor/
 */

MentorRouter.get("/", (request, response, next) => {
  MentorModel.find()
    .then((cursor) => {
      if (cursor && cursor.length > 0) {
        return response.status(200).json({
          success: true,
          message: "MENTORS FETCHED SUCCESSFULLY",
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

//ASSIGN STUDENTS TO MENTOR
/**
 * METHOD - PATCH
 * REQUEST - UPDATED OBJECT<MENTOR>
 * RESPONSE - UPDATED OBJECT<MENTOR> - FROM DB
 * REQUEST URL - http://localhost:5000/mentor/assign-student
 * SAMPLE BODY:
 *     {
        "_id": "64ca9f9e7553a8aceca4740f",
            "mentorName": "Rajan",
            "subject": "Business Analyst",
            "studentsList": [
                1,2
            ],
            "Batch": "B60VCT",
            "__v": 0
        }
 */

MentorRouter.patch("/assign-student", (request, response, next) => {
  let updateData = request.body;
  const id = request.body._id;
  // console.log(data);
  // console.log(id);
  MentorModel.findOneAndUpdate({ _id: id }, { $set: updateData }, { new: true })
    .then((result) => {
      // console.log(result);
      if (result && result._id) {
        return response.status(200).json({
          success: true,
          message: "MENTOR UPDATED SUCCESSFULLY",
          UpdatedData: result,
        });
      }
    })
    .catch((err) => {
      return response.status(401).json({
        success: false,
        message: "ERROR IN UPDATING MENTOR",
        error: err,
      });
    });
});

//FETCH ALL STUDENT DETAILS FOR A PARTICULAR MENTOR
/**
 * METHOD - GET
 * REQUEST - PARAMS<MENTORID>
 * RESPONSE - OBJECT<MENTOR WITH STUDENT DETAILS>
 * REQUEST URL - http://localhost:5000/mentor/64ca9f9e7553a8aceca4740f
 *
 * "*****FOR GET ALL MENTOR*******
 * REQUEST URL - http://localhost:5000/mentor/
 */

MentorRouter.get("/:mentorId", (request, response, next) => {
  const { mentorId } = request.params;
  // console.log(mentorId);
  MentorModel.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(mentorId) },
    },
    {
      $unwind: "$studentsList",
    },
    {
      $lookup: {
        from: "students",
        localField: "studentsList",
        foreignField: "studentId",
        as: "StudentDetails",
      },
    },
  ])
    .then((result) => {
      if (result) {
        return response.status(200).json({
          success: true,
          message: "DATA FETCHED SUCCESSFULLY!!!",
          Data: result,
        });
      }
    })
    .catch((err) => {
      if (error) {
        return response.status(401).json({
          success: false,
          message: "ERROR IN FETCHING DATA!!!",
          error: err,
        });
      }
    });
});
module.exports = MentorRouter;
