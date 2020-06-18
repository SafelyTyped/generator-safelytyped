<%- typescriptHeader %>

import {
    OnErrorOptions,
    <%- baseType %>,
    THROW_THE_ERROR
} from "@safelytyped/core-types";

import { mustBe<%- typeName %>Data } from "./mustBe<%- typeName %>Data";

/**
 * `<%- typeName %>` is a safe type.
 *
 * @category <%- typeName %>
 */
export class <%- typeName %> extends <%- baseType %> {
    /**
     * `Constructor` creates a new `<%- typeName %>`.
     *
     * @param input
     * The data we need to build a <%- typeName %>.
     * @param onError
     * If `input` fails validation, we pass an {@link AppError}
     * to `onError()`.
     */
    public constructor(
        input: <%- inputType %>,
        {
            onError = THROW_THE_ERROR
        }: Partial<OnErrorOptions> = {}
    ) {
        super(mustBe<%- typeName %>Data, input, { onError });
    }
}