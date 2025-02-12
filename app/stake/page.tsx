"use client"

import React, { useState } from 'react';
import { Lock, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const StakingInterface = () => {
  const [stakeAmount, setStakeAmount] = useState('');
  const [stakeDuration, setStakeDuration] = useState('1');
  const [userBalance, setUserBalance] = useState(10000);
  const [isStaking, setIsStaking] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const durationOptions = [
    { months: '1', multiplier: 1 },
    { months: '3', multiplier: 1.5 },
    { months: '6', multiplier: 2 },
    { months: '12', multiplier: 3 }
  ];

  const [activeStakes, setActiveStakes] = useState([
    {
      amount: 2500,
      duration: 12,
      multiplier: 3,
      startDate: new Date(2025, 0, 1),
      unlockDate: new Date(2026, 0, 1),
      rewards: 450
    }
  ]);

  const calculateEffectiveStake = () => {
    const amount = parseFloat(stakeAmount) || 0;
    const multiplier = durationOptions.find(d => d.months === stakeDuration)?.multiplier || 1;
    return amount * multiplier;
  };

  const handleStake = () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) return;
    if (parseFloat(stakeAmount) > userBalance) return;

    setIsStaking(true);
    setTimeout(() => {
      const newStake = {
        amount: parseFloat(stakeAmount),
        duration: parseInt(stakeDuration),
        multiplier: durationOptions.find(d => d.months === stakeDuration)?.multiplier || 1,
        startDate: new Date(),
        unlockDate: new Date(Date.now() + parseInt(stakeDuration) * 30 * 24 * 60 * 60 * 1000),
        rewards: 0
      };
      
      setActiveStakes([...activeStakes, newStake]);
      setUserBalance(prev => prev - parseFloat(stakeAmount));
      setIsStaking(false);
      setShowSuccess(true);
      setStakeAmount('');
      
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
        {/* Staking Form */}
        <Card className="bg-black/80 border border-green-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-mono text-green-400 flex items-center gap-2">
              <Lock className="w-6 h-6 text-green-500 animate-pulse" />
              Stake MX
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Balance Display */}
            <div className="bg-black/60 p-4 rounded-lg border border-green-500/30">
              <div className="flex items-center justify-between font-mono">
                <span className="text-green-400/70">Available Balance:</span>
                <span className="text-xl font-bold text-green-400">
                  {userBalance.toLocaleString()} MX
                </span>
              </div>
            </div>

            {/* Stake Amount Input */}
            <div>
              <label className="block text-sm font-mono text-green-400/70 mb-2">
                Stake Amount (MX)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  className="w-full p-2 bg-black/60 border border-green-500/30 rounded-lg pr-20 text-green-400 font-mono placeholder:text-green-400/50 focus:outline-none focus:border-green-500/50"
                  placeholder="Enter amount"
                />
                <button
                  onClick={() => setStakeAmount(userBalance.toString())}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-green-400 hover:text-green-300 font-mono"
                >
                  Max
                </button>
              </div>
            </div>

            {/* Duration Selector */}
            <div>
              <label className="block text-sm font-mono text-green-400/70 mb-2">
                Stake Duration
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {durationOptions.map((option) => (
                  <button
                    key={option.months}
                    onClick={() => setStakeDuration(option.months)}
                    className={`p-2 rounded-lg border text-center transition-all duration-300 font-mono ${
                      stakeDuration === option.months
                        ? 'border-green-500 bg-green-500/10 text-green-400'
                        : 'border-green-500/30 text-green-400/70 hover:border-green-500/50'
                    }`}
                  >
                    <div className="font-medium">{option.months}M</div>
                    <div className="text-sm opacity-70">{option.multiplier}x</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Calculations */}
            <div className="bg-black/60 p-4 rounded-lg border border-green-500/30 space-y-3 font-mono">
              <div className="flex items-center justify-between">
                <span className="text-green-400/70">Reward Multiplier:</span>
                <span className="font-bold text-green-400">
                  {durationOptions.find(d => d.months === stakeDuration)?.multiplier}x
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-green-400/70">Effective Stake:</span>
                <span className="font-bold text-green-400">
                  {calculateEffectiveStake().toLocaleString()} MX
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-green-400/70">Unlock Date:</span>
                <span className="font-bold text-green-400">
                  {new Date(Date.now() + parseInt(stakeDuration) * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Stake Button */}
            <button
              onClick={handleStake}
              disabled={!stakeAmount || parseFloat(stakeAmount) <= 0 || parseFloat(stakeAmount) > userBalance || isStaking}
              className="w-full bg-white/10 text-green-400 hover:bg-white/20 px-4 py-3 rounded-full text-sm border border-green-500/30 transition-all duration-300 font-mono disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isStaking ? (
                'Staking...'
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Stake MX
                </>
              )}
            </button>

            {showSuccess && (
              <Alert className="bg-black/60 border border-green-500/30">
                <AlertDescription className="text-green-400 font-mono">
                  Successfully staked {stakeAmount} MX!
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Active Stakes */}
        <Card className="bg-black/80 border border-green-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-mono text-green-400 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-500 animate-pulse" />
              Active Stakes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeStakes.map((stake, index) => (
                <div
                  key={index}
                  className="bg-black/60 p-4 rounded-lg border border-green-500/30 space-y-2 font-mono"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-green-400/70">Amount:</span>
                    <span className="font-bold text-green-400">{stake.amount.toLocaleString()} MX</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-green-400/70">Multiplier:</span>
                    <span className="font-bold text-green-400">{stake.multiplier}x</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-green-400/70">Duration:</span>
                    <span className="font-bold text-green-400">{stake.duration} months</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-green-400/70">Unlock Date:</span>
                    <span className="font-bold text-green-400">{stake.unlockDate.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-green-400/70">Rewards Earned:</span>
                    <span className="font-bold text-green-400">+{stake.rewards} MX</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="w-full bg-black/60 rounded-full h-2 border border-green-500/30">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{
                          width: `${Math.min(
                            100,
                            ((Date.now() - stake.startDate.getTime()) /
                              (stake.unlockDate.getTime() - stake.startDate.getTime())) *
                              100
                          )}%`
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-sm text-green-400/70 mt-1">
                      <span>Start</span>
                      <span>Unlock</span>
                    </div>
                  </div>
                </div>
              ))}

              {activeStakes.length === 0 && (
                <div className="text-center py-8 text-green-400/50 font-mono">
                  No active stakes yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StakingInterface;