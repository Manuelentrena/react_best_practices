import { GitHubRepository } from "../../domain/GitHubRepository";
import Check from "./assets/check.svg";
import Error from "./assets/error.svg";
import IssueOpened from "./assets/issue-opened.svg";
import Lock from "./assets/lock.svg";
import Forks from "./assets/repo-forked.svg";
import Start from "./assets/star.svg";
import Unlock from "./assets/unlock.svg";
import Watchers from "./assets/watchers.svg";
import styles from "./GitHubRepositoryWidget.module.scss";

const isoToReadableDate = (lastUpdateDate: Date): string => {
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

export function GitHubRepositoryWidget({ repository }: { repository: GitHubRepository }) {
	return (
		<article className={styles.widget} key={repository.id.name}>
			<header className={styles.widget__header}>
				<h2 className={styles.widget__title}>
					<a
						href={`/repository/${repository.id.organization}/${repository.id.name}`}
						title={`${repository.id.organization}/${repository.id.name}`}
						rel="noreferrer"
					>
						{repository.id.organization}/{repository.id.name}
					</a>
				</h2>
				{repository.private ? <Lock /> : <Unlock />}
			</header>
			<div className={styles.widget__body}>
				<div className={styles.widget__status}>
					<p>Last update {isoToReadableDate(repository.updatedAt)}</p>
					{repository.hasWorkflows && (
						<div>{repository.isLastWorkflowSuccess ? <Check /> : <Error />}</div>
					)}
				</div>
				<p className={styles.widget__description}>{repository.description}</p>
			</div>
			<footer className={styles.widget__footer}>
				<div className={styles.widget__stat}>
					<Start />
					<span>{repository.stars}</span>
				</div>
				<div className={styles.widget__stat}>
					<Watchers />
					<span>{repository.watchers}</span>
				</div>
				<div className={styles.widget__stat}>
					<Forks />
					<span>{repository.forks}</span>
				</div>
				<div className={styles.widget__stat}>
					<IssueOpened />
					<span>{repository.issues}</span>
				</div>
				{/* 				<div className={styles.widget__stat}>
					<PullRequests />
					<span>{repository.pullRequests}</span>
				</div> */}
			</footer>
		</article>
	);
}
