export interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  type: string;
}

export interface GitHubSearchResponse {
  total_count: number;
  items: GitHubUser[];
}

export interface GitHubUserDetails {
  login: string;
  avatar_url: string;
  location?: string;
  bio?: string;
  company?: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  html_url: string;
}