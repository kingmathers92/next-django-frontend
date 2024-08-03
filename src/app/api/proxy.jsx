import { getToken } from "@/lib/auth";

export default class ApiProxy {
  // Method to get headers for API requests, including the Authorization header if authentication is required
  static async getHeaders(requireAuth) {
    let headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    const authToken = getToken();
    if (authToken && requireAuth === true) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }
    return headers;
  }

  // Method to handle the fetch request and process the response
  static async handleFetch(endpoint, requestOptions) {
    let data = {};
    let status = 500;
    try {
      const response = await fetch(endpoint, requestOptions);
      data = await response.json();
      status = response.status;
    } catch (error) {
      data = { message: "Cannot reach API server", error: error };
      status = 500;
    }
    return { data, status };
  }

  // Method for sending a GET request to the specified endpoint with optional authentication
  static async get(endpoint, requireAuth) {
    const headers = await ApiProxy.getHeaders(requireAuth);
    const requestOptions = {
      method: "GET",
      headers: headers,
    };
    return await ApiProxy.handleFetch(endpoint, requestOptions);
  }

  // Method for sending a PUT request to the specified endpoint with the given object and optional authentication
  static async put(endpoint, object, requireAuth) {
    const jsonData = JSON.stringify(object);
    const headers = await ApiProxy.getHeaders(requireAuth);
    const requestOptions = {
      method: "PUT",
      headers: headers,
      body: jsonData,
    };
    return await ApiProxy.handleFetch(endpoint, requestOptions);
  }

  // Method for sending a DELETE request to the specified endpoint with optional authentication
  static async delete(endpoint, requireAuth) {
    const headers = await ApiProxy.getHeaders(requireAuth);
    const requestOptions = {
      method: "DELETE",
      headers: headers,
    };
    return await ApiProxy.handleFetch(endpoint, requestOptions);
  }

  // Method for sending a POST request to the specified endpoint with the given object and optional authentication
  static async post(endpoint, object, requireAuth) {
    const jsonData = JSON.stringify(object);
    const headers = await ApiProxy.getHeaders(requireAuth);
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: jsonData,
    };
    return await ApiProxy.handleFetch(endpoint, requestOptions);
  }
}
