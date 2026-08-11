export const siteBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function sitePath(path: string): string {
  if (!siteBasePath || !path.startsWith("/")) return path;
  return `${siteBasePath}${path}`;
}
