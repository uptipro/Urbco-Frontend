const environment = "production";

const config = {
	testUrl: "https://urbco-api.onrender.com/api",
	liveUrl: "https://api.urbco.ng/api",
};

const url = environment === "production" ? config.liveUrl : config.testUrl;

export { config, url, environment };
