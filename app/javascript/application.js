// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"
import * as bootstrap from "bootstrap"

document.addEventListener('DOMContentLoaded', function() {
  const gachaBtn = document.getElementById('GachaBtn');
  const btnText = gachaBtn.querySelector('.btn-text');

  // ホバー効果
  gachaBtn.addEventListener('mouseenter', function() {
    btnText.textContent = 'お掃除する！';
  });
  gachaBtn.addEventListener('mouseleave', function() {
    btnText.textContent = 'お掃除する？';
  });
  // ガチャボタンクリック
  gachaBtn.addEventListener('click', function() {
    const modal = document.getElementById('modal');
    modal.classList.add('show');

    drawGacha();
  });

setupModalEventListeners();

  function drawGacha() {
  fetch('/gacha/draw', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    }
  })
      .then(response => response.json())
      .then(data => {
        displayGachaResult(data);
      });
  }

  function displayGachaResult(data) {
    const modal = document.getElementById('modal');

    // モーダル全体を動的に生成
    modal.innerHTML = `
      <div class="modal-content">
        <button type="button" class="btn-close" aria-label="Close"></button>

        <div class="modal-screen gacha-screen" id="gachaScreen">
          <div class="modal-body">
            <div class="gacha-result" id="gachaResult">
              <div class="text-center mt-4">
                <h3 class="gacha-title">${data.title}</h3>
                <div class="gacha-icon mb-3">
                  <img src="${data.icon_url}" alt="${data.icon}" class="gacha-icon">
                </div>
              </div>
            </div>

            <div class="button-container">
              <a href="/gacha/${data.id}/share" class="btn-x_link" target="_blank">で宣言！</a>
              <button type="button" class="btn-completion" id="completionBtn">完了！</button>
            </div>
          </div>
        </div>

        <div class="modal-screen achievement-screen" id="achievementScreen" style="display: none;">
          <div class="modal-body">
            <div class="achievement-content">
              <img src="/assets/logo/osouji_tassei.png" alt
              <img src="/assets/logo/osouji_tassei.png" alt="達成！" class="achievement-logo">
            </div>
          </div>
        </div>
      </div>
    `;

    // 新しく生成された要素にイベントリスナーを再設定
    setupModalEventListeners();
  }

  function setupModalEventListeners() {
    // 閉じるボタンの設定
    const closeBtn = document.querySelector('.btn-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        const modal = document.getElementById('modal');
        modal.classList.remove('show');
        setTimeout(() => {
          showScreen('gachaScreen');
        }, 200);
      });
    }

    // 完了ボタンの設定
    const completionBtn = document.getElementById('completionBtn');
    if (completionBtn) {
      completionBtn.addEventListener('click', function() {
        showScreen('achievementScreen');
      });
    }
  }

  function showScreen(activeScreenId) {
    const screens = ['gachaScreen', 'achievementScreen'];

    screens.forEach(screenId => {
      const screen = document.getElementById(screenId);
      if (screen) {
        screen.style.display = screenId === activeScreenId ? 'block' : 'none';
      }
    });
  }
});