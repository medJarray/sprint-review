export declare class KpiCardDto {
    id: string;
    label: string;
    value: string;
    unit?: string;
    badgeText?: string;
    badgeType?: string;
    subText?: string;
    borderColor?: string;
}
export declare class VelocityEntryDto {
    label: string;
    value: number;
}
export declare class InsightItemDto {
    id: string;
    text: string;
}
export declare class QualityGateDto {
    unitTests?: number;
    sonarGrade?: string;
    e2eTests?: number;
}
export declare class SprintMetricsBaseDto {
    plannedPoints?: number;
    completedPoints?: number;
}
export declare class CreateMetricDto {
    sprintId: string;
    sprintMetrics?: SprintMetricsBaseDto;
    kpiCards?: KpiCardDto[];
    burndownIdeal?: number[];
    burndownReal?: number[];
    velocityHistory?: VelocityEntryDto[];
    insightsGood?: InsightItemDto[];
    insightsBad?: InsightItemDto[];
    qualityGate?: QualityGateDto;
}
declare const UpdateMetricDto_base: import("@nestjs/common").Type<Partial<CreateMetricDto>>;
export declare class UpdateMetricDto extends UpdateMetricDto_base {
}
export {};
