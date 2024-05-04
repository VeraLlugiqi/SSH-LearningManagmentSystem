import { NextFunction, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import OrderModel from "../models/orderModel";

//to create new order 
export const newOrder = CatchAsyncError(async(data:any, res:Response, ) => {
    const order = await OrderModel.create(data);
    // next(order);
    res.status(201).json({
        success:true,
        order,
    })
})