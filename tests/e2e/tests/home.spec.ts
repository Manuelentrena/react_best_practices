describe("The Home Page", () => {
	it("successfully loads", () => {
		cy.visit("/");
		cy.findByRole("heading", {
			name: /⚡⚛️ React Best Practices/i,
		}).should("exist");
	});
});
