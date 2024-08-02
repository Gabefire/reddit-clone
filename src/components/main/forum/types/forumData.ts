import type { user } from "../../../auth/types/user";

export type forumDataType = {
	color: string;
	description: string;
	icon?: string | undefined;
	title: string;
	following: boolean;
	owner: user;
};