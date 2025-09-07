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
  gachaBtn.addEventListener('click', function() {
    const modal = document.getElementById('modal');
    modal.classList.add('show');
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


  function showGachaScreen() {
    if (gachaScreen && achievementScreen) {
      gachaScreen.style.display = 'block';
      gachaScreen.style.opacity = '1';
      gachaScreen.style.transform = 'translateX(0)';

      achievementScreen.style.display = 'none';
      achievementScreen.style.opacity = '0';
      achievementScreen.style.transform = 'translateX(100%)';
    }
  }

  //  達成画面を表示する関数
  function showAchievementScreen() {

    if (gachaScreen && achievementScreen) {
      // ガチャ画面をフェードアウト
      gachaScreen.style.opacity = '0';
      gachaScreen.style.transform = 'translateX(-100%)';

      setTimeout(() => {
        gachaScreen.style.display = 'none';
        achievementScreen.style.display = 'block';
        achievementScreen.style.opacity = '0';
        achievementScreen.style.transform = 'translateX(100%)';

        // 達成画面をフェードイン
        setTimeout(() => {
          achievementScreen.style.opacity = '1';
          achievementScreen.style.transform = 'translateX(0)';
        }, 50);
      }, 300);
    }
  }
});