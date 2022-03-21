db = require("../config/database");

var Records = function (crud) {
  (this.title = crud.title),
    (this.description = crud.description),
    (this.price = crud.price),
    (this.image = crud.image),
    (this.created_date = new Date()),
    (this.updated_date = new Date());
};

//get all records
Records.getAll = (result) => {
  db.query("SELECT * FROM crud ", (err, res) => {
    if (err) {
      console.log("Error while fetching data", err);
      result(null, err);
    } else {
      console.log("Data fetched");
      result(null, res);
    }
  });
};

//get new crud
Records.createNew = (crudReqData, result) => {
  console.log("record data", crudReqData);
  // if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
  db.query("INSERT INTO crud SET ? ", crudReqData, (err, res) => {
    if (err) {
      console.log("Error While Inserting Data", err);
      result(null, err);
    } else {
      // file.mv('public/images/uploads' +  file.name)
      console.log("Data inserted Successfully");
      result(null, res);
    }
  });
};

//update crud
Records.updateCrud = (id, crudReqData, result) => {
  var updateDate = new Date();
  console.log("....83mdisvh", id, crudReqData);
  // var sql = `UPDATE crud SET title=?,description=?,price=?,image=?,updated_date=? WHERE id=?`;
  // var data= [crudReqData.title,crudReqData.description,crudReqData.price,crudReqData.image,updateDate,id]
  var sql = `UPDATE crud SET ? WHERE id=${id}`;
  var data = {
    title: crudReqData.title,
    description: crudReqData.description,
    price: crudReqData.price,
    image: crudReqData.image,
    updated_date: updateDate,
  };
  console.log("query......", sql, data);
  db.query(sql, data, (err, res) => {
    if (err) {
      console.log("Error while updating", err);
      result(null, err);
    } else {
      console.log("updated successfully");
      result(null, res);
    }
  });
};

//delete
Records.deleteCrud = (id, result) => {
  db.query("DELETE FROM crud WHERE id=?", [id], (err, res) => {
    if (err) {
      console.log("Error While Deleting");
      result(null, err);
    } else {
      console.log("Record Deleted Successfully");
      result(null, res);
    }
  });
};

//search
Records.searchCrud = (keyword, result) => {
  var sql = `SELECT * FROM crud WHERE title LIKE '%${keyword}%' OR description LIKE '%${keyword}%' ORDER BY price ASC`;
  console.log(sql, "model", keyword);
  db.query(sql, (err, res) => {
    if (err) {
      console.log("Error while fetching", err);
      result(null, err);
    } else {
      console.log("Data fetched in ....", res);
      result(null, res);
    }
  });
};

//price order
Records.priceRange = (keyprice, keyprice1, result) => {
  var sql = `SELECT * FROM crud WHERE price BETWEEN '${keyprice}' AND '${keyprice1}' `;
  console.log(sql, keyprice, keyprice1);
  db.query(sql, (err, res) => {
    if (err) {
      console.log("Error while fetching data", err);
      result(null, err);
    } else {
      console.log("Data fetched for price", res);
      result(null, res);
    }
  });
};

//for single post
Records.editCrud = (id, result) => {
  var sql = `SELECT * FROM crud WHERE id LIKE '${id}'`;
  console.log(sql, "model", id);
  db.query(sql, (err, res) => {
    if (err) {
      console.log("Error while fetching", err);
      result(null, err);
    } else {
      console.log("Data fetched for individual post ....", res);
      result(null, res);
    }
  });
};

module.exports = Records;
