import { useState } from 'react';
import { useMatchesQuery } from '../hooks/queries';
import { EmojiEvents, AccessTime, Person } from '@mui/icons-material';

export function Matches() {
    const { data: matches = [], isLoading, error } = useMatchesQuery();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const ITEMS_PER_PAGE = 15;

    // Pagination logic
    const totalPages = Math.ceil(matches.length / ITEMS_PER_PAGE);
    const paginatedMatches = matches.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };

    const getDuration = (start: string, end: string | null) => {
        if (!end) return 'Ongoing';
        const startTime = new Date(start).getTime();
        const endTime = new Date(end).getTime();
        const diffMinutes = Math.round((endTime - startTime) / 60000);
        return `${diffMinutes} min`;
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">Match History</h1>
                <p className="text-base-content/70">View all played matches and results</p>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="flex justify-center items-center py-12">
                    <span className="loading loading-spinner loading-lg"></span>
                    <span className="ml-4 text-lg">Loading matches...</span>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="alert alert-error mb-6">
                    <span>Error loading matches: {error.message}</span>
                </div>
            )}

            {/* Content */}
            {!isLoading && !error && (
                <>
                    {/* Stats Summary */}
                    <div className="stats stats-horizontal shadow mb-6 w-full">
                        <div className="stat">
                            <div className="stat-title">Total Matches</div>
                            <div className="stat-value text-primary">{matches.length}</div>
                            <div className="stat-desc">All time</div>
                        </div>

                        <div className="stat">
                            <div className="stat-title">White Wins</div>
                            <div className="stat-value text-success">
                                {matches.filter(m => m.winner?.id === m.player_white.id).length}
                            </div>
                            <div className="stat-desc">
                                {matches.length > 0
                                    ? `${Math.round((matches.filter(m => m.winner?.id === m.player_white.id).length / matches.length) * 100)}%`
                                    : '0%'}
                            </div>
                        </div>

                        <div className="stat">
                            <div className="stat-title">Black Wins</div>
                            <div className="stat-value text-secondary">
                                {matches.filter(m => m.winner?.id === m.player_black.id).length}
                            </div>
                            <div className="stat-desc">
                                {matches.length > 0
                                    ? `${Math.round((matches.filter(m => m.winner?.id === m.player_black.id).length / matches.length) * 100)}%`
                                    : '0%'}
                            </div>
                        </div>
                    </div>

                    {/* Matches Table */}
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body p-0">
                            <div className="overflow-x-auto">
                                <table className="table table-zebra">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>White Player</th>
                                            <th>Black Player</th>
                                            <th>Winner</th>
                                            <th>Result</th>
                                            <th>Duration</th>
                                            <th>Date</th>
                                            <th>Moves</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedMatches.map(match => (
                                            <tr key={match.id} className="hover">
                                                <th className="font-mono">{match.id}</th>

                                                {/* White Player */}
                                                <td>
                                                    <div className="flex items-center gap-2">
                                                        <Person className="w-4 h-4 text-base-content/50" />
                                                        <div>
                                                            <div className="font-semibold">{match.player_white.full_name || 'Unknown'}</div>
                                                            {match.rating_change_white !== null && (
                                                                <div className={`text-xs ${match.rating_change_white >= 0 ? 'text-success' : 'text-error'}`}>
                                                                    {match.rating_change_white > 0 ? '+' : ''}{match.rating_change_white}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Black Player */}
                                                <td>
                                                    <div className="flex items-center gap-2">
                                                        <Person className="w-4 h-4 text-base-content/50" />
                                                        <div>
                                                            <div className="font-semibold">{match.player_black.full_name || 'Unknown'}</div>
                                                            {match.rating_change_black !== null && (
                                                                <div className={`text-xs ${match.rating_change_black >= 0 ? 'text-success' : 'text-error'}`}>
                                                                    {match.rating_change_black > 0 ? '+' : ''}{match.rating_change_black}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Winner */}
                                                <td>
                                                    {match.winner ? (
                                                        <div className="flex items-center gap-1 text-warning font-bold">
                                                            <EmojiEvents className="w-4 h-4" />
                                                            {match.winner.full_name || 'Unknown'}
                                                        </div>
                                                    ) : (
                                                        <span className="badge badge-ghost">Draw / Ongoing</span>
                                                    )}
                                                </td>

                                                {/* Result */}
                                                <td>
                                                    <div className="badge badge-outline font-mono">
                                                        {match.result || '-'}
                                                    </div>
                                                </td>

                                                {/* Duration */}
                                                <td>
                                                    <div className="flex items-center gap-1 text-sm opacity-70">
                                                        <AccessTime className="w-3 h-3" />
                                                        {getDuration(match.start_time, match.end_time)}
                                                    </div>
                                                </td>

                                                {/* Date */}
                                                <td className="text-sm opacity-70">
                                                    {formatDate(match.start_time)}
                                                </td>

                                                {/* Moves */}
                                                <td>
                                                    <div className="tooltip" data-tip={match.moves ? match.moves.join(', ') : 'No moves recorded'}>
                                                        <button className="btn btn-xs btn-ghost">
                                                            View Moves
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {matches.length === 0 && (
                                    <div className="text-center py-8">
                                        <div className="text-base-content/50 mb-2">No matches found</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-6">
                            <div className="join">
                                <button
                                    className="join-item btn"
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                >
                                    «
                                </button>
                                <button className="join-item btn">
                                    Page {currentPage} of {totalPages}
                                </button>
                                <button
                                    className="join-item btn"
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                >
                                    »
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
