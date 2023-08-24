import express from "express";
import { countByCity, countByType, createHotel, deleteHotel, getHotelById, getHotels, updateHotel } from "../controllers/hotel.js";
import {verifyAdmin} from "../utils/verifyToken.js"

const router = express.Router()

//CREATE
router.post('/', createHotel)

//UPDATE
router.put('/:id', verifyAdmin, updateHotel)

//DELETE
router.delete('/:id', verifyAdmin, deleteHotel)

//GET A HOTEL BY ID
router.get('/find/:id', getHotelById)

//GET ALL HOTELS
router.get('/', getHotels)
router.get('/countByCity', countByCity)
router.get('/countByType', countByType)


export default router