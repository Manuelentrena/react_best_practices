import { screen } from "@testing-library/react";
import { mock } from "jest-mock-extended";

import { Dashboard, Layout } from "../src/components";
import { GitHubRepositoryRepository } from "../src/domain/GitHubRepositoryRepository";
import { GitHubRepositoryMother } from "./GitHubRepositoryMother";
import { renderWithRouter } from "./renderWithRouter";

const mockRepository = mock<GitHubRepositoryRepository>();

describe("DashBoard section", () => {
	it("show title in layout", async () => {
		renderWithRouter(<Layout />);

		const title = await screen.findByRole("heading", {
			name: new RegExp("DevDash", "i"),
		});

		expect(title).toBeInTheDocument();
	});

	it("show all widgtes", async () => {
		const gitHubRepository = GitHubRepositoryMother.create();

		mockRepository.search.mockResolvedValue([gitHubRepository]);

		renderWithRouter(<Dashboard repository={mockRepository} />);

		const firstWidgetTitle = `${gitHubRepository.id.organization}/${gitHubRepository.id.name}`;
		const firstWidgetHeader = await screen.findByRole("link", {
			name: new RegExp(firstWidgetTitle, "i"),
		});

		expect(firstWidgetHeader).toBeInTheDocument();
	});

	it("show not results message when there are no widgets", async () => {
		mockRepository.search.mockResolvedValue([]);

		renderWithRouter(<Dashboard repository={mockRepository} />);

		const noResults = await screen.findByText(new RegExp("No hay widgets configurados", "i"));

		expect(noResults).toBeInTheDocument();
	});

	it("show last modified date in human readable format", async () => {
		const gitHubRepository = GitHubRepositoryMother.create({ updatedAt: new Date() });

		mockRepository.search.mockResolvedValue([gitHubRepository]);

		renderWithRouter(<Dashboard repository={mockRepository} />);

		const modificationDate = await screen.findByText(new RegExp("today", "i"));

		expect(modificationDate).toBeInTheDocument();
	});
});
