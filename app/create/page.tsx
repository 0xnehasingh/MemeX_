"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Upload } from 'lucide-react';

export default function CreateMemegent() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    stake: '',
    personality: 'friendly',
  });

  const handleSubmit = async () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-black text-green-500 pt-20">
      <div className="container mx-auto px-4">
        <Link href="/" className="text-green-500 hover:text-green-400 mb-8 inline-block">
          <ArrowLeft className="inline mr-2" /> Back to Home
        </Link>

        <h1 className="text-4xl font-bold mb-8">Create Your Memegent</h1>

        <div className="flex items-center mb-8 relative">
          <div className="flex-1 h-1 bg-green-500/20">
            <div 
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`w-8 h-8 rounded-full flex items-center justify-center absolute
                ${num === step ? 'bg-green-500 text-black' : 'bg-green-500/20 text-green-500'}
              `}
              style={{ left: `${((num - 1) / 2) * 100}%` }}
            >
              {num}
            </div>
          ))}
        </div>

        <Card className="bg-black/50 border-green-900/20 p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Memegent Name</label>
                <Input
                  type="text"
                  placeholder="Enter a catchy name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-black/50 border-green-500/20 text-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Upload Meme Image</label>
                <div className="border-2 border-dashed border-green-500/20 rounded-lg p-8 text-center">
                  <Upload className="mx-auto h-12 w-12 text-green-500/40 mb-4" />
                  <p className="text-green-500/60">Drag and drop your image here, or click to browse</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Initial Stake (ETH)</label>
                <Input
                  type="number"
                  placeholder="Enter stake amount"
                  value={formData.stake}
                  onChange={(e) => setFormData({ ...formData, stake: e.target.value })}
                  className="bg-black/50 border-green-500/20 text-green-500"
                />
              </div>

              <Button
                onClick={() => setStep(2)}
                className="w-full bg-green-500/10 border border-green-500/20 hover:bg-green-500/20"
              >
                Next Step
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold mb-4">Personality Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Friendly', 'Mischievous', 'Wise'].map((personality) => (
                  <Card
                    key={personality}
                    className={`p-6 cursor-pointer transition-all ${
                      formData.personality === personality.toLowerCase()
                        ? 'bg-green-500/20 border-green-500'
                        : 'bg-black/50 border-green-900/20 hover:bg-green-500/10'
                    }`}
                    onClick={() => setFormData({ ...formData, personality: personality.toLowerCase() })}
                  >
                    <h3 className="text-lg font-medium mb-2">{personality}</h3>
                    {formData.personality === personality.toLowerCase() && (
                      <span className="text-sm text-green-500">✓ Selected</span>
                    )}
                  </Card>
                ))}
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-green-500/10 border border-green-500/20 hover:bg-green-500/20"
                >
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-green-500/10 border border-green-500/20 hover:bg-green-500/20"
                >
                  Next Step
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold mb-4">Launch Your Memegent</h2>
              
              <div className="border border-green-900/20 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                    🤖
                  </div>
                  <div>
                    <h3 className="font-medium">{formData.name}</h3>
                    <p className="text-sm text-green-500/60">{formData.personality} Personality</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Initial Stake:</span>
                    <span>{formData.stake} ETH</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-500/10 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Your Memegent can:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Transfer ETH to other addresses</li>
                  <li>Check cryptocurrency prices</li>
                  <li>Deploy viral NFT collections</li>
                  <li>Create ERC-20 tokens</li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => setStep(2)}
                  className="flex-1 bg-green-500/10 border border-green-500/20 hover:bg-green-500/20"
                >
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="flex-1 bg-green-500/10 border border-green-500/20 hover:bg-green-500/20"
                >
                  Launch Memegent
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}