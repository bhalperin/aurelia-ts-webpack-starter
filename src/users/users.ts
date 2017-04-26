import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { Rest } from '../util/rest';

@inject(HttpClient)
export class Users {
	rest: Rest;
	users;

	constructor(public http: HttpClient) {
		this.rest = new Rest(http);
		this.rest.getUsers("users").then(response => {
			this.users = response
		});
	}
}