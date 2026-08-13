// --- ИНИЦИАЛИЗАЦИЯ ИНТЕРФЕЙСА И РЕЖИМА "ОДНО ОКНО" ---
document.addEventListener("DOMContentLoaded", () => {
    initCardExpands();
    initMobileMenu();
    initCaseSlider();
});

// 1. ЛОГИКА ПЛАВНОГО РАСКРЫТИЯ ИНСТРУКЦИЙ КАРТОЧЕК МАТРИЦЫ
function initCardExpands() {
    const cards = document.querySelectorAll(".threat-card");
    
    cards.forEach(card => {
        const btn = card.querySelector(".btn-card-expand");
        
        btn.addEventListener("click", () => {
            const isActive = card.classList.contains("active");
            
            // Закрываем другие открытые карточки для экономии места на экране
            document.querySelectorAll(".threat-card").forEach(c => c.classList.remove("active"));
            
            if (!isActive) {
                card.classList.add("active");
                btn.textContent = "Свернуть Инструкцию ↩";
            } else {
                btn.textContent = "Развернуть Инструкцию ➔";
            }
        });
    });
}

// 2. МОБИЛЬНОЕ МЕНЮ (БУРГЕР) ДЛЯ СМАРТФОНОВ
function initMobileMenu() {
    const burger = document.getElementById("burgerToggle");
    const nav = document.querySelector(".nav-links");
    
    if (burger && nav) {
        burger.addEventListener("click", () => {
            const isMenuOpen = nav.style.display === "flex";
            nav.style.display = isMenuOpen ? "none" : "flex";
            if (!isMenuOpen) {
                nav.style.position = "absolute";
                nav.style.top = "85px";
                nav.style.left = "0";
                nav.style.width = "100%";
                nav.style.flexDirection = "column";
                nav.style.background = "rgba(7, 10, 19, 0.95)";
                nav.style.padding = "20px";
                nav.style.gap = "20px";
            }
        });
    }
}

// 3. БАЗА ДАННЫХ РЕАЛЬНЫХ КЕЙСОВ-СЦЕНАРИЕВ ДЛЯ СЛАЙДЕРА
const CASES_DATA = [
    {
        title: "Ситуация: Звонок в мессенджере от руководителя",
        teens: "🚀 <b>Схема развода:</b> Подростку пишет фейковый админ игрового сервера или популярный блогер: <i>«Ты выиграл секретный мерч, срочно подтверди аккаунт кодом»</i>.<br><b>Как себя вести:</b> Блогеры никогда не пишут первыми в ЛС. Никому не говори код из СМС, это ключ для угона профиля.",
        adults: "💼 <b>Схема развода:</b> Внезапный звонок или сообщение от 'Генерального директора' в Telegram. Голос или текст идеальны. Требует перевести деньги на 'безопасный счет' из-за проверки ведомств.<br><b>Как себя вести:</b> Сбросьте вызов. Перезвоните шефу лично по обычному сотовому телефону. Это атака AI-дипфейка."
    },
    {
        title: "Ситуация: Срочное СМС о блокировке карты или штрафе",
        teens: "🚀 <b>Схема развода:</b> Приходит СМС: <i>«Твой аккаунт заблокирован за читы. Перейди по ссылке, чтобы обжаловать бан в течение 1 часа»</i>.<br><b>Как себя вести:</b> Это психологический прессинг, чтобы ты в панике ввел пароль на фейковом сайте. Игнорируй ссылки со счетчиками времени.",
        adults: "💼 <b>Схема развода:</b> СМС со ссылкой-клоном Госуслуг или ФНС: <i>«Ваш долг по налогам составляет 4500 руб. В случае неоплаты завтра наложим арест на счета»</i>.<br><b>Как себя вести:</b> Не переходите по ссылкам из СМС. Зайдите в официальное приложение Госуслуг или личный кабинет налогоплательщика — все реальные долги отображаются только там."
    },
    {
        title: "Ситуация: Покупка дефицитного товара со скидкой 70%",
        teens: "🚀 <b>Схема развода:</b> В группе предлагают купить топовый нож в CS или игровую валюту в 5 раз дешевле официального магазина через 'проверенного гаранта'.<br><b>Как себя вести:</b> Бесплатный сыр только в мышеловке. Гарант окажется сообщником мошенника. Покупай предметы только на официальной торговой площадке.",
        adults: "💼 <b>Схема развода:</b> На фейковой доске объявлений или интернет-магазине продается дорогой ноутбук за копейки. Продавец просит уйти из чата платформы в WhatsApp и кидает ссылку на 'безопасную сделку'.<br><b>Как себя вести:</b> Никогда не уходите из официального чата торговой площадки. Левые ссылки на оплату полностью спишут все деньги с вашей карты."
    }
];

// 4. ДВИЖОК СЛАЙДЕРА С ТУМБЛЕРОМ АУДИТОРИИ В ОДНО ОКНО
function initCaseSlider() {
    let currentIdx = 0;
    let currentMode = "teens"; // По умолчанию открыт режим подростка
    
    const sliderContainer = document.getElementById("caseSlider");
    const dotsContainer = document.getElementById("sliderDots");
    const btnTeens = document.getElementById("btnViewTeens");
    const btnAdults = document.getElementById("btnViewAdults");
    
    if (!sliderContainer) return;

    function renderSlide() {
        const item = CASES_DATA[currentIdx];
        const textContent = currentMode === "teens" ? item.teens : item.adults;
        
        sliderContainer.innerHTML = `
            <div class="case-view-block animate-fade">
                <h3>${item.title}</h3>
                <p>${textContent}</p>
            </div>
        `;
        updateDots();
    }

    // Логика кнопок-тумблеров
    btnTeens.addEventListener("click", () => {
        currentMode = "teens";
        btnTeens.classList.add("active");
        btnAdults.classList.remove("active");
        renderSlide();
    });

    btnAdults.addEventListener("click", () => {
        currentMode = "adults";
        btnAdults.classList.add("active");
        btnTeens.classList.remove("active");
        renderSlide();
    });

    // Навигация слайдера
    document.getElementById("nextCase").addEventListener("click", () => {
        currentIdx = (currentIdx + 1) % CASES_DATA.length;
        renderSlide();
    });

    document.getElementById("prevCase").addEventListener("click", () => {
        currentIdx = (currentIdx - 1 + CASES_DATA.length) % CASES_DATA.length;
        renderSlide();
    });

    function updateDots() {
        dotsContainer.innerHTML = CASES_DATA.map((_, i) => 
            `<div class="dot ${i === currentIdx ? 'active' : ''}"></div>`
        ).join("");
    }

    renderSlide();
}
// --- ИГРОВОЙ ДВИЖОК ВСТРОЕННОГО КИБЕР-КВЕСТА С ГЕНЕРАТОРОМ СЕРТИФИКАТОВ ---

const QUEST_QUESTIONS = [
    {
        q: "Вам в мессенджере пришло сообщение от старого знакомого: «Привет! Проголосуй, пожалуйста, за мою племянницу на конкурсе рисунков, очень нужны голоса!» и ссылка. Ваши действия?",
        options: [
            { text: "Сразу перейду по ссылке и введу код авторизации, чтобы поддержать человека.", score: 0 },
            { text: "Проигнорирую или свяжусь со знакомым другим способом, чтобы уточнить, не взломали ли его.", score: 100 },
            { text: "Перейду по ссылке, но вводить данные не буду — просто посмотрю на сайт конкурса.", score: 30 }
        ]
    },
    {
        q: "Вы ищете редкий предмет в игре или дорогой гаджет в сети. На неизвестном форуме вам предлагают купить его со скидкой 80%, но просят провести оплату через их личную 'защищенную форму'. Что делать?",
        options: [
            { text: "Оплачу своей основной картой, ведь скидка огромная и упускать её нельзя.", score: 0 },
            { text: "Воспользуюсь виртуальной интернет-картой с лимитом, строго равным сумме этой покупки.", score: 60 },
            { text: "Откажусь от сделки и закрою сайт. Перевод денег на сторонние формы вне официальных площадок — это 100% обман.", score: 100 }
        ]
    },
    {
        q: "Какое из следующих правил настройки двухфакторной аутентификации (2FA) обеспечивает максимальный уровень защиты?",
        options: [
            { text: "Использование подтверждения по СМС-коду на основной номер телефона.", score: 40 },
            { text: "Использование кодов из специальных офлайн-приложений (Google Authenticator, Bitwarden).", score: 100 },
            { text: "Двухфакторная аутентификация не нужна, если у меня длинный и сложный пароль.", score: 0 }
        ]
    },
    {
        q: "В Telegram вам пишет аккаунт с фотографией и именем вашего начальника (или директора школы) и требует срочно перевести деньги на указанные реквизиты из-за 'секретной внеплановой проверки'. Как поступить?",
        options: [
            { text: "Выполню требование незамедлительно, ведь это руководство и спорить нельзя.", score: 0 },
            { text: "Заблокирую аккаунт и перезвоню человеку по его реальному сотовому номеру для проверки информации.", score: 100 },
            { text: "Начну расспрашивать подробности проверки прямо в этом чате.", score: 20 }
        ]
    },
    {
        q: "Вы решили почистить свои социальные сети от старого контента. Почему важно контролировать свой 'Цифровой след'?",
        options: [
            { text: "Удаленные файлы исчезают бесследно, поэтому старые посты ни на что не влияют.", score: 0 },
            { text: "Всё, что попало в сеть, может быть сохранено другими людьми. Избыточная информация используется для шантажа или подбора паролей.", score: 100 },
            { text: "Это важно только для знаменитостей и крупных бизнесменов, обычным людям бояться нечего.", score: 10 }
        ]
    }
];

let currentQuestStep = 0;
let userTotalScore = 0;

// Инициализация событий квеста
const startQuestBtn = document.getElementById("startQuestBtn");
if (startQuestBtn) {
    startQuestBtn.addEventListener("click", startQuest);
}

function startQuest() {
    document.getElementById("questIntro").style.display = "none";
    document.getElementById("questQuestionBlock").style.display = "block";
    currentQuestStep = 0;
    userTotalScore = 0;
    showQuestion();
}

function showQuestion() {
    const qData = QUEST_QUESTIONS[currentQuestStep];
    
    // Обновляем шкалу прогресса и метаданные
    const progressFill = document.getElementById("questProgress");
    const stepNum = document.getElementById("questStepNum");
    const qText = document.getElementById("questText");
    const optionsBlock = document.getElementById("questOptionsBlock");
    
    const progressPercent = ((currentQuestStep + 1) / QUEST_QUESTIONS.length) * 100;
    progressFill.style.width = `${progressPercent}%`;
    
    stepNum.textContent = `Вопрос ${currentQuestStep + 1} из ${QUEST_QUESTIONS.length}`;
    qText.textContent = qData.q;
    
    // Генерируем варианты ответов в Одно Окно без спама элементами
    optionsBlock.innerHTML = qData.options.map((opt, idx) => `
        <button class="quest-opt-btn" onclick="handleAnswer(${opt.score})">${idx + 1}. ${opt.text}</button>
    `).join("");
}

// Выносим обработчик кликов в глобальную зону видимости окна браузера
window.handleAnswer = function(score) {
    userTotalScore += score;
    currentQuestStep++;
    
    if (currentQuestStep < QUEST_QUESTIONS.length) {
        showQuestion();
    } else {
        showQuestResults();
    }
};

function showQuestResults() {
    document.getElementById("questQuestionBlock").style.display = "none";
    document.getElementById("questResultBlock").style.display = "block";
    
    const scoreText = document.getElementById("resultScoreText");
    const verdict = document.getElementById("resultVerdict");
    
    scoreText.textContent = `${userTotalScore} из 500 очков`;
    
    if (userTotalScore >= 450) {
        verdict.innerHTML = "🔥 <b>Ранг: КИБЕР-ЭКСПЕРТ (Максимальная защита).</b><br>Ваш цифровой иммунитет безупречен. Вы идеально распознаете уловки социальной инженерии и фишинга. Мошенникам до вас не добраться!";
    } else if (userTotalScore >= 300) {
        verdict.innerHTML = "⚡ <b>Ранг: ЦИФРОВОЙ СТРАЖ (Средняя защита).</b><br>У вас хорошие базовые знания, но есть уязвимые зоны в защите финансов или настройки 2FA. Изучите чек-листы выше, чтобы укрепить рубежи учетных записей.";
    } else {
        verdict.innerHTML = "🚨 <b>Ранг: ЦИФРОВОЙ НЕОФИТ (Критический уровень угроз).</b><br>Ваш аккаунт и карты находятся в зоне высокого риска. Вы доверяете подозрительным ссылкам и сообщениям. Срочно примените пошаговые инструкции с нашего сайта!";
    }
    
    // Логика кнопки генерации стеклянной грамоты
    document.getElementById("genCertBtn").onclick = generateFrostedCertificate;
};

function generateFrostedCertificate() {
    const inputName = document.getElementById("certNameInput").value.trim();
    if (inputName.length < 2) {
        alert("Пожалуйста, введите ваше настоящее Имя и Фамилию для подписи документа!");
        return;
    }
    
    document.getElementById("questResultBlock").style.display = "none";
    document.getElementById("questCertBlock").style.display = "block";
    
    // Передаем данные на стеклянный бланк
    document.getElementById("certHolderName").textContent = inputName;
    
    // Рассчитываем итоговое текстовое звание на бланке грамоты
    const rankBadge = document.getElementById("certRankBadge");
    if (userTotalScore >= 450) rankBadge.textContent = "КИБЕР-ЭКСПЕРТ";
    else if (userTotalScore >= 300) rankBadge.textContent = "ЦИФРОВОЙ СТРАЖ";
    else rankBadge.textContent = "ЦИФРОВОЙ НЕОФИТ";
    
    // Проставляем текущую системную дату и генерируем уникальный серийный ID верификации
    const today = new Date();
    const dateStr = today.toLocaleDateString("ru-RU");
    document.getElementById("certDate").textContent = dateStr;
    
    const randomId = Math.floor(100000 + Math.random() * 900000);
    document.getElementById("certIdCode").textContent = `ID: SW-${randomId}`;
}

// Логика кнопки сброса и перезапуска кибер-аудита
const restartQuestBtn = document.getElementById("restartQuestBtn");
if (restartQuestBtn) {
    restartQuestBtn.addEventListener("click", () => {
        document.getElementById("questCertBlock").style.display = "none";
        document.getElementById("questIntro").style.display = "block";
        document.getElementById("certNameInput").value = "";
    });
}
