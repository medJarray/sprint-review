export declare class CreateSprintDto {
    sprintId: string;
    name: string;
    number: number;
    goal?: string;
    startDate?: string;
    endDate?: string;
}
declare const UpdateSprintDto_base: import("@nestjs/common").Type<Partial<CreateSprintDto>>;
export declare class UpdateSprintDto extends UpdateSprintDto_base {
}
export {};
