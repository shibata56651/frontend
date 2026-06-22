import { shouldUseBrowserMsw } from "./shouldUseBrowserMsw";

/**
 * MSW の初期化を環境別に振り分ける統合エントリポイント。
 * - ブラウザ: Service Worker を起動
 * - Node.js: setupServer 経由で fetch を横取り
 * - 本番環境: 何もしない
 */
export async function initMocks(): Promise<void> {
	if (process.env.NODE_ENV !== "development") return;
	if (!shouldUseBrowserMsw()) return;

	if (typeof window === "undefined") {
		const { server } = await import("./server");
		server.listen({ onUnhandledRequest: "warn" });
		console.log("[MSW] Node server started");
	} else {
		const { worker } = await import("./browser");
		await worker.start({
			onUnhandledRequest: "bypass",
			serviceWorker: { url: "/mockServiceWorker.js" },
		});
		console.log("[MSW] Browser worker started");
	}
}
