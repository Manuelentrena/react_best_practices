import { useEffect, useState } from "react";

import { GitHubRepository, RepositoryId } from "../domain/GitHubRepository";
import { GitHubRepositoryRepository } from "../domain/GitHubRepositoryRepository";
import { useTopBarProgres } from "./useTopBarProgres";

export function useGitHubRepository(
	repository: GitHubRepositoryRepository,
	repositoryId: RepositoryId
): {
	repositoryData: GitHubRepository | undefined;
} {
	const [repositoryData, setRepositoryData] = useState<GitHubRepository>();
	const topBar = useTopBarProgres();

	useEffect(() => {
		topBar.onOpen();
		repository
			.byId(repositoryId)
			.then((repositoryData) => {
				setRepositoryData(repositoryData);
				topBar.onClose();
			})
			.finally(() => {
				topBar.onFinish();
			})
			.catch((error: Error) => console.error(error.message));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [repository, repositoryId]);

	return { repositoryData };
}
