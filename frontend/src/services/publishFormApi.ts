import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../stateManagement/store";

// Define the API slice for form-related endpoints
export const formApi = createApi({
  reducerPath: "formApi", // Unique key for this slice in the Redux store

  // Base query with token injection logic
  baseQuery: fetchBaseQuery({
    baseUrl: "/api", // Base path for all API routes

    // Automatically attach Authorization header if token exists
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    // PUBLISH FORM: Mutation to submit a new form
    publishForm: builder.mutation<any, any>({
      query: (formData) => ({
        url: "/forms", // Backend route to handle form publishing
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

// Export auto-generated hook for the publishForm mutation
export const { usePublishFormMutation } = formApi;
