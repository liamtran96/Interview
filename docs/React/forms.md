---
sidebar_position: 18
---

# Forms in React

## Controlled vs Uncontrolled Components

React forms can be controlled (React state manages value) or uncontrolled (DOM manages value).

### Controlled Components

**React state** is the "single source of truth":

```jsx
function ControlledForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Uncontrolled Components

**DOM** is the source of truth:

```jsx
function UncontrolledForm() {
  const nameRef = useRef();
  const emailRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      name: nameRef.current.value,
      email: emailRef.current.value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={nameRef} defaultValue="" placeholder="Name" />
      <input ref={emailRef} defaultValue="" placeholder="Email" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Comparison

| Controlled | Uncontrolled |
|------------|--------------|
| React state manages value | DOM manages value |
| `value` + `onChange` | `ref` + `defaultValue` |
| Instant validation | Validation on submit |
| More code | Less code |
| More control | Less control |
| **Recommended** | Special cases |

## Basic Form Handling

### Simple Form

```jsx
function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting:', formData);
    // API call here
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

### Form with Validation

```jsx
function RegistrationForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log('Valid form:', formData);
    // Submit to API
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>

      <div>
        <input
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
        />
        {errors.confirmPassword && (
          <span className="error">{errors.confirmPassword}</span>
        )}
      </div>

      <button type="submit">Register</button>
    </form>
  );
}
```

## Different Input Types

### Text, Email, Password

```jsx
<input
  type="text"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>

<input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

<input
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>
```

### Checkbox

```jsx
function CheckboxExample() {
  const [agreed, setAgreed] = useState(false);

  return (
    <label>
      <input
        type="checkbox"
        checked={agreed}
        onChange={(e) => setAgreed(e.target.checked)}
      />
      I agree to terms
    </label>
  );
}
```

### Radio Buttons

```jsx
function RadioExample() {
  const [gender, setGender] = useState('');

  return (
    <div>
      <label>
        <input
          type="radio"
          value="male"
          checked={gender === 'male'}
          onChange={(e) => setGender(e.target.value)}
        />
        Male
      </label>

      <label>
        <input
          type="radio"
          value="female"
          checked={gender === 'female'}
          onChange={(e) => setGender(e.target.value)}
        />
        Female
      </label>
    </div>
  );
}
```

### Select Dropdown

```jsx
function SelectExample() {
  const [country, setCountry] = useState('');

  return (
    <select value={country} onChange={(e) => setCountry(e.target.value)}>
      <option value="">Select country</option>
      <option value="us">United States</option>
      <option value="uk">United Kingdom</option>
      <option value="ca">Canada</option>
    </select>
  );
}
```

### Textarea

```jsx
function TextareaExample() {
  const [message, setMessage] = useState('');

  return (
    <textarea
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      rows={5}
      placeholder="Enter message..."
    />
  );
}
```

### File Upload

```jsx
function FileUpload() {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      {file && <p>Selected: {file.name}</p>}
      <button onClick={handleUpload} disabled={!file}>
        Upload
      </button>
    </div>
  );
}
```

## Custom Form Hook

```jsx
function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (callback, validate) => async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        setIsSubmitting(false);
        return;
      }
    }

    await callback(values);
    setIsSubmitting(false);
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    reset
  };
}

// Usage
function MyForm() {
  const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm({
    email: '',
    password: ''
  });

  const validate = (values) => {
    const errors = {};
    if (!values.email) errors.email = 'Required';
    if (!values.password) errors.password = 'Required';
    return errors;
  };

  const onSubmit = async (values) => {
    await api.login(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, validate)}>
      <input
        name="email"
        value={values.email}
        onChange={handleChange}
      />
      {errors.email && <span>{errors.email}</span>}

      <input
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
      />
      {errors.password && <span>{errors.password}</span>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
```

## React Hook Form Library

Popular form library with great performance:

```bash
npm install react-hook-form
```

### Basic Usage

```jsx
import { useForm } from 'react-hook-form';

function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = async (data) => {
    await api.submit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Invalid email'
          }
        })}
      />
      {errors.email && <span>{errors.email.message}</span>}

      <input
        type="password"
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Must be at least 8 characters'
          }
        })}
      />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </form>
  );
}
```

### With Validation Schema (Zod)

```jsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
  age: z.number().min(18, 'Must be 18+')
});

function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema)
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}

      <input type="password" {...register('password')} />
      {errors.password && <span>{errors.password.message}</span>}

      <input type="number" {...register('age', { valueAsNumber: true })} />
      {errors.age && <span>{errors.age.message}</span>}

      <button type="submit">Submit</button>
    </form>
  );
}
```

## Common Interview Questions

### Q1: Controlled vs Uncontrolled components?

**Answer:**

| Controlled | Uncontrolled |
|------------|--------------|
| React state controls value | DOM controls value |
| `value` prop | `defaultValue` prop |
| `onChange` handler | `ref` to access value |
| More predictable | Simpler code |

```jsx
// Controlled
<input value={value} onChange={e => setValue(e.target.value)} />

// Uncontrolled
<input ref={inputRef} defaultValue="initial" />
```

**When to use uncontrolled:**
- Integrating with non-React code
- File inputs (must be uncontrolled)
- Simple forms without validation

### Q2: How do you handle form submission?

**Answer:**

```jsx
function MyForm() {
  const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    // Validate
    const errors = validate(formData);
    if (errors) return;

    // Submit
    try {
      await api.submit(formData);
      // Success handling
    } catch (error) {
      // Error handling
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Q3: How do you validate forms in React?

**Answer:**

**Options:**
1. **Manual validation** - Custom validate function
2. **HTML5 validation** - `required`, `pattern`, `min`, `max`
3. **Libraries** - React Hook Form, Formik
4. **Schema validation** - Zod, Yup

```jsx
// Manual
const validate = (values) => {
  const errors = {};
  if (!values.email) errors.email = 'Required';
  if (!/\S+@\S+/.test(values.email)) errors.email = 'Invalid';
  return errors;
};

// HTML5
<input type="email" required pattern="\S+@\S+\.\S+" />

// Library (React Hook Form)
<input {...register('email', { required: true })} />
```

### Q4: How do you handle multiple inputs efficiently?

**Answer:**

**Use computed property names:**

```jsx
function MyForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Single handler for all inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value // Computed property name
    }));
  };

  return (
    <form>
      <input name="name" value={formData.name} onChange={handleChange} />
      <input name="email" value={formData.email} onChange={handleChange} />
      <input name="password" value={formData.password} onChange={handleChange} />
    </form>
  );
}
```

## Best Practices

1. **Use controlled components** - More predictable
2. **Validate on blur** - Better UX than onChange
3. **Show errors after interaction** - Don't show errors immediately
4. **Disable submit during submission** - Prevent double-submit
5. **Use form libraries** - React Hook Form for complex forms
6. **Accessible forms** - Labels, ARIA attributes, error announcements
7. **Clear error messages** - Tell users how to fix

## Key Takeaways

- Controlled components: React state manages value
- Uncontrolled: DOM manages value, access via refs
- Always call `e.preventDefault()` in onSubmit
- Validate before submitting
- Use form libraries for complex forms
- Handle loading and error states
- Make forms accessible

## Resources

- [Forms in React](https://react.dev/learn/responding-to-events#preventing-default-behavior)
- [React Hook Form](https://react-hook-form.com/)
- [Formik](https://formik.org/)
- [Zod Validation](https://zod.dev/)
