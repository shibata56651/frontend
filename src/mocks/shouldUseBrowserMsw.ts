/**
 * 開発時に Browser MSW（Service Worker）を起動するか。
 *
 * - `NEXT_PUBLIC_API_MOCKING=false` … 明示的に MSW オフ（Prism 等へ実リクエスト）
 * - `NEXT_PUBLIC_API_BASE_URL` 設定時 … バックエンド mock / 実 API へ向ける
 */
export function shouldUseBrowserMsw(): boolean {
	if (process.env.NODE_ENV !== "development") {
		return false;
	}
	if (process.env.NEXT_PUBLIC_API_MOCKING === "false") {
		return false;
	}
	if (process.env.NEXT_PUBLIC_API_BASE_URL?.trim()) {
		return false;
	}
	return true;
}
