import express from "express";
import * as RoomController from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
//CREATE
router.post("/:hotelid", verifyAdmin, RoomController.createRoom);

//UPDATE
router.put("/availability/:id", RoomController.updateRoomAvailability);
router.put("/:id", verifyAdmin, RoomController.updateRoom);
//DELETE
router.delete("/:id/:hotelid", verifyAdmin, RoomController.deleteRoom);
//GET

router.get("/:id", RoomController.getRoom);
//GET ALL

router.get("/", RoomController.getRooms);

export default router;