export class Weather {
	heading: string = "Weather Forecast";
	city: string = "New York";
	apiKey: string = "fill-this-later";  // API key from https://www.weatherbit.io
	
	get selectedCity(): string {
		return this.city;
	}

	submit() {
		alert("TBD");
	}
}
