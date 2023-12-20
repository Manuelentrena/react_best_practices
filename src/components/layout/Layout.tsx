import { Outlet } from "react-router-dom";

import { ErrorBoundary } from "../ErrorBoundary";
import Brand from "./brand.svg";
import styles from "./Layout.module.scss";

const title = "DevDash";

export function Layout() {
	return (
		<>
			<header className={styles.header}>
				<section className={styles.header__container}>
					<Brand />
					<h1 className={styles.app__brand}>{title}</h1>
				</section>
			</header>
			<ErrorBoundary>
				<Outlet />
			</ErrorBoundary>
		</>
	);
}
