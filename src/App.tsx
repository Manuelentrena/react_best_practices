import "react-loading-skeleton/dist/skeleton.css";

import { RepositoryWidgetContextProvider } from "./components/providers/RepositoryWidgetContextProvider";
import { LocalStorageRepositoryWidgetRepository } from "./infrastructure/LocalStorageWidgetRepository";
import { Router } from "./router/index";

const repository = new LocalStorageRepositoryWidgetRepository();
export function App() {
	return (
		<RepositoryWidgetContextProvider repository={repository}>
			<Router />
		</RepositoryWidgetContextProvider>
	);
}
