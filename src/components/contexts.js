import React from 'react'

export const MutedContext = React.createContext({
  muted: false,
  toggleMuted: () => {},
});

export const PlxContext = React.createContext(null);

