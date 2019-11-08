export const cookieSettings = {
  domain: process.env.BASE_DOMAIN,
  expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  path: "/"
};
