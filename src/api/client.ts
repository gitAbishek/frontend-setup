import axios, { AxiosResponse } from "axios";
import { getCookie } from "../utils/cookie";
import { AUTH_COOKIE_CONFIG, BASE_URL } from "../constants/common";
import { parseApiError } from "../helper/error";

const getToken = () => getCookie(AUTH_COOKIE_CONFIG.ACCESS_TOKEN);

axios.interceptors.request.use(
  async (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => Promise.reject(error)
);

interface ApiRequestParams {
  url: string;
  params?: Record<string, unknown>;
  body?: unknown;
  contentType?: string;
  headers?: {
    token?: string;
  };
}

const get = async ({ url, params }: ApiRequestParams) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const requestParams = {
    ...params,
  };

  const fullUrl = `${BASE_URL}/${url}`;

  return axios
    .get(fullUrl, {
      headers,
      params: requestParams,
      withCredentials: true,
    })
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((error) => {
      const errorMessage = parseApiError(error);
      throw Error(errorMessage);
    });
};

const post = async ({
  url,
  body,
  contentType = "application/json",
}: ApiRequestParams) => {
  const fullUrl = `${BASE_URL}/${url}`;

  const headers = {
    Accept: "application/json",
    "Content-Type": contentType,
    // Authorization: `Bearer ${getToken()}`,
  };

  return axios
    .post(fullUrl, body, { headers, withCredentials: true })
    .then((response: AxiosResponse) => response.data)
    .catch((error) => {
      throw Error(parseApiError(error));
    });
};

const deleteApi = async ({ url }: ApiRequestParams) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const fullUrl = `${BASE_URL}/${url}`;

  return axios
    .delete(fullUrl, { headers, withCredentials: true })
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((error) => {
      throw Error(parseApiError(error));
    });
};

const put = async ({
  url,
  body,
  contentType = "application/json",
}: ApiRequestParams) => {
  const fullUrl = `${BASE_URL}/${url}`;
  const headers = {
    Accept: "application/json",
    "Content-Type": contentType,
  };
  return axios
    .put(fullUrl, body, { headers, withCredentials: true })
    .then((response: AxiosResponse) => response.data)
    .catch((error) => {
      throw Error(parseApiError(error));
    });
};

const patch = async ({
  url,
  body,
  contentType = "application/json",
}: ApiRequestParams) => {
  const fullUrl = `${BASE_URL}/${url}`;
  const headers = {
    Accept: "application/json",
    "Content-Type": contentType,
  };
  return axios
    .patch(fullUrl, body, { headers, withCredentials: true })
    .then((response: AxiosResponse) => response.data)
    .catch((error) => {
      throw Error(parseApiError(error));
    });
};

const getUser = async ({ url, params, headers }: ApiRequestParams) => {
  const authHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${headers?.token}`,
  };

  const requestParams = {
    ...params,
  };

  const fullUrl = `${BASE_URL}/${url}`;

  return axios
    .get(fullUrl, {
      headers: authHeaders,
      params: requestParams,
      withCredentials: true,
    })
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((error) => {
      const errorMessage = parseApiError(error);
      throw Error(errorMessage);
    });
};

const postUser = async ({
  url,
  body,
  contentType = "application/json",
}: ApiRequestParams) => {
  const fullUrl = `${BASE_URL}/${url}`;

  const headers = {
    Accept: "application/json",
    "Content-Type": contentType,
    Authorization: `Bearer ${getToken()}`,
  };
  return axios
    .post(fullUrl, body, { headers, withCredentials: true })
    .then((response: AxiosResponse) => response.data)
    .catch((error) => {
      throw Error(parseApiError(error));
    });
};

export { get, post, put, deleteApi, patch, postUser, getUser };
