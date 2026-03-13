export declare class DemoStepDto {
    id: string;
    stepNumber: number;
    title: string;
    description?: string;
    note?: string;
    featureRef?: string;
    isActive?: boolean;
}
export declare class CreateDemoConfigDto {
    sprintId: string;
    environment?: string;
    testAccount?: string;
    version?: string;
    demoOwner?: string;
    demoOwnerInitials?: string;
    videoLink?: string;
    figmaLink?: string;
    steps?: DemoStepDto[];
}
declare const UpdateDemoConfigDto_base: import("@nestjs/common").Type<Partial<CreateDemoConfigDto>>;
export declare class UpdateDemoConfigDto extends UpdateDemoConfigDto_base {
}
export {};
