<%= typescriptHeader %>

import { expect } from "chai";
import { describe } from "mocha";

import { Invalid<%= typeName %>Error } from "./Invalid<%= typeName %>Error";
import { DEFAULT_DATA_PATH } from "@safelytyped/core-types";

describe("Invalid<%= typeName %>Error", () => {
    describe(".constructor()", () => {
        it("creates a Javascript error", () => {
            const unit = new Invalid<%= typeName %>Error({
                public: {
                    dataPath: DEFAULT_DATA_PATH,
                    input: 600,
                },
            });

            expect(unit).to.be.instanceOf(Error);
        });
    });
});