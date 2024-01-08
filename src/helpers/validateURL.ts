export const validateURL = (url: string): boolean => {
	// Expresión regular para validar una URL
	const regexURL = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

	// Verificar si la URL cumple con el formato esperado
	if (!regexURL.test(url)) {
		return false;
	}

	// Verificar si la URL pertenece al dominio de GitHub
	const dominioGitHub = "github.com";
	const urlObj = new URL(url);

	if (urlObj.hostname !== dominioGitHub) {
		return false;
	}

	return true;
};
