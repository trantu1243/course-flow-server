import { NextFunction, Response } from "express";
import CryptoJS from 'crypto-js';
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import OrderModel from "../models/order.Model";
import { encryptData } from "../data/handledata";
import axios from "axios";

// create new order
export const newOrder = CatchAsyncError(async(data:any, res:Response) => {

  try {
      const dek: string = CryptoJS.lib.WordArray.random(32).toString(CryptoJS.enc.Hex);

      const encryptedData: string = encryptData(JSON.stringify(data), dek);

      const response = await axios.post('http://key_manager:8008/encrypt-dek', { dek });
      const encryptedDek: string = response.data.encryptedDek;

      const newRecord = await OrderModel.create({ encryptedDek, encryptedData });;

      await newRecord.save();

      res.status(201).json({
          succcess:true,
          order: {
              ...data,
              id: newRecord._id
          }
      })
  } catch (error) {
    console.log(error)
      res.status(500).json({ error: 'Failed to add data', details: (error as Error).message });
  }

    

});

// Get All Orders
export const getAllOrdersService = async (res: Response) => {
    const orders = await OrderModel.find().sort({ createdAt: -1 });
  
    res.status(201).json({
        success: true,
        orders,
    });
};
  