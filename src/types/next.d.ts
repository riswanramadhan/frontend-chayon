import type { PageProps as AppPageProps } from './page';

declare module 'next' {
  export type PageProps<
    P extends Record<string, unknown> = Record<string, unknown>,
    S extends Record<string, string | string[] | undefined> = Record<string, string | string[] | undefined>
  > = AppPageProps<P, S>;
}