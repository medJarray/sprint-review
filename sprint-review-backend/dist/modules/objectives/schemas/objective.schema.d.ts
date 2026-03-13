import { Document } from 'mongoose';
export declare class ObjectiveItem {
    id: string;
    title: string;
    description: string;
    priority: string;
    scope: string;
    epicLink?: string;
    borderColor: string;
}
export declare const ObjectiveItemSchema: import("mongoose").Schema<ObjectiveItem, import("mongoose").Model<ObjectiveItem, any, any, any, Document<unknown, any, ObjectiveItem, any, {}> & ObjectiveItem & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ObjectiveItem, Document<unknown, {}, import("mongoose").FlatRecord<ObjectiveItem>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<ObjectiveItem> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class TextItem {
    id: string;
    text: string;
}
export declare const TextItemSchema: import("mongoose").Schema<TextItem, import("mongoose").Model<TextItem, any, any, any, Document<unknown, any, TextItem, any, {}> & TextItem & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TextItem, Document<unknown, {}, import("mongoose").FlatRecord<TextItem>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<TextItem> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class Objective extends Document {
    sprintId: string;
    objectives: ObjectiveItem[];
    successCriteria: TextItem[];
    constraints: TextItem[];
    dodItems: TextItem[];
}
export declare const ObjectiveSchema: import("mongoose").Schema<Objective, import("mongoose").Model<Objective, any, any, any, Document<unknown, any, Objective, any, {}> & Objective & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Objective, Document<unknown, {}, import("mongoose").FlatRecord<Objective>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Objective> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
