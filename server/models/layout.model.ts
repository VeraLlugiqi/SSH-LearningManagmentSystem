import {Schema,model,Document} from "mongoose";

export interface FaqItem extends Document{
    question: string;
    answer: string;
}

export interface Category extends Document{
    title:string;
}

export interface BannerImage extends Document{
    public_id:string;
    url: string;
}

export interface Review extends Document {
    name: string;
    message: string;
    position: string;
}

interface Layout extends Document{
    type: string;
    faq: FaqItem[];
    categories: Category[];
    banner:{
        image: BannerImage;
        title: string;
        subTitle: string;
    };
    reviews: Review[];
}

const faqSchema = new Schema<FaqItem> ({
    question: {type: String},
    answer: {type: String},
});

const categorySchema = new Schema<Category> ({
    title: {type:String},
});

const bannerImageSchema = new Schema<BannerImage> ({
    public_id: {type:String},
    url: {type:String},
});
const reviewSchema = new Schema<Review>({
    name: { type: String, required: true },
    message: { type: String, required: true },
    position: { type: String, required: true },
});


const layoutSchema = new Schema<Layout>({
   type:{type:String},
   faq: [faqSchema],
   categories: [categorySchema],
   banner:{
    image: bannerImageSchema,
    title: {type:String},
    subTitle: {type:String},
   },
   reviews: [reviewSchema],
});

const LayoutModel = model<Layout>('Layout',layoutSchema);

export default LayoutModel;