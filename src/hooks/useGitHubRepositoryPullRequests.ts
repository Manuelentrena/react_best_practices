import { useEffect, useState } from "react";

import { RepositoryId } from "../domain/GitHubRepository";
import { GitHubRepositoryPullRequest } from "../domain/GitHubRepositoryPullRequest";
import { GitHubRepositoryPullRequestRepository } from "../domain/GitHubRepositoryPullRequestRepository";
import { useTopBarProgres } from "./useTopBarProgres";

export function useGitHubRepositoryPullRequests(
	repository: GitHubRepositoryPullRequestRepository,
	repositoryId: RepositoryId
): { isLoading: boolean; pullRequests: GitHubRepositoryPullRequest[] } {
	const [pullRequests, setPullRequests] = useState<GitHubRepositoryPullRequest[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const topBar = useTopBarProgres();

	useEffect(() => {
		setIsLoading(true);
		topBar.onOpen();
		repository
			.search(repositoryId)
			.then((pullRequests) => {
				setPullRequests(pullRequests);
				setIsLoading(false);
				topBar.onClose();
			})
			.finally(() => {
				topBar.onFinish();
			})
			.catch((error: Error) => console.error(error.message));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [repository, repositoryId]);

	return {
		pullRequests,
		isLoading,
	};
}
