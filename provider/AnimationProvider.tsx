'use client';
import React, { createContext, FC, PropsWithChildren, useEffect, useState } from 'react';

interface AnimationContextType {
  isAnimate: boolean;
  setAnimate: (animate: boolean) => void;
}
export const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

const AnimationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isAnimate, setAnimate] = useState<boolean>(true);
  useEffect(() => {
    setAnimate(false);
  }, []);
  return <AnimationContext.Provider value={{ isAnimate, setAnimate }}>{children}</AnimationContext.Provider>;
};
export default AnimationProvider;
