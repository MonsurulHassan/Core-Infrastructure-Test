export type CredentialKey = string;

let credential: CredentialKey | null = null;

export function setCredential(key: CredentialKey): void {
  credential = key;
}

export function currentCredential(): CredentialKey {
  if (!credential) {
    throw new Error('Credential is null!');
  }
  return credential;
}
