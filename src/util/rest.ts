import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { noView } from 'aurelia-templating';

@inject(HttpClient)
@noView()
export class Rest {
	constructor(public http: HttpClient) {
		http.configure(config => {
			config
				.useStandardConfiguration();
		});
	}

	public getUsers(url: string): Promise<Response> {
		this.http.baseUrl = "https://api.github.com/";

		return this.http.fetch(url).then(response => response.json());
	}

	public getWeatherCurrentGeosearch(key: string, params: string): Promise<Response> {
		const url = `?key=${key}&city=${params}`;
		this.http.baseUrl = "http://api.weatherbit.io/v1.0/current/geosearch";

		return this.http.fetch(url)
			.then(response => {
				if (response.status === 200) {
					return response.json();
				}
				throw "Invalid city";
			})
			.catch(error => {
				console.error(error);
			});
	}
}