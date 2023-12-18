import { render, screen } from "@testing-library/react";

import { Dashboard } from "../src/components";
import { githubApiResponses } from "../src/github_api_responses";
import { GitHubApiGitHubRepositoryRepository } from "../src/infrastructure/GitHubApiGitHubRepositoryRepository";

jest.mock("../src/infrastructure/GitHubApiGitHubRepositoryRepository");
const mockRepository =
	GitHubApiGitHubRepositoryRepository as jest.Mock<GitHubApiGitHubRepositoryRepository>;

describe("DashBoard section", () => {
	it("show all widgtes", async () => {
		mockRepository.mockImplementationOnce(() => {
			return {
				search: () => Promise.resolve(githubApiResponses),
			} as unknown as GitHubApiGitHubRepositoryRepository;
		});
		render(<Dashboard />);

		const title = await screen.findByRole("heading", {
			name: new RegExp("DevDash", "i"),
		});

		const firstWidgetTitle = `${githubApiResponses[0].repositoryData.owner.login}/${githubApiResponses[0].repositoryData.name}`;
		const firstWidgetHeader = await screen.findByRole("link", {
			name: new RegExp(firstWidgetTitle, "i"),
		});

		expect(title).toBeInTheDocument();
		expect(firstWidgetHeader).toBeInTheDocument();
	});

	it("show not results message when there are no widgets", async () => {
		mockRepository.mockImplementationOnce(() => {
			return {
				search: () => Promise.resolve([]),
			} as unknown as GitHubApiGitHubRepositoryRepository;
		});

		render(<Dashboard />);

		const noResults = await screen.findByText(new RegExp("No hay widgets configurados", "i"));

		expect(noResults).toBeInTheDocument();
	});

	it("show last modified date in human readable format", async () => {
		const mockedResponse = [...githubApiResponses];
		mockedResponse[0].repositoryData.updated_at = new Date().toISOString();

		mockRepository.mockImplementationOnce(() => {
			return {
				search: () => Promise.resolve(mockedResponse),
			} as unknown as GitHubApiGitHubRepositoryRepository;
		});

		render(<Dashboard />);

		const modificationDate = await screen.findByText(new RegExp("today", "i"));

		expect(modificationDate).toBeInTheDocument();
	});
});
