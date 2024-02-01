import mongoose, { Schema } from "mongoose";

export interface IPerson extends Document {
  name: string;
  number: string;
}

const personSchema = new Schema({
  name: String,
  number: String,
});

const Person = mongoose.model<IPerson>("Person", personSchema);

export default Person;
