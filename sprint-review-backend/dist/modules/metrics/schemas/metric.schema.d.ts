import { Document } from 'mongoose';
export declare class KpiCard {
    id: string;
    label: string;
    value: string;
    unit: string;
    badgeText: string;
    badgeType: string;
    subText: string;
    borderColor: string;
}
export declare const KpiCardSchema: import("mongoose").Schema<KpiCard, import("mongoose").Model<KpiCard, any, any, any, Document<unknown, any, KpiCard, any, {}> & KpiCard & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, KpiCard, Document<unknown, {}, import("mongoose").FlatRecord<KpiCard>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<KpiCard> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class VelocityEntry {
    label: string;
    value: number;
}
export declare const VelocityEntrySchema: import("mongoose").Schema<VelocityEntry, import("mongoose").Model<VelocityEntry, any, any, any, Document<unknown, any, VelocityEntry, any, {}> & VelocityEntry & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, VelocityEntry, Document<unknown, {}, import("mongoose").FlatRecord<VelocityEntry>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<VelocityEntry> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class InsightItem {
    id: string;
    text: string;
}
export declare const InsightItemSchema: import("mongoose").Schema<InsightItem, import("mongoose").Model<InsightItem, any, any, any, Document<unknown, any, InsightItem, any, {}> & InsightItem & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, InsightItem, Document<unknown, {}, import("mongoose").FlatRecord<InsightItem>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<InsightItem> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class QualityGate {
    unitTests: number;
    sonarGrade: string;
    e2eTests: number;
}
export declare const QualityGateSchema: import("mongoose").Schema<QualityGate, import("mongoose").Model<QualityGate, any, any, any, Document<unknown, any, QualityGate, any, {}> & QualityGate & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, QualityGate, Document<unknown, {}, import("mongoose").FlatRecord<QualityGate>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<QualityGate> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class SprintMetricsBase {
    plannedPoints: number;
    completedPoints: number;
}
export declare const SprintMetricsBaseSchema: import("mongoose").Schema<SprintMetricsBase, import("mongoose").Model<SprintMetricsBase, any, any, any, Document<unknown, any, SprintMetricsBase, any, {}> & SprintMetricsBase & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SprintMetricsBase, Document<unknown, {}, import("mongoose").FlatRecord<SprintMetricsBase>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<SprintMetricsBase> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class Metric extends Document {
    sprintId: string;
    sprintMetrics: SprintMetricsBase;
    kpiCards: KpiCard[];
    burndownIdeal: number[];
    burndownReal: number[];
    velocityHistory: VelocityEntry[];
    insightsGood: InsightItem[];
    insightsBad: InsightItem[];
    qualityGate: QualityGate;
}
export declare const MetricSchema: import("mongoose").Schema<Metric, import("mongoose").Model<Metric, any, any, any, Document<unknown, any, Metric, any, {}> & Metric & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Metric, Document<unknown, {}, import("mongoose").FlatRecord<Metric>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Metric> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
