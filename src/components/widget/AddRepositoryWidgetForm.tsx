import { useState } from "react";

import Add from "../../assets/svgs/add.svg";
import { FormEvent } from "../../domain/FormEvent";
import { RepositoryWidgetRepository } from "../../domain/RepositoryWidgetRepository";
import { validateURL } from "../../helpers/validateURL";
import { useAddRepositoryWidget } from "../../hooks/useAddRepositoryWidget";
import styles from "./AddRepositoryWidgetForm.module.scss";

type FormFields = { id: string; repositoryUrl: string };

export function AddRepositoryWidgetForm({
	repository,
}: {
	repository: RepositoryWidgetRepository;
}) {
	const [isFormActive, setIsFormActive] = useState(false);
	const [error, setError] = useState("");
	const { save } = useAddRepositoryWidget(repository);

	const submitForm = async (ev: FormEvent<FormFields>) => {
		try {
			ev.preventDefault();
			const { id, repositoryUrl } = ev.target.elements;
			if (!validateURL(repositoryUrl.value)) {
				setError("URL inválida");

				return false;
			}
			const msgError = await save({ id: id.value, repositoryUrl: repositoryUrl.value });
			msgError && msgError.length > 0 ? setError(msgError) : setError("");
			setIsFormActive(false);
		} catch (error) {
			// Manejar el error aquí.
			console.error("Error al añadir:", error);
		}
	};

	return (
		<article className={styles.add_widget}>
			<div className={styles.container}>
				{!isFormActive && error.length === 0 ? (
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

						{error.length > 0 && (
							<p role="alert" aria-describedby="duplicated-error">
								<span id="duplicated-error">{error}</span>
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
