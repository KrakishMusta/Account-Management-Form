export type AuthMethod = 'local' | 'ldap';

export interface IAccountRowPerformance {
  tags: string[];
  method: AuthMethod;
  login: string;
  password: string | null;
}

export class AccountRowPerformance implements IAccountRowPerformance {
  constructor(
    public tags: string[] = [],
    public method: AuthMethod = 'local',
    public login: string = '',
    public password: string | null = null
  ) {}

  static parseTags(tagsInput: string | string[]): string[] {
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