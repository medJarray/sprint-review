export declare class CreateStyleDto {
    sprintId: string;
    fontFamily?: string;
    headingFontFamily?: string;
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
    backgroundColor?: string;
    textColor?: string;
    fontSize?: number;
    borderRadius?: number;
}
declare const UpdateStyleDto_base: import("@nestjs/common").Type<Partial<CreateStyleDto>>;
export declare class UpdateStyleDto extends UpdateStyleDto_base {
}
export {};
