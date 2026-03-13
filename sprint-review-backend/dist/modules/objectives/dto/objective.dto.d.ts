export declare class ObjectiveItemDto {
    id: string;
    title: string;
    description?: string;
    priority?: string;
    scope?: string;
    epicLink?: string;
    borderColor?: string;
}
export declare class TextItemDto {
    id: string;
    text: string;
}
export declare class CreateObjectiveDto {
    sprintId: string;
    objectives?: ObjectiveItemDto[];
    successCriteria?: TextItemDto[];
    constraints?: TextItemDto[];
    dodItems?: TextItemDto[];
}
declare const UpdateObjectiveDto_base: import("@nestjs/common").Type<Partial<CreateObjectiveDto>>;
export declare class UpdateObjectiveDto extends UpdateObjectiveDto_base {
}
export {};
