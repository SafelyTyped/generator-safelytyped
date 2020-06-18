<%= typescriptHeader %>

import { AppErrorOr, DataPath } from "@safelytyped/core-types";

import { <%= typeName %>Data } from "./<%= typeName %>Data";
import { Invalid<%= typeName %>DataError } from "../Errors";

/**
 * `validate<%= typeName %>Data()` is a {@link DataValidator}. Use it to
 * prove that the given input is a legal input value for
 * {@link make<%= typeName %>}
 *
 * @param path
 * where are we in the data structure that you are validating?
 * @param input
 * the value to validate
 * @returns
 * - `input` (type-cast to <%= typeName %>) if validation succeeds, or
 * - an `AppError` explaining why validation failed
 *
 * @category <%= typeName %>
 */
export function validate<%= typeName %>Data (
    path: DataPath,
    input: <%= baseType %>
): AppErrorOr<<%= typeName %>Data> {
    // add your validation code in here
    //
    // this is an example for you to replace ...
    if (!<%= typeName %>Regex.test(input)) {
        return new Invalid<%= typeName %>DataError({
            public: {
                dataPath: path,
                input: input
            }
        });
    }

    // all done
    return input as <%= typeName %>Data;
}