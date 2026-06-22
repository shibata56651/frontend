import { afterEach, describe, expect, it, vi } from "vitest";

import { shouldUseBrowserMsw } from "./shouldUseBrowserMsw";

describe("shouldUseBrowserMsw", () => {
	const originalEnv = { ...process.env };

	afterEach(() => {
		process.env = { ...originalEnv };
	});

	it("NEXT_PUBLIC_API_BASE_URL が設定されていると false を返す", () => {
		vi.stubEnv("NODE_ENV", "development");
		vi.stubEnv("NEXT_PUBLIC_API_BASE_URL", "http://localhost:4010");
		vi.stubEnv("NEXT_PUBLIC_API_MOCKING", "enabled");
		expect(shouldUseBrowserMsw()).toBe(false);
	});

	it("NEXT_PUBLIC_API_MOCKING が false のとき false を返す", () => {
		vi.stubEnv("NODE_ENV", "development");
		process.env.NEXT_PUBLIC_API_BASE_URL = undefined;
		vi.stubEnv("NEXT_PUBLIC_API_MOCKING", "false");
		expect(shouldUseBrowserMsw()).toBe(false);
	});

	it("開発環境かつ Prism 環境変数なしのとき true を返す", () => {
		vi.stubEnv("NODE_ENV", "development");
		process.env.NEXT_PUBLIC_API_BASE_URL = undefined;
		process.env.NEXT_PUBLIC_API_MOCKING = undefined;
		expect(shouldUseBrowserMsw()).toBe(true);
	});
});
