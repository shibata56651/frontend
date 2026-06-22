import { http, HttpResponse } from "msw";

export const authHandlers = [
	http.post("http://localhost:8089/login", async ({ request }) => {
		const body = await request.json() as { email: string; password: string };

		if (body.email === "test@example.com" && body.password === "password") {
			return HttpResponse.json({ token: "mock-token-12345" });
		}

		return HttpResponse.json(
			{ message: "メールアドレスまたはパスワードが正しくありません" },
			{ status: 401 },
		);
	}),
];
