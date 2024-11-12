import { Theme } from "./theme.interface";

export interface Pot {
    id?:       number;
    name:     string;
    user_id:  number;
    target:   number;
    total:    number;
    theme:    Theme;
}