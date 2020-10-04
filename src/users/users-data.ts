export interface IC {
	title: string;
}

export class ICategory {
	public node: IC;
	public tasks: IC[][];
}

export interface IUser {
	avatarUrl: string;
	bio: string;
	blog: string;
	id: number;
	location: string;
	login: string;
	name: string;
}
