import React, {useState, useEffect, useMemo} from 'react';
import {AuthContext} from './AuthContext';
import {usePrevious} from './usePrevious';

export type AuthProviderProps = {
  defaultAuthenticated?: boolean;
  onLogin?: () => void;
  onLogout?: () => void;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({
  defaultAuthenticated = false,
  onLogin,
  onLogout,
  children,
}) => {
  const [authenticated, setAuthenticated] = useState(defaultAuthenticated);
  const previousAuthenticated = usePrevious(authenticated);

  useEffect(() => {
    if (!previousAuthenticated && authenticated) {
      onLogin && onLogin();
    }
  }, [previousAuthenticated, authenticated, onLogin]);

  useEffect(() => {
    if (previousAuthenticated && !authenticated) {
      onLogout && onLogout();
    }
  }, [previousAuthenticated, authenticated, onLogout]);

  const contextValue = useMemo(
    () => ({
      authenticated,
      setAuthenticated,
    }),
    [authenticated]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
