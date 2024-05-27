import mongoose, { Document, Model, Schema } from "mongoose";

//we need this interface also in controller
export interface IOrder extends Document {
  courseId: string;
  userId?: string;
  payment_info: object;
  shippingAddress: IAddress; // Include shipping address
  billingAddress: IAddress; // Include billing address
}

interface IAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
}

const addressSchema = new Schema<IAddress>({
  street: {
      type: String,
      required: true
  },
  city: {
      type: String,
      required: true
  },
  state: {
      type: String,
      required: true
  },
  postalCode: {
      type: String,
      required: true
  }
});

const orderSchema = new Schema<IOrder>(
  {
    //calling the interface
    courseId: {
      type: String, //type string because we will send as string for frontend
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    payment_info: {
      type: Object,
    },
    shippingAddress: {
      type: addressSchema, 
      required: true
  },
  billingAddress: {
      type: addressSchema, 
      required: true
  }
  },
  { timestamps: true }
);

const OrderModel: Model<IOrder> = mongoose.model("Order", orderSchema);

export default OrderModel;
