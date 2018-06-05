import { EventAggregator } from "aurelia-event-aggregator";
import { HttpClient } from "aurelia-fetch-client";
import { bindable, inject } from "aurelia-framework";
import { Rest } from "../util/rest";
import { IUser } from "./users-data";

@inject(EventAggregator, HttpClient)
export class User {
	@bindable public user: IUser;
	private ea: EventAggregator;
	private rest: Rest;

	constructor(private eventAggragator: EventAggregator, public http: HttpClient) {
		this.ea = eventAggragator;
		this.rest = new Rest(http);
	}

	public publish(user): void {
		this.ea.publish("userSelected", user);
	}

	public async getUser(userLogin: string) {
		const user = await this.rest.getUser(userLogin);

		this.user = {
			avatarUrl: user.avatar_url,
			id: user.id,
			location: user.location,
			login: user.login,
			name: user.name
		} as IUser;
		this.publish(this.user);
	}
}
