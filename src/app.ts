import { PLATFORM } from "aurelia-framework";
import { RouteConfig, Router, RouterConfiguration } from "aurelia-router";
// import { Firebase } from "./firebase/firebase";

export class App {
	public router: Router;
	public message: string = "Aurelia: this header is always visible";

	public configureRouter(config: RouterConfiguration, router: Router) {
		const routes: RouteConfig[] = [
			{
				moduleId: PLATFORM.moduleName("home/home"),
				name: "home",
				route: "",
				title: "Home"
			},
			{
				moduleId: PLATFORM.moduleName("users/users"),
				name: "users",
				route: "users",
				title: "Users"
			},
			{
				moduleId: PLATFORM.moduleName("weather/weather"),
				name: "weather",
				route: "weather",
				title: "Weather"
			}
		];
		config.map(routes);
		this.router = router;
		config.title = "BENNY HALPERIN";

		// new Firebase().init();
	}
}
