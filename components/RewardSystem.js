import React, { useState, useEffect } from 'react';
import { FaMedal, FaTrophy, FaStar, FaCrown } from 'react-icons/fa';

const RewardSystem = ({ userId }) => {
    const [userStats, setUserStats] = useState({
        points: 0,
        level: 'Bronze',
        donations: 0,
        badges: []
    });

    const levels = {
        Bronze: { icon: FaMedal, color: 'text-yellow-700', threshold: 0 },
        Silver: { icon: FaTrophy, color: 'text-gray-400', threshold: 100 },
        Gold: { icon: FaStar, color: 'text-yellow-400', threshold: 500 },
        Platinum: { icon: FaCrown, color: 'text-blue-400', threshold: 1000 }
    };

    useEffect(() => {
        // Mock data - in real app, fetch from API
        const mockUserStats = {
            points: 350,
            level: 'Silver',
            donations: 15,
            badges: ['First Donation', 'Regular Donor', 'Life Saver']
        };
        setUserStats(mockUserStats);
    }, [userId]);

    const LevelIcon = levels[userStats.level].icon;

    return (
        <div className="reward-system p-4 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Your Rewards</h2>
                <div className="flex items-center gap-2">
                    <LevelIcon className={`text-2xl ${levels[userStats.level].color}`} />
                    <span className="font-medium">{userStats.level} Donor</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="stat-card p-4 bg-gray-50 rounded-lg text-center">
                    <h3 className="text-lg font-medium text-gray-600">Points</h3>
                    <p className="text-3xl font-bold text-blue-500">{userStats.points}</p>
                </div>
                <div className="stat-card p-4 bg-gray-50 rounded-lg text-center">
                    <h3 className="text-lg font-medium text-gray-600">Donations</h3>
                    <p className="text-3xl font-bold text-green-500">{userStats.donations}</p>
                </div>
                <div className="stat-card p-4 bg-gray-50 rounded-lg text-center">
                    <h3 className="text-lg font-medium text-gray-600">Next Level</h3>
                    <p className="text-sm text-gray-500">
                        {Object.entries(levels).find(([level]) => 
                            levels[level].threshold > userStats.points
                        )?.[0] || 'Max Level'}
                    </p>
                </div>
            </div>

            <div className="badges">
                <h3 className="text-lg font-medium mb-4">Your Badges</h3>
                <div className="flex flex-wrap gap-2">
                    {userStats.badges.map((badge, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                            {badge}
                        </span>
                    ))}
                </div>
            </div>

            <div className="mt-6">
                <p className="text-sm text-gray-600">
                    Keep donating to earn more points and unlock new levels!
                </p>
            </div>
        </div>
    );
};

export default RewardSystem;