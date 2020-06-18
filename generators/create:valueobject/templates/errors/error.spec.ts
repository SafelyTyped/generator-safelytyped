<%- typescriptHeader %>

import { expect } from "chai";
import { describe } from "mocha";

import { Invalid<%= typeName %>DataError } from "./Invalid<%= typeName %>DataError";
import { DEFAULT_DATA_PATH } from "@safelytyped/core-types";

describe("Invalid<%= typeName %>DataError", () => {
    describe(".constructor()", () => {
        it("creates a Javascript error", () => {
            const unit = new Invalid<%= typeName %>DataError({
                public: {
                    dataPath: DEFAULT_DATA_PATH,
                    input: 600,
                },
            });

            expect(unit).to.be.instanceOf(Error);
        });
    });
});