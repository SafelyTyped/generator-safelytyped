<%- typescriptHeader %>

import { IS_DATA_DEFAULT_OPTIONS, isData } from "@safelytyped/core-types";

import { <%= typeName %>Data } from "./<%= typeName %>Data";
import { validate<%= typeName %>Data } from "./validate<%= typeName %>Data";

/**
 * `is<%= typeName %>Data()` is a type guard.
 *
 * @category <%= typeName %>
 * @param input
 * The input data to validate.
 * @returns
 * - `true` if `input` can be used as <%= typeName %>Data.
 * - `false` otherwise.
 */
export const is<%= typeName %>Data = (input: <%= baseType %>): input is <%= typeName %>Data =>
    isData(validate<%= typeName %>Data, input, IS_DATA_DEFAULT_OPTIONS);