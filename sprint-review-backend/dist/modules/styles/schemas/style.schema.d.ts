import { Document } from 'mongoose';
export declare class Style extends Document {
    sprintId: string;
    fontFamily: string;
    headingFontFamily: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
    fontSize: number;
    borderRadius: number;
}
export declare const StyleSchema: import("mongoose").Schema<Style, import("mongoose").Model<Style, any, any, any, Document<unknown, any, Style, any, {}> & Style & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Style, Document<unknown, {}, import("mongoose").FlatRecord<Style>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Style> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
