<%- typescriptHeader %>

import {
    DataPath,
    DEFAULT_DATA_PATH,
    mustBe,
    OnError,
    THROW_THE_ERROR,
} from "@safelytyped/core-types";

import { validate<%- typeName %>Data } from "./validate<%- typeName %>Data";

/**
 * `mustBe<%- typeName %>Data()` is a type guarantee. It calls the supplied
 * {@link OnError} handler if the input value can't be used to create
 * {@link <%- typeName %>}.
 *
 * @category <%- typeName %>
 */
export const mustBe<%- typeName %>Data = (
    input: <%- inputType %>,
    {
        onError = THROW_THE_ERROR,
        path = DEFAULT_DATA_PATH,
    }: {
        onError?: OnError,
        path?: DataPath,
    } = {},
): <%- inputType %> =>
    mustBe(input, { onError })
        .next((x) => validate<%- typeName %>Data(path, x))
        .value();