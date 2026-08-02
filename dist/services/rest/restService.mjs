import axios from "axios";
//#region src/services/rest/restService.ts
var RestService = class {
	static async post(baseURL, params) {
		const { result, error } = (await axios.post(baseURL, params.request, params.config)).data;
		if (error) throw new Error(`${error.message}: ${error.data}`);
		if (!result) throw new Error("invalid result returned");
		return result;
	}
};
//#endregion
export { RestService };

//# sourceMappingURL=restService.mjs.map