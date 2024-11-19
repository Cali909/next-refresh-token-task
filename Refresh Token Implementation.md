# Refresh Token Implementation with Next.js and Axios Interceptors

**Objective:** Implement a refresh token flow using **Next.js** and **Axios** interceptors.

- **Token Retrieval:**
    - Assume tokens are initially retrieved via the `/api/token` endpoint, returning both `accessToken` and
      `refreshToken` in body.

- **Token Refresh:**
    - To refresh tokens, use the `/api/token/refresh` endpoint. Send the current `accessToken` and `refreshToken`, and
      receive new ones in response.

- **Token Refresh Trigger:**
    - When any API request returns a **403** status code, the client should:
        - Perform the refresh token process.
        - Retry the original request after receiving the new tokens.

- **Concurrency Handling:**
    - Handle simultaneous requests from the client:
        - If multiple requests trigger a 403 response, the refresh token operation should be performed only once.
        - Ensure all requests wait for the single refresh operation to complete, then retry using the new accessToken.

- **Implementation:**
    - Use **only** Axios interceptors to handle the refresh token process.

#### There's no need to design the APIs; your approach to solving this challenge is what matters.
