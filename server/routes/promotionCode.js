// const router = require("express").Router();
// const PromotionCode = require("../models/promotionCode");

// router.get("/promotion-code" , async (req , res) =>{
//     try {
//         const page = parseInt(req.query.page) - 1 || 0;
//         const limit = parseInt(req.query.limit) || 5;
//         const search = req.query.search || ""; 

//         const promotionCode = await PromotionCode.find({promotionCode:{$regex:search, $options:"i"}}).skip(page * limit);
//         const total =  await  PromotionCode.countDocuments({promotionCode:{$regex:search, $options:"i"}})

//         const response = {
//             error:false,
//             total,
//             page:page+1,
//             limit,
//             promotionCode
//         }

//         res.status(200).json(response);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({error:true , message:"Internal Server Error"})
//     }
// })



// router.get("/promotion-code/:id" , async (req , res) =>{
//     try {
//         const promotionCode = await PromotionCode.findById(req.params.id)
//         res.status(200).json(promotionCode);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({error:true , message:"Promotion code not found"})
//     }
// })


// router.post("/promotion-code" , async (req , res) =>{
//     try {
//         const promotionCode = await PromotionCode.create(req.body)
//         res.status(200).json(promotionCode);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({error:true , message:"Promotion code not created"})
//     }
// })

// router.put("/promotion-code/:id" , async (req , res) =>{
//     try {
//         const promotionCode = await PromotionCode.findByIdAndUpdate(req.params.id, {$set:req.body})
//         res.status(200).json({message:"Promotion code succesfully updated"});
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({error:true , message:"Promotion code not updated"})
//     }
// })

// router.delete("/promotion-code/:id" , async (req , res) =>{
//     try {
//         const promotionCode = await PromotionCode.findByIdAndRemove(req.params.id)
//         res.status(200).json({ message:"Promotion code succesfully deleted"});
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({error:true , message:"Promotion code not created"})
//     }
// })



// module.exports = router;


const express = require('express');

const promotionCodeController = require('../controllers/promotionCode');

const router = express.Router();

router.get('/', promotionCodeController.getAllPromotionCode);
router.get('/:id', promotionCodeController.getByIdCode);
router.post('/', promotionCodeController.addPromotionCode);
router.put('/:id', promotionCodeController.updatePromotionCode);
router.delete('/:id', promotionCodeController.deletePromotionCode);


module.exports = router;

