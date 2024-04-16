export type TBaseInputFieldProps = {
  name: string;
  label?: string;
  isDisabledField?: boolean;
  touched?: boolean;
  error?: string;
  required?: boolean;
  tooltips?: string[];
  handleChange: {
    /** Classic React change handler, keyed by input name */
    (e: React.ChangeEvent<any>): void;
    /** Preact-like linkState. Will return a handleChange function.  */
    <T = string | React.ChangeEvent<any>>(
      field: T
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
};

export type TextInputFieldProps = TBaseInputFieldProps & {
  value?: string;
  placeholder?: string;
  type: string;
};

export type BooleanCheckBoxFieldProps = TBaseInputFieldProps & {
  isDefaultChecked: boolean;
  value?: Array<"on">;
};
