export type AuthMethod = 'local' | 'ldap';

export interface IAccountRowPerformance {
  tags: string[] | null;
  method: AuthMethod;
  login: string;
  password: string | null;
}

export class AccountRowPerformance implements IAccountRowPerformance {
  constructor(
    public tags: string[] | null = [],
    public method: AuthMethod = 'local',
    public login: string = '',
    public password: string | null = null
  ) {}

  static parseTags(tagsInput: string | string[] | null): string[] | null {
    if (tagsInput === null) return null;
    if (Array.isArray(tagsInput)) return tagsInput.map(t => t.trim()).filter(Boolean);
    return tagsInput.split(';').map(t => t.trim()).filter(Boolean);
  }

  static create(
    tags: string | string[] = [],
    method: AuthMethod = 'local',
    login: string = '',
    password: string | null = null
  ): AccountRowPerformance {
    return new AccountRowPerformance(
      this.parseTags(tags),
      method,
      login,
      password
    );
  }
}