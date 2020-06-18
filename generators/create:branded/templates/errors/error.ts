<%- typescriptHeader %>

import {
    AppError,
    AppErrorData,
    makeHttpStatusCode,
    makeStructuredProblemReport
} from "@safelytyped/core-types";

import { MODULE_NAME } from "../defaults/MODULE_NAME";
import { Invalid<%= typeName %>Data } from "./Invalid<%= typeName %>Data";

/**
 * `Invalid<%= typeName %>Error` is thrown whenever we're given an
 * invalid value to {@link make<%= typeName %>}.
 *
 * @category Errors
 */
export class Invalid<%= typeName %>Error extends AppError<Invalid<%= typeName %>Data> {
    public constructor(params: Invalid<%= typeName %>Data & AppErrorData) {
        const spr = makeStructuredProblemReport<Invalid<%= typeName %>Data>({
            definedBy: MODULE_NAME,
            description: "input falls outside the range of a valid <%= typeName %>",
            errorId: params.errorId,
            extra: { public: params.public },
            status: makeHttpStatusCode(422),
        });

        super(spr);
    }
}