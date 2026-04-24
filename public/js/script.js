// typewritter
let typeJsText = document.querySelector(".animatedText");
let stringIndex = 0;
let charIndex = 0;
let isTyping = true;

function typeJs() {
    if (stringIndex < textArray.length) {
        const currentString = textArray[stringIndex];

        if (isTyping) {
            if (charIndex < currentString.length) {
                typeJsText.innerHTML += currentString.charAt(charIndex);
                charIndex++;
            } else {
                isTyping = false;
            }
        } else {
            if (charIndex > 0) {
                typeJsText.innerHTML = currentString.substring(0, charIndex - 1);
                charIndex--;
            } else {
                isTyping = true;
                stringIndex++;

                if (stringIndex >= textArray.length) {
                    stringIndex = 0;
                }

                charIndex = 0;
                typeJsText.innerHTML = "";
            }
        }
    }
}

setInterval(typeJs, 120);

let currentMode = 'default'; // Начальный режим

// Функция для установки режима
function setMode(mode) {
    const defaultBtn = document.getElementById('default-buttons');
    const altBtn = document.getElementById('alt-buttons');
    const toggleBtn = document.getElementById('toggle-btn');
    if (defaultBtn && altBtn && toggleBtn) {
        if (mode === 'alt') {
            defaultBtn.style.display = 'none';
            altBtn.style.display = 'block';
            altBtn.classList.add('alt');
            toggleBtn.textContent = 'назад';
        } else {
            defaultBtn.style.display = 'block';
            altBtn.style.display = 'none';
            altBtn.classList.remove('alt');
            toggleBtn.textContent = 'Всякие проекты';
        }
        currentMode = mode;
    }
}

// Toggle логика с историей
const toggleBtn = document.getElementById('toggle-btn');
if (toggleBtn) {
    toggleBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const newMode = currentMode === 'default' ? 'alt' : 'default';
        setMode(newMode);
        history.pushState({ mode: newMode }, '', ''); // Добавляем в историю
    });
}

// Обработка back/forward
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.mode) {
        setMode(event.state.mode); // Восстанавливаем режим
    } else {
        // Если state null (начальный), вернуться к default
        setMode('default');
    }
});

// Инициализация: установить начальный state
history.replaceState({ mode: 'default' }, '', '');