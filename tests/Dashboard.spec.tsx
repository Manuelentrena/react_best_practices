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

		expect(title).toBeInTheDocument();
	});
});
