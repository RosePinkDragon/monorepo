export type TextField = {
  type: "text";
  placeholder?: string;
};

export type DateField = {
  type: "date";
  min?: Date;
};

export type FormField = {
  name: string;
  label: string;
  required?: boolean;
} & (TextField | DateField);

export type TextFieldProps = TextField & FormField;
