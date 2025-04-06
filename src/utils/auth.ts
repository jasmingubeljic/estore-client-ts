import { redirect } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// Define a type for the decoded JWT token
interface DecodedToken {
  exp: number;
}

interface UserAndToken {
  token: string;
}

// Read the token from localStorage
export const readToken = (): string | undefined => {
  const userAndToken = localStorage.getItem("userAndToken");
  if (userAndToken !== null) {
    const { token }: UserAndToken = JSON.parse(userAndToken);
    return token;
  }
  return undefined;
};

// Get the remaining duration of the token
export const getRemainingTokenDuration = (): number | undefined => {
  const nowTime = new Date().getTime();
  const userAndToken = localStorage.getItem("userAndToken");

  if (userAndToken !== null) {
    const { token }: UserAndToken = JSON.parse(userAndToken);
    const decodedToken: DecodedToken = jwtDecode(token);
    const tokenExp = decodedToken.exp * 1000; // Convert from seconds to milliseconds
    return tokenExp - nowTime;
  }

  return undefined;
};

// Check if the token is stored
export const isTokenStored = (): boolean => {
  const val = readToken();
  return !!val;
};

// Protect routes that require authentication
export const protectAuthRoutes = (): ReturnType<typeof redirect> | undefined => {
  const tokenExists = isTokenStored();
  if (!tokenExists) {
    return redirect("/login");
  }
};

// Clear the token from localStorage
export const clearToken = (): void => {
  const userAndToken = localStorage.getItem("userAndToken");
  if (userAndToken !== null) {
    localStorage.removeItem("userAndToken");
  }
};
