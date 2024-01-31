"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var models_1 = require("./models");
if (process.argv.length < 3) {
    console.log("Please provide the password as an argument: node mongo.js <password>");
    process.exit(1);
}
var password = encodeURIComponent(process.argv[2]);
var url = "mongodb+srv://pulga666:".concat(password, "@cluster-nodejs.rqvnt.mongodb.net/phonebookApp?retryWrites=true&w=majority");
mongoose_1.default.set("strictQuery", false);
mongoose_1.default.connect(url);
if (process.argv.length === 3) {
    models_1.Person.find({}).then(function (result) {
        console.log("phonebook:");
        result.forEach(function (person) {
            console.log("".concat(person.name, " ").concat(person.number));
        });
        mongoose_1.default.connection.close();
    });
}
if (process.argv.length === 4) {
    console.log("Please provide the name and number as arguments, node mongo.js <password> <name> <number>");
    process.exit(1);
}
if (process.argv.length === 5) {
    var name_1 = encodeURIComponent(process.argv[3]);
    var phoneNumber_1 = encodeURIComponent(process.argv[4]);
    var person = new models_1.Person({
        name: name_1,
        number: phoneNumber_1,
    });
    person.save().then(function () {
        console.log("added ".concat(name_1, " number ").concat(phoneNumber_1, " to phonebook"));
        mongoose_1.default.connection.close();
    });
}
