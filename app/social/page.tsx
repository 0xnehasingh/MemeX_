"use client";

import React, { useState, useEffect } from 'react';
import { MessageCircle, Twitter, Send, Clock, Activity, CheckCircle, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const InteractiveSocialManager = () => {
  const [platforms, setPlatforms] = useState({
    twitter: { connected: true, status: 'active', lastPost: '2h ago' },
    discord: { connected: false, status: 'disconnected', lastPost: null },
    telegram: { connected: true, status: 'active', lastPost: '1h ago' }
  });

  const [postQueue, setPostQueue] = useState([
    {
      content: "GM #web3 fam! Today's mission: Find the next 100x gem 💎",
      platforms: ['twitter', 'telegram'],
      scheduledFor: new Date(Date.now() + 3600000).toLocaleTimeString(),
      status: 'scheduled'
    },
    {
      content: "🚨 New Alpha Alert: The future of DeFi is here! #CryptoNews",
      platforms: ['twitter'],
      scheduledFor: new Date(Date.now() + 7200000).toLocaleTimeString(),
      status: 'scheduled'
    }
  ]);

  const [analytics, setAnalytics] = useState({
    followers: 12500,
    growth: 8.5,
    engagement: 4.2,
    posts: {
      total: 156,
      successful: 152,
      failed: 4
    }
  });

  const [newPost, setNewPost] = useState<{
    content: string;
    selectedPlatforms: string[];
    schedule: string;
  }>({
    content: "",
    selectedPlatforms: [],
    schedule: "now",
  });

  const [recentPosts, setRecentPosts] = useState([
    {
      content: "Just aped into a new project! 🚀 Feeling bullish! #Web3",
      timestamp: "2h ago",
      platform: "twitter",
      engagement: { likes: 245, retweets: 42, replies: 18 }
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnalytics(prev => ({
        ...prev,
        followers: prev.followers + Math.floor(Math.random() * 3),
        engagement: Math.min(5, prev.engagement + (Math.random() * 0.1 - 0.05))
      }));

      setPostQueue(prev => {
        const updated = [...prev];
        if (updated.length > 0 && Math.random() > 0.7) {
          const post = updated.shift();
          if (post) {
            setRecentPosts(oldPosts => [{
              content: post.content,
              timestamp: new Date().toLocaleTimeString(),
              platform: post.platforms?.[0] || "Unknown",
              engagement: {
                likes: Math.floor(Math.random() * 100),
                retweets: Math.floor(Math.random() * 20),
                replies: Math.floor(Math.random() * 10)
              }
            }, ...oldPosts.slice(0, 4)]);
          }
        }
        return updated;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  type Platform = "twitter" | "discord" | "telegram";

  const handlePlatformToggle = (platform: Platform) => {
    setPlatforms(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        connected: !prev[platform].connected
      }
    }));
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPost.content || newPost.selectedPlatforms.length === 0) return;
    
    const post = {
      content: newPost.content,
      platforms: newPost.selectedPlatforms,
      scheduledFor: newPost.schedule === "now"
        ? "Posting..."
        : new Date(Date.now() + 3600000).toLocaleTimeString(),
      status: newPost.schedule === "now" ? "posting" : "scheduled",
    };
    
    setPostQueue(prev => [...prev, post]);
    setNewPost({ content: "", selectedPlatforms: [], schedule: "now" });
    
    if (newPost.schedule === "now") {
      setTimeout(() => {
        setRecentPosts(prev => [{
          content: post.content,
          timestamp: "Just now",
          platform: post.platforms?.[0] || "Unknown",
          engagement: { likes: 0, retweets: 0, replies: 0 }
        }, ...prev]);
      }, 2000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-2  border-green-500">
          <CardHeader>
            <CardTitle className="text-green-500">Create Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddPost} className="space-y-4">
              <div>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full p-3 rounded-lg resize-none h-32 bg-black/50 border-green-500/20 text-green-500 placeholder-green-500/40 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50"
                  placeholder="What's happening in the memeverse?"
                />
              </div>
     
              <div className="flex gap-3">
                {Object.keys(platforms).map((platform) => (
                  <button
                    key={platform}
                    type="button"
                    onClick={() => setNewPost(prev => ({
                      ...prev,
                      selectedPlatforms: prev.selectedPlatforms.includes(platform)
                        ? prev.selectedPlatforms.filter(p => p !== platform)
                        : [...prev.selectedPlatforms, platform]
                    }))}
                    className={`p-2 rounded-lg border transition-all duration-200 ${
                      newPost.selectedPlatforms.includes(platform)
                        ? 'border-green-500 bg-green-500/10 shadow-[0_0_10px_rgba(34,197,94,0.2)]'
                        : 'border-green-500 hover:border-green-500/30 hover:bg-green-500/5'
                    }`}
                  >
                    {platform === 'twitter' && <Twitter className="w-5 h-5 text-green-500" />}
                    {platform === 'discord' && <MessageCircle className="w-5 h-5 text-green-500" />}
                    {platform === 'telegram' && <Send className="w-5 h-5 text-green-500" />}
                  </button>
                ))}
                <select
                  value={newPost.schedule}
                  onChange={(e) => setNewPost(prev => ({ ...prev, schedule: e.target.value }))}
                  className="ml-auto border rounded-lg px-3 bg-black/50 border-green-500/20 text-green-500 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50"
                >
                  <option value="now">Post Now</option>
                  <option value="later">Schedule</option>
                </select>
                <button
                  type="submit"
                  disabled={!newPost.content || newPost.selectedPlatforms.length === 0}
                  className="bg-green-500/10 text-green-500 px-4 py-2 rounded-lg hover:bg-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed border border-green-500/20 transition-all duration-200 hover:shadow-[0_0_10px_rgba(34,197,94,0.2)]"
                >
                  Post
                </button>
              </div>
            </form>

            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4 text-green-500">Post Queue</h3>
              <div className="space-y-3">
                {postQueue.map((post, index) => (
                  <div key={index} className="border rounded-lg p-4 border-green-500 bg-black/30 hover:bg-black/40 transition-all duration-200">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm text-green-500">{post.content}</p>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-green-500/40" />
                        <span className="text-sm text-green-500/60">{post.scheduledFor}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {post.platforms.map(platform => (
                        <div key={platform} className="text-green-500/40">
                          {platform === 'twitter' && <Twitter className="w-4 h-4" />}
                          {platform === 'discord' && <MessageCircle className="w-4 h-4" />}
                          {platform === 'telegram' && <Send className="w-4 h-4" />}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {postQueue.length === 0 && (
                  <div className="text-center py-8 text-green-500/40">
                    No posts in queue
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="bg-black/50 border-green-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-500">
                <Activity className="w-6 h-6" />
                Live Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/30 p-4 rounded-lg border border-green-500 hover:border-green-500/20 transition-all duration-200">
                  <h4 className="text-sm text-green-500/60">Followers</h4>
                  <p className="text-2xl font-bold text-green-500">{analytics.followers.toLocaleString()}</p>
                </div>
                <div className="bg-black/30 p-4 rounded-lg border border-green-500 hover:border-green-500/20 transition-all duration-200">
                  <h4 className="text-sm text-green-500/60">Engagement</h4>
                  <p className="text-2xl font-bold text-cyan-500">
                    {analytics.engagement.toFixed(1)}%
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2 text-green-500">Platform Status</h4>
                <div className="space-y-2">
                  {Object.entries(platforms).map(([platform]) => (
                    <div key={platform} className="flex items-center justify-between p-2 bg-black/30 rounded-lg border border-green-500 hover:border-green-500/20 transition-all duration-200">
                      <div className="flex items-center gap-2">
                        {platform === 'twitter' && <Twitter className="w-4 h-4 text-green-500" />}
                        {platform === 'discord' && <MessageCircle className="w-4 h-4 text-green-500" />}
                        {platform === 'telegram' && <Send className="w-4 h-4 text-green-500" />}
                        <span className="capitalize text-green-500">{platform}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {platforms[platform as Platform].connected ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        )}
                        <button
                          onClick={() => handlePlatformToggle(platform as Platform)}
                          className={`text-sm px-2 py-1 rounded transition-all duration-200 ${
                            platforms[platform as Platform].connected 
                              ? 'text-red-500 hover:bg-red-500/10'
                              : 'text-green-500 hover:bg-green-500/10'
                          }`}
                        >
                          {platforms[platform as Platform].connected ? 'Disconnect' : 'Connect'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-green-500">
            <CardHeader>
              <CardTitle className="text-green-500">Recent Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPosts.map((post, index) => (
                  <div key={index} className="border border-green-500 rounded-lg p-4 bg-black/30 hover:bg-black/40 transition-all duration-200">
                    <div className="flex items-center gap-2 mb-2">
                      {post.platform === 'twitter' && <Twitter className="w-4 h-4 text-green-500" />}
                      {post.platform === 'discord' && <MessageCircle className="w-4 h-4 text-green-500" />}
                      {post.platform === 'telegram' && <Send className="w-4 h-4 text-green-500" />}
                      <span className="text-sm text-green-500/60">{post.timestamp}</span>
                    </div>
                    <p className="text-sm mb-2 text-green-500">{post.content}</p>
                    <div className="flex gap-4 text-xs text-green-500/40">
                      <span>{post.engagement.likes} likes</span>
                      <span>{post.engagement.retweets} retweets</span>
                      <span>{post.engagement.replies} replies</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InteractiveSocialManager;