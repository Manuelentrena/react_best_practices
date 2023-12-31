import React, { useState } from "react";

import Add from "../../assets/svgs/add.svg";
import { RepositoryWidgetRepository } from "../../domain/RepositoryWidgetRepository";
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
	const { save } = useAddRepositoryWidget(repository);

	const submitForm = async (ev: FormEvent<FormFields>) => {
		try {
			ev.preventDefault();
			const { id, repositoryUrl } = ev.target.elements;
			await save({ id: id.value, repositoryUrl: repositoryUrl.value });
			setIsFormActive(false);
		} catch (error) {
			// Manejar el error aquí, por ejemplo, puedes mostrar un mensaje al usuario o realizar otras acciones necesarias.
			console.error("Error al añadir:", error);
		}
	};

	return (
		<article className={styles.add_widget}>
			<div className={styles.container}>
				{!isFormActive ? (
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

						<div>
							<input type="submit" value="Añadir" />
						</div>
					</form>
				)}
			</div>
		</article>
	);
}
