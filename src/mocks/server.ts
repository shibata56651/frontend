import { setupServer } from "msw/node";

import { handlers } from "./handlers";

/** Node（Vitest / SSR）用 MSW */
export const server = setupServer(...handlers);
