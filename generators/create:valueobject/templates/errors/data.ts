<%- typescriptHeader %>

import { DataPath, ExtraPublicData } from "@safelytyped/core-types";

/**
 * `Invalid<%= typeName %>Data` defines the data that every
 * {@link Invalid<%= typeName %>Error} requires.
 *
 * @category Errors
 */
export interface Invalid<%= typeName %>Data extends ExtraPublicData {
    public: {
        dataPath: DataPath;
        input: <%= baseType %>;
    };
}