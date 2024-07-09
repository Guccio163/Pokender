import React, {createContext, useContext, ReactNode, useState} from 'react';
import {Pokemon} from './Example';

interface UserContextType {
  liked: Pokemon[];
  setLiked: React.Dispatch<React.SetStateAction<Pokemon[]>>;
}

const LikedContext = createContext<UserContextType | undefined>(undefined);

export const LikedContextProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [liked, setLiked] = useState<Pokemon[]>([]);

  return (
    <LikedContext.Provider value={{liked, setLiked}}>
      {children}
    </LikedContext.Provider>
  );
};

export const useLiked = () => {
  const context = useContext(LikedContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
