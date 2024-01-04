import "react-loading-skeleton/dist/skeleton.css";

import { RepositoryWidgetContextProvider } from "./components/providers/RepositoryWidgetContextProvider";
import { Router } from "./router/index";

export function App() {
	return (
		<RepositoryWidgetContextProvider>
			<Router />
		</RepositoryWidgetContextProvider>
	);
}
