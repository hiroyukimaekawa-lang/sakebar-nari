(function () {

    /* ============================================================
       1. CONCEPT IMAGE PLACEHOLDER → IMG タグに差し替え
    ============================================================ */
    const conceptMock = document.querySelector('.concept-image-mock');
    if (conceptMock) {
      const img = document.createElement('img');
      img.src = 'https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=800&q=80';
      img.alt = 'Sake Bar 成 店内';
      img.setAttribute('data-section', 'concept-image');
      img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
      conceptMock.replaceWith(img);
    }
  
  
    /* ============================================================
       2. メニューセクションを #features の直後に挿入
    ============================================================ */
    const featuresSection = document.getElementById('features');
  
    const menuSection = document.createElement('section');
    menuSection.id = 'menu';
  
    menuSection.innerHTML = `
      <div class="section-wrap">
        <div class="menu-header reveal">
          <span class="section-label">— OKONOMI —</span>
          <h2 class="section-title">おすすめ<span>お品書き</span></h2>
          <div class="divider"></div>
          <p style="font-size:0.82rem;color:var(--stone);letter-spacing:0.08em;margin-top:1rem;">
            仕入れにより内容が変わる場合がございます
          </p>
        </div>
  
        <div class="menu-grid">
  
          <div class="menu-card reveal">
            <div class="menu-card-img">
              <img src="https://images.unsplash.com/photo-1534482421-64566f976cfa?w=600&q=80" alt="鮮魚刺身盛り合わせ" />
            </div>
            <div class="menu-card-body">
              <p class="menu-card-season">— TODAY'S CATCH —</p>
              <h3 class="menu-card-title">鮮魚刺身盛り合わせ</h3>
              <p class="menu-card-desc">
                小田原早川漁港から朝一番で届く鮮魚を、その日おすすめの5〜7種盛りで。
                旬の味わいをそのままに、丁寧に引いた一皿です。
              </p>
              <div class="menu-card-price">
                <span class="price-num">1,650</span>
                <span class="price-tax">円〜（税込）</span>
              </div>
            </div>
          </div>
  
          <div class="menu-card reveal">
            <div class="menu-card-img">
              <img src="https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=600&q=80" alt="おばんざい盛り合わせ" />
            </div>
            <div class="menu-card-body">
              <p class="menu-card-season">— DAILY OBANZAI —</p>
              <h3 class="menu-card-title">おばんざい盛り合わせ</h3>
              <p class="menu-card-desc">
                毎朝仕込む季節のおばんざいを一皿に。
                だし巻き・煮物・和え物など、日替わりで5〜6種ご用意しています。
              </p>
              <div class="menu-card-price">
                <span class="price-num">880</span>
                <span class="price-tax">円〜（税込）</span>
              </div>
            </div>
          </div>
  
          <div class="menu-card reveal">
            <div class="menu-card-img">
              <img src="https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?w=600&q=80" alt="日本酒セレクション" />
            </div>
            <div class="menu-card-body">
              <p class="menu-card-season">— SAKE SELECTION —</p>
              <h3 class="menu-card-title">日本酒セレクション</h3>
              <p class="menu-card-desc">
                全国の蔵元から厳選した季節の日本酒を常時10種以上ご用意。
                お料理との相性をスタッフがご提案します。
              </p>
              <div class="menu-card-price">
                <span class="price-num">660</span>
                <span class="price-tax">円〜（税込）</span>
              </div>
            </div>
          </div>
  
        </div>
  
        <div class="menu-more-wrap">
          <a href="https://www.hotpepper.jp/strJ004444240/" target="_blank" rel="noopener" class="btn-menu-more">
            ホットペッパーでメニューを見る
          </a>
        </div>
      </div>
    `;
  
    if (featuresSection) {
      featuresSection.insertAdjacentElement('afterend', menuSection);
    }
  
  
    /* ============================================================
       3. ナビゲーションに「メニュー」リンクを挿入
          「こだわり」(#features) と「店舗情報」(#info) の間に配置
    ============================================================ */
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
      let kodawariLi = null;
      navLinks.querySelectorAll('li').forEach(li => {
        const a = li.querySelector('a');
        if (a && a.getAttribute('href') === '#features') kodawariLi = li;
      });
  
      const menuLi = document.createElement('li');
      menuLi.innerHTML = '<a href="#menu">メニュー</a>';
  
      if (kodawariLi && kodawariLi.nextElementSibling) {
        kodawariLi.insertAdjacentElement('afterend', menuLi);
      } else if (navLinks.lastElementChild) {
        navLinks.insertBefore(menuLi, navLinks.lastElementChild);
      }
    }
  
  
    /* ============================================================
       4. ハンバーガーメニュー（スライドイン）
    ============================================================ */
    const hamburger   = document.getElementById('hamburger');
    const navLinksEl  = document.getElementById('navLinks');
  
    if (hamburger && navLinksEl) {
      hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('open');
        navLinksEl.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });
  
      // リンククリックでメニューを閉じる
      navLinksEl.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          hamburger.classList.remove('open');
          navLinksEl.classList.remove('open');
          document.body.style.overflow = '';
        });
      });
    }
  
  
    /* ============================================================
       5. ギャラリーセクションをフッター直前に挿入
    ============================================================ */
    const footerEl = document.getElementById('footer');
  
    const galleryItems = [
      { label: '鮮魚',      gradient: 'linear-gradient(135deg,#1a1410,#2a1f14)', img: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=600&q=80' },
      { label: '日本酒',    gradient: 'linear-gradient(135deg,#2a1f14,#3a2a18)', img: 'https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?w=600&q=80' },
      { label: 'おばんざい',gradient: 'linear-gradient(135deg,#1e1a10,#2a2010)', img: 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=600&q=80' },
      { label: '店内',      gradient: 'linear-gradient(135deg,#130f0a,#2a1f14)', img: 'https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=600&q=80' },
      { label: '夜の一杯',  gradient: 'linear-gradient(135deg,#0d0b09,#1a1410)', img: 'https://images.unsplash.com/photo-1546859595-e5b8ef3eb3b6?w=600&q=80' },
      { label: 'おつまみ',  gradient: 'linear-gradient(135deg,#201810,#2a2015)', img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80' },
    ];
  
    const galleryItemsHTML = galleryItems.map(item => `
      <div class="gallery-item reveal">
        <div class="gallery-item-bg" style="background:${item.gradient};">
          <img src="${item.img}" alt="${item.label}" loading="lazy"
               style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0;" />
        </div>
        <div class="gallery-item-overlay">
          <span>${item.label}</span>
        </div>
      </div>
    `).join('');
  
    const gallerySection = document.createElement('section');
    gallerySection.id = 'gallery';
    gallerySection.innerHTML = `
      <div class="section-wrap">
        <div class="gallery-header reveal">
          <span class="section-label">— INSTAGRAM —</span>
          <h2 class="section-title">日々の<span>一コマ</span></h2>
          <div class="divider"></div>
        </div>
  
        <div class="gallery-grid">
          ${galleryItemsHTML}
        </div>
  
        <div class="gallery-cta-wrap">
          <a href="https://www.instagram.com/naru__0714/" target="_blank" rel="noopener" class="btn-instagram">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058
                1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664
                4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07
                -3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849
                0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919
                1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072
                -4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948
                0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98
                1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072
                4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948
                0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98
                -1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162
                6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163
                c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4
                0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845
                c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0
                1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Instagramでもっと見る
          </a>
        </div>
      </div>
    `;
  
    if (footerEl) {
      footerEl.insertAdjacentElement('beforebegin', gallerySection);
    }
  
  
    /* ============================================================
       6. IntersectionObserver — .reveal アニメーション
          （JS で挿入した要素にも対応するため DOM 挿入後に実行）
    ============================================================ */
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const siblings = Array.from(
            entry.target.parentElement.querySelectorAll('.reveal')
          );
          const idx = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = `${idx * 0.12}s`;
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
  
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  
  })();