export type TMultiChoiceFieldOptions = {
  label: string;
  value: string | number | boolean;
};

export type TTextField = {
  type: "text" | "textArea" | "tel" | "email" | "password" | "number";
  placeholder?: string;
  minLen?: number;
  maxLen?: number;
  value?: string;
};

export type TDateField = {
  type: "date";
  min?: Date | string;
  max?: Date | string;
  beforeDate?: string;
  afterDate?: string;
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
  placeholder?: string;
  value?: any;
};

export type TMultiFields =
  | {
      api?: string;
      placeholder?: string;
      isApiDependentField?: boolean;
      options: Array<TMultiChoiceFieldOptions>;
    } & (
      | {
          type: "multi-select" | "checkbox";
          value?: Array<string | number | boolean>;
        }
      | {
          type: "select" | "radio";
          // type: "multi-select" | "checkbox";
          value?: string | number | boolean;
        }
    );

export type TFormField = {
  name: string;
  label: string;
  required?: boolean;
  initialValue?: any;
  colspan?: number;
  isDisabledField?: boolean;
  isDependentOn?: string;
  dependentOnValues?: any[];
  regEx?: RegExp | string;
  errMsg?: string;
  tooltips?: string[];
} & (TTextField | TDateField | TArrayField | TOtherFields | TMultiFields);
