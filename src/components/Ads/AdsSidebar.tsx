import React, { useEffect, useState } from 'react';
import { getRandomAd, recordAdClick, recordAdImpression } from '@/src/services/api';

export default function AdsSidebar() {
  const [ad, setAd] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function loadAd() {
      try {
        setLoading(true);
        const res = await getRandomAd();
        if (!mounted) return;
        if (res && res.ad) {
          setAd(res.ad);
          // record impression (fire-and-forget)
          recordAdImpression(res.ad.id).catch(() => {});
        } else {
          setAd(null);
        }
      } catch (e) {
        console.error('AdsSidebar load error:', e);
        setAd(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadAd();
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return (
      <aside className="w-72 hidden lg:block px-3">
        <div className="bg-white border rounded p-3 shadow-sm text-center text-sm text-gray-500">Loading ads...</div>
      </aside>
    );
  }

  if (!ad) {
    return (
      <aside className="w-72 hidden lg:block px-3">
        <div className="bg-white border rounded p-3 shadow-sm text-center text-sm text-gray-500">No ads available</div>
      </aside>
    );
  }

  return (
    <aside className="w-72 hidden lg:block px-3">
      <div className="bg-white border rounded p-3 shadow-sm">
        <div className="text-xs text-gray-500 mb-2">Sponsored</div>
        <a
          href={ad.target_url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            // record click but do not block navigation
            recordAdClick(ad.id).catch(() => {});
          }}
          className="block"
        >
          <img src={ad.image_url} alt={ad.title} className="w-full h-36 object-cover rounded" />
        </a>
        <div className="mt-2">
          <div className="font-medium text-sm text-gray-800">{ad.title}</div>
          {ad.description && <div className="text-xs text-gray-600 mt-1">{ad.description}</div>}
        </div>
      </div>
    </aside>
  );
}
