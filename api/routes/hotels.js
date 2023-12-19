import express from "express";
import * as HotelController  from "../controllers/hotel.js";



const router = express.Router();

//CREATE
router.post('/',HotelController.createHotel)
//UPDATE
router.put('/:id',HotelController.updateHotel)
//DELETE
router.delete('/:id',HotelController.deleteHotel)
//GET
router.get('/:id',HotelController.getHotel)
//GET ALL
router.get('/',HotelController.getHotels)


export default router