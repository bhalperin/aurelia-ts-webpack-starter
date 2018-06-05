import { bootstrap } from "aurelia-bootstrapper";
import { StageComponent} from "aurelia-testing";

describe("users component test", () => {
	let component: any;
	const viewModel = {};

	beforeEach(() => {
		component = StageComponent.withResources("./../src/users").inView("").boundTo(viewModel);
	});

	it("should render page header", async done => {
		await component.create(bootstrap);

		const element = document.querySelector("h3");

		expect(element.innerText).toBe("Users will show below");
	});
});
