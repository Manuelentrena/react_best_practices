import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Layout } from "../components";
import { DashboardFactory } from "../pages/dashBoard/DashboardFactory";
import { GitHubRepositoryDetailFactory } from "../pages/gitHubRepositoryDetail/GithubRepositoryDetailFactory";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: DashboardFactory.create(),
			},
			{
				path: "/repository/:organization/:name",
				element: GitHubRepositoryDetailFactory.create(),
			},
		],
	},
]);

export function Router() {
	return <RouterProvider router={router} />;
}
