export interface AuthUserModel {
  /**
   * Full Model form Auth0
   */
  email: string;
  email_verified?: boolean;
  username?: string;
  given_name?: string;
  family_name?: string;
  name?: string;
  blocked?: boolean;
  password_hash?: string;
  app_metadata?: {};
  user_metadata?: {};
}

