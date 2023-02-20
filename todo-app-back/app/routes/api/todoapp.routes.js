module.exports = app => {
    const students = require("../../controllers/Students.Controller.js");
  
    var router = require("express").Router();
  
    // Create a new student
    router.post("/", students.create);
  
    // Retrieve all students
    router.get("/", students.findAll);
  
    // Retrieve all published students
    // router.get("/published", students.findAllPublished);
  
    // Retrieve a single student with id
    router.get("/:id", students.findOne); 
  
    // Update a student with id
    router.put("/:id", students.update);
  
    // Delete a student with id
    router.delete("/:id", students.delete);
  
    // Delete all students
    router.delete("/", students.deleteAll);

    // Find by name  students
    router.get("/findbyname/:name", students.findByName);

    // Find By class  students
    router.get("/findbyclasse/:classe", students.findByClass);
  
    app.use('/api/students', router);
  };