import fetchApi from "../utils/fetchApi.js";

const endpoint = "/log"

export const activityLogService = {
    getAllLogs: async () => await fetchApi(endpoint, 'GET'),
};
