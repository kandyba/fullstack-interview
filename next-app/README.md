# Interview App

Особистий застосунок для підготовки до технічних співбесід.

## Технології

- Next.js
- React
- TypeScript
- Tailwind CSS
- MongoDB
- Mongoose
- MongoDB Compass
- react-markdown
- highlight.js

## Локальна база даних

MongoDB є основним джерелом даних для runtime.

- Назва бази: `interview_app`
- Connection string: `mongodb://localhost:27017/interview_app`
- Файл: `.env.local`

Приклад:

```env
MONGODB_URI=mongodb://localhost:27017/interview_app
```

## Як запустити MongoDB локально (Homebrew)

```bash
brew services start mongodb-community@7.0
```

Перевірити статус:

```bash
brew services list
```

Перевірити порт:

```bash
lsof -i :27017
```

Зупинити MongoDB:

```bash
brew services stop mongodb-community@7.0
```

## Як відкрити базу через MongoDB Compass

1. Відкрий MongoDB Compass.
2. У connection string встав: `mongodb://localhost:27017`.
3. Натисни `Connect`.
4. Знайди базу `interview_app`.
5. Перевір колекції: `categories`, `questions`.

Тепер має бути 3 колекції: `groups`, `categories`, `questions`.

// font-family: familyVinMonoPro

## Як запустити застосунок

```bash
npm install
npm run dev
```

`npm run dev` автоматично:
1. Запускає локальну MongoDB через Homebrew (`mongodb-community@7.0`).
2. Запускає Next.js dev server.

База даних: `interview_app`.

Адреси:

- `http://localhost:3000`
- `http://localhost:3000/questions`
- `http://localhost:3000/questions/react`

### Окремі команди для MongoDB

```bash
npm run db:start    # запустити MongoDB service
npm run db:stop     # зупинити MongoDB service
npm run db:status   # перевірити статус MongoDB
```

## Локальна адмінка

Сторінки адмінки:

- `http://localhost:3000/admin`
- `http://localhost:3000/admin/questions`
- `http://localhost:3000/admin/questions/new`
- `http://localhost:3000/admin/questions/[id]/edit`
- `http://localhost:3000/admin/categories`
- `http://localhost:3000/admin/categories/new`
- `http://localhost:3000/admin/categories/[id]/edit`
- `http://localhost:3000/admin/groups`
- `http://localhost:3000/admin/groups/new`

Що важливо:

- адмінка поки без авторизації;
- використовувати тільки локально;
- адмінка має окремий layout;
- у `/admin/*` використовується admin header + sidebar;
- public Header не використовується в адмінці;
- groups зберігаються напряму в MongoDB (`groups`);
- категорії зберігаються напряму в MongoDB (`categories`);
- питання зберігаються напряму в MongoDB (`questions`);
- `categorySlug` обирається із select, який читає `categories` з MongoDB;
- у категорії обов'язковий `groupSlug`, який обирається із `groups`;
- зв'язок між групами і категоріями: `categories.groupSlug` = `groups.slug`;
- зв'язок між категоріями і питаннями: `questions.categorySlug` = `categories.slug`;
- приклад: category slug `react` відповідає питанням з `categorySlug: "react"`;
- delete question доступний зі списку `/admin/questions` з confirm;
- delete category доступний зі списку `/admin/categories` з confirm;
- категорія видаляється тільки якщо до неї не прив'язані питання;
- після створення питання воно з'являється на сторінці відповідної теми, наприклад `http://localhost:3000/questions/react` (якщо `status: published`).


## Де зберігаються дані

Runtime source of truth: MongoDB база `interview_app`.

Колекції:

- `groups`
- `categories`
- `questions`

Основні файли:

- Mongoose models: `src/models/Group.ts`, `src/models/Category.ts`, `src/models/Question.ts`
- MongoDB connection: `src/lib/mongodb.ts`
- Data access helpers: `src/lib/interview.ts`

## Як додати нове питання вручну через MongoDB Compass

Приклад документа для колекції `questions`:

```json
{
	"slug": "react-use-state",
	"question": "Що таке useState?",
	"shortAnswer": "useState — це React Hook, який дозволяє функціональному компоненту зберігати й оновлювати локальний стан.",
	"fullAnswer": "## Що таке useState?\n\n`useState` — це хук React для роботи з локальним станом.",
	"fullAnswerAccess": "premium",
	"categorySlug": "react",
	"sectionSlug": "react-core",
	"difficulty": "junior",
	"order": 4,
	"trickyQuestion": {
		"question": "Чому setState не оновлює стан миттєво?",
		"answer": "Оновлення стану в React батчаться і застосовуються асинхронно."
	},
	"status": "published",
	"tags": []
}
```

## Як додати нову тему

### 1) Додати group

Приклад документа для колекції `groups`:

```json
{
	"slug": "frontend",
	"title": "Frontend",
	"description": "Категорії frontend підготовки.",
	"order": 1
}
```

### 2) Додати category в group

Приклад документа для колекції `categories`:

```json
{
	"slug": "javascript",
	"title": "JavaScript",
	"groupSlug": "frontend",
	"description": "Питання для підготовки до співбесід з JavaScript.",
	"order": 2
}
```

Щоб питання з'являлися у цій темі, у документі питання має бути:

```json
"categorySlug": "javascript"
```

Ключові зв'язки:

- `categories.groupSlug = groups.slug`
- `questions.categorySlug = categories.slug`

## Important notes

- MongoDB є єдиним source of truth для runtime даних.
- Дані редагуються через MongoDB Compass або локальну адмінку (`/admin/questions/new`).
- Seed script більше не використовується і видалений.
- Для підступного питання використовується єдине поле `trickyQuestion` (об'єкт з `question` і `answer`).
- Поля `followUpQuestions` та `trickyQuestions` більше не використовуються.
- Щоб додати питання: локальна адмінка `/admin/questions/new` або MongoDB Compass → `interview_app` → `questions` → Insert Document.
- Щоб змінити питання: знайди документ у Compass і відредагуй поля вручну.
- Не додавати нові питання в TS файли або `.md` файли.

## Структура основних файлів

```text
src/
	app/
	components/
	lib/
		mongodb.ts
		interview.ts
	models/
		Group.ts
		Category.ts
		Question.ts
	types/
		interview.ts
```
