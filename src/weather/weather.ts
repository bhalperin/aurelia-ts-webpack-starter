import { inject, computedFrom } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { Rest } from '../util/rest';

@inject(HttpClient)
export class Weather {
	heading: string = "Weather in selected city";
	city: string = "New York";
	apiKey: string = "37cb5829e9494a46ae209ab5417df674";  // API key from https://www.weatherbit.io
	rest: Rest;
	currentWeather;

	constructor(public http: HttpClient) {
		this.rest = new Rest(http);
	}

	attached(): void {
		this.getWeatherCurrentGeosearch();
	}
	
	get selectedCity(): string {
		return this.city;
	}

	//@computedFrom("selectedCity")
	get weather(): string {
		let valueToDisplay = "N/A";

		if (this.currentWeather && this.currentWeather.count) {
			const data = this.currentWeather.data[0];

			valueToDisplay = `${Math.round(data.temp).toString()} degrees. ${data.weather.description}`;
		}

		return valueToDisplay;
	}

	submit() {
		this.getWeatherCurrentGeosearch();
	}

	private getWeatherCurrentGeosearch(): void {
		this.rest.getWeatherCurrentGeosearch(this.apiKey, this.city)
		.then(response => {
			this.currentWeather = response;
		})
		.catch(error => {
			this.currentWeather = null;
		});
	}
}
