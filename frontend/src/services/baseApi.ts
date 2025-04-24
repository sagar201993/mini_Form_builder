// services/api.ts or services/baseApi.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../stateManagement/store";

// Base query configuration using fetchBaseQuery
export const baseQuery = fetchBaseQuery({
  baseUrl: "/api", // Base URL for all API endpoints (can be relative or absolute)

  prepareHeaders: (headers, { getState }) => {
    // Automatically attach token from Redux state (if exists)
    const token = (getState() as RootState).user.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

// Create a generic API slice to be extended by feature-specific services
export const api = createApi({
  baseQuery, // Use the shared base query with automatic auth header injection
  endpoints: () => ({}), // This slice is extended in other files (like authApi, publishForm, etc.)
});
