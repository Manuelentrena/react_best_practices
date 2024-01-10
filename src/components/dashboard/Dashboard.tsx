import { useMemo } from "react";

import { GitHubRepositoryRepository } from "../../domain/GitHubRepositoryRepository";
import { RepositoryWidget } from "../../domain/RepositoryWidget";
import { RepositoryWidgetRepository } from "../../domain/RepositoryWidgetRepository";
import { useGitHubRepositories } from "../../hooks/useGitHubRepositories";
import { AddRepositoryWidgetForm } from "../widget/AddRepositoryWidgetForm";
import styles from "./Dashboard.module.scss";
import { GitHubRepositoryWidget } from "./GitHubRepositoryWidget";
import { GitHubRepositorysWidgetSkeleton } from "./GitHubRepositoryWidgetSkeleton";

const Dashboard = ({
	gitHubRepositoryRepository,
	repositoryWidgetRepository,
	repositoryWidgets,
}: {
	gitHubRepositoryRepository: GitHubRepositoryRepository;
	repositoryWidgetRepository: RepositoryWidgetRepository;
	repositoryWidgets: RepositoryWidget[];
}) => {
	const gitHubRepositoryUrls = useMemo(() => {
		return repositoryWidgets.map((widget) => widget.repositoryUrl);
	}, [repositoryWidgets]);

	const { repositoryData, isLoading } = useGitHubRepositories(
		gitHubRepositoryRepository,
		gitHubRepositoryUrls
	);

	return (
		<>
			{isLoading && (
				<section className={styles.container}>
					<GitHubRepositorysWidgetSkeleton numberOfWidgets={gitHubRepositoryUrls.length} />
				</section>
			)}
			{!isLoading && repositoryData.length === 0 ? (
				<div className={styles.empty}>
					<span>No hay widgets configurados.</span>
				</div>
			) : (
				<section className={styles.container}>
					{repositoryData.map((repository) => (
						<GitHubRepositoryWidget
							key={`${repository.id.organization}/${repository.id.name}`}
							repository={repository}
						/>
					))}
					<AddRepositoryWidgetForm repository={repositoryWidgetRepository} />
				</section>
			)}
		</>
	);
};

export default Dashboard;
