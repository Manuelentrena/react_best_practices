import { useEffect, useState } from "react";

import { GitHubRepository } from "../domain/GitHubRepository";
import { GitHubRepositoryRepository } from "../domain/GitHubRepositoryRepository";

export function useGitHubRepositories(
	repository: GitHubRepositoryRepository,
	repositoryUrls: string[]
): {
	repositoryData: GitHubRepository[];
} {
	const [repositoryData, setRepositoryData] = useState<GitHubRepository[]>([]);

	useEffect(() => {
		repository
			.search(repositoryUrls)
			.then((repositoryData) => {
				setRepositoryData(repositoryData);
			})
			.catch((error: Error) => console.error(error.message));
	}, [repository, repositoryUrls]);

	return { repositoryData };
}
