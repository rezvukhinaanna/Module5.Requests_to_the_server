# 📝 Todo List (React + Firebase/JSON Server)

**Универсальное приложение для управления задачами с двумя вариантами бэкенда**

---

## 🚀 Запуск проекта

### Для версии с JSON Server:
```bash
npm install
npx json-server@0.17.4 --watch db.json --port 3001
npm start
```

### Для версии с Firebase:
Установите Firebase CLI:
```bash
npm install -g firebase-tools
```
Деплой:
```bash
firebase login
firebase init
firebase deploy
```

---

## 🔍 Описание

Гибкое приложение для управления задачами с:
- Полноценным CRUD-функционалом
- Умным поиском с debounce
- Переключаемой сортировкой по алфавиту
- Двумя вариантами бэкенда на выбор

---

## 🛠 Стек технологий

- **Frontend:** React (Create React App)
- **State Management:** Context API
- **Backend Options:**
  - JSON Server (для локальной разработки)
  - Firebase Realtime Database (для production)
- **Дополнительно:**
  - lodash.debounce
  - react-icons
  - CSS Modules

---

## 📌 Реализованные функции

✔ **Базовый функционал**
- Добавление, редактирование и удаление задач
- Валидация вводимых данных

✔ **Расширенные возможности**
- Поиск с оптимизацией через debounce
- Сортировка по алфавиту (клиентская)
- Адаптивный дизайн

✔ **Интеграция с бэкендом**
- Два варианта реализации:
  - Локальный JSON Server
  - Облачный Firebase

---

## 🎯 Навыки

- Работа с разными типами бэкендов
- Реализация сложного поиска с оптимизацией
- Клиентская сортировка данных
- Адаптация UI под разные устройства

---

**Stay productive!** 📈✌️
