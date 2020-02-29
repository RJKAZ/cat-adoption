const connection = require('../config/connection');

// GET ALL CATS

const getCATS = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM cats', (err, catdata) => {
      if (err) {
        console.log(err);
        //THIS WILL GO TO THE PROMISE'S .catch()
        return reject(err);
      }
      //THIS WILL GO TO THE PROMISE'S .then()
      resolve(catdata);
    });
  });
};

// create a cat
/* accepts object parameter +> {cat_name: "Mr. Mustaphales" }*/
const createCat = (catObj) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO cats SET ?', catObj,(err, catdata) => {
      if (err) {
        console.log(err);
        //THIS WILL GO TO THE PROMISE'S .catch()
        return reject(err);
      }
      //THIS WILL GO TO THE PROMISE'S .then()
      resolve(catdata);
    });
  });
};

// UPDATE A CATS ADOPTION STATUS
//catObj +> {adopted: true} or {adopted: false}
const updateCat = (catObj, catId) => {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE cats SET? WHERE id = ?', [catObj, catId], (err, catdata) => {
      if (err) {
        console.log(err);
        //THIS WILL GO TO THE PROMISE'S .catch()
        return resolve({ message: "Couldn't find a cat with that id"});
      }
      //THIS WILL GO TO THE PROMISE'S .then()
      resolve({ message: 'Cat updated succesfully'});
  });
});
};

//DELETE A CAT
const deleteCat = (catID) => {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM cats WHERE id =?', [catID], (err, catdata) => {
      if (err) {
        console.log(err);
        //THIS WILL GO TO THE PROMISE'S .catch()
        return reject(err);
      } else if (catdata.affectedRows === 0) {
        return resolve({ message: "couldn't find a cat with that id"});
      }
      //THIS WILL GO TO THE PROMISE'S .then()
      resolve({ message: 'CAT Deleted susscesfully!'});
  });
});
};

module.exports = { getCATS, createCat, updateCat, deleteCat };
