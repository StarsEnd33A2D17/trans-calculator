export interface Option {
  id: string;
  label: string;
  weight?: number;
}

export interface Category {
  id: string;
  title: string;
  options: Option[];
  horizontal?: boolean;
}

export interface ProbabilityLevel {
  minWeight: number;
  message: string;
  color: string;
}
