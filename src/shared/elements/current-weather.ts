import { HttpClient } from "aurelia-fetch-client";
import { bindable, bindingMode, inject } from "aurelia-framework";
import { Rest } from "../../util/rest";

@inject(HttpClient)
export class CurrentWeatherCustomElement {
	@bindable public city: string;
	public apiKey: string = "37cb5829e9494a46ae209ab5417df674";  // API key from https://www.weatherbit.io
	public currentWeather;
	public temperatureUnits: string = "C";
	public error: string;
	public iconUrl: string;
	public rest: Rest;

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

	public cityChanged(newValue: string, oldValue: string) {
		this.getWeatherCurrentGeosearch();
	}

	public getWeatherCurrentGeosearch(): void {
		this.rest.getWeatherCurrentGeosearch(this.apiKey, this.city)
		.then((response: any) => {
			if (!response) {
				throw new Error("No response");
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
