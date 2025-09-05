document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('post-form');
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const textarea = document.getElementById('post-content');
    const text = textarea.value.trim();
    if(!text) return;
    const posts = document.querySelector('.posts');
    const article = document.createElement('article');
    article.className = 'post';
    article.innerHTML = `
      <header class="post-header">
        <div class="post-avatar" aria-hidden="true">ES</div>
        <div>
          <h3>Eric Spencer</h3>
          <div class="muted">Just now · Friends</div>
        </div>
      </header>
      <div class="post-body"><p>${escapeHtml(text)}</p></div>
      <footer class="post-actions">
        <button class="like-btn" aria-pressed="false">Like <span class="count">0</span></button>
        <button class="comment-btn">Comment <span class="count">0</span></button>
        <button class="share-btn">Share</button>
      </footer>
    `;
    posts.prepend(article);
    textarea.value = '';
    textarea.focus();
  });

  // simple like toggle
  document.body.addEventListener('click', e=>{
    const target = e.target.closest('.like-btn');
    if(!target) return;
    const pressed = target.getAttribute('aria-pressed') === 'true';
    target.setAttribute('aria-pressed', String(!pressed));
    const count = target.querySelector('.count');
    if(count){
      let n = parseInt(count.textContent||'0',10);
      n = pressed ? Math.max(0,n-1) : n+1;
      count.textContent = n;
    }
  });
});

function escapeHtml(s){
  return s.replace(/[&<>"']/g, c=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"
  }[c]));
}
