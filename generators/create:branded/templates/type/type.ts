<%- typescriptHeader %>

import { Branded } from "@safelytyped/core-types";

/**
 * `<%= typeName %>` is a safe type.
 *
 * At runtime, <%= typeName %> resolves to being just a `<%= baseType %>`.
 *
 * @category <%= typeName %>
 */
export type <%= typeName %> = Branded<<%= baseType %>, "<%= packageName %>/<%= typeName %>">;