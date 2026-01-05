export const fetcher = (path: string, token?: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_HOST;
  const url = `${baseUrl}${path}`;

  return fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    credentials: "include",
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  });
};
