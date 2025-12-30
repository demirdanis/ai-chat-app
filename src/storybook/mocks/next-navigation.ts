type Router = {
  push: (href: string) => void;
  replace: (href: string) => void;
  refresh: () => void;
  back: () => void;
  forward: () => void;
  prefetch: (href: string) => void;
};

const router: Router = {
  push: () => {},
  replace: () => {},
  refresh: () => {},
  back: () => {},
  forward: () => {},
  prefetch: () => {},
};

export const useRouter = (): Router => router;

export const useParams = <T extends Record<string, string | string[]>>(): T =>
  ({} as unknown as T);

export const usePathname = (): string => "/";

export const useSearchParams = (): URLSearchParams => new URLSearchParams();

export const redirect = (_url: string) => {
  throw new Error("redirect() is not supported in Storybook mocks");
};

export const notFound = () => {
  throw new Error("notFound() is not supported in Storybook mocks");
};
