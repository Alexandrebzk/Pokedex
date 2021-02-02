export interface ResponseAuth {
  access_token: string;
  refresh_token: string;
  expires_in: string;
  statusCode?: number;
  error?: string;
  message?: string;
}
