---
sidebar_position: -1
---

# 🎯 How to Use the Interactive Code Editor

## Quick Start

1. **Start dev server:** `npm run start`
2. **Open any problem** (e.g., Two Sum)
3. **Write your code** in the editor
4. **View results** in the Console panel

## Editor Layout

```
┌──────────────────────────────────────────────────────────┐
│                    Two Sum - Easy                        │
├──────────────────────────────────────────────────────────┤
│  Problem Description                                     │
│  Examples                                                │
├────────────────────┬─────────────────────────────────────┤
│                    │                                     │
│  CODE EDITOR       │   CONSOLE OUTPUT                    │
│                    │                                     │
│  function twoSum   │   🧪 Running Test Cases...         │
│  (nums, target) {  │                                     │
│    // Your code    │   ✅ Test 1: PASSED                │
│  }                 │      Input: [[2,7,11,15],9]        │
│                    │      Output: [0,1]                  │
│  [Line numbers]    │                                     │
│  [Syntax coloring] │   ✅ Test 2: PASSED                │
│                    │      Input: [[3,2,4],6]            │
│                    │      Output: [1,2]                  │
│                    │                                     │
│  ▶ Run  🔄 Refresh │   📊 Results: 2/2 passed           │
│                    │   🎉 All tests passed!             │
└────────────────────┴─────────────────────────────────────┘
│  💡 Show Solution                                        │
└──────────────────────────────────────────────────────────┘
```

## How It Works

### 1. Write Your Solution

```javascript
function twoSum(nums, target) {
  // Your solution here
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }

  return [];
}
```

### 2. Code Runs Automatically

Tests execute immediately when:
- You load the page
- You edit the code
- You click refresh (🔄)

### 3. See Results in Console

The console shows:
- ✅ **Passed tests** (green checkmark)
- ❌ **Failed tests** (red X with expected vs actual)
- ⚠️ **Errors** (syntax or runtime errors)
- 📊 **Summary** (total passed/failed)

## Console Panel

### Finding the Console

The console might be:
- **Right side** of the editor (split view)
- **Bottom** of the editor (tabbed view)
- **Hidden** - look for "Console" tab or button

### Console Tab Buttons

```
[ Editor ] [ Console ] [ Problems ]
           ^^^^^^^^^
           Click here!
```

## Test Case Output Format

### Successful Test
```
✅ Test 1: PASSED
   Basic case: [2,7,11,15], target 9
   Input: [[2,7,11,15],9]
   Output: [0,1]
```

### Failed Test
```
❌ Test 2: FAILED
   Different order: [3,2,4], target 6
   Input: [[3,2,4],6]
   Expected: [1,2]
   Got: [2,1]
```

### Error
```
❌ Test 3: ERROR
   ReferenceError: map is not defined
```

## Interactive Features

### Show/Hide Solution

Click the **"💡 Show Solution"** button to:
- See the optimal solution
- Replace your code with the answer
- Learn different approaches

Click **"👁️ Hide Solution"** to:
- Go back to your code
- Try solving it yourself again

### Edit and Re-run

1. Make changes to the code
2. Tests automatically re-run
3. Or click refresh icon (🔄)
4. See updated results instantly

## Tips for Best Experience

### 1. Use Chrome or Firefox
Modern browsers work best with Sandpack

### 2. Console Not Showing?
- Click the **"Console"** tab
- Look for a console icon (📋 or >_)
- Try toggling with keyboard: `Ctrl+~` or `Cmd+~`

### 3. Code Not Running?
```bash
# Clear browser cache
# Or hard refresh: Ctrl+Shift+R (Cmd+Shift+R on Mac)

# Or restart dev server:
npm run clear
npm run start
```

### 4. Syntax Errors?
Check the **Problems** tab or console for:
- Missing semicolons
- Undefined variables
- Mismatched brackets

## Keyboard Shortcuts

While in editor:

| Shortcut | Action |
|----------|--------|
| `Ctrl + Enter` | Run code |
| `Ctrl + /` | Comment line |
| `Ctrl + F` | Find |
| `Ctrl + Z` | Undo |
| `Tab` | Indent |
| `Shift + Tab` | Unindent |

## Example Workflow

### Step-by-Step

1. **Read the problem** description
2. **Study the examples** to understand input/output
3. **Plan your approach** (think through algorithm)
4. **Write starter code** (brute force is OK first)
5. **Run tests** to see which pass/fail
6. **Debug failures** by reading expected vs actual
7. **Optimize** your solution
8. **Re-run tests** until all pass
9. **Compare with solution** to learn better approaches

### Example Session

```
1. Problem: Two Sum
2. Think: Hash map for O(n) lookup
3. Code:
   function twoSum(nums, target) {
     const map = new Map();
     ...
   }
4. Run → Console shows:
   ✅ Test 1: PASSED
   ✅ Test 2: PASSED
   ❌ Test 3: FAILED
       Expected: [2,4]
       Got: [4,2]
5. Debug: Need to return in correct order
6. Fix code
7. Re-run → All tests pass! 🎉
```

## Troubleshooting

### Issue: "Console is empty"

**Solution:**
- Check if code has syntax errors
- Look at the **Problems** tab
- Ensure function name matches test cases

### Issue: "Tests not running"

**Solution:**
```bash
# Restart dev server
Ctrl+C  # Stop server
npm run start  # Restart
```

### Issue: "Can't see editor"

**Solution:**
- Scroll down on the problem page
- Editor is below the problem description
- Try refreshing the page (F5)

### Issue: "All tests fail immediately"

**Solution:**
- Check function name matches `functionName` prop
- Verify function parameters are correct
- Look for syntax errors (missing `}`, `;`, etc.)

## Need Help?

If you're still having issues:

1. **Check browser console** (F12 → Console tab)
2. **Look for error messages** in red
3. **Try a different browser** (Chrome recommended)
4. **Clear cache:** Ctrl+Shift+Delete
5. **Restart everything:**
   ```bash
   npm run clear
   npm run start
   ```

## Have Fun Coding! 🚀

Remember:
- ✅ It's okay to fail tests at first
- ✅ Learn from the expected vs actual output
- ✅ Try brute force before optimizing
- ✅ Use Show Solution to learn patterns
- ✅ Practice makes perfect!
