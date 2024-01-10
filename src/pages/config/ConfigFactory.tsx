import { Config } from "../../components";
import { LocalStorageGitHubAccessTokenRepository } from "../../infrastructure/LocalStorageGithubAccessTokenRepository";

const repository = new LocalStorageGitHubAccessTokenRepository();

export function ConfigFactory() {
	return <Config repository={repository} />;
}
