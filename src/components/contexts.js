import React from 'react'

export const MutedContext = React.createContext({
  muted: false,
  toggleMuted: () => {},
});

export const ASContext = React.createContext(0);