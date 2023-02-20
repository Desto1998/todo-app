var mongoose = require('mongoose');
var Schema = mongoose.Schema;

    var StudentShema = new Schema(
        {
            firstname: {
                type: String,
                required: true,
            },
            lastname: {
                type: String,
                required: false
            },
            email: {
                type: String,
                required: true
            },
            phone: {
                type: String,
                required: true
            },
            adresse: {
                type: String,
                required: false
            },
            town: {
                type: String,
                required: false
            },
            age: {
                type: Number,
                required: true
            },
            datebirth: {
                type: Date,
                required: true
            },
            sexe: {
                type: String,
                required: true
            },
            classe: {
                type: String,
                required: true
            }
            //   description: String,
            //   published: Boolean

        },
        { timestamps: true }

    );
    StudentShema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    module.exports = Student = mongoose.model("Student", StudentShema);
    