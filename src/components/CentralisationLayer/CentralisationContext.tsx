import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useReducer,
} from "react";
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

// Custom hook to provide debouncing to dispatch (delay between inputs to prevent partial auto submits)
// Thank youuu internet for this idea
function useDebouncedDispatch(dispatch: React.Dispatch<Action>, delay: number) {
  // store the timer in a react ref to prevent re-renders when timer updates.
  // Initial state null as no timer has been set.
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  // useCallback to memorise the function, this also ensures re-creation only when dispatch or delay changes.
  const useDebouncedDispatch = useCallback((action: Action) => {
    console.log("bounced");
    
    // When a action is dispatched, clear previous timer, resetting debounce.
    // This ensures dispatch is only sent when user stops typing.
    if (action.skipDebounce) {
      console.log("Skipped bounce");
      
      dispatch(action);
    } else {
      if (timerRef.current) {

        clearTimeout(timerRef.current); //reset the timer
      }
    }

    // if the timeout manages to  run out, ie using a delay of 500 ms, the dispatch will then be sent.
    timerRef.current = setTimeout(() => {

      dispatch(action);
    }, delay);
  }, [dispatch, delay]);

  return useDebouncedDispatch;
}

// Establish provider

export const CentralizationProvider: React.FC<CentralizationProviderProps> = (
  { children },
) => {
  const [state, dispatch] = useReducer(centralizationReducer, centralState);

  // wrap dispatcher in debouncer hook
  const debouncedDispatch = useDebouncedDispatch(dispatch, 500); // dispatch, adjust delay limit

  return (
    <CentralizationContext.Provider
      value={{ state, dispatch: debouncedDispatch }}
    >
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
