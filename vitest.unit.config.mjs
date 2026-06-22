import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

const dirname = path.dirname(fileURLToPath(import.meta.url));

/** Unit Test 専用。`pnpm test:vitest:unit` で実行。 */
export default defineConfig({
	esbuild: {
		jsx: "automatic",
	},
	resolve: {
		alias: {
			"@": path.join(dirname, "src"),
		},
	},
	test: {
		name: "unit",
		environment: "jsdom",
		include: ["src/**/*.test.{ts,tsx}"],
		setupFiles: ["src/test/vitest.setup.ts"],
	},
});
