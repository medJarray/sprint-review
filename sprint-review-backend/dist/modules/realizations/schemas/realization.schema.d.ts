import { Document } from 'mongoose';
export declare class FeatureCard {
    id: string;
    storyId: string;
    title: string;
    description: string;
    status: string;
    impact?: string;
    prLink?: string;
    assignees: string[];
}
export declare const FeatureCardSchema: import("mongoose").Schema<FeatureCard, import("mongoose").Model<FeatureCard, any, any, any, Document<unknown, any, FeatureCard, any, {}> & FeatureCard & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, FeatureCard, Document<unknown, {}, import("mongoose").FlatRecord<FeatureCard>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<FeatureCard> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class SmallCard {
    id: string;
    type: string;
    title: string;
    description: string;
    status: string;
}
export declare const SmallCardSchema: import("mongoose").Schema<SmallCard, import("mongoose").Model<SmallCard, any, any, any, Document<unknown, any, SmallCard, any, {}> & SmallCard & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SmallCard, Document<unknown, {}, import("mongoose").FlatRecord<SmallCard>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<SmallCard> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class DeferredItem {
    id: string;
    storyId: string;
    title: string;
    reason: string;
}
export declare const DeferredItemSchema: import("mongoose").Schema<DeferredItem, import("mongoose").Model<DeferredItem, any, any, any, Document<unknown, any, DeferredItem, any, {}> & DeferredItem & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DeferredItem, Document<unknown, {}, import("mongoose").FlatRecord<DeferredItem>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<DeferredItem> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class ValueMetric {
    id: string;
    label: string;
    value: string;
    subText?: string;
    bgColor: string;
    borderColor: string;
    iconColor: string;
    icon: string;
}
export declare const ValueMetricSchema: import("mongoose").Schema<ValueMetric, import("mongoose").Model<ValueMetric, any, any, any, Document<unknown, any, ValueMetric, any, {}> & ValueMetric & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ValueMetric, Document<unknown, {}, import("mongoose").FlatRecord<ValueMetric>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<ValueMetric> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class Realization extends Document {
    sprintId: string;
    featureCards: FeatureCard[];
    smallCards: SmallCard[];
    deferredItems: DeferredItem[];
    teamNote: string;
    valueMetrics: ValueMetric[];
}
export declare const RealizationSchema: import("mongoose").Schema<Realization, import("mongoose").Model<Realization, any, any, any, Document<unknown, any, Realization, any, {}> & Realization & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Realization, Document<unknown, {}, import("mongoose").FlatRecord<Realization>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Realization> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
