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
	private cardPanel: Element;
	private isUserRetrieved: boolean = false;
	private readonly FLIPPED_CLASS: string = "is-flipped";

	constructor(private eventAggragator: EventAggregator, public http: HttpClient) {
		this.ea = eventAggragator;
		this.rest = new Rest(http);

		this.subscribe();
	}

	public attached() {
		this.isUserRetrieved = false;
	}

	public subscribe(): void {
		this.ea.subscribe("flipToFront", () => {
			this.cardPanel.classList.remove(this.FLIPPED_CLASS);
		});
	}

	public publish(user): void {
		this.ea.publish("userSelected", user);
	}

	public async getUser(userLogin: string) {
		this.flipUser();

		if (this.isUserRetrieved) {
			return;
		}

		const user = await this.rest.getUser(userLogin);

		this.user = {
			avatarUrl: user.avatar_url,
			bio: user.bio,
			blog: user.blog,
			id: user.id,
			location: user.location,
			login: user.login,
			name: user.name
		} as IUser;
		// this.publish(this.user);
		this.isUserRetrieved = true;
	}

	public flipUser() {
		this.cardPanel.classList.toggle(this.FLIPPED_CLASS);
	}
}
