// FIX: Import `FC` type from React to resolve the "Cannot find namespace 'React'" error.
import type { FC } from 'react';

export enum ServiceID {
  Enhancement = 'enhancement',
  Analysis = 'analysis',
  Audit = 'audit',
  Interview = 'interview',
  ProofBuilding = 'proof_building',
  Salary = 'salary',
  FollowUp = 'follow_up',
  CoverLetter = 'cover_letter',
}

export interface InputField {
  id: string;
  label: string;
  placeholder: string;
  type: 'textarea' | 'text';
  rows?: number;
  optional?: boolean;
}

export interface Service {
  id: ServiceID;
  title: string;
  description: string;
  icon: FC<{ className?: string }>;
  inputs: InputField[];
  promptTemplate: string;
}

export interface User {
  email: string;
  isPro: boolean;
}

// Represents the full user object as stored in the simulated database.
export interface DbUser {
  email: string;
  generationsLeft: number;
  isPro: boolean;
}
