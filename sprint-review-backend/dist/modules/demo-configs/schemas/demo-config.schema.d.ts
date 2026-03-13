import { Document } from 'mongoose';
export declare class DemoStep {
    id: string;
    stepNumber: number;
    title: string;
    description: string;
    note?: string;
    featureRef?: string;
    isActive: boolean;
}
export declare const DemoStepSchema: import("mongoose").Schema<DemoStep, import("mongoose").Model<DemoStep, any, any, any, Document<unknown, any, DemoStep, any, {}> & DemoStep & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DemoStep, Document<unknown, {}, import("mongoose").FlatRecord<DemoStep>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<DemoStep> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class DemoConfig extends Document {
    sprintId: string;
    environment: string;
    testAccount: string;
    version: string;
    demoOwner: string;
    demoOwnerInitials: string;
    videoLink?: string;
    figmaLink?: string;
    steps: DemoStep[];
}
export declare const DemoConfigSchema: import("mongoose").Schema<DemoConfig, import("mongoose").Model<DemoConfig, any, any, any, Document<unknown, any, DemoConfig, any, {}> & DemoConfig & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DemoConfig, Document<unknown, {}, import("mongoose").FlatRecord<DemoConfig>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<DemoConfig> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
