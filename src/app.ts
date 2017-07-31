import { PLATFORM } from "aurelia-framework";
import { Router, RouterConfiguration, RouteConfig } from "aurelia-router";
import { Firebase } from './firebase/firebase';

export class App {
	router: Router;
	message: string = "Aurelia: this header is always visible";

	configureRouter(config: RouterConfiguration, router: Router) {
		const routes: RouteConfig[] = [
			{
				route: "",
				name: "home",
				moduleId: PLATFORM.moduleName("home/home"),
				title: "Home"
			},
			{
				route: "users",
				name: "users",
				moduleId: PLATFORM.moduleName("users/users"),
				title: "Users"
			},
			{
				route: "weather",
				name: "weather",
				moduleId: PLATFORM.moduleName("weather/weather"),
				title: "Weather"
			}
		];
		config.map(routes);
		this.router = router;
		config.title = "BENNY HALPERIN";

		new Firebase().init();
	}
}