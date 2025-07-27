import React from 'react';

export type HasChidren = {
  children: React.ReactNode;    
};
export type HasChidrenWithStyle<T extends object> = {
  children: React.ReactNode;    
  style?: T;
};

export type UpiParams = {
  pa?: string; // Payee VPA
  pn?: string; // Payee Name
  mc?: string; // Merchant Code
  tid?: string; // Transaction ID
  tr?: string; // Transaction Reference
  tn?: string; // Transaction Note
  am?: string; // Amount
  cu?: string; // Currency (INR)
  url?: string; // URL (for intent redirection)
  mode?: string; // Mode (optional)
  orgid?: string; // Organization ID (optional)
  sign?: string; // Digital Signature (optional)
  [key: string]: string | undefined; // for any additional fields
};