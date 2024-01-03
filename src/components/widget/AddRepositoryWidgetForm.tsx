import React, { useState } from "react";

import Add from "../../assets/svgs/add.svg";
import { RepositoryWidgetRepository } from "../../domain/RepositoryWidgetRepository";
import { validateURL } from "../../helpers/validateURL";
import { useAddRepositoryWidget } from "../../hooks/useAddRepositoryWidget";
import styles from "./AddRepositoryWidgetForm.module.scss";

type FormEvent<T> = React.FormEvent<HTMLFormElement> & {
	target: { elements: { [key in keyof T]: { value: T[key] } } };
};

type FormFields = { id: string; repositoryUrl: string };

export function AddRepositoryWidgetForm({
	repository,
}: {
	repository: RepositoryWidgetRepository;
}) {
	const [isFormActive, setIsFormActive] = useState(false);
	const [hasAlreadyExistsError, setHasAlreadyExistsError] = useState(false);
	const { save } = useAddRepositoryWidget(repository);

	const submitForm = async (ev: FormEvent<FormFields>) => {
		try {
			ev.preventDefault();
			const { id, repositoryUrl } = ev.target.elements;
			if (!validateURL(repositoryUrl.value)) {
				setHasAlreadyExistsError(true);

				return false;
			}
			const msgError = await save({ id: id.value, repositoryUrl: repositoryUrl.value });
			setHasAlreadyExistsError(!!msgError);
			setIsFormActive(false);
		} catch (error) {
			// Manejar el error aquí.
			console.error("Error al añadir:", error);
		}
	};

	return (
		<article className={styles.add_widget}>
			<div className={styles.container}>
				{!isFormActive && !hasAlreadyExistsError ? (
					<button onClick={() => setIsFormActive(true)} className={styles.add_button}>
						<Add />
						<p>Añadir repositorio</p>
					</button>
				) : (
					<form className={styles.form} onSubmit={submitForm}>
						<div>
							<label htmlFor="id">Id</label>
							<input type="text" name="id" id="id" />
						</div>
						<div>
							<label htmlFor="repositoryUrl">Url del repositorio</label>
							<input type="text" name="repositoryUrl" id="repositoryUrl" />
						</div>

						{hasAlreadyExistsError && (
							<p role="alert" aria-describedby="duplicated-error">
								<span id="duplicated-error">Repositorio duplicado</span>
							</p>
						)}

						<div>
							<input type="submit" value="Añadir" />
						</div>
					</form>
				)}
			</div>
		</article>
	);
}
