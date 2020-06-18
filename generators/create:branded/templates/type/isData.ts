<%- typescriptHeader %>

import { DEFAULT_DATA_PATH, isData } from "@safelytyped/core-types";

import { validate<%= typeName %>Data } from "./validate<%= typeName %>Data";

/**
 * `is<%= typeName %>Data()` is a data guard.
 *
 * @category <%= typeName %>
 * @param input
 * The input data to validate.
 * @returns
 * - `true` if `input` is a valid <%= typeName %> data.
 * - `false` otherwise.
 */
export const is<%= typeName %>Data = (input: <%= baseType %>): boolean =>
    isData(validate<%= typeName %>Data, input, { path: DEFAULT_DATA_PATH });