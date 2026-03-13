export declare class NextSprintCandidateDto {
    id: string;
    storyId: string;
    title: string;
    description?: string;
    priority?: string;
    points?: number;
    type?: string;
}
export declare class DecisionDto {
    id: string;
    title: string;
    description?: string;
    icon?: string;
}
export declare class RiskDto {
    id: string;
    text: string;
}
export declare class KeyDateDto {
    id: string;
    date: string;
    title: string;
    color?: string;
}
export declare class CreateNextStepDto {
    sprintId: string;
    nextSprintCandidates?: NextSprintCandidateDto[];
    decisions?: DecisionDto[];
    risks?: RiskDto[];
    keyDates?: KeyDateDto[];
    nextSprintDate?: string;
}
declare const UpdateNextStepDto_base: import("@nestjs/common").Type<Partial<CreateNextStepDto>>;
export declare class UpdateNextStepDto extends UpdateNextStepDto_base {
}
export {};
