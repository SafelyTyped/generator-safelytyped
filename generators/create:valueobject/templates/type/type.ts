<%- typescriptHeader %>

import {
    OnErrorOptions,
    THROW_THE_ERROR,
    ValueObject
} from "@safelytyped/core-types";

import { <%= typeName %>Data } from "./<%= typeName %>Data";
import { mustBe<%= typeName %>Data } from "./mustBe<%= typeName %>Data";

/**
 * `<%= typeName %>` is a safe type.
 *
 * @category <%= typeName %>
 */
export class <%= typeName %> extends ValueObject<<%= typeName %>Data> {
    /**
     * `Constructor` creates a new `<%= typeName %>`.
     *
     * @param input
     * The data we need to build a <%= typeName %>.
     * @param onError
     * If `input` fails validation, we pass an {@link AppError}
     * to `onError()`.
     */
    public constructor(
        input: <%= typeName %>Data,
        {
            onError = THROW_THE_ERROR
        }: Partial<OnErrorOptions> = {}
    ) {
        // enforce the contract
        mustBe<%= typeName %>Data(input, { onError });

        // all done
        super(input);
    }
}