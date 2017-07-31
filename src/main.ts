import { Aurelia, PLATFORM } from "aurelia-framework";

export async function configure(aurelia: Aurelia) {
	const mapsPluginOptions = {
		apiKey: 'AIzaSyCClM9zXVr82itRLLlXMPpBJYM-Fxul4ms', // your Google API key retrieved from the Google Developer Console
		apiLibraries: 'geometry', // see https://developers.google.com/maps/documentation/javascript/libraries
		options: { panControl: true, panControlOptions: { position: 9 }, zoom: 12 } // see https://developers.google.com/maps/documentation/javascript/3.exp/reference#MapOptions
	};

	aurelia.use
		.standardConfiguration()
		.developmentLogging()
		.globalResources(PLATFORM.moduleName("bootstrap/dist/css/bootstrap.css"))
		.feature(PLATFORM.moduleName("util/index"))
		.feature(PLATFORM.moduleName("shared/elements/index"))
		//.plugin(PLATFORM.moduleName("aurelia-bootstrap"))
		.plugin(PLATFORM.moduleName("aurelia-google-maps"), config => {
			config.options(mapsPluginOptions);
		});
	await aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName("app")));
}