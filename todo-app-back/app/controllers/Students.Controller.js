const db = require("../models");
const Student = db.Student

// Create and Save a new Student
exports.create = (req, res) => {
    // Validate request
    console.log(req.body)
//    if(!req.body.firstname){
//     res.status(400).send({
//         message: "Le nom est requis."
//     })
//    }
    // Create a Student
    const student = new Student({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        adresse: req.body.adresse,
        town: req.body.town,
        age: req.body.age,
        datebirth: req.body.datebirth,
        sexe: req.body.sexe,
        classe: req.body.classe,

    });
    // Save Students in the database
    student
        .save(student)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Student."
            });
        });
};

// Retrieve all Students from the database.
exports.findAll = (req, res) => {
    const firstname = req.query.firstname;
    var condition = firstname ? { firstname: { $regex: new RegExp(firstname), $options: "i" } } : {};

    Student.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving students."
            });
        });
};

// Find a single Student with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Student.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Student with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Student with id=" + id });
        });
};

// Update a Student by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Student.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Students with id=${id}. Maybe Students was not found!`
                });
            } else res.send({ message: "Students was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Students with id=" + id
            });
        });
};

// Delete a Student with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Student.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Student with id=${id}. Maybe Students was not found!`
                });
            } else {
                res.send({
                    message: "Student was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Students with id=" + id
            });
        });
};

// Delete all Studentss from the database.
exports.deleteAll = (req, res) => {
    Student.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Students were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Students."
            });
        });
};

// Find  by name Studentss
exports.findByName = (req, res) => {
    const firstname = req.params.name;
    console.log(firstname)
    Student.find({ firstname: firstname })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };

  // Find  by class Studentss
exports.findByClass = (req, res) => {
    const classe = req.params.classe;
    console.log(classe)
    Student.find({ classe: classe })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };