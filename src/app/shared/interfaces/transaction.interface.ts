import { Category } from "./category.interface";

export interface Transaction {
    id:                     string;
    avatar:                 string;
    recipient_sender_name:  string;
    user_id:                number;
    category:               Category;
    creation_date:          Date;
    amount:                 number;
    recurring:              boolean;
}