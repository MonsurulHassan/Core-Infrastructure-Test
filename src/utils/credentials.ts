export interface Credential {
  baseUrl: string;
  email: string;
  password: string;
  communityName: string;
  communityKey: string;
}

export function loadCredential(name: string): Credential {
  return {
    baseUrl: process.env[`${name}_BASE_URL`] || undefined,
    email: process.env[`${name}_EMAIL`] || undefined,
    password: process.env[`${name}_PASSWORD`] || undefined,
    communityName: process.env[`${name}_COMMUNITY_NAME`] || undefined,
    communityKey: process.env[`${name}_COMMUNITY_KEY`] || undefined
  };
}
