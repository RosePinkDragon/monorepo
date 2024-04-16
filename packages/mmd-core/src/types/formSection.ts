import { TFormField } from "./formField";

export type TFormSection = {
  name: string;
  label: string;
  isExpandableSection?: boolean;
  isDisabledSection?: boolean;
  sectionDependentOn?: string;
  enabledOnValue?: string | number | boolean | Array<string | number | boolean>;
  noOfCols?: number;
  isViewOnly?: boolean;
  isApiDependent?: string;
  AfterFieldComponent?: any;
  formFields: Array<TFormField>;
};

export type TSectiongridProps = {
  name: string;
  isDisabledSection?: boolean;
  elementSize: number;
  AfterFieldComponent?: React.FC<any> | null;
  isInitialLoading?: boolean;
  isViewOnly?: boolean;
  currentFormFields: TFormField[];
};
