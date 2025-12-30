type CookieToSet = { name: string; value: string; options?: unknown };

export const createClient = async () => {
  return {
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
    },
    from: () => ({
      select: () => ({ data: null, error: null }),
      insert: () => ({ data: null, error: null }),
      update: () => ({ data: null, error: null }),
      delete: () => ({ data: null, error: null }),
      eq: () => ({ data: null, error: null }),
      limit: () => ({ data: null, error: null }),
      order: () => ({ data: null, error: null }),
      single: () => ({ data: null, error: null }),
    }),
    cookies: {
      getAll: () => [] as unknown[],
      setAll: (_cookiesToSet: CookieToSet[]) => {},
    },
  } as unknown;
};
