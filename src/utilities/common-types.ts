import React from 'react';

export type HasChidren = {
  children: React.ReactNode;    
};
export type HasChidrenWithStyle<T extends object> = {
  children: React.ReactNode;    
  style?: T;
};