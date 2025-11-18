---
sidebar_position: 5
---

# React 19 New Hooks

## What's New in React 19?

React 19 (released December 2024) introduces several powerful new hooks that simplify common patterns and improve developer experience.

:::info React 19
React 19 is the latest major version released in December 2024, with React 19.2 released in January 2025.
:::

## New Hooks Overview

### 1. use() Hook

The `use()` hook is a **game changer** that lets you read resources like Promises and Context directly.

**Key Features:**
- Can be called **inside conditionals** and loops (unlike other hooks!)
- Simplifies async data fetching
- Eliminates need for `useEffect` + `useState` for many cases

```tsx
import { use } from 'react';

function UserProfile({ userPromise }) {
  // ✨ Directly use a promise!
  const user = use(userPromise);

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

// Usage
function App() {
  const userPromise = fetch('/api/user').then(r => r.json());

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserProfile userPromise={userPromise} />
    </Suspense>
  );
}
```

**Use with Context:**

```tsx
import { use, createContext } from 'react';

const ThemeContext = createContext('light');

function Button() {
  // Can use inside conditionals!
  if (someCondition) {
    const theme = use(ThemeContext);
    return <button className={theme}>Click me</button>;
  }
}
```

### 2. useActionState

Manages state for form actions with pending states and errors automatically.

```tsx
import { useActionState } from 'react';

async function updateProfile(prevState, formData) {
  try {
    const response = await fetch('/api/profile', {
      method: 'POST',
      body: formData
    });
    return { success: true, message: 'Profile updated!' };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function ProfileForm() {
  const [state, formAction, isPending] = useActionState(
    updateProfile,
    { success: false }
  );

  return (
    <form action={formAction}>
      <input name="name" required />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Updating...' : 'Update Profile'}
      </button>

      {state.success && <p>✓ {state.message}</p>}
      {state.error && <p>✗ {state.error}</p>}
    </form>
  );
}
```

### 3. useFormStatus

Provides form submission status information (works inside form components).

```tsx
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending, data, method, action } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}

function MyForm() {
  async function handleSubmit(formData) {
    await saveData(formData);
  }

  return (
    <form action={handleSubmit}>
      <input name="email" />
      <SubmitButton /> {/* Can access form status */}
    </form>
  );
}
```

### 4. useOptimistic

Shows instant feedback while async operations are in progress (optimistic updates).

```tsx
import { useOptimistic, useState } from 'react';

function TodoList({ todos }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (currentTodos, newTodo) => [...currentTodos, newTodo]
  );

  async function addTodo(formData) {
    const newTodo = { id: Date.now(), text: formData.get('todo') };

    // Show immediately (optimistic)
    addOptimisticTodo(newTodo);

    // Save to server
    await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify(newTodo)
    });
  }

  return (
    <div>
      <ul>
        {optimisticTodos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
      <form action={addTodo}>
        <input name="todo" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
```

### 5. useEffectEvent (React 19.2)

Creates an event handler that always sees the latest props/state without re-running effects.

```tsx
import { useEffect, useEffectEvent } from 'react';

function Chat({ roomId, theme }) {
  // ✨ Event always sees latest theme
  const onMessage = useEffectEvent((message) => {
    showNotification(message, theme); // Uses latest theme
  });

  useEffect(() => {
    const connection = connectToRoom(roomId);
    connection.on('message', onMessage);
    return () => connection.disconnect();
  }, [roomId]); // ✅ No theme dependency needed!

  return <div>Chat room {roomId}</div>;
}
```

## Common Interview Questions

### Q1: What's the difference between use() and useEffect?

**Answer:**

| use() | useEffect |
|-------|-----------|
| Reads resources (Promises, Context) | Runs side effects |
| Can be conditional | Must be at top level |
| Suspends component | Doesn't suspend |
| For data fetching | For subscriptions, timers, etc. |

```tsx
// ❌ OLD WAY - useEffect + useState
function User({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(r => r.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  return <div>{user.name}</div>;
}

// ✅ NEW WAY - use()
function User({ userPromise }) {
  const user = use(userPromise);
  return <div>{user.name}</div>;
}
```

### Q2: When should I use useActionState vs useFormStatus?

**Answer:**

- **useActionState**: For managing **action state** (parent component)
- **useFormStatus**: For reading **form status** (child components inside form)

```tsx
// useActionState - Parent manages state
function Form() {
  const [state, action] = useActionState(submitAction, null);
  return <form action={action}>...</form>;
}

// useFormStatus - Child reads status
function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>Submit</button>;
}
```

### Q3: What are optimistic updates and when to use them?

**Answer:**

Optimistic updates show changes **immediately** before server confirmation, providing instant feedback.

**Use when:**
- User actions should feel instant (like/unlike, add comment)
- Server requests are usually successful
- Easy to rollback on error

```tsx
// Example: Like button
function LikeButton({ postId, initialLikes }) {
  const [likes, setOptimisticLikes] = useOptimistic(initialLikes);

  async function handleLike() {
    setOptimisticLikes(likes + 1); // Instant feedback
    await fetch(`/api/posts/${postId}/like`); // Then save
  }

  return <button onClick={handleLike}>❤️ {likes}</button>;
}
```

## React 19 vs React 18

### What Changed?

| Feature | React 18 | React 19 |
|---------|----------|----------|
| **Data Fetching** | useEffect + useState | use() hook |
| **Form Actions** | Manual state management | useActionState |
| **Form Status** | Custom hooks | useFormStatus |
| **Optimistic UI** | Manual implementation | useOptimistic |
| **Effect Events** | Not available | useEffectEvent |

### Migration Tips

1. **Gradual adoption** - React 19 is backward compatible
2. **use() for new code** - Replace useEffect for data fetching
3. **Form actions** - Use useActionState for better UX
4. **Keep existing code** - No need to rewrite everything

## Real-World Example

Complete form with all new React 19 hooks:

```tsx
import { useActionState, useOptimistic } from 'react';
import { useFormStatus } from 'react-dom';

async function submitComment(prevState, formData) {
  const comment = formData.get('comment');
  await fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify({ comment })
  });
  return { success: true, comment };
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Posting...' : 'Post Comment'}
    </button>
  );
}

function CommentSection({ initialComments }) {
  const [optimisticComments, addOptimistic] = useOptimistic(
    initialComments,
    (comments, newComment) => [...comments, newComment]
  );

  const [state, formAction] = useActionState(submitComment, null);

  function handleSubmit(formData) {
    const comment = {
      id: Date.now(),
      text: formData.get('comment'),
      pending: true
    };
    addOptimistic(comment);
    formAction(formData);
  }

  return (
    <div>
      <ul>
        {optimisticComments.map(comment => (
          <li key={comment.id} style={{ opacity: comment.pending ? 0.5 : 1 }}>
            {comment.text}
          </li>
        ))}
      </ul>

      <form action={handleSubmit}>
        <textarea name="comment" required />
        <SubmitButton />
      </form>

      {state?.success && <p>✓ Comment posted!</p>}
    </div>
  );
}
```

## Best Practices

1. **use() instead of useEffect** for data fetching
2. **Wrap with Suspense** when using use()
3. **useActionState for forms** instead of manual state
4. **useOptimistic for instant feedback** on user actions
5. **useEffectEvent** to avoid unnecessary effect re-runs

## Key Takeaways

- React 19 introduces 5 new hooks: use(), useActionState, useFormStatus, useOptimistic, useEffectEvent
- use() can be called conditionally (breaking traditional hook rules)
- New hooks simplify forms and async operations significantly
- useOptimistic provides instant feedback for better UX
- All new hooks work with React Server Components
- Backward compatible with React 18 code

## Resources

- [React 19 Release Notes](https://react.dev/blog/2024/12/05/react-19)
- [React 19.2 Release](https://react.dev/blog/2025/10/01/react-19-2)
- [Official React Hooks Reference](https://react.dev/reference/react/hooks)
