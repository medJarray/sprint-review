import { Document } from 'mongoose';
export declare class NextSprintCandidate {
    id: string;
    storyId: string;
    title: string;
    description: string;
    priority: string;
    points: number;
    type: string;
}
export declare const NextSprintCandidateSchema: import("mongoose").Schema<NextSprintCandidate, import("mongoose").Model<NextSprintCandidate, any, any, any, Document<unknown, any, NextSprintCandidate, any, {}> & NextSprintCandidate & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, NextSprintCandidate, Document<unknown, {}, import("mongoose").FlatRecord<NextSprintCandidate>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<NextSprintCandidate> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class Decision {
    id: string;
    title: string;
    description: string;
    icon: string;
}
export declare const DecisionSchema: import("mongoose").Schema<Decision, import("mongoose").Model<Decision, any, any, any, Document<unknown, any, Decision, any, {}> & Decision & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Decision, Document<unknown, {}, import("mongoose").FlatRecord<Decision>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Decision> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class Risk {
    id: string;
    text: string;
}
export declare const RiskSchema: import("mongoose").Schema<Risk, import("mongoose").Model<Risk, any, any, any, Document<unknown, any, Risk, any, {}> & Risk & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Risk, Document<unknown, {}, import("mongoose").FlatRecord<Risk>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Risk> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class KeyDate {
    id: string;
    date: string;
    title: string;
    color: string;
}
export declare const KeyDateSchema: import("mongoose").Schema<KeyDate, import("mongoose").Model<KeyDate, any, any, any, Document<unknown, any, KeyDate, any, {}> & KeyDate & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, KeyDate, Document<unknown, {}, import("mongoose").FlatRecord<KeyDate>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<KeyDate> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class NextStep extends Document {
    sprintId: string;
    nextSprintCandidates: NextSprintCandidate[];
    decisions: Decision[];
    risks: Risk[];
    keyDates: KeyDate[];
    nextSprintDate: string;
}
export declare const NextStepSchema: import("mongoose").Schema<NextStep, import("mongoose").Model<NextStep, any, any, any, Document<unknown, any, NextStep, any, {}> & NextStep & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, NextStep, Document<unknown, {}, import("mongoose").FlatRecord<NextStep>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<NextStep> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
