import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { DashboardFactory } from "../pages/dashBoard/DashboardFactory";
import { GitHubRepositoryDetail } from "../pages/gitHubRepositoryDetail/GitHubRepositoryDetail";

const router = createBrowserRouter([
	{
		path: "/",
		element: DashboardFactory.create(),
	},
	{
		path: "/repository/:organization/:name",
		element: <GitHubRepositoryDetail />,
	},
]);

export function Router() {
	return <RouterProvider router={router} />;
}
