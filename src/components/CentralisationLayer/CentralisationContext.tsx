import React, { createContext, ReactNode, useContext, useReducer } from "react";
import {
  Action,
  centralizationReducer,
  centralState,
  State,
} from "./CentralisationLayer.ts";

// Type definitions, HUSKAAT: Move to seperate file

interface CentralizationContextProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}

// Define provider props
interface CentralizationProviderProps {
  children: ReactNode;
}

// establish context
const CentralizationContext = createContext<
  CentralizationContextProps | undefined
>(undefined);

// Establish provider

export const CentralizationProvider: React.FC<CentralizationProviderProps> = (
  { children },
) => {
  const [state, dispatch] = useReducer(centralizationReducer, centralState);

  return (
    <CentralizationContext.Provider value={{ state, dispatch }}>
      {children}
    </CentralizationContext.Provider>
  );
};

// Custom hook to use context
export const useCentralization = (): CentralizationContextProps => {
  const context = useContext(CentralizationContext);
  if (!context) {
    throw new Error(
      "useCentralization must be used within a centralisationProvider",
    );
  }
  return context;
};
