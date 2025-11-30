import React, { useState, useEffect } from 'react';
import { adsApi } from '../services/api';

interface Ad {
  id: number;
  title: string;
  image_url: string;
  target_url: string;
}

export default function AdsSidebar() {
  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAd();
  }, []);

  const loadAd = async () => {
    try {
      const { ad } = await adsApi.getRandom();
      if (ad) {
        setAd(ad);
        // Record impression
        await adsApi.recordImpression(ad.id);
      }
    } catch (error) {
      console.error('Failed to load ad:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async () => {
    if (!ad) return;
    try {
      await adsApi.recordClick(ad.id);
    } catch (error) {
      console.error('Failed to record click:', error);
    }
    window.open(ad.target_url, '_blank');
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
          <div className="h-32 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (!ad) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-3 border-b">
        <span className="text-xs text-gray-500 uppercase tracking-wide">Sponsored</span>
      </div>
      <div 
        onClick={handleClick}
        className="cursor-pointer hover:opacity-90 transition-opacity"
      >
        <img
          src={ad.image_url}
          alt={ad.title}
          className="w-full h-40 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x160?text=Ad';
          }}
        />
        <div className="p-3">
          <p className="text-sm font-medium text-gray-900">{ad.title}</p>
          <p className="text-xs text-blue-600 mt-1 hover:underline">Learn more</p>
        </div>
      </div>
    </div>
  );
}
