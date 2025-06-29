export type CredentialKey = string;

let currentCredential: CredentialKey | null = null;

export function setCredential(key: CredentialKey): void {
  currentCredential = key;
}

export function credential(): CredentialKey {
  if (!currentCredential) {
    throw new Error('Credential is null!');
  }
  return currentCredential;
}
