import React from "react";

import { GitHubRepositoryDetail } from "../../components/dashboard/GitHubRepositoryDetail";
import { config } from "../../devdash_config";
import { GitHubApiGitHubRepositoryRepository } from "../../infrastructure/GitHubApiGitHubRepositoryRepository";

const repository = new GitHubApiGitHubRepositoryRepository(config.github_access_token);

export class GitHubRepositoryDetailFactory {
	static create(): React.ReactElement {
		return <GitHubRepositoryDetail repository={repository} />;
	}
}
