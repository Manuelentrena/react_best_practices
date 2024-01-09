import { RepositoryWidgetMother } from "../../RepositoryWidgetMother";

describe("Repository Widget Form", () => {
	it("Add new repository with id and url", () => {
		const newWidget = RepositoryWidgetMother.create({
			repositoryUrl: "https://github.com/CodelyTV/DevDash",
			id: "123456",
		});

		cy.visit("/");

		cy.wait(1000).then(() => {
			cy.findByRole("button", {
				name: new RegExp("Añadir repositorio", "i"),
			}).click();

			cy.findByLabelText(/Id/i).type(newWidget.id);
			cy.findByLabelText(/Url del repositorio/i).type(newWidget.repositoryUrl);

			cy.findByRole("button", {
				name: /Añadir/i,
			}).click();

			cy.wait(1000).then(() => {
				cy.findByText("CodelyTV/react-devdash").then((widget) => {
					cy.wrap(widget).should("exist");
				});
			});
		});
	});
	it("Show error when respository already exists in Dashboard", () => {
		const newWidget = RepositoryWidgetMother.create({
			repositoryUrl: "https://github.com/CodelyTV/DevDash",
			id: "123456",
		});

		cy.visit("/");

		cy.wait(1000).then(() => {
			cy.findByRole("button", {
				name: new RegExp("Añadir repositorio", "i"),
			}).click();

			cy.findByLabelText(/Id/i).type(newWidget.id);
			cy.findByLabelText(/Url del repositorio/i).type(newWidget.repositoryUrl);

			cy.findByRole("button", {
				name: /Añadir/i,
			}).click();

			cy.wait(1000).then(() => {
				cy.findByText("CodelyTV/react-devdash").then((widget) => {
					cy.wrap(widget).should("exist");
				});
			});

			cy.findByRole("button", {
				name: new RegExp("Añadir repositorio", "i"),
			}).click();

			cy.findByLabelText(/Id/i).type(newWidget.id);
			cy.findByLabelText(/Url del repositorio/i).type(newWidget.repositoryUrl);

			cy.findByRole("button", {
				name: /Añadir/i,
			}).click();

			cy.findByText("URL duplicada").then((widget) => {
				cy.wrap(widget).should("exist");
			});
		});
	});
});
