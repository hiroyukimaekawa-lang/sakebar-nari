(function () {

  /* ============================================================
     0. 追加スタイルの動的インジェクション
  ============================================================ */
  const additionalStyles = `
      /* Hamburger */
      .hamburger {
        display: none;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 40px; height: 40px;
        cursor: pointer;
        background: none;
        border: none;
        gap: 5px;
        padding: 0;
        z-index: 1001;
      }
      .hamburger span {
        display: block;
        width: 24px; height: 1.5px;
        background: var(--sake);
        transition: transform 0.35s, opacity 0.35s;
        transform-origin: center;
      }
      .hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
      .hamburger.open span:nth-child(2) { opacity: 0; }
      .hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }
      
      @media (max-width: 768px) {
        .hamburger { display: flex; }
      
        .nav-links {
          position: fixed;
          top: 64px; left: 0; right: 0;
          background: rgba(26,20,16,0.97);
          backdrop-filter: blur(16px);
          flex-direction: column;
          align-items: flex-start;
          padding: 2rem;
          gap: 0;
          border-top: 1px solid rgba(200,169,110,0.15);
          transform: translateY(-110%);
          transition: transform 0.4s cubic-bezier(0.4,0,0.2,1);
          pointer-events: none;
        }
        .nav-links.open {
          transform: translateY(0);
          pointer-events: auto;
        }
        .nav-links li {
          width: 100%;
          border-bottom: 1px solid rgba(200,169,110,0.1);
        }
        .nav-links a {
          display: block;
          padding: 1rem 0;
          font-size: 1rem;
        }
        .nav-reserve {
          margin-top: 1rem;
          display: inline-block;
        }
      }

      /* MENU SECTION (Index Only) */
      #menu {
        padding: 8rem 0;
        background: var(--ink);
        position: relative;
        overflow: hidden;
      }
      #menu::before {
        content: 'MENU';
        position: absolute;
        bottom: 2rem; left: -1rem;
        font-family: 'Zen Antique', serif;
        font-size: 8rem;
        color: rgba(200,169,110,0.03);
        letter-spacing: 0.2em;
        pointer-events: none;
      }
      #menu::after {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, var(--sake), transparent);
      }
      .menu-header { text-align: center; margin-bottom: 4rem; }
      .menu-header .divider { margin: 1.5rem auto; }
      .menu-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5px; }
      .menu-card {
        background: var(--warm-dark);
        display: flex;
        flex-direction: column;
        position: relative;
        overflow: hidden;
        transition: transform 0.4s cubic-bezier(0.4,0,0.2,1);
      }
      .menu-card:hover { transform: translateY(-4px); }
      .menu-card-img {
        aspect-ratio: 4/3;
        background: linear-gradient(135deg, rgba(200,169,110,0.18), rgba(42,31,20,0.8));
        position: relative;
        overflow: hidden;
      }
      .menu-card-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
      .menu-card:hover .menu-card-img img { transform: scale(1.05); }
      .menu-card-body { padding: 1.5rem; flex: 1; display: flex; flex-direction: column; }
      .menu-card-season { font-size: 0.65rem; letter-spacing: 0.2em; color: var(--sake); margin-bottom: 0.5rem; }
      .menu-card-title { font-family: 'Shippori Mincho', serif; font-size: 1.1rem; font-weight: 700; color: var(--rice); margin-bottom: 0.6rem; line-height: 1.5; }
      .menu-card-desc { font-size: 0.78rem; color: var(--stone); line-height: 1.9; flex: 1; }
      .menu-more-wrap { text-align: center; margin-top: 3rem; }
      .btn-menu-more {
        display: inline-block; padding: 0.8rem 2.5rem; border: 1px solid rgba(200,169,110,0.5);
        color: var(--sake); font-family: 'Noto Serif JP', serif; font-size: 0.82rem; letter-spacing: 0.2em; transition: 0.3s;
      }
      .btn-menu-more:hover { background: var(--sake); color: var(--ink); }
      @media (max-width: 900px) { .menu-grid { grid-template-columns: 1fr; max-width: 420px; margin: 0 auto; } }

      /* GALLERY SECTION */
      #gallery { padding: 8rem 0; background: var(--warm-dark); position: relative; overflow: hidden; }
      #gallery::before {
        content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
        background: linear-gradient(90deg, transparent, var(--sake), transparent);
      }
      .gallery-header { text-align: center; margin-bottom: 3rem; }
      .gallery-header .divider { margin: 1.5rem auto; }
      .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }
      .gallery-item { aspect-ratio: 1; position: relative; overflow: hidden; background: var(--ink); }
      .gallery-item-bg { width: 100%; height: 100%; transition: transform 0.5s ease; }
      .gallery-item:hover .gallery-item-bg { transform: scale(1.06); }
      .gallery-cta-wrap { text-align: center; margin-top: 3rem; }
      .btn-instagram {
        display: inline-flex; align-items: center; gap: 0.8rem; padding: 0.9rem 2.2rem;
        background: linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045); color: #fff;
        font-family: 'Noto Serif JP', serif; font-size: 0.82rem; letter-spacing: 0.1em; transition: 0.3s;
      }
      .btn-instagram:hover { opacity: 0.88; transform: translateY(-2px); }
      .btn-instagram svg { width: 18px; height: 18px; fill: #fff; }
      @media (max-width: 600px) { .gallery-grid { grid-template-columns: repeat(2, 1fr); } }
    `;
  const styleTag = document.createElement('style');
  styleTag.textContent = additionalStyles;
  document.head.appendChild(styleTag);


  /* ============================================================
     1. CONCEPT IMAGE PLACEHOLDER → IMG タグに差し替え
  ============================================================ */
  const conceptMock = document.querySelector('.concept-image-mock');
  if (conceptMock) {
    const img = document.createElement('img');
    img.src = 'img/store-in4.png';
    img.alt = 'Sake Bar 成 店内';
    img.setAttribute('data-section', 'concept-image');
    img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
    conceptMock.replaceWith(img);
  }


  /* ============================================================
     2. メニューセクションを #features の直後に挿入 (Index.html のみ)
  ============================================================ */
  const featuresSection = document.getElementById('features');
  if (featuresSection && !window.location.pathname.includes('menu.html')) {
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
                  <img src="img/food.png" alt="朝ドレ鮮魚のお刺刺盛り合わせ" />
                </div>
                <div class="menu-card-body">
                  <p class="menu-card-season">— TODAY'S SELECTION —</p>
                  <h3 class="menu-card-title">朝ドレ鮮魚のお刺身盛り合わせ</h3>
                  <p class="menu-card-desc">
                    小田原早川漁港から朝一番で届く鮮魚を、その日おすすめの盛り合わせで。
                    相模湾の旬の味わいをそのままに、丁寧に引いた一皿です。
                  </p>
                </div>
              </div>
      
              <div class="menu-card reveal">
                <div class="menu-card-img">
                  <img src="img/obanzai2.jpg" alt="手作りおばんざい盛合せ" />
                </div>
                <div class="menu-card-body">
                  <p class="menu-card-season">— SIGNATURE DISH —</p>
                  <h3 class="menu-card-title">手作りおばんざい盛合せ</h3>
                  <p class="menu-card-desc">
                    日替わりで丁寧に仕込む、成（NARU）自慢のおばんざい。
                    旬の野菜や地元の食材を活かした、優しくも深い味わいの5種盛り合わせです。
                  </p>
                </div>
              </div>
      
              <div class="menu-card reveal">
                <div class="menu-card-img">
                  <img src="img/store-in2.png" alt="厳選日本酒セレクション" />
                </div>
                <div class="menu-card-body">
                  <p class="menu-card-season">— SAKE SELECTION —</p>
                  <h3 class="menu-card-title">厳選日本酒セレクション</h3>
                  <p class="menu-card-desc">
                    全国の蔵元から店主が自ら選び抜いた日本酒を常時10種以上。
                    季節ごとの銘柄や、お料理との最高の相性をご提案します。
                  </p>
                </div>
              </div>
      
            </div>

            <div class="menu-note reveal">
              <p>※お品書きや日本酒のラインナップは、季節や毎日の仕入れ状況により随時変わります。<br class="sp-only">その日だけの特別なお酒や肴との出会いをお楽しみください。</p>
            </div>
      
            <div class="menu-more-wrap">
              <a href="menu.html" class="btn-menu-more">
                もっとお品書きを見る
              </a>
            </div>
          </div>
        `;

    featuresSection.insertAdjacentElement('afterend', menuSection);
  }


  /* ============================================================
     3. ナビゲーションに「メニュー」リンクを挿入
  ============================================================ */
  const navLinks = document.querySelector('.nav-links');
  if (navLinks) {
    let kodawariLi = null;
    navLinks.querySelectorAll('li').forEach(li => {
      const a = li.querySelector('a');
      if (a && a.getAttribute('href') === '#features') kodawariLi = li;
    });

    const isOnMenuPage = window.location.pathname.includes('menu.html');
    const menuLi = document.createElement('li');
    menuLi.innerHTML = `<a href="${isOnMenuPage ? 'index.html#menu' : '#menu'}">メニュー</a>`;

    if (kodawariLi && kodawariLi.nextElementSibling) {
      kodawariLi.insertAdjacentElement('afterend', menuLi);
    } else if (navLinks.lastElementChild) {
      navLinks.insertBefore(menuLi, navLinks.lastElementChild);
    }
  }


  /* ============================================================
     4. ハンバーガーメニュー（スライドイン）
  ============================================================ */
  const hamburger = document.getElementById('hamburger');
  const navLinksEl = document.getElementById('navLinks');

  if (hamburger && navLinksEl) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      navLinksEl.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navLinksEl.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinksEl.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }


  /* ============================================================
     5. ギャラリーセクションをフッター直前に挿入 (Index.html のみ)
  ============================================================ */
  const footerEl = document.getElementById('footer');
  if (footerEl && !window.location.pathname.includes('menu.html')) {
    const galleryItems = [
      { label: '旬の鮮魚', img: 'img/スクリーンショット 2026-03-18 22.25.05.png' },
      { label: '厳選日本酒', img: 'img/スクリーンショット 2026-03-18 22.25.14.png' },
      { label: 'おばんざい', img: 'img/スクリーンショット 2026-03-18 22.25.25.png' },
      { label: '店内の雰囲気', img: 'img/スクリーンショット 2026-03-18 22.25.36.png' },
      { label: 'こだわりの一皿', img: 'img/スクリーンショット 2026-03-18 22.25.44.png' },
      { label: '温かみのある空間', img: 'img/スクリーンショット 2026-03-18 22.25.54.png' },
    ];

    const galleryItemsHTML = galleryItems.map(item => `
          <div class="gallery-item reveal">
            <div class="gallery-item-bg">
              <img src="${item.img}" alt="${item.label}" loading="lazy"
                   style="width:100%;height:100%;object-fit:cover;" />
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

    footerEl.insertAdjacentElement('beforebegin', gallerySection);
  }


  /* ============================================================
     6. IntersectionObserver — .reveal アニメーション
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