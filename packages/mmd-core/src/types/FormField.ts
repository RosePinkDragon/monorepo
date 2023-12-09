export type TTextField = {
  type: "text" | "textArea" | "tel" | "email" | "password" | "number";
  placeholder?: string;
  value?: string;
  minLen?: number;
  maxLen?: number;
};

export type TDateField = {
  type: "date";
  min?: Date;
};

export type TArrayField = {
  type: "arrayField";
  min?: number;
  max?: number;
  value?: Array<object>;
  formFields: Array<TFormField>;
};

export type TOtherFields = {
  type: "boolean";
  value?: any;
};

export type TMultiFields = {
  type: "select" | "multi-select" | "checkbox" | "radio";
  options: Array<{
    label: string;
    value: string | number | boolean;
  }>;
  value?: string | number | boolean | Array<string | number | boolean>;
};

export type TFormField = {
  name: string;
  label: string;
  required?: boolean;
  initialValue?: any;
  colspan?: number;
  isDisabledField?: true;
  isDependentOn?: string;
  dependentOnValues?: any[];
  regEx?: RegExp | string;
  errMsg?: string;
  tooltips?: string[];
} & (TTextField | TDateField | TArrayField | TOtherFields | TMultiFields);

export type TextFieldProps = TTextField & TFormField;
