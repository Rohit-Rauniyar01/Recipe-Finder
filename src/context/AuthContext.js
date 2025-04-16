import { createContext } from 'react';

// Create the auth context
const AuthContext = createContext({
  isAuthenticated: false,
  requireAuth: () => {}
});

export default AuthContext;