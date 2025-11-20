const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

export const apiConfig = {
  baseUrl: API_URL,
  endpoints: {
    users: `${API_URL}/users`,
  },
  requestOptions: {
    credentials: 'include' as RequestCredentials,
    headers: {
      'Content-Type': 'application/json',
    },
  },
};
