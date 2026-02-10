import type { GitHubSearchResponse, GitHubUserDetails } from "./types/github";
import { Skeleton } from "@/components/ui/skeleton";

import { useState } from "react";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import {
  Search,
  Github,
  ExternalLink,
  MapPin,
  Users,
  Code,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// --- API Fetchers ---
const searchGithubUsers = async (
  term: string,
): Promise<GitHubSearchResponse> => {
  if (!term) return { total_count: 0, items: [] };

  const response = await fetch(`https://api.github.com/search/users?q=${term}`);

  if (response.status === 403) {
    throw new Error("Rate limit exceeded. Please wait a minute.");
  }

  if (!response.ok) {
    throw new Error("Failed to fetch users from GitHub.");
  }

  return response.json();
};

const fetchUserDetails = async (
  username: string,
): Promise<GitHubUserDetails> => {
  const response = await fetch(`https://api.github.com/users/${username}`);

  if (!response.ok) {
    throw new Error("Failed to fetch user details.");
  }

  return response.json();
};

// --- User Details Modal Component ---
function UserDetailsModal({
  username,
  isOpen,
  onClose,
}: {
  username: string | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user-details", username],
    queryFn: () => fetchUserDetails(username!),
    enabled: isOpen && !!username,
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-slate-200">
              <AvatarImage src={data?.avatar_url} />
              <AvatarFallback>{username?.[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle className="text-2xl">{data?.login}</DialogTitle>
              {data?.location && (
                <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                  <MapPin className="w-4 h-4" />
                  {data.location}
                </div>
              )}
            </div>
          </div>
        </DialogHeader>

        {isLoading && (
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        )}

        {isError && (
          <p className="text-red-500 text-sm">Failed to load user details.</p>
        )}

        {data && (
          <div className="space-y-4">
            {data.bio && (
              <p className="text-sm text-slate-600 italic">{data.bio}</p>
            )}

            {data.company && (
              <div className="flex items-center gap-2 text-sm">
                <Code className="w-4 h-4 text-slate-400" />
                <span>
                  Works at <strong>{data.company}</strong>
                </span>
              </div>
            )}

            <div className="grid grid-cols-3 gap-4 pt-2 border-t border-slate-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">
                  {data.public_repos}
                </div>
                <p className="text-xs text-slate-500 mt-1">Public Repos</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Users className="w-4 h-4" />
                  <span className="text-2xl font-bold text-slate-900">
                    {(data.followers / 1000).toFixed(1)}k
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Followers</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">
                  {data.following}
                </div>
                <p className="text-xs text-slate-500 mt-1">Following</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200">
              <p className="text-xs text-slate-400 mb-2">Member since</p>
              <p className="text-sm font-medium">
                {new Date(data.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <a
              href={data.html_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              View on GitHub
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// --- Main Component ---
function GitHubSearch() {
  const [text, setText] = useState("");
  const [debouncedSearchTerm] = useDebounce(text, 500);
  const [selectedUsername, setSelectedUsername] = useState<string | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["github-search", debouncedSearchTerm],
    queryFn: () => searchGithubUsers(debouncedSearchTerm),
    enabled: debouncedSearchTerm.length > 2,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  const handleCardClick = (username: string) => {
    setSelectedUsername(username);
    setIsDetailsOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Github className="w-12 h-12 text-slate-900" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            GitHub User Search
          </h1>
          <p className="text-slate-500">
            Search millions of developers using TanStack Query & Debouncing
          </p>
        </div>

        {/* Search Input Area */}
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
          <Input
            placeholder="Search by username (e.g., 'octocat')..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="pl-10 py-6 text-lg shadow-sm border-slate-200 focus:ring-2 focus:ring-slate-900"
          />
        </div>

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid gap-4 sm:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="border border-slate-200 rounded-lg p-5">
                <div className="flex flex-row items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Other status messages */}
        {isError && (
          <p className="text-center text-red-500 font-medium">
            {(error as Error).message}
          </p>
        )}
        {data?.total_count === 0 && debouncedSearchTerm.length > 2 && (
          <p className="text-center text-slate-500">
            No users found for "{debouncedSearchTerm}"
          </p>
        )}

        {/* Results Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {data?.items.map((user) => (
            <button
              key={user.id}
              onClick={() => handleCardClick(user.login)}
              className="group text-left"
            >
              <Card className="border-slate-200 transition-all duration-200 group-hover:border-slate-900 group-hover:shadow-md cursor-pointer">
                <CardHeader className="flex flex-row items-center gap-4 py-4 px-5">
                  <Avatar className="h-12 w-12 border border-slate-100">
                    <AvatarImage src={user.avatar_url} />
                    <AvatarFallback>
                      {user.login[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <CardTitle className="text-lg truncate group-hover:text-blue-600 transition-colors">
                      {user.login}
                    </CardTitle>
                    <CardDescription className="capitalize">
                      {user.type}
                    </CardDescription>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-slate-900" />
                </CardHeader>
              </Card>
            </button>
          ))}
        </div>
      </div>

      {/* User Details Modal */}
      <UserDetailsModal
        username={selectedUsername}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />
    </div>
  );
}

// --- Query Client Setup ---
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GitHubSearch />
    </QueryClientProvider>
  );
}
