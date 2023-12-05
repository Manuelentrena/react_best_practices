import dotenv from "dotenv";

dotenv.config({
	path: ".env",
});

jest.mock("./src/helpers/getEnviroments", () => ({
	getEnviroments: () => ({ ...process.env }),
}));
