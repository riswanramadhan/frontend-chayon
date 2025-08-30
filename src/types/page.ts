export type PageProps<
  P extends Record<string, unknown> = Record<string, unknown>,
  S extends Record<string, string | string[] | undefined> = Record<string, string | string[] | undefined>
> = {
  params: P;
  searchParams?: S;
};