import { FormikValues, getIn, useFormikContext } from "formik";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import usePrevious from "./usePrevious";
import { getApiFieldOptions } from "../services";

import type { TFormField, TMultiChoiceFieldOptions } from "~/types/formField";

const useSetFieldOptions = ({
  field,
}: {
  field: TFormField & { type: "select" };
}) => {
  const { options, isDependentOn, api, isApiDependentField } = field;
  const { values } = useFormikContext<FormikValues>();

  const [loading, setLoading] = useState(false);
  const [fieldOptions, setFieldOptions] = useState<TMultiChoiceFieldOptions[]>(
    options ?? []
  );

  const dependentFieldValue = isDependentOn
    ? getIn(values, isDependentOn)
    : undefined;

  const prevDependentFieldValue = usePrevious(dependentFieldValue);

  const { mutate: updateApiDependentFieldOptions } = useMutation({
    onMutate: () => setLoading(true),

    mutationFn: ({ api: apiCallForMutation }: { api: string }) => {
      return getApiFieldOptions({ api: apiCallForMutation });
    },
    onSuccess: (data) => {
      const newOptions = data.data;
      if ("options" in newOptions) setFieldOptions(newOptions.options);
      else setFieldOptions(newOptions);
    },
    onSettled: () => setLoading(false),
  });

  const { mutate: updateDependentFieldOptions } = useMutation({
    onMutate: () => setLoading(true),
    mutationFn: ({
      api: apiCallForMutation,
      isDependentOn: fieldIsDependentOn,
    }: {
      api: string;
      isDependentOn: string;
    }) => {
      // the split is done so that the nested fields can get a value
      // only the main name is sent which resides at last index of split
      const isDependentOnField = fieldIsDependentOn.includes(".")
        ? fieldIsDependentOn.split(".").at(-1) ?? ""
        : fieldIsDependentOn;

      const generateApi =
        api + `?${isDependentOnField}=${getIn(values, isDependentOnField)}`;

      return getApiFieldOptions({
        api: generateApi,
      });
    },
    onSuccess: (data) => {
      const newOptions = data.data;
      if ("options" in newOptions) setFieldOptions(newOptions.options);
      else setFieldOptions(newOptions);
    },
    onSettled: () => setLoading(false),
  });

  useEffect(() => {
    if (!api || !isApiDependentField) return;
    updateApiDependentFieldOptions({ api });
  }, [api, isApiDependentField, updateApiDependentFieldOptions]);

  useEffect(() => {
    if (
      // return if no api
      !api ||
      // return if field is not dependent on other field
      !isDependentOn ||
      // return if dependentFeildValue is not present
      !dependentFieldValue ||
      // return if value of dependent field hasn't changed
      prevDependentFieldValue === dependentFieldValue
    )
      return;
    updateDependentFieldOptions({ api, isDependentOn });
  }, [
    api,
    dependentFieldValue,
    isDependentOn,
    prevDependentFieldValue,
    updateDependentFieldOptions,
  ]);

  return {
    fieldOptions,
    loading,
  };
};

export default useSetFieldOptions;
