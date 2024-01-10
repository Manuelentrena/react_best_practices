import { Link, Outlet } from "react-router-dom";

import Brand from "../../assets/svgs/brand.svg";
import { ErrorBoundary } from "../../components";
import { TopbarProgresProvider } from "../providers/TopbarProgresProvider";
import styles from "./Layout.module.scss";

export function Layout() {
	const title = "DevDash";

	return (
		<>
			<TopbarProgresProvider />
			<header className={styles.header}>
				<section className={styles.header__container}>
					<div className={styles.brand__container}>
						<a href="https://codely.com">
							<Brand />
						</a>
						<Link to="/">
							<h1 className={styles.app__brand}>{title}</h1>
						</Link>
					</div>

					<Link to="/config">
						<span>⚙️</span>
					</Link>
				</section>
			</header>
			<ErrorBoundary>
				<Outlet />
			</ErrorBoundary>
		</>
	);
}
