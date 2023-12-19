import { Dashboard } from "./components";
import { config } from "./devdash_config";
import { GitHubApiGitHubRepositoryRepository } from "./infrastructure/GitHubApiGitHubRepositoryRepository";

const repository = new GitHubApiGitHubRepositoryRepository(config.github_access_token);

export function App() {
	return <Dashboard repository={repository} />;
}
