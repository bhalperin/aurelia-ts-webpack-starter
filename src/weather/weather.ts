import { inject, computedFrom, observable } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { Rest } from '../util/rest';

class MapOptions {
	address: string;
	zoom: number;
}

@inject(HttpClient)
export class Weather {
	heading: string = "Weather in selected city";
	city: string = "New York";
	cityToWeather: string;
	address: string;
	apiKey: string = "37cb5829e9494a46ae209ab5417df674";  // API key from https://www.weatherbit.io
	rest: Rest;
	currentWeather;
	error: string;
	iconUrl: string;
	weatherWidget;
	weatherWidget2;
	gmap;
	mapOptions: MapOptions = {
		address: "",
		zoom: 12
	};
	myClass: string = Math.random() > 0.5 ? "benny" : "";

	constructor(public http: HttpClient) {
		this.rest = new Rest(http);
		this.cityToWeather = this.city;
		// this.map = new GoogleMaps();
	}

	attached(): void {
		//this.getWeatherCurrentGeosearch();
	}
	
	get selectedCity(): string {
		return this.city;
	}

	//@computedFrom("selectedCity")
	get weather(): string {
		let valueToDisplay = "City not found";

		if (this.currentWeather && this.currentWeather.count) {
			const data = this.currentWeather.data[0];

			valueToDisplay = `${Math.round(data.temp).toString()} degrees. ${data.weather.description}`;
		}

		return valueToDisplay;
	}

	submit() {
		//this.weatherWidget.getWeatherCurrentGeosearch();
		//this.weatherWidget2.getWeatherCurrentGeosearch();
		this.cityToWeather = this.city;
	}

	private getWeatherCurrentGeosearch(): void {
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

			const newAddress = `${this.city}, ${this.currentWeather.data[0].country_code}`;

			if (this.gmap.address !== newAddress) {
				this.gmap.clearMarkers();
			}
			this.mapOptions.address = newAddress;
			//console.log("Map:", newAddress);
		})
		.catch(error => {
			this.currentWeather = null;
			this.error = error;
		});
	}
}