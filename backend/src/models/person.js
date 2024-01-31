"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var personSchema = new mongoose_1.default.Schema({
    name: String,
    number: String,
});
var Person = mongoose_1.default.model("Person", personSchema);
exports.default = Person;
