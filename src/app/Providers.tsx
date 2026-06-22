"use client";

import { MswProvider } from "@/mocks/MswProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";

export function Providers({ children }: { children: ReactNode }) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 0,
					},
				},
			}),
	);

	return (
		<MswProvider>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</MswProvider>
	);
}
