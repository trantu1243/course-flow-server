import mongoose, {Document,Model,Schema} from "mongoose";


export interface IOrder extends Document{
    courseId: string;
    userId?:string;
    payment_info: object;
}

interface IOrderEncrypt extends Document{
    encryptedDek: string;
    encryptedData: string;
}

const orderSchema = new Schema<IOrderEncrypt>({
    encryptedDek: {
        type: String,
        required: true
    },
    encryptedData:{
        type: String,
        required: true
    },
},{timestamps: true});

const OrderModel: Model<IOrderEncrypt> = mongoose.model('Order',orderSchema);

export default OrderModel;