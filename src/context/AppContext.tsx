import {createContext} from 'react';

// Global state that will be used across all screen
export type AppContextProps = {
  // toggle to display onboarding screen
  setHasOnBoard: (value: boolean) => void;
  // set and get store authenticated user
  user: string | null;
  setUser: (value: string | null) => void;
};

export default createContext<AppContextProps>({
  setHasOnBoard: () => null,
  user: null,
  setUser: () => null,
});
