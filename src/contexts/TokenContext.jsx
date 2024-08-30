import { React, createContext, useState } from 'react';

export const TokenContext = createContext();

export function TokenProvider({ children }) {
  const [tokens, setTokens] = useState({});
  return (
    <TokenContext.Provider value={{ tokens, setTokens }}>
      {children}
    </TokenContext.Provider>
  );
}
