(function(){
  const slot = document.getElementById('ad-slot');
  if(!slot) return;
  async function loadAd(){
    try {
      const res = await fetch('/api/ads');
      if(!res.ok) throw new Error('Failed to fetch ad');
      const data = await res.json();
      if(!data.ad){ slot.textContent = 'No ads'; return; }
      const ad = data.ad;
      slot.innerHTML = `<a href="${ad.target_url}" target="_blank" data-ad-id="${ad.id}"><img src="${ad.image_url}" alt="${ad.title}" style="width:320px;height:100px;object-fit:cover" /></a>`;
      record('impression', ad.id);
      const link = slot.querySelector('a');
      link.addEventListener('click', () => record('click', ad.id));
    } catch(e){
      // Silently fail - don't show error to user
      console.error('Ad load error:', e);
      slot.style.display = 'none';
    }
  }
  async function record(kind,id){
    try { await fetch(`/api/ads/${kind}/${id}`, { method: 'POST' }); } catch(e){ /* ignore */ }
  }
  loadAd();
})();
