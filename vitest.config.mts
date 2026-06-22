import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

const dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Vitest 4 + Vite 7 は設定ファイルを ESM として読み込む必要がある。
 * `vitest.config.ts`（CJS 経由の読み込み）だと `ERR_REQUIRE_ESM` になるため `.mts` を使用する。
 */
export default defineConfig({
	esbuild: {
		jsx: "automatic",
	},
	resolve: {
		alias: {
			"@": path.resolve(dirname, "./src"),
		},
	},
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: ["src/test/vitest.setup.ts"],
		include: ["src/**/*.{test,spec}.{ts,tsx}"],
		exclude: ["node_modules", ".next"],
		/** `vi.useFakeTimers` 等のグローバル状態がファイル間で共有されないよう隔離する */
		pool: "forks",
		/**
		 * 全ファイルを無制限並列で fork するとマシンが過負荷になり、
		 * worker 起動タイムアウトやテストタイムアウトの偽陽性が多発する。
		 */
		maxWorkers: 2,
		minWorkers: 1,
		testTimeout: 15000,
	},
});
