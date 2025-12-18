import { useMemo } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import {
    useDailyActiveUsersQuery,
    useMonthlyActiveUsersQuery,
    useDailyMatchesStatsQuery,
    useDailySalesStatsQuery
} from '../hooks/queries';

export function Dashboard() {
    // Calculate date ranges
    const { sevenDaysAgoStr, sixMonthsAgoStr } = useMemo(() => {
        // Hardcoded date to ensure data visibility for demo purposes
        const today = new Date('2025-12-18');
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);

        const sixMonthsAgo = new Date(today);
        sixMonthsAgo.setMonth(today.getMonth() - 6);

        return {
            sevenDaysAgoStr: sevenDaysAgo.toISOString().split('T')[0],
            sixMonthsAgoStr: sixMonthsAgo.toISOString().split('T')[0]
        };
    }, []);

    // Fetch data
    // Fetch data
    const dailyUsersQuery = useDailyActiveUsersQuery({ start_date: sevenDaysAgoStr, interval: 7 });
    const monthlyUsersQuery = useMonthlyActiveUsersQuery({ start_date: sixMonthsAgoStr, interval: 6 });
    const dailyMatchesQuery = useDailyMatchesStatsQuery({ start_date: sevenDaysAgoStr, interval: 7 });
    const dailySalesQuery = useDailySalesStatsQuery({ start_date: sevenDaysAgoStr, interval: 7 });

    const isLoading = dailyUsersQuery.isLoading || monthlyUsersQuery.isLoading || dailyMatchesQuery.isLoading || dailySalesQuery.isLoading;
    const error = dailyUsersQuery.error || monthlyUsersQuery.error || dailyMatchesQuery.error || dailySalesQuery.error;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <div className="alert alert-error">
                    <span>Error loading dashboard data: {error.message}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-[95%] mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                <p className="text-base-content/70">Overview of system metrics</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Daily Active Users */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-sm opacity-70">Daily Active Users (Last 7 Days)</h2>
                        <div className="h-[450px] w-full">
                            <LineChart
                                dataset={dailyUsersQuery.data || []}
                                xAxis={[{
                                    dataKey: 'day',
                                    scaleType: 'band',
                                    valueFormatter: (value) => new Date(value).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' })
                                }]}
                                series={[{
                                    dataKey: 'unique_players',
                                    label: 'Active Users',
                                    color: '#3b82f6'
                                }]}
                                margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
                            />
                        </div>
                    </div>
                </div>

                {/* Monthly Active Users */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-sm opacity-70">Monthly Active Users (Last 6 Months)</h2>
                        <div className="h-[450px] w-full">
                            <BarChart
                                dataset={monthlyUsersQuery.data || []}
                                xAxis={[{
                                    dataKey: 'month_start',
                                    scaleType: 'band',
                                    valueFormatter: (value) => new Date(value).toLocaleDateString(undefined, { month: 'short', year: '2-digit' })
                                }]}
                                series={[{
                                    dataKey: 'unique_players',
                                    label: 'Active Users',
                                    color: '#8b5cf6'
                                }]}
                                margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
                            />
                        </div>
                    </div>
                </div>

                {/* Daily Matches */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-sm opacity-70">Daily Matches (Last 7 Days)</h2>
                        <div className="h-[450px] w-full">
                            <LineChart
                                dataset={dailyMatchesQuery.data || []}
                                xAxis={[{
                                    dataKey: 'day',
                                    scaleType: 'band',
                                    valueFormatter: (value) => new Date(value).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' })
                                }]}
                                series={[{
                                    dataKey: 'matches',
                                    label: 'Matches Played',
                                    color: '#10b981',
                                    area: true
                                }]}
                                margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
                            />
                        </div>
                    </div>
                </div>

                {/* Daily Sales */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-sm opacity-70">Daily Sales (Last 7 Days)</h2>
                        <div className="h-[450px] w-full">
                            <BarChart
                                dataset={dailySalesQuery.data || []}
                                xAxis={[{
                                    dataKey: 'day',
                                    scaleType: 'band',
                                    valueFormatter: (value) => new Date(value).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' })
                                }]}
                                series={[{
                                    dataKey: 'total_sales',
                                    label: 'Sales ($)',
                                    color: '#f59e0b',
                                    valueFormatter: (value) => `$${value}`
                                }]}
                                margin={{ left: 50, right: 30, top: 30, bottom: 30 }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
