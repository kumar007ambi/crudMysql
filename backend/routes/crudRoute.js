const express = require("express");
const router = express.Router();
const multer = require('multer');
const path =require("path");

const allItmesController = require("../controllers/crudController");

//get all items
router.get("/api", allItmesController.getAllItems);


const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,'public/images/uploads')},
      filename:(req,file,cb)=>{
        cb(null,file.originalname);
      }
  })
  
  const upload=multer({
    storage:storage
  })
//get new post crud
router.post("/api/new",upload.single("image"),allItmesController.createNewItem);
//update
router.put("/api/update/:id",upload.single("image"),allItmesController.updateCrud);
//delete
router.delete("/api/delete/:id", allItmesController.deleteCrud);
//search
router.get("/api/search/:keyword", allItmesController.searchCrud);
//pricehigh
router.get("/api/slider", allItmesController.priceRange);
//single post
router.get("/api/edit/:id",allItmesController.editCrud);



module.exports = router;
