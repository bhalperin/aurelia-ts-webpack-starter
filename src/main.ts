import { Aurelia, PLATFORM } from "aurelia-framework";

export function configure(aurelia: Aurelia) {
	aurelia.use
		.standardConfiguration()
		.developmentLogging()
		.feature(PLATFORM.moduleName("util/index"));
	aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName("app")));
}