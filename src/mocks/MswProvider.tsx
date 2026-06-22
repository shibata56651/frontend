"use client";

import { shouldUseBrowserMsw } from "@/mocks/shouldUseBrowserMsw";
import { type ReactNode, useEffect, useState } from "react";

/**
 * 開発モードで MSW（Service Worker）を起動してから子要素をレンダリングするクライアントコンポーネント。
 * `NEXT_PUBLIC_API_BASE_URL` または `NEXT_PUBLIC_API_MOCKING=false` のときは MSW を起動しない。
 * 本番ビルドではそのまま `children` を返す。
 */
export function MswProvider({ children }: { children: ReactNode }) {
	const [mswReady, setMswReady] = useState(() => !shouldUseBrowserMsw());

	useEffect(() => {
		if (!shouldUseBrowserMsw()) return;
		let cancelled = false;

		(async () => {
			const { worker } = await import("./browser");
			await worker.start({
				onUnhandledRequest: "bypass",
				serviceWorker: { url: "/mockServiceWorker.js" },
			});
			if (!cancelled) setMswReady(true);
		})();

		return () => {
			cancelled = true;
		};
	}, []);

	if (!mswReady) return null;
	return <>{children}</>;
}
