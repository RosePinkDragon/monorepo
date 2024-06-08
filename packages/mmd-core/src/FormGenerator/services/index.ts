import axios from "axios";

import type { TMultiChoiceFieldOptions } from "~/types/formField";
import type { TGetApiDependentFieldsResponse } from "~/types/services";

export const getApiFieldOptions = async ({ api }: { api: string }) => {
  return axios.get<TMultiChoiceFieldOptions[] | TGetApiDependentFieldsResponse>(
    api
  );
};
