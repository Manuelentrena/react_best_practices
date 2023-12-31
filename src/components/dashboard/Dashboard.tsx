import { useMemo } from "react";

import { config } from "../../devdash_config";
import { GitHubRepositoryRepository } from "../../domain/GitHubRepositoryRepository";
import { RepositoryWidgetRepository } from "../../domain/RepositoryWidgetRepository";
import { useGitHubRepositories } from "../../hooks/useGitHubRepositories";
import { AddRepositoryWidgetForm } from "../widget/AddRepositoryWidgetForm";
import styles from "./Dashboard.module.scss";
import { GitHubRepositoryWidget } from "./GitHubRepositoryWidget";
import { GitHubRepositorysWidgetSkeleton } from "./GitHubRepositoryWidgetSkeleton";

const Dashboard = ({
	repository,
	repositoryWidgetRepository,
}: {
	repository: GitHubRepositoryRepository;
	repositoryWidgetRepository: RepositoryWidgetRepository;
}) => {
	const gitHubRepositoryUrls = useMemo(() => {
		return config.widgets.map((widget) => widget.repository_url);
	}, []);
	const { repositoryData, isLoading } = useGitHubRepositories(repository, gitHubRepositoryUrls);

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
