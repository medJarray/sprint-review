export declare class TeamMemberDto {
    id: string;
    name: string;
    role: string;
    avatar?: string;
    initials?: string;
    color?: string;
}
export declare class CreateTeamDto {
    sprintId: string;
    teamId: string;
    name: string;
    members?: TeamMemberDto[];
}
declare const UpdateTeamDto_base: import("@nestjs/common").Type<Partial<CreateTeamDto>>;
export declare class UpdateTeamDto extends UpdateTeamDto_base {
}
export {};
