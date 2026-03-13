import { Document } from 'mongoose';
export declare class DistributionItem {
    label: string;
    count: number;
    pct: number;
    color: string;
}
export declare const DistributionItemSchema: import("mongoose").Schema<DistributionItem, import("mongoose").Model<DistributionItem, any, any, any, Document<unknown, any, DistributionItem, any, {}> & DistributionItem & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DistributionItem, Document<unknown, {}, import("mongoose").FlatRecord<DistributionItem>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<DistributionItem> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class BacklogHealthData {
    totalItems: number;
    readyPercent: number;
    avgAge: string;
    distribution: DistributionItem[];
}
export declare const BacklogHealthDataSchema: import("mongoose").Schema<BacklogHealthData, import("mongoose").Model<BacklogHealthData, any, any, any, Document<unknown, any, BacklogHealthData, any, {}> & BacklogHealthData & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BacklogHealthData, Document<unknown, {}, import("mongoose").FlatRecord<BacklogHealthData>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<BacklogHealthData> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class EpicProgress {
    id: string;
    epicId: string;
    name: string;
    description: string;
    pct: number;
    done: number;
    total: number;
    targetSprint: number;
    bgColor: string;
    borderColor: string;
    badgeBg: string;
    badgeText: string;
    barColor: string;
    targetColor: string;
    pctColor: string;
}
export declare const EpicProgressSchema: import("mongoose").Schema<EpicProgress, import("mongoose").Model<EpicProgress, any, any, any, Document<unknown, any, EpicProgress, any, {}> & EpicProgress & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, EpicProgress, Document<unknown, {}, import("mongoose").FlatRecord<EpicProgress>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<EpicProgress> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class BacklogChange {
    added: number;
    removed: number;
    reprioritized: number;
    reasons: string[];
}
export declare const BacklogChangeSchema: import("mongoose").Schema<BacklogChange, import("mongoose").Model<BacklogChange, any, any, any, Document<unknown, any, BacklogChange, any, {}> & BacklogChange & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BacklogChange, Document<unknown, {}, import("mongoose").FlatRecord<BacklogChange>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<BacklogChange> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class MatrixItem {
    id: string;
    storyId: string;
    title: string;
    points: number;
}
export declare const MatrixItemSchema: import("mongoose").Schema<MatrixItem, import("mongoose").Model<MatrixItem, any, any, any, Document<unknown, any, MatrixItem, any, {}> & MatrixItem & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, MatrixItem, Document<unknown, {}, import("mongoose").FlatRecord<MatrixItem>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<MatrixItem> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class PrioritizationMatrix {
    quickWins: MatrixItem[];
    majorProjects: MatrixItem[];
    fillIns: MatrixItem[];
    timeSinks: MatrixItem[];
    insights: string[];
}
export declare const PrioritizationMatrixSchema: import("mongoose").Schema<PrioritizationMatrix, import("mongoose").Model<PrioritizationMatrix, any, any, any, Document<unknown, any, PrioritizationMatrix, any, {}> & PrioritizationMatrix & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PrioritizationMatrix, Document<unknown, {}, import("mongoose").FlatRecord<PrioritizationMatrix>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<PrioritizationMatrix> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class BacklogEvolution extends Document {
    sprintId: string;
    backlogHealth: BacklogHealthData;
    epicsProgress: EpicProgress[];
    backlogChanges: BacklogChange;
    prioritizationMatrix: PrioritizationMatrix;
}
export declare const BacklogEvolutionSchema: import("mongoose").Schema<BacklogEvolution, import("mongoose").Model<BacklogEvolution, any, any, any, Document<unknown, any, BacklogEvolution, any, {}> & BacklogEvolution & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BacklogEvolution, Document<unknown, {}, import("mongoose").FlatRecord<BacklogEvolution>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<BacklogEvolution> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
