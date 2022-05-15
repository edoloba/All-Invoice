import React, {useEffect, useReducer, createContext, useMemo } from 'react';

export const UserContext = createContext({user:{}});
const initialState = JSON.parse(localStorage.getItem('Invoicing_User')) || {user: {}};

const reducer = (state, action) => {
    switch (action.type) {
      case 'user':
        return {...state, user: action.payLoad};
      
      default:
        throw new Error();
    }
  }

export const UserProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);
    window.addEventListener('beforeunload', ()=>{
    localStorage.clear()
  })
  useEffect(() => {
    localStorage.setItem('Invoicing_User', JSON.stringify(state))
  }, [state])
  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};


