import { Dashboard } from "../../components";
import { useRepositoryWidgetContext } from "../../components/providers/RepositoryWidgetContextProvider";
import { GitHubAccessTokenSearcher } from "../../infrastructure/GithubAccessTokenSearcher";
import { GitHubApiGitHubRepositoryRepository } from "../../infrastructure/GitHubApiGitHubRepositoryRepository";
import { LocalStorageGitHubAccessTokenRepository } from "../../infrastructure/LocalStorageGithubAccessTokenRepository";
import { LocalStorageRepositoryWidgetRepository } from "../../infrastructure/LocalStorageWidgetRepository";

const ghAccessTokenRepository = new LocalStorageGitHubAccessTokenRepository();
const ghAccessTokenSearcher = new GitHubAccessTokenSearcher(ghAccessTokenRepository);
const gitHubRepositoryRepository = new GitHubApiGitHubRepositoryRepository(
	ghAccessTokenSearcher.search()
);
const repositoryWidgetRepository = new LocalStorageRepositoryWidgetRepository();

export function DashboardFactory() {
	const { repositoryWidgets } = useRepositoryWidgetContext();

	return (
		<Dashboard
			gitHubRepositoryRepository={gitHubRepositoryRepository}
			repositoryWidgetRepository={repositoryWidgetRepository}
			repositoryWidgets={repositoryWidgets}
		/>
	);
}
