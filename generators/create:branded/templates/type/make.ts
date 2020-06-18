<%= typescriptHeader %>

import {
    FunctionalOption,
    makeNominalType,
    OnErrorOptions,
    SmartConstructor,
    THROW_THE_ERROR,
} from "@safelytyped/core-types";

import { mustBe<%= typeName %>Data } from "./mustBe<%= typeName %>Data";
import { <%= typeName %> } from "./<%= typeName %>";

/**
 * `make<%= typeName %>()` is a smart constructor. It verifies that the
 * `input` contains valid <%= typeName %> data, by calling
 * {@link mustBe<%= typeName %>Data}.
 *
 * @category <%= typeName %>
 * @param input
 * @param onError
 * @param fnOpts
 * @returns
 * The validated input, as a <%= typeName %> type.
 */
export const make<%= typeName %>: SmartConstructor<<%= baseType %>, <%= typeName %>, OnErrorOptions, <%= baseType %> | <%= typeName %>> = (
    input: <%= baseType %>,
    { onError = THROW_THE_ERROR }: Partial<OnErrorOptions> = {},
    ...fnOpts: FunctionalOption<<%= baseType %> | <%= typeName %>, OnErrorOptions>[]
): <%= typeName %> => makeNominalType<<%= baseType %>, <%= typeName %>, OnErrorOptions>(
    mustBe<%= typeName %>Data,
    input,
    { onError },
    ...fnOpts
);