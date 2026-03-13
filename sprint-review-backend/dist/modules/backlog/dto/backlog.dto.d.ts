export declare class UserStoryDetailDto {
    id: string;
    storyId: string;
    title: string;
    points?: number;
    asA?: string;
    iWant?: string;
    soThat?: string;
    ac?: string;
}
export declare class EnablerDto {
    id: string;
    epicId: string;
    name: string;
    bgColor?: string;
    textColor?: string;
    iconColor?: string;
    stories?: UserStoryDetailDto[];
}
export declare class TechTaskDto {
    id: string;
    taskId: string;
    title: string;
    points?: number;
    type?: string;
}
export declare class CreateBacklogDto {
    sprintId: string;
    enablers?: EnablerDto[];
    techTasks?: TechTaskDto[];
}
declare const UpdateBacklogDto_base: import("@nestjs/common").Type<Partial<CreateBacklogDto>>;
export declare class UpdateBacklogDto extends UpdateBacklogDto_base {
}
export {};
