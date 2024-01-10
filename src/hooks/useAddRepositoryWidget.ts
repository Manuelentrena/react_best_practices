/* import { RepositoryAlreadyExistsError } from "../domain/RepositoryAlreadyExistsError"; */
import { DomainEvents } from "../domain/DomainEvents";
import { RepositoryWidget } from "../domain/RepositoryWidget";
import { RepositoryWidgetRepository } from "../domain/RepositoryWidgetRepository";

export function useAddRepositoryWidget(repository: RepositoryWidgetRepository): {
	save: (widget: RepositoryWidget) => Promise<string | void>;
} {
	async function save(widget: RepositoryWidget): Promise<string | void> {
		const widgetRepositories = await repository.search();

		if (widgetRepositories.some((w) => w.repositoryUrl === widget.repositoryUrl)) {
			return "URL duplicada";
		}

		await repository.save(widget);
		document.dispatchEvent(new CustomEvent(DomainEvents.repositoryWidgetAdded));
	}

	return { save };
}
