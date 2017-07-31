    
import { inject, bindable, bindingMode } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { Rest } from '../../util/rest';

@inject(HttpClient)
export class CurrentWeatherCustomElement {
	@bindable city: string;
	apiKey: string = "37cb5829e9494a46ae209ab5417df674";  // API key from https://www.weatherbit.io
	currentWeather;
	temperatureUnits: string = "C";
	error: string;
	iconUrl: string;
	rest: Rest;

	constructor(public http: HttpClient) {
		this.rest = new Rest(http);
	}

	get temperature(): string {
		let value: string = "";

		if (this.currentWeather && this.currentWeather.count) {
			const data = this.currentWeather.data[0];

			value = `${Math.round(data.temp).toString()}`;
		}

		return value;
	}

	get weatherDescription(): string {
		let valueToDisplay: string = "";

		if (this.currentWeather && this.currentWeather.count) {
			const data = this.currentWeather.data[0];

			valueToDisplay = `${data.weather.description}`;
		}

		return valueToDisplay;
	}

	cityChanged(newValue: string, oldValue: string) {
		this.getWeatherCurrentGeosearch();
	}

	getWeatherCurrentGeosearch(): void {
		this.rest.getWeatherCurrentGeosearch(this.apiKey, this.city)
		.then((response: any) => {
			if (!response) {
				throw "No response";
			}
			if (response.error) {
				throw response.error;
			}
			this.currentWeather = response;
			this.iconUrl = this.rest.getWeatherIconUrl(this.apiKey, this.currentWeather.data[0].weather.icon);
		})
		.catch(error => {
			this.currentWeather = null;
			this.error = error;
		});
	}
}