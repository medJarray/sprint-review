import { Document } from 'mongoose';
export declare class UserStoryDetail {
    id: string;
    storyId: string;
    title: string;
    points: number;
    asA: string;
    iWant: string;
    soThat: string;
    ac?: string;
}
export declare const UserStoryDetailSchema: import("mongoose").Schema<UserStoryDetail, import("mongoose").Model<UserStoryDetail, any, any, any, Document<unknown, any, UserStoryDetail, any, {}> & UserStoryDetail & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserStoryDetail, Document<unknown, {}, import("mongoose").FlatRecord<UserStoryDetail>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<UserStoryDetail> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class Enabler {
    id: string;
    epicId: string;
    name: string;
    bgColor: string;
    textColor: string;
    iconColor: string;
    stories: UserStoryDetail[];
}
export declare const EnablerSchema: import("mongoose").Schema<Enabler, import("mongoose").Model<Enabler, any, any, any, Document<unknown, any, Enabler, any, {}> & Enabler & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Enabler, Document<unknown, {}, import("mongoose").FlatRecord<Enabler>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Enabler> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class TechTask {
    id: string;
    taskId: string;
    title: string;
    points: number;
    type: string;
}
export declare const TechTaskSchema: import("mongoose").Schema<TechTask, import("mongoose").Model<TechTask, any, any, any, Document<unknown, any, TechTask, any, {}> & TechTask & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TechTask, Document<unknown, {}, import("mongoose").FlatRecord<TechTask>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<TechTask> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class Backlog extends Document {
    sprintId: string;
    enablers: Enabler[];
    techTasks: TechTask[];
}
export declare const BacklogSchema: import("mongoose").Schema<Backlog, import("mongoose").Model<Backlog, any, any, any, Document<unknown, any, Backlog, any, {}> & Backlog & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Backlog, Document<unknown, {}, import("mongoose").FlatRecord<Backlog>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Backlog> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
