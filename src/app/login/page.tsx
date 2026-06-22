import { LoginForm } from "./_components/LoginForm";

export default function LoginPage() {
	return (
		<main className="flex min-h-screen items-center justify-center bg-gray-900">
			<div className="w-full max-w-md rounded-lg bg-gray-800 p-8 shadow-xl">
				<h1 className="mb-6 text-center text-2xl font-bold text-gray-100">
					ログイン
				</h1>
				<LoginForm />
			</div>
		</main>
	);
}
