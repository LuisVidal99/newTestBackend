const swaggerAutogen = require("swagger-autogen")({
	autoHeaders: false,
	autoQuery: false,
	autoBody: false,
});
const path = require("path");

const HOST = process.env.APP_HOST || "127.0.0.1",
	PORT = process.env.HTTP_PORT || 3000;

const doc = {
	info: {
		version: "1.0.0",
		title: "Gateway Management API",
		description: "Documentation automatically generated by the <b>swagger-autogen</b> module.",
	},
	host: `${HOST}:${PORT}`,
	basePath: "/",
	schemes: ["http", "https"],
	consumes: ["application/json"],
	produces: ["application/json"],
	tags: [
		{
			name: "Auth",
			description: "Endpoints",
		},
		{
			name: "Gateway",
			description: "Endpoints",
		},
	],
	definitions: {
		Person: {
			name: "Admin",
			userName: "admin",
			password: "P455w0rd*",
		},
		Gateway: {
			serialNumber: "M720",
			name: "Example gateway",
			ipv4: "192.168.1.1",
			devices: [
				{
					uid: "2110",
					vendor: "somevendor",
					status: "online",
				},
				{
					uid: "2111",
					vendor: "somevendor",
					status: "offline",
				},
			],
		},
		AddGateway: {
			serialNumber: "M720",
			name: "Example gateway",
			ipv4: "192.168.1.1",
			devices: [
				{
					uid: "2110",
					vendor: "somevendor",
					status: "online",
				},
			],
		},
		UpdateGateway: {
			serialNumber: "number update",
			name: "name update",
			ipv4: "192.168.1.2",
		},
		AddDevice: {
			uid: "2110",
			vendor: "somevendor",
			status: "online",
		},
	},
	securityDefinitions: {
		bearerAuth: {
			type: "apiKey",
			in: "header",
			name: "Authorization",
			description: 'Enter the token with the `Bearer: ` prefix, e.g. "Bearer abcde12345".',
		},
		basicAuth: {
			type: "basic",
		},
	},
};

const outputFile = "./swagger-output.json";
const endpointsFiles = [path.resolve("src", "modules", "gateway", "routes", "gateway.js"), path.resolve("src", "modules", "auth", "routes", "auth.js")];

swaggerAutogen(outputFile, endpointsFiles, doc).then(({ success }) => {
	if (success) require("./index"); // Your project's root file
});
