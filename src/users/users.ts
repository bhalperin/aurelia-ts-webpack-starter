import { HttpClient } from "aurelia-fetch-client";
import { inject } from "aurelia-framework";
import { Rest } from "../util/rest";

@inject(HttpClient)
export class Users {
	public rest: Rest;
	public users;

	constructor(public http: HttpClient) {
		this.rest = new Rest(http);
	}

	public attached(): void {
		this.rest.getUsers("users").then(response => {
			this.users = response;
		});
	}
}
