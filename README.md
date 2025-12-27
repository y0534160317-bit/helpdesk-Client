
# HelpDesk Client 🛠️

מערכת לניהול קריאות שירות (HelpDesk) שנבנתה באמצעות React, TypeScript ו-Material UI.
המערכת מאפשרת למשתמשים לפתוח קריאות שירות, ולמנהלים/נציגים לנהל אותן, לעדכן סטטוסים ולתקשר עם המשתמשים באמצעות מערכת תגובות
המערכת נכתבה בצורה עצמאית ולא ע"י סוכן AI
## ✨ תכונות עיקריות

* **ניהול משתמשים והרשאות:**
    * הרשמה והתחברות מאובטחת.
    * תמיכה בסוגי משתמשים שונים: לקוח (Customer), נציג (Agent), ומנהל (Admin).
    * ניתוב מוגן (Protected Routes) בהתאם לתפקיד המשתמש.
* **ניהול קריאות (Tickets):**
    * פתיחת קריאה חדשה עם עדיפות (נמוכה, בינונית, גבוהה).
    * צפייה ברשימת קריאות אישית (ללקוח) או כללית (למנהל).
    * עדכון סטטוס קריאה ופרטים נוספים.
    * מחיקת קריאות (למנהלים).
* **מערכת תגובות (Comments):**
    * צ'אט פנימי בתוך כל קריאה.
    * הוספת תגובות בזמן אמת.
* **ממשק משתמש (UI):**
    * עיצוב נקי ומודרני באמצעות ספריית **Material UI (MUI)**.
    * רספונסיביות מלאה (מותאם למובייל ולדסקטופ).

## 🚀 טכנולוגיות

הפרויקט נבנה באמצעות הכלים והספריות הבאים:

* **[React](https://reactjs.org/)** - ספריית UI.
* **[TypeScript](https://www.typescriptlang.org/)** - שפה לכתיבת קוד בטוחה יותר.
* **[Vite](https://vitejs.dev/)** - כלי Build מהיר לפיתוח.
* **[Material UI (MUI)](https://mui.com/)** - ספריית רכיבי עיצוב.
* **[React Router DOM](https://reactrouter.com/)** - ניהול ניווט וראוטינג.
* **[React Hook Form](https://react-hook-form.com/)** + **[Yup](https://github.com/jquense/yup)** - ניהול טפסים וולידציה.
* **[Axios](https://axios-http.com/)** - ביצוע קריאות שרת (API).

## 🛠️ התקנה והרצה

עקוב אחר ההוראות הבאות כדי להריץ את הפרויקט בסביבה המקומית שלך:

### דרישות מקדימות
* [Node.js](https://nodejs.org/) מותקן במחשב.

### 1. שכפול המאגר (Clone)
```bash
git clone [https://github.com/your-username/helpdesk-client.git](https://github.com/your-username/helpdesk-client.git)
cd helpdesk-client
