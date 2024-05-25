import mongoose, {Document, Model, Schema} from "mongoose";

export interface ICategory {
    name: string;
    description: string;
} 

export interface INotification extends Document{
    title:string;
    message:string;
    status:string;
    userId:string;//who is creating the notification
    category: ICategory;
}
const categorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
}, { _id: false });

const notificationSchema = new Schema<INotification>({
    title:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
        default:"unread"
    },
    userId: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    }
},{timestamps: true});

const NotificationModel: Model<INotification> = mongoose.model('Notification',notificationSchema);
export default NotificationModel;