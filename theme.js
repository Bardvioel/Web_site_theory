// theme.js
class ThemeSwitcher {
    constructor() {
        this.toggleBtn = document.getElementById('themeToggle');
        this.htmlElement = document.documentElement;
        this.init();
    }

    init() {
        // Проверяем сохраненную тему или системные настройки
        const savedTheme = localStorage.getItem('theme');
        const systemTheme = this.getSystemTheme();
        
        // Используем сохраненную тему или системную
        const theme = savedTheme || systemTheme;
        this.setTheme(theme);
        
        // Добавляем обработчик клика
        this.toggleBtn.addEventListener('click', () => this.toggleTheme());
        
        // Слушаем изменения системной темы
        this.watchSystemTheme();
    }

    getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    setTheme(theme) {
        this.htmlElement.setAttribute('data-theme', theme);
        
        // Меняем иконку на кнопке
        this.toggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
        
        // Сохраняем в localStorage
        localStorage.setItem('theme', theme);
    }

    toggleTheme() {
        const currentTheme = this.htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    watchSystemTheme() {
        // Если пользователь не выбирал тему вручную, следим за системными настройками
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                const newTheme = e.matches ? 'dark' : 'light';
                this.setTheme(newTheme);
            }
        });
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new ThemeSwitcher();
});