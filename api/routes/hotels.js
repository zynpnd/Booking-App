import express from "express";
import * as HotelController  from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";



const router = express.Router();

//CREATE
router.post('/',verifyAdmin,HotelController.createHotel)
//UPDATE
router.put('/:id',verifyAdmin,HotelController.updateHotel)
//DELETE
router.delete('/:id',verifyAdmin,HotelController.deleteHotel)
//GET
router.get('/:id',HotelController.getHotel)
//GET ALL
router.get('/',HotelController.getHotels)


export default router