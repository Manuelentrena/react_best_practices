import React, { createContext, useContext, useEffect, useState } from "react";

import { config } from "../../devdash_config";
import { RepositoryWidget } from "../../domain/RepositoryWidget";
import { RepositoryWidgetRepository } from "../../domain/RepositoryWidgetRepository";

const RepositoryWidgetContext = createContext<{ repositoryWidgets: RepositoryWidget[] }>({
	repositoryWidgets: [],
});

export function RepositoryWidgetContextProvider({
	children,
	repository,
}: {
	children: React.ReactElement;
	repository: RepositoryWidgetRepository;
}) {
	const [repositoryWidgets, setRepositoryWidgets] = useState<RepositoryWidget[]>([]);

	useEffect(() => {
		repository
			.search()
			.then((repositoryWidgets) => {
				if (repositoryWidgets.length === 0) {
					setRepositoryWidgets(
						config.widgets.map((w) => ({ id: w.id, repositoryUrl: w.repository_url }))
					);

					return;
				}
				setRepositoryWidgets(repositoryWidgets);
			})
			.catch((error) => {
				console.error("Error al cargar widgets:", error);
			});
	}, [repository]);

	useEffect(() => {
		const reloadRepositoryWidgets = () => {
			repository
				.search()
				.then(setRepositoryWidgets)
				.catch((error) => {
					console.error("Error al actualizar widgets:", error);
				});
		};
		document.addEventListener("repositoryWidgetAdded", reloadRepositoryWidgets);

		return () => {
			document.removeEventListener("repositoryWidgetAdded", reloadRepositoryWidgets);
		};
	}, [repository]);

	return (
		<RepositoryWidgetContext.Provider value={{ repositoryWidgets }}>
			{children}
		</RepositoryWidgetContext.Provider>
	);
}

export const useRepositoryWidgetContext = () => useContext(RepositoryWidgetContext);
