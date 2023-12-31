import React from "react";

import { Dashboard } from "../../components";
import { config } from "../../devdash_config";
import { GitHubApiGitHubRepositoryRepository } from "../../infrastructure/GitHubApiGitHubRepositoryRepository";
import { LocalStorageRepositoryWidgetRepository } from "../../infrastructure/LocalStorageWidgetRepository";

const repository = new GitHubApiGitHubRepositoryRepository(config.github_access_token);
const repositoryWidgetRepository = new LocalStorageRepositoryWidgetRepository();

export class DashboardFactory {
	static create(): React.ReactElement {
		return (
			<Dashboard repository={repository} repositoryWidgetRepository={repositoryWidgetRepository} />
		);
	}
}
