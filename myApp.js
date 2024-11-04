require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  favoriteFoods: {
    type: [String],
  },
});

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let chelsie = Person({
    name: "Chelsie",
    age: 25,
    favoriteFoods: ["Fried Chicken", "Mash Potato"],
  });
  chelsie.save((error, data) => {
    if (error) {
      console.log(error);
    } else {
      done(null, data);
    }
  });
};

let arrayOfPeople = [
  {
    name: "Chelsie",
    age: 25,
    favoriteFoods: ["Fried Chicken", "Mash Potato"],
  },
  {
    name: "Jessica",
    age: 26,
    favoriteFoods: ["Bratwurst", "Frankfurt"],
  },
  {
    name: "Charlie",
    age: 23,
    favoriteFoods: ["Sweet and SOur Chicken", "Hot and Sour Soup"],
  },
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      done(null, data);
    }
  });
};

// let personName = {name: "Charlie"};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      done(null, data);
    }
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: { $all: [food] } }, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      done(null, data);
    }
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      done(null, data);
    }
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findOne({ _id: personId }, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      data.favoriteFoods.push(foodToAdd);
      data.save((err, update) => {
        if (err) {
          console.log(err);
        } else {
          console.log(update);
          done(null, update);
        }
      });
    }
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (error, data) => {
      if (error) {
        console.log(error);
      } else {
        done(null, data);
      }
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({ _id: personId }, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      done(null, data);
    }
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      done(null, data);
    }
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: { $all: [foodToSearch] } })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .exec((error, data) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        done(null, data);
      }
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
