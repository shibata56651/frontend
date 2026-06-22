"use client";

import { login } from "@/api/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
	email: z
		.string()
		.min(1, "メールアドレスを入力してください")
		.email("メールアドレスの形式が正しくありません"),
	password: z.string().min(1, "パスワードを入力してください"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
	const router = useRouter();
	const [apiError, setApiError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (data: LoginFormValues) => {
		setApiError(null);
		try {
			await login(data);
			router.push("/");
		} catch (err) {
			setApiError(
				err instanceof Error ? err.message : "ログインに失敗しました",
			);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
			{apiError && (
				<div className="rounded-md bg-red-900/40 p-3 text-sm text-red-400">
					{apiError}
				</div>
			)}

			<div>
				<label
					htmlFor="email"
					className="mb-1 block text-sm font-medium text-gray-300"
				>
					メールアドレス
				</label>
				<input
					id="email"
					type="email"
					autoComplete="email"
					placeholder="example@example.com"
					{...register("email")}
					className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
				/>
				{errors.email && (
					<p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
				)}
			</div>

			<div>
				<label
					htmlFor="password"
					className="mb-1 block text-sm font-medium text-gray-300"
				>
					パスワード
				</label>
				<input
					id="password"
					type="password"
					autoComplete="current-password"
					placeholder="パスワードを入力"
					{...register("password")}
					className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
				/>
				{errors.password && (
					<p className="mt-1 text-xs text-red-400">{errors.password.message}</p>
				)}
			</div>

			<button
				type="submit"
				disabled={isSubmitting}
				className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
			>
				{isSubmitting ? "ログイン中..." : "ログイン"}
			</button>
		</form>
	);
}
