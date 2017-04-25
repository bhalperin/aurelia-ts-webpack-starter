import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';

@inject(HttpClient)
export class Rest {
	constructor(public http: HttpClient) {
		http.configure(config => {
			config
				.useStandardConfiguration()
				.withBaseUrl("https://api.github.com/");
		});
	}

	public getUsers(url: string): Promise<Response> {
		return this.http.fetch(url).then(response => response.json());
	}
}