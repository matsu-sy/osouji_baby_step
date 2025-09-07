// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"
import * as bootstrap from "bootstrap"

document.addEventListener('DOMContentLoaded', function() {
  const gachaBtn = document.getElementById('GachaBtn');
  const btnText = gachaBtn.querySelector('.btn-text');

  const modal = document.getElementById('modal');
  const gachaScreen = document.getElementById('gachaScreen');
  const achievementScreen = document.getElementById('achievementScreen');
  const completionBtn = document.getElementById('completionBtn');
  const closeBtn = document.querySelector('.btn-close');


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

// 閉じるボタン
  closeBtn.addEventListener('click', function() {
    modal.classList.remove('show');
    // 次回のために画面をリセット
    setTimeout(() => {
      showGachaScreen();
    }, 300);
  });

completionBtn.addEventListener('click', function() {
  showAchievementScreen();
});

  function drawGacha() {
  fetch('/gacha/draw', {  // URLも修正（gachas → gacha）
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
    const titleElement = document.getElementById('gacha-result-title');
    const iconElement = document.getElementById('gacha-result-icon');

    if (titleElement) {
      titleElement.textContent = data.title;
    }

    if (iconElement) {
      iconElement.textContent = data.icon;
    }

  }
   // 🎯 ガチャ画面を表示
  function showGachaScreen() {
    if (gachaScreen && achievementScreen) {
      gachaScreen.style.display = 'block';
      achievementScreen.style.display = 'none';
    }
  }

  //  達成画面を表示
  function showAchievementScreen() {

      gachaScreen.style.display = 'none';
      achievementScreen.style.display = 'block';
  }
});