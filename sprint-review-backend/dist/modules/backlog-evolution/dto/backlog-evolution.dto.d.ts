export declare class DistributionItemDto {
    label: string;
    count?: number;
    pct?: number;
    color?: string;
}
export declare class BacklogHealthDataDto {
    totalItems?: number;
    readyPercent?: number;
    avgAge?: string;
    distribution?: DistributionItemDto[];
}
export declare class EpicProgressDto {
    id: string;
    epicId: string;
    name: string;
    description?: string;
    pct?: number;
    done?: number;
    total?: number;
    targetSprint?: number;
    bgColor?: string;
    borderColor?: string;
    badgeBg?: string;
    badgeText?: string;
    barColor?: string;
    targetColor?: string;
    pctColor?: string;
}
export declare class BacklogChangeDto {
    added?: number;
    removed?: number;
    reprioritized?: number;
    reasons?: string[];
}
export declare class MatrixItemDto {
    id: string;
    storyId: string;
    title: string;
    points?: number;
}
export declare class PrioritizationMatrixDto {
    quickWins?: MatrixItemDto[];
    majorProjects?: MatrixItemDto[];
    fillIns?: MatrixItemDto[];
    timeSinks?: MatrixItemDto[];
    insights?: string[];
}
export declare class CreateBacklogEvolutionDto {
    sprintId: string;
    backlogHealth?: BacklogHealthDataDto;
    epicsProgress?: EpicProgressDto[];
    backlogChanges?: BacklogChangeDto;
    prioritizationMatrix?: PrioritizationMatrixDto;
}
declare const UpdateBacklogEvolutionDto_base: import("@nestjs/common").Type<Partial<CreateBacklogEvolutionDto>>;
export declare class UpdateBacklogEvolutionDto extends UpdateBacklogEvolutionDto_base {
}
export {};
