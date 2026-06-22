"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type RenderOptions, render } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";

function createTestQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
				gcTime: 0,
			},
		},
	});
}

interface AllTheProvidersProps {
	children: ReactNode;
	queryClient?: QueryClient;
}

function AllTheProviders({
	children,
	queryClient = createTestQueryClient(),
}: AllTheProvidersProps) {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}

export function renderWithProviders(
	ui: ReactElement,
	options?: Omit<RenderOptions, "wrapper"> & {
		queryClient?: QueryClient;
	},
) {
	const { queryClient, ...renderOptions } = options ?? {};
	const Wrapper = ({ children }: { children: ReactNode }) => (
		<AllTheProviders queryClient={queryClient}>{children}</AllTheProviders>
	);
	return {
		...render(ui, { wrapper: Wrapper, ...renderOptions }),
		queryClient: options?.queryClient ?? createTestQueryClient(),
	};
}

export * from "@testing-library/react";
