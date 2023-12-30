import { useEffect, useState } from "react";

import { GitHubRepository } from "../domain/GitHubRepository";
import { GitHubRepositoryRepository } from "../domain/GitHubRepositoryRepository";
import { useTopBarProgres } from "./useTopBarProgres";

export function useGitHubRepositories(
	repository: GitHubRepositoryRepository,
	repositoryUrls: string[]
): {
	repositoryData: GitHubRepository[];
	isLoading: boolean;
} {
	const [repositoryData, setRepositoryData] = useState<GitHubRepository[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const topBar = useTopBarProgres();

	useEffect(() => {
		setIsLoading(true);
		topBar.onOpen();
		repository
			.search(repositoryUrls)
			.then((repositoryData) => {
				setRepositoryData(repositoryData);
				setIsLoading(false);
				topBar.onClose();
			})
			.finally(() => {
				topBar.onFinish();
			})
			.catch((error: Error) => console.error(error.message));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [repository, repositoryUrls]);

	return { repositoryData, isLoading };
}
