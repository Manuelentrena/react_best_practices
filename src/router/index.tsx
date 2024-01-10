import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Layout } from "../components";
import { ConfigFactory } from "../pages/config/ConfigFactory";
import { DashboardFactory } from "../pages/dashBoard/DashboardFactory";
import { GitHubRepositoryDetailFactory } from "../pages/gitHubRepositoryDetail/GithubRepositoryDetailFactory";
import { RouterMiddleware } from "./RouterMiddleware";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<RouterMiddleware>
				<Layout />
			</RouterMiddleware>
		),
		children: [
			{
				path: "/",
				element: <DashboardFactory />,
			},
			{
				path: "/repository/:organization/:name",
				element: GitHubRepositoryDetailFactory.create(),
			},
			{
				path: "/config",
				element: <ConfigFactory />,
			},
		],
	},
]);

export function Router() {
	return <RouterProvider router={router} />;
}
