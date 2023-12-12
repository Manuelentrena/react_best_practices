import { useEffect, useState } from "react";

import { config } from "../../devdash_config";
import { GitHubApiGitHubRepositoryRepository } from "../../infrastructure/GitHubApiGitHubRepositoryRepository";
import { GitHubApiResponses } from "../../infrastructure/GitHubApiResponse";
import Brand from "./brand.svg";
import Check from "./check.svg";
import styles from "./Dashboard.module.scss";
import Error from "./error.svg";
import PullRequests from "./git-pull-request.svg";
import IssueOpened from "./issue-opened.svg";
import Lock from "./lock.svg";
import Forks from "./repo-forked.svg";
import Start from "./star.svg";
import Unlock from "./unlock.svg";
import Watchers from "./watchers.svg";

const isoToReadableDate = (lastUpdate: string): string => {
	const lastUpdateDate = new Date(lastUpdate);
	const currentDate = new Date();
	const diffTime = currentDate.getTime() - lastUpdateDate.getTime();
	const diffDays = Math.round(diffTime / (1000 * 3600 * 24));

	if (diffDays === 0) {
		return "today";
	}

	if (diffDays > 30) {
		return "more than a month ago";
	}

	return `${diffDays} days ago`;
};

const Dashboard = () => {
	const repository = new GitHubApiGitHubRepositoryRepository(config.github_access_token);
	const title = "DevDash";
	const [repositoryData, setRepositoryData] = useState<GitHubApiResponses[]>([]);

	useEffect(() => {
		repository
			.search(config.widgets.map((widget) => widget.repository_url))
			.then((responses) => {
				setRepositoryData(responses);
			})
			.catch((error: Error) => console.error(error.message));
	}, []);

	return (
		<>
			<header className={styles.header}>
				<section className={styles.header__container}>
					<Brand />
					<h1 className={styles.app__brand}>{title}</h1>
				</section>
			</header>
			<section className={styles.container}>
				{repositoryData.map((repository) => (
					<article className={styles.widget} key={repository.repositoryData.id}>
						<header className={styles.widget__header}>
							<a
								className={styles.widget__title}
								href={repository.repositoryData.html_url}
								target="_blank"
								title={`${repository.repositoryData.owner.login}/${repository.repositoryData.name}`}
								rel="noreferrer"
							>
								{repository.repositoryData.owner.login}/{repository.repositoryData.name}
							</a>
							{repository.repositoryData.private ? <Lock /> : <Unlock />}
						</header>
						<div className={styles.widget__body}>
							<div className={styles.widget__status}>
								<p>Last update {isoToReadableDate(repository.repositoryData.updated_at)}</p>
								{repository.ciStatus.workflow_runs.length > 0 && (
									<div>
										{repository.ciStatus.workflow_runs[0].status === "completed" ? (
											<Check />
										) : (
											<Error />
										)}
									</div>
								)}
							</div>
							<p className={styles.widget__description}>{repository.repositoryData.description}</p>
						</div>
						<footer className={styles.widget__footer}>
							<div className={styles.widget__stat}>
								<Start />
								<span>{repository.repositoryData.stargazers_count}</span>
							</div>
							<div className={styles.widget__stat}>
								<Watchers />
								<span>{repository.repositoryData.watchers_count}</span>
							</div>
							<div className={styles.widget__stat}>
								<Forks />
								<span>{repository.repositoryData.forks_count}</span>
							</div>
							<div className={styles.widget__stat}>
								<IssueOpened />
								<span>{repository.repositoryData.open_issues_count}</span>
							</div>
							<div className={styles.widget__stat}>
								<PullRequests />
								<span>{repository.pullRequests.length}</span>
							</div>
						</footer>
					</article>
				))}
			</section>
		</>
	);
};

export default Dashboard;
