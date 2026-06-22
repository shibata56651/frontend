import { API_BASE_URL } from "./config";

export type LoginRequest = {
	email: string;
	password: string;
};

export type LoginResponse = {
	token: string;
};

export async function login(data: LoginRequest): Promise<LoginResponse> {
	const response = await fetch(`${API_BASE_URL}/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		throw new Error("メールアドレスまたはパスワードが正しくありません");
	}

	return response.json();
}
