import { Link, Outlet } from "react-router-dom";

import { ErrorBoundary } from "../../components";
import { TopbarProgresProvider } from "../providers/TopbarProgresProvider";
import Brand from "./brand.svg";
import styles from "./Layout.module.scss";

export function Layout() {
	const title = "DevDash";

	return (
		<>
			<TopbarProgresProvider />
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
