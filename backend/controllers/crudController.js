const RecordModel = require("../models/crud_model");
var multer = require("multer");
var upload = multer().single("image");

//get all items data
exports.getAllItems = (req, res) => {
  RecordModel.getAll((err, crud) => {
    if (err) res.send(err);
    // console.log("CRUD",crud)
    res.send(crud);
  });
};

//Create new Crud
exports.createNewItem = (req, res) => {
  const crudReqData = new RecordModel({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    image: req.file.path.slice(22)
  });
  // console.log("crudReqData....", crudReqData);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ success: false, message: "please fill all fields" });
  } else {
    // console.log("Valid Data");
    RecordModel.createNew(crudReqData, (err, crud) => {
      if (err) res.send(err);
      res.json({ status: true, message: "Data Created", data: crud.insertId });
    });
  }
};

//update crud
exports.updateCrud = (req, res) => {
  // let image=typeof req.body.image
  // let image1=typeof req.file
  // console.log("typecheck",image1)
  if(typeof req.file=='undefined'){
  var crudReqData = new RecordModel({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image
  });
}else{
  var crudReqData = new RecordModel({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    image: req.file.originalname
  });
}

  // console.log("crudReqData update", crudReqData);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ success: false, message: "please fill all fields" });
  } else {
    // console.log("Valid Data");
    RecordModel.updateCrud(req.params.id, crudReqData, (err, crud) => {
      if (err) res.send(err);
      res.json({ status: true, message: "Data Updated" });
    });
  }
};

//delete crud
exports.deleteCrud = (req, res) => {
  RecordModel.deleteCrud(req.params.id, (err, crud) => {
    if (err) res.send(err);
    res.json({ success: true, message: "Record Deleted Successfully" });
  });
};

//search
exports.searchCrud = (req, res) => {
  var keyword;
  keyword = req.params.keyword;
  console.log("search", keyword);
  RecordModel.searchCrud(keyword, (err) => {
    if (err) {
      res.send(400).send({ Success: false, message: "Something Went Wrongs" });
    } else {
      res.json({ Success: true, message: "Data Fetched Successfully" });
    }
  });
};

//price high
exports.priceRange = (req, res) => {
  const {min,max}=req.query;
  console.log("slider", min,max);
  RecordModel.priceRange(min,max, (err, crud) => {
    if (err) {
      res.send(400).send({ Success: false, message: "Something went wrong" });
    } else {
      res.json({ Success: true, message: "Data Fetched", data: crud });
    }
  });
};

//single post
exports.editCrud = (req, res) => {
  var id;
  id = req.params.id;
  console.log("edit", id);
  RecordModel.editCrud(id, (err, crud) => {
    if (err) {
      res.send(400).send({ Success: false, message: "Something Went Wrongs" });
    } else {
      res.json({
        Success: true,
        message: "Data Fetched Successfully",
        data: crud,
      });
    }
  });
};
