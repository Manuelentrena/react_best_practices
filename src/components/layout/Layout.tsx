import { Link, Outlet } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";

import { ErrorBoundary, TopBarProgressByLocation } from "../../components";
import Brand from "./brand.svg";
import styles from "./Layout.module.scss";

const title = "DevDash";
TopBarProgress.config({
	barColors: {
		"0": "#fff",
		"1.0": "#3cff64",
	},
	shadowBlur: 5,
});

export function Layout() {
	return (
		<>
			<TopBarProgressByLocation />
			<header className={styles.header}>
				<section className={styles.header__container}>
					<a href="https://codely.com">
						<Brand />
					</a>
					<Link to={`/`}>
						<h1 className={styles.app__brand}>{title}</h1>
					</Link>
				</section>
			</header>
			<ErrorBoundary>
				<Outlet />
			</ErrorBoundary>
		</>
	);
}
