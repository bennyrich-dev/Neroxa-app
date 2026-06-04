import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { Content, Genre, HealthStatus, ListContentParams, SearchContentParams, SearchResult, WatchlistInput, WatchlistItem } from './api.schemas';
import { customFetch } from '../custom-fetch';
import type { ErrorType, BodyType } from '../custom-fetch';
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
export declare const getHealthCheckUrl: () => string;
/**
 * @summary Health check
 */
export declare const healthCheck: (options?: RequestInit) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListContentUrl: (params?: ListContentParams) => string;
/**
 * @summary List all content
 */
export declare const listContent: (params?: ListContentParams, options?: RequestInit) => Promise<Content[]>;
export declare const getListContentQueryKey: (params?: ListContentParams) => readonly ["/api/content", ...ListContentParams[]];
export declare const getListContentQueryOptions: <TData = Awaited<ReturnType<typeof listContent>>, TError = ErrorType<unknown>>(params?: ListContentParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listContent>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listContent>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListContentQueryResult = NonNullable<Awaited<ReturnType<typeof listContent>>>;
export type ListContentQueryError = ErrorType<unknown>;
/**
 * @summary List all content
 */
export declare function useListContent<TData = Awaited<ReturnType<typeof listContent>>, TError = ErrorType<unknown>>(params?: ListContentParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listContent>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetFeaturedContentUrl: () => string;
/**
 * @summary Get featured/hero content
 */
export declare const getFeaturedContent: (options?: RequestInit) => Promise<Content[]>;
export declare const getGetFeaturedContentQueryKey: () => readonly ["/api/content/featured"];
export declare const getGetFeaturedContentQueryOptions: <TData = Awaited<ReturnType<typeof getFeaturedContent>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getFeaturedContent>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getFeaturedContent>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetFeaturedContentQueryResult = NonNullable<Awaited<ReturnType<typeof getFeaturedContent>>>;
export type GetFeaturedContentQueryError = ErrorType<unknown>;
/**
 * @summary Get featured/hero content
 */
export declare function useGetFeaturedContent<TData = Awaited<ReturnType<typeof getFeaturedContent>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getFeaturedContent>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetTrendingContentUrl: () => string;
/**
 * @summary Get trending content
 */
export declare const getTrendingContent: (options?: RequestInit) => Promise<Content[]>;
export declare const getGetTrendingContentQueryKey: () => readonly ["/api/content/trending"];
export declare const getGetTrendingContentQueryOptions: <TData = Awaited<ReturnType<typeof getTrendingContent>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getTrendingContent>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getTrendingContent>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetTrendingContentQueryResult = NonNullable<Awaited<ReturnType<typeof getTrendingContent>>>;
export type GetTrendingContentQueryError = ErrorType<unknown>;
/**
 * @summary Get trending content
 */
export declare function useGetTrendingContent<TData = Awaited<ReturnType<typeof getTrendingContent>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getTrendingContent>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetNewReleasesUrl: () => string;
/**
 * @summary Get new releases
 */
export declare const getNewReleases: (options?: RequestInit) => Promise<Content[]>;
export declare const getGetNewReleasesQueryKey: () => readonly ["/api/content/new-releases"];
export declare const getGetNewReleasesQueryOptions: <TData = Awaited<ReturnType<typeof getNewReleases>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getNewReleases>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getNewReleases>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetNewReleasesQueryResult = NonNullable<Awaited<ReturnType<typeof getNewReleases>>>;
export type GetNewReleasesQueryError = ErrorType<unknown>;
/**
 * @summary Get new releases
 */
export declare function useGetNewReleases<TData = Awaited<ReturnType<typeof getNewReleases>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getNewReleases>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetContentUrl: (id: number) => string;
/**
 * @summary Get specific content by ID
 */
export declare const getContent: (id: number, options?: RequestInit) => Promise<Content>;
export declare const getGetContentQueryKey: (id: number) => readonly [`/api/content/${number}`];
export declare const getGetContentQueryOptions: <TData = Awaited<ReturnType<typeof getContent>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getContent>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getContent>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetContentQueryResult = NonNullable<Awaited<ReturnType<typeof getContent>>>;
export type GetContentQueryError = ErrorType<void>;
/**
 * @summary Get specific content by ID
 */
export declare function useGetContent<TData = Awaited<ReturnType<typeof getContent>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getContent>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetRecommendationsUrl: (id: number) => string;
/**
 * @summary Get recommendations for content
 */
export declare const getRecommendations: (id: number, options?: RequestInit) => Promise<Content[]>;
export declare const getGetRecommendationsQueryKey: (id: number) => readonly [`/api/content/${number}/recommendations`];
export declare const getGetRecommendationsQueryOptions: <TData = Awaited<ReturnType<typeof getRecommendations>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getRecommendations>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getRecommendations>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetRecommendationsQueryResult = NonNullable<Awaited<ReturnType<typeof getRecommendations>>>;
export type GetRecommendationsQueryError = ErrorType<unknown>;
/**
 * @summary Get recommendations for content
 */
export declare function useGetRecommendations<TData = Awaited<ReturnType<typeof getRecommendations>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getRecommendations>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListGenresUrl: () => string;
/**
 * @summary List all genres
 */
export declare const listGenres: (options?: RequestInit) => Promise<Genre[]>;
export declare const getListGenresQueryKey: () => readonly ["/api/genres"];
export declare const getListGenresQueryOptions: <TData = Awaited<ReturnType<typeof listGenres>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listGenres>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listGenres>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListGenresQueryResult = NonNullable<Awaited<ReturnType<typeof listGenres>>>;
export type ListGenresQueryError = ErrorType<unknown>;
/**
 * @summary List all genres
 */
export declare function useListGenres<TData = Awaited<ReturnType<typeof listGenres>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listGenres>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getSearchContentUrl: (params: SearchContentParams) => string;
/**
 * @summary Search content
 */
export declare const searchContent: (params: SearchContentParams, options?: RequestInit) => Promise<SearchResult>;
export declare const getSearchContentQueryKey: (params?: SearchContentParams) => readonly ["/api/search", ...SearchContentParams[]];
export declare const getSearchContentQueryOptions: <TData = Awaited<ReturnType<typeof searchContent>>, TError = ErrorType<unknown>>(params: SearchContentParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof searchContent>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof searchContent>>, TError, TData> & {
    queryKey: QueryKey;
};
export type SearchContentQueryResult = NonNullable<Awaited<ReturnType<typeof searchContent>>>;
export type SearchContentQueryError = ErrorType<unknown>;
/**
 * @summary Search content
 */
export declare function useSearchContent<TData = Awaited<ReturnType<typeof searchContent>>, TError = ErrorType<unknown>>(params: SearchContentParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof searchContent>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetWatchlistUrl: () => string;
/**
 * @summary Get watchlist
 */
export declare const getWatchlist: (options?: RequestInit) => Promise<WatchlistItem[]>;
export declare const getGetWatchlistQueryKey: () => readonly ["/api/watchlist"];
export declare const getGetWatchlistQueryOptions: <TData = Awaited<ReturnType<typeof getWatchlist>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getWatchlist>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getWatchlist>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetWatchlistQueryResult = NonNullable<Awaited<ReturnType<typeof getWatchlist>>>;
export type GetWatchlistQueryError = ErrorType<unknown>;
/**
 * @summary Get watchlist
 */
export declare function useGetWatchlist<TData = Awaited<ReturnType<typeof getWatchlist>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getWatchlist>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getAddToWatchlistUrl: () => string;
/**
 * @summary Add content to watchlist
 */
export declare const addToWatchlist: (watchlistInput: WatchlistInput, options?: RequestInit) => Promise<WatchlistItem>;
export declare const getAddToWatchlistMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof addToWatchlist>>, TError, {
        data: BodyType<WatchlistInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof addToWatchlist>>, TError, {
    data: BodyType<WatchlistInput>;
}, TContext>;
export type AddToWatchlistMutationResult = NonNullable<Awaited<ReturnType<typeof addToWatchlist>>>;
export type AddToWatchlistMutationBody = BodyType<WatchlistInput>;
export type AddToWatchlistMutationError = ErrorType<unknown>;
/**
* @summary Add content to watchlist
*/
export declare const useAddToWatchlist: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof addToWatchlist>>, TError, {
        data: BodyType<WatchlistInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof addToWatchlist>>, TError, {
    data: BodyType<WatchlistInput>;
}, TContext>;
export declare const getRemoveFromWatchlistUrl: (contentId: number) => string;
/**
 * @summary Remove content from watchlist
 */
export declare const removeFromWatchlist: (contentId: number, options?: RequestInit) => Promise<void>;
export declare const getRemoveFromWatchlistMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof removeFromWatchlist>>, TError, {
        contentId: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof removeFromWatchlist>>, TError, {
    contentId: number;
}, TContext>;
export type RemoveFromWatchlistMutationResult = NonNullable<Awaited<ReturnType<typeof removeFromWatchlist>>>;
export type RemoveFromWatchlistMutationError = ErrorType<unknown>;
/**
* @summary Remove content from watchlist
*/
export declare const useRemoveFromWatchlist: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof removeFromWatchlist>>, TError, {
        contentId: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof removeFromWatchlist>>, TError, {
    contentId: number;
}, TContext>;
export {};
//# sourceMappingURL=api.d.ts.map