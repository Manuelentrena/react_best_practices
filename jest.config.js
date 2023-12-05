module.exports = {
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["<rootDir>/tests/setupTests.ts"],
	testMatch: ["<rootDir>/tests/**/*.(spec).(ts|tsx)"],
	testPathIgnorePatterns: ["<rootDir>/tests/e2e/"],
	transform: {
		"^.+\\.(js|jsx|ts|tsx)$": [
			"@swc/jest",
			{
				sourceMaps: true,
				jsc: {
					parser: {
						syntax: "typescript",
						tsx: true,
					},
					transform: {
						react: {
							runtime: "automatic",
						},
					},
				},
			},
		],
		/* "^.+\\.jsx?$": "babel-jest",
		"^.+\\.svg$": "jest-transformer-svg", */
		"^.+\\.scss$": "jest-scss-transform",
	},
	moduleNameMapper: {
		"\\.svg$": "<rootDir>/__mocks__/svg.js",
	},
};
