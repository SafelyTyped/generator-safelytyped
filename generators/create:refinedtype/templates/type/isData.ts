<%- typescriptHeader %>

import { IS_DATA_DEFAULT_OPTIONS, isData } from "@safelytyped/core-types";

import { validate<%- typeName %>Data } from "./validate<%- typeName %>Data";

/**
 * `is<%- typeName %>Data()` is a data guard.
 *
 * @category <%- typeName %>
 * @param input
 * The input data to validate.
 * @returns
 * - `true` if `input` can be used to make a new {@link <%- typeName %>}
 * - `false` otherwise.
 */
export const is<%- typeName %>Data = (input: <%- inputType %>): boolean =>
    isData(validate<%- typeName %>Data, input, IS_DATA_DEFAULT_OPTIONS);