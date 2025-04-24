export type FormField = {
  type: string;
  name: string;
  label: Record<string, string>;
  placeholder?: Record<string, string>;
  backgroundColor: string;
};

export type FormCreateData = {
  title: string;
  backgroundColor: string;
  showLabels: boolean;
  fontFamily: string;
  language: string;
  fields: FormField[];
};

export type User = {
  id: number;
  email: string;
  createdAt: Date;
};
export type DecodedToken = {
  userId: number;
  email: string;
  iat?: number;
  exp?: number;
};
