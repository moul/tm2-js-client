const require_runtime = require("../../_virtual/_rolldown/runtime.cjs");
let axios = require("axios");
axios = require_runtime.__toESM(axios);
//#region src/services/rest/restService.ts
var RestService = class {
	static async post(baseURL, params) {
		const { result, error } = (await axios.default.post(baseURL, params.request, params.config)).data;
		if (error) throw new Error(`${error.message}: ${error.data}`);
		if (!result) throw new Error("invalid result returned");
		return result;
	}
};
//#endregion
exports.RestService = RestService;

//# sourceMappingURL=restService.cjs.map