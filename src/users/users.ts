import { EventAggregator } from "aurelia-event-aggregator";
import { HttpClient } from "aurelia-fetch-client";
import { inject } from "aurelia-framework";
import { Rest } from "../util/rest";
import { ICategory, IUser } from "./users-data";

@inject(EventAggregator, HttpClient)
export class Users {
	public rest: Rest;
	public users;
	public selectedUser: IUser;
	private firstUser: number = 0;
	private lastUser: number = 0;
	private ea: EventAggregator;
	private categories: ICategory[];

	constructor(private eventAggragator: EventAggregator, public http: HttpClient) {
		this.ea = eventAggragator;
		this.rest = new Rest(http);

		this.subscribe();
	}

	public attached(): void {
		this.getUsers();

		this.categories = [
			{
				node: { title: "Sir" },
				tasks: [
					[
						{ title: "Me" },
						{ title: "You" },
						{ title: "Her" }
					]
				]
			},
			{
				node: { title: "Esquire" },
				tasks: [
					[
						{ title: "Me" },
						{ title: "You" },
						{ title: "Her" }
					]
				]
			}
		];
	}

	public subscribe(): void {
		this.ea.subscribe("userSelected", user => {
			this.selectedUser = user;
		});
	}

	public async getUsers() {
		const response = await this.rest.getUsers(`?since=${this.lastUser}`);

		this.users = response.map(u => {
			return {
				avatarUrl: u.avatar_url,
				bio: u.bio,
				blog: u.blog,
				id: u.id,
				location: u.location,
				login: u.login,
				name: u.name
			};
		});
		if (this.users.length) {
			this.firstUser = this.users[0].id;
			this.lastUser = this.users[this.users.length - 1].id;
		}
	}

	public flipUsersToFront() {
		this.ea.publish("flipToFront");
	}

	public onSelectUser(user: IUser) {
		this.selectedUser = user;
	}
}
