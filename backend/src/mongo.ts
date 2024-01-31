import mongoose from "mongoose";
import { Person } from "./models";

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = encodeURIComponent(process.argv[2]);
const url = `mongodb+srv://pulga666:${password}@cluster-nodejs.rqvnt.mongodb.net/phonebookApp?retryWrites=true&w=majority`;
mongoose.set("strictQuery", false);
mongoose.connect(url);

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}

if (process.argv.length === 4) {
  console.log(
    "Please provide the name and number as arguments, node mongo.js <password> <name> <number>"
  );
  process.exit(1);
}

if (process.argv.length === 5) {
  const name = encodeURIComponent(process.argv[3]);
  const phoneNumber = encodeURIComponent(process.argv[4]);

  const person = new Person({
    name,
    number: phoneNumber,
  });

  person.save().then(() => {
    console.log(`added ${name} number ${phoneNumber} to phonebook`);
    mongoose.connection.close();
  });
}
