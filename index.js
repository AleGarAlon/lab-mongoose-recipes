const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
/*mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const newRecipe = {
      "title": "Arroz a la cubana",
      "level": "Easy Peasy",
      "ingredients": [
        "Rice",
        "totatoe",
        "babana",
        "sausage",
      ],
      "cuisine": "Spain?",
      "dishType": "main_course",
      "image":"none",
      "duration": 20,
      "creator": "Unknown"
    }
    console.log(newRecipe.title)
     return Recipe.create(newRecipe) 
  }).then(Recipe.insertMany(data))
  .then((element) => {

  console.log(`${data.length} recipes added`)
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true })
  })
  .then ((element) => {
    console.log(`${element.title} duration modified`)
    return Recipe.deleteOne({title : "Carrot Cake"})
  })
  
  .then((element) => {
    console.log(`One recipe deleted`)
    console.log("Connection closed")
    mongoose.connection.close()})
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });*/
  

const asyncRecipes = (async() => {
  try{
    await mongoose.connect(MONGODB_URI);
    console.log(`connected to database "${mongoose.connection.name}"`);

    await Recipe.deleteMany();

    const newRecipe = {
      "title": "Arroz a la cubana",
      "level": "Easy Peasy",
      "ingredients": [
        "Rice",
        "totatoe",
        "babana",
        "sausage",
      ],
      "cuisine": "Spain?",
      "dishType": "main_course",
      "image":"none",
      "duration": 20,
      "creator": "Unknown"
    };
    console.log(newRecipe.title)
    await Recipe.create(newRecipe);
    console.log (`"${newRecipe.title}" recipe created`);
    await Recipe.insertMany(data);
    console.log(`You have added ${data.length} new recipes`);
    await Recipe.findOneAndUpdate(
       {title : "Rigatoni alla Genovese"},
       {duration : 110},
       {new : true},
       );
    console.log(`You have modified de duration of the "Rigatoni alla Genovese" recipe`)
    await Recipe.deleteOne({title : "Carrot Cake"});
    console.log(`You have deleted de "Carrot Cake" recipe`);

  }catch {
    ((error) => console.log(error));
  } finally {
      console.log(`Disconected from ${mongoose.connection.name}`)
      mongoose.connection.close();
  }
});

asyncRecipes()









