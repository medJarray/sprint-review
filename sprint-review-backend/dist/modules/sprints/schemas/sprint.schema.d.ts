import { Document } from 'mongoose';
export declare class Sprint extends Document {
    sprintId: string;
    name: string;
    number: number;
    goal: string;
    startDate: string;
    endDate: string;
}
export declare const SprintSchema: import("mongoose").Schema<Sprint, import("mongoose").Model<Sprint, any, any, any, Document<unknown, any, Sprint, any, {}> & Sprint & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Sprint, Document<unknown, {}, import("mongoose").FlatRecord<Sprint>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Sprint> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
