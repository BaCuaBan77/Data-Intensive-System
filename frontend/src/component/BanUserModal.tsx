import { useState } from 'react';
import { useBansQuery, useBanUserMutation } from '../hooks/queries';
import type { User } from '../api';

export function BanUserModal({ user, onClose }: { user: User; onClose: () => void }) {
    const [reason, setReason] = useState('');
    const [duration, setDuration] = useState(1);
    const bansQuery = useBansQuery(user.id);
    const banUserMutation = useBanUserMutation();

    const handleBanSubmit = async () => {
        const startTime = new Date();
        const endTime = new Date(startTime);
        endTime.setDate(endTime.getDate() + duration);

        try {
            await banUserMutation.mutateAsync({
                player_id: user.id,
                admin_id: 1, // Hardcoded admin ID
                reason: reason,
                start_time: startTime.toISOString(),
                end_time: endTime.toISOString(),
            });
            setReason('');
            setDuration(1);
            // Bans query will automatically invalidate due to mutation onSuccess
        } catch (error) {
            console.error("Failed to ban user:", error);
            alert("Failed to ban user");
        }
    };

    return (
        <div className="modal modal-open">
            <div className="modal-box w-11/12 max-w-5xl">
                <h3 className="font-bold text-lg mb-4">Manage Bans for {user.full_name}</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* New Ban Form */}
                    <div>
                        <h4 className="font-semibold mb-2">Issue New Ban</h4>
                        <div className="form-control w-full mb-4">
                            <label className="label">
                                <span className="label-text">Reason</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Reason for ban"
                                className="input input-bordered w-full"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            />
                        </div>
                        <div className="form-control w-full mb-4">
                            <label className="label">
                                <span className="label-text">Duration (Days)</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Duration"
                                className="input input-bordered w-full"
                                min="1"
                                value={duration}
                                onChange={(e) => setDuration(parseInt(e.target.value))}
                            />
                        </div>
                        <button
                            className="btn btn-error w-full"
                            onClick={handleBanSubmit}
                            disabled={banUserMutation.isPending || !reason}
                        >
                            {banUserMutation.isPending ? 'Banning...' : 'Ban User'}
                        </button>
                    </div>

                    {/* Ban History */}
                    <div>
                        <h4 className="font-semibold mb-2">Ban History</h4>
                        <div className="overflow-x-auto h-[300px] border rounded-lg">
                            <table className="table table-pin-rows">
                                <thead>
                                    <tr>
                                        <th>Admin</th>
                                        <th>Reason</th>
                                        <th>Start</th>
                                        <th>End</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bansQuery.isLoading ? (
                                        <tr><td colSpan={4} className="text-center">Loading...</td></tr>
                                    ) : bansQuery.data?.length === 0 ? (
                                        <tr><td colSpan={4} className="text-center">No previous bans</td></tr>
                                    ) : (
                                        bansQuery.data?.map((ban) => (
                                            <tr key={ban.id}>
                                                <td>{ban.admin.full_name}</td>
                                                <td>{ban.reason}</td>
                                                <td className="text-xs">{new Date(ban.start_time).toLocaleDateString()}</td>
                                                <td className="text-xs">{ban.end_time ? new Date(ban.end_time).toLocaleDateString() : 'Permanent'}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="modal-action">
                    <button className="btn" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}
