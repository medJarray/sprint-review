export declare class CreatePageDto {
    sprintId: string;
    pageId: string;
    title: string;
    slug?: string;
    order?: number;
    visible?: boolean;
}
declare const UpdatePageDto_base: import("@nestjs/common").Type<Partial<CreatePageDto>>;
export declare class UpdatePageDto extends UpdatePageDto_base {
}
export {};
