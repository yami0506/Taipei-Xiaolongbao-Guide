document.addEventListener('DOMContentLoaded', function() {
    // モバイルメニュートグル
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');
  
    if (navToggle) {
      navToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
      });
    }
  
    // スムーススクロール
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
  
    scrollLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
  
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
  
        const targetElement = document.querySelector(targetId);
  
        if (targetElement) {
          const headerHeight = document.querySelector('.header').offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
  
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
  
          // モバイルメニューが開いていたら閉じる
          if (navToggle && navToggle.classList.contains('active')) {
            navToggle.classList.remove('active');
            nav.classList.remove('active');
          }
        }
      });
    });
  
    // スクロール時のヘッダースタイル変更
    function updateHeaderStyle() {
      const header = document.querySelector('.header');
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  
    window.addEventListener('scroll', updateHeaderStyle);
    updateHeaderStyle();
  
    // レストランフィルタリング
    const filterButtons = document.querySelectorAll('.filter-btn');
    const restaurantCards = document.querySelectorAll('.restaurant-card');
  
    if (filterButtons.length > 0 && restaurantCards.length > 0) {
      filterButtons.forEach(button => {
        button.addEventListener('click', function() {
          // アクティブクラスの切り替え
          filterButtons.forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');
  
          const filterValue = this.getAttribute('data-filter');
  
          // カードのフィルタリング
          restaurantCards.forEach(card => {
            const categories = card.getAttribute('data-category')?.split(' ') || [];
  
            if (filterValue === 'all' || categories.includes(filterValue)) {
              card.style.display = 'flex';
              setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              }, 50);
            } else {
              card.style.opacity = '0';
              card.style.transform = 'translateY(20px)';
              setTimeout(() => {
                card.style.display = 'none';
              }, 300);
            }
          });
        });
      });
    }
  
    // スクロールアニメーション
    function revealOnScroll() {
      const elements = document.querySelectorAll('.reveal');
      const windowHeight = window.innerHeight;
  
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
  
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('active');
        }
      });
    }
  
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
  
    // 表のソート機能（オプション）
    const sortableHeaders = document.querySelectorAll('th[data-sort]');
  
    if (sortableHeaders.length > 0) {
      sortableHeaders.forEach(header => {
        header.addEventListener('click', function() {
          const sortBy = this.getAttribute('data-sort');
          const table = this.closest('table');
          const tbody = table.querySelector('tbody');
          const rows = Array.from(tbody.querySelectorAll('tr'));
  
          // ソート方向を決定
          const currentDirection = this.getAttribute('data-direction') || 'asc';
          const newDirection = currentDirection === 'asc' ? 'desc' : 'asc';
  
          // 現在のヘッダーの方向を更新
          this.setAttribute('data-direction', newDirection);
  
          // すべてのヘッダーからソート方向クラスを削除
          sortableHeaders.forEach(h => {
            h.classList.remove('sort-asc', 'sort-desc');
          });
  
          // 現在のヘッダーにソート方向クラスを追加
          this.classList.add(`sort-${newDirection}`);
  
          // 行をソート
          rows.sort((a, b) => {
            const aValue = a.cells[this.cellIndex].textContent.trim();
            const bValue = b.cells[this.cellIndex].textContent.trim();
  
            if (newDirection === 'asc') {
              return aValue.localeCompare(bValue);
            } else {
              return bValue.localeCompare(aValue);
            }
          });
  
          // ソートされた行をDOMに再挿入
          rows.forEach(row => {
            tbody.appendChild(row);
          });
        });
      });
    }
  });
  