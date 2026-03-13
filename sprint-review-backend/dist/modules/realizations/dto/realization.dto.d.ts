export declare class FeatureCardDto {
    id: string;
    storyId: string;
    title: string;
    description?: string;
    status?: string;
    impact?: string;
    prLink?: string;
    assignees?: string[];
}
export declare class SmallCardDto {
    id: string;
    type?: string;
    title: string;
    description?: string;
    status?: string;
}
export declare class DeferredItemDto {
    id: string;
    storyId: string;
    title: string;
    reason?: string;
}
export declare class ValueMetricDto {
    id: string;
    label: string;
    value: string;
    subText?: string;
    bgColor?: string;
    borderColor?: string;
    iconColor?: string;
    icon?: string;
}
export declare class CreateRealizationDto {
    sprintId: string;
    featureCards?: FeatureCardDto[];
    smallCards?: SmallCardDto[];
    deferredItems?: DeferredItemDto[];
    teamNote?: string;
    valueMetrics?: ValueMetricDto[];
}
declare const UpdateRealizationDto_base: import("@nestjs/common").Type<Partial<CreateRealizationDto>>;
export declare class UpdateRealizationDto extends UpdateRealizationDto_base {
}
export {};
