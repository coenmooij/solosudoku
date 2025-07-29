import { Position } from '../types';

export interface Cell {
  value: number;
  wasGiven: boolean;
  options: number[]; // Possible Value Candidates (empirical)
  possibilities: number; // Possible Values (context-based) bitmask for performance
  undo: Position[];
}
