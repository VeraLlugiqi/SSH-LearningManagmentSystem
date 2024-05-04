import mongoose, {Document, Model, Schema} from "mongoose";

//we need this interface also in controller
export interface IOrder extends Document{
    courseId: string;
    userId: string;
    payment_info: object;
}

const orderSchema = new Schema<IOrder>({ //calling the interface
    courseId: {
        type: String ,//type string because we will send as string for frontend 
        required:true
    },
    userId: {
        type:String,
        required:true
    },
    payment_info:{
        type:Object,

    },
},{timestamps: true});

const OrderModel: Model<IOrder> = mongoose.model('Order',orderSchema);

export default OrderModel;