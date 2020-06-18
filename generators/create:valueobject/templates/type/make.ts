<%- typescriptHeader %>

import {
    applyFunctionalOptions,
    FunctionalOption,
    OnErrorOptions,
    SmartConstructor,
    THROW_THE_ERROR,
} from "@safelytyped/core-types";

import { <%= typeName %> } from "./<%= typeName %>";
import { <%= typeName %>Data } from "./<%= typeName %>Data";

/**
 * `make<%= typeName %>()` is a smart constructor. It verifies that the
 * `input` contains valid <%= typeName %> data, by calling
 * {@link mustBe<%= typeName %>Data}.
 *
 * @category <%= typeName %>
 * @param input
 * This is the data we'll use to create the new <%= typeName %>
 * @param onError
 * If `input` fails validation, we'll pass an {@link AppError} to this.
 * @param fnOpts
 * These are user-supplied functional options.
 * @returns
 * The new <%= typeName %> object.
 */
export const make<%= typeName %>: SmartConstructor<<%= typeName %>Data, <%= typeName %>, OnErrorOptions, <%= typeName %>> = (
    input: <%= typeName %>Data,
    {
        onError = THROW_THE_ERROR
    }: Partial<OnErrorOptions> = {},
    ...fnOpts: FunctionalOption<<%= typeName %>, OnErrorOptions>[]
): <%= typeName %> => applyFunctionalOptions(
    new <%= typeName %>(input, { onError }),
    { onError },
    ...fnOpts
);