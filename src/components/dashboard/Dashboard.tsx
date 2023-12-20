import { useMemo } from "react";

import { config } from "../../devdash_config";
import { GitHubRepositoryRepository } from "../../domain/GitHubRepositoryRepository";
import { useGitHubRepositories } from "../../hooks/useGitHubRepositories";
import Brand from "./assets/brand.svg";
import styles from "./Dashboard.module.scss";
import { GitHubRepositoryWidget } from "./GitHubRepositoryWidget";

const Dashboard = ({ repository }: { repository: GitHubRepositoryRepository }) => {
	const title = "DevDash";

	const gitHubRepositoryUrls = useMemo(() => {
		return config.widgets.map((widget) => widget.repository_url);
	}, []);
	const { repositoryData } = useGitHubRepositories(repository, gitHubRepositoryUrls);

	return (
		<>
			<header className={styles.header}>
				<section className={styles.header__container}>
					<Brand />
					<h1 className={styles.app__brand}>{title}</h1>
				</section>
			</header>
			{repositoryData.length === 0 ? (
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
				</section>
			)}
		</>
	);
};

export default Dashboard;
