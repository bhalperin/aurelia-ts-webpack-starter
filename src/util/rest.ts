import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { noView } from 'aurelia-templating';

@inject(HttpClient)
@noView()
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