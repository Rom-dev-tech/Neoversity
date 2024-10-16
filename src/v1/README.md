# ПОСИЛАННЯ НА МАКЕТ

FIGMA LAYOUT 🔗 https://www.figma.com/file/.....

# 🥤 GULP Starter kit

## 1) Запуск збірки

Встановити залежності проєкту:

```
pnpm install / yarn / npm i
```

Запустити проєкт в режимі розробки:

```
pnpm start / yarn start / npm start
```

Створити білд для продакшену:

```
pnpm build / yarn build / npm run build
```

## 2) Інформація про збірку

- В збірці використовується шаблонизатор
  [Nunjucks](https://mozilla.github.io/nunjucks/templating.html)

  > Сторінки проекту зберігаються у папці **«src/html/pages»**.
  >
  > Секційні фрагменти зберігаються у папці **«src/html/partials»**.

- В збірці використовується CSS framework [Tailwind](https://tailwindcss.com/docs/installation) та
  SASS (SCSS)

- В збірці є автоматична оптимізація усіх зображень.

- В збірці є автоматичне створення WEBP зображень. Покладіть jpg або png зображення і збірка
  автоматично створить webp.

## 3) Скрипт створення секцій

У збірці додано скрипт, який автоматично створює файли HTML та SCSS для нових секцій, а також додає
імпорти цих файлів до основних файлів.

Для створення секцій, в файлі `create-starter.json` необхідно вказати назви секцій, які потрібно
створити, наприклад:

```json
["about", "contact", "blog", "register"]
```

Після цього запустіть скрипт за допомогою однієї з команд:

```
pnpm create-starter / yarn create-starter / npm create-starter
```

Примітка: Скрипт не створює та не перезаписує існуючі файли стилів та розмітки
