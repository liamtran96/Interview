# 🎯 Hướng Dẫn Siêu Đơn Giản - Claude Code Optimized

## 🤔 Câu hỏi quan trọng nhất

**"Tôi có cần biết tất cả skills không?"**

### ❌ KHÔNG! Bạn KHÔNG cần biết skills nào!

**Claude Code sẽ TỰ ĐỘNG chọn skills phù hợp cho bạn!**

Bạn chỉ cần:
1. Mô tả task bằng ngôn ngữ tự nhiên
2. Claude tự động phân tích
3. Claude tự động chọn skills/plugins phù hợp
4. Claude thực thi
5. Done! ✅

---

## 🚀 Workflow Thực Tế (Từng Bước)

### Workflow Tổng Quan

```
BẠN: Nhập prompt mô tả task
  ↓
CLAUDE: Phân tích task
  ↓
CLAUDE: Quyết định approach
  ├─ Simple task → Load 1 micro-skill
  ├─ Medium task → Load 2-3 micro-skills
  └─ Complex task → Load plugin (plugin sẽ load skills theo phase)
  ↓
CLAUDE: Thực thi từng bước
  ↓
CLAUDE: Hoàn thành và báo cáo
  ↓
DONE! ✅
```

---

## 📝 Ví Dụ Thực Tế Chi Tiết

### Ví dụ 1: Task Đơn Giản - "Setup Tailwind CSS"

#### Bước 1: Bạn nhập prompt
```
Bạn: "Setup Tailwind CSS for my React project"
```

#### Bước 2: Claude phân tích (tự động, bạn không thấy)
```
[Claude suy nghĩ]
- Task: Setup Tailwind CSS
- Độ phức tạp: Đơn giản (1 task cụ thể)
- Quyết định: Dùng micro-skill `tailwind-setup`
```

#### Bước 3: Claude load skill và thực thi
```
[Claude Code tự động]:
1. Load skill: frontend-core/tailwind-setup.md
2. Đọc instructions trong skill
3. Thực hiện:
   - npm install -D tailwindcss postcss autoprefixer
   - npx tailwindcss init -p
   - Tạo tailwind.config.js
   - Thêm @tailwind directives vào CSS
   - Verify setup hoạt động
4. Unload skill (giải phóng context)
```

#### Bước 4: Claude báo cáo kết quả
```
Claude: "✅ Tailwind CSS đã được setup thành công!

Đã thực hiện:
- Cài đặt Tailwind CSS và dependencies
- Tạo tailwind.config.js với content paths
- Cấu hình PostCSS
- Thêm Tailwind directives vào src/index.css

Bạn có thể test bằng cách thêm class Tailwind vào component:
<div className='text-blue-500 font-bold'>Test</div>

Context sử dụng: ~4k tokens
Thời gian: ~3 phút"
```

**👉 BẠN KHÔNG CẦN BIẾT gì về `tailwind-setup` skill. Chỉ cần nói "Setup Tailwind" là xong!**

---

### Ví dụ 2: Task Trung Bình - "Thêm Dark Mode"

#### Bước 1: Bạn nhập prompt
```
Bạn: "Add dark mode to my Tailwind app"
```

#### Bước 2: Claude phân tích (tự động)
```
[Claude suy nghĩ]
- Task: Add dark mode
- Phụ thuộc: Tailwind CSS (đã có sẵn)
- Độ phức tạp: Trung bình
- Quyết định: Dùng micro-skill `tailwind-darkmode`
```

#### Bước 3: Claude thực thi
```
[Claude Code tự động]:
1. Load skill: frontend-core/tailwind-darkmode.md
2. Thực hiện:
   - Cấu hình darkMode: 'class' trong tailwind.config.js
   - Tạo useDarkMode hook
   - Tạo DarkModeToggle component
   - Thêm dark: variants vào App.tsx
   - Test toggle hoạt động
3. Unload skill
```

#### Bước 4: Kết quả
```
Claude: "✅ Dark mode đã được thêm thành công!

Đã tạo:
- src/hooks/useDarkMode.ts (hook quản lý dark mode state)
- src/components/DarkModeToggle.tsx (button toggle)
- Cập nhật App.tsx với dark: variants
- Lưu preference vào localStorage

Cách dùng:
<DarkModeToggle />

Context sử dụng: ~5k tokens
Thời gian: ~5 phút"
```

**👉 BẠN chỉ nói "Add dark mode", Claude tự động biết phải làm gì!**

---

### Ví dụ 3: Task Phức Tạp - "Setup Complete Frontend App"

#### Bước 1: Bạn nhập prompt
```
Bạn: "I need a complete frontend setup with React, TypeScript, Tailwind, dark mode, and shadcn/ui components"
```

#### Bước 2: Claude phân tích (tự động)
```
[Claude suy nghĩ]
- Task: Complete frontend setup
- Bao gồm: React + TS + Tailwind + Dark mode + shadcn
- Độ phức tạp: Phức tạp (nhiều steps, cần orchestration)
- Quyết định: Dùng plugin `frontend-fullstack-setup`
```

#### Bước 3: Claude thực thi theo phases (plugin tự động orchestrate)

```
[Claude Code tự động]:

📦 PHASE 1: Project Foundation
1. Load skill: react-vite-setup
2. Thực hiện:
   - Create Vite + React + TypeScript project
   - npm install
   - Verify build works
3. Unload skill
4. ✅ Phase 1 done (5 phút)

🎨 PHASE 2: Styling Setup
5. Load skill: tailwind-setup
6. Thực hiện: Setup Tailwind
7. Unload skill

8. Load skill: tailwind-responsive
9. Thực hiện: Configure responsive utilities
10. Unload skill

11. Load skill: tailwind-darkmode
12. Thực hiện: Add dark mode
13. Unload skill
14. ✅ Phase 2 done (8 phút)

🧩 PHASE 3: Component Library
15. Load skill: shadcn-setup
16. Thực hiện:
    - npx shadcn-ui init
    - Add Button, Card components
    - Create sample page
17. Unload skill
18. ✅ Phase 3 done (10 phút)

🔍 PHASE 4: Quality Check
19. Call agent: code-reviewer
20. Code-reviewer checks:
    - TypeScript config
    - Tailwind config
    - Component structure
    - Best practices
21. ✅ Phase 4 done (5 phút)

✅ ALL PHASES COMPLETE!
```

#### Bước 4: Kết quả
```
Claude: "🎉 Complete frontend setup thành công!

Đã tạo:
my-app/
├── src/
│   ├── components/
│   │   ├── ui/              (shadcn components)
│   │   └── DarkModeToggle.tsx
│   ├── hooks/
│   │   └── useDarkMode.ts
│   ├── App.tsx              (với dark mode, responsive)
│   ├── main.tsx
│   └── index.css            (Tailwind configured)
├── tailwind.config.js
├── tsconfig.json
└── package.json

Features:
✅ React 18 + TypeScript
✅ Vite (fast build)
✅ Tailwind CSS với JIT mode
✅ Responsive design (mobile-first)
✅ Dark mode với localStorage persistence
✅ shadcn/ui components ready to use
✅ Code reviewed and approved

Chạy thử:
npm run dev

Peak context: ~15k tokens (Phase 2)
Total time: ~28 phút
Token savings: 83% vs old method"
```

**👉 BẠN chỉ mô tả "complete frontend setup", Claude tự động orchestrate tất cả!**

---

## 🎓 Hiểu Cách Claude Tự Động Chọn

### Claude Tự Động Phân Loại Task

```
┌─────────────────────────────────────────┐
│   User Input: "Setup Tailwind CSS"     │
└─────────────────────────────────────────┘
                  ↓
        [Claude phân tích]
                  ↓
┌─────────────────────────────────────────┐
│   Phân loại:                            │
│   - Keywords: "Tailwind", "setup"       │
│   - Complexity: Simple (1 task)         │
│   - Required: 1 skill                   │
│   → Quyết định: Micro-skill             │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│   Chọn skill: tailwind-setup            │
│   Context: ~4k tokens                   │
└─────────────────────────────────────────┘
                  ↓
           [Thực thi]
```

```
┌─────────────────────────────────────────┐
│   User Input: "Complete frontend app"  │
└─────────────────────────────────────────┘
                  ↓
        [Claude phân tích]
                  ↓
┌─────────────────────────────────────────┐
│   Phân loại:                            │
│   - Keywords: "complete", "frontend"    │
│   - Complexity: Complex (many steps)    │
│   - Required: Multiple skills           │
│   → Quyết định: Plugin                  │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│   Chọn plugin: frontend-fullstack      │
│   Context: ~25k tokens (total)          │
│   Plugin sẽ tự load/unload skills       │
└─────────────────────────────────────────┘
                  ↓
    [Orchestrate & Execute]
```

---

## 💡 Bạn Chỉ Cần Nhớ 3 Loại Prompt

### 1. Prompt Đơn Giản (Simple Task)

**Đặc điểm:** 1 việc cụ thể, rõ ràng

**Examples:**
```
"Setup Tailwind CSS"
"Add dark mode"
"Create a Dockerfile"
"Make it responsive"
"Add ESLint"
```

**Claude sẽ làm:** Load 1 micro-skill, execute, done ✅

**Context:** ~4-8k tokens
**Thời gian:** 3-7 phút

---

### 2. Prompt Trung Bình (Medium Task)

**Đặc điểm:** 2-3 việc liên quan

**Examples:**
```
"Setup Tailwind with dark mode"
"Create Dockerfile and docker-compose"
"Add responsive design and dark mode"
```

**Claude sẽ làm:** Load 2-3 micro-skills tuần tự, execute, done ✅

**Context:** ~8-15k tokens
**Thời gian:** 8-15 phút

---

### 3. Prompt Phức Tạp (Complex Task)

**Đặc điểm:** Nhiều bước, cần setup đầy đủ

**Examples:**
```
"Setup complete frontend app with React, TypeScript, Tailwind, shadcn/ui"
"Dockerize my fullstack app with frontend, backend, database"
"Create a production-ready Next.js app with authentication"
```

**Claude sẽ làm:** Load plugin, plugin tự orchestrate nhiều skills, done ✅

**Context:** ~20-30k tokens
**Thời gian:** 20-40 phút

---

## 🎯 Tips Viết Prompt Hiệu Quả

### ✅ Good Prompts (Rõ ràng, cụ thể)

```
✅ "Setup Tailwind CSS in my React project"
   → Claude biết chính xác phải làm gì

✅ "Add dark mode with localStorage persistence"
   → Claude biết cần dark mode + save preference

✅ "Dockerize my Node.js API with PostgreSQL database"
   → Claude biết cần Docker + multi-container setup

✅ "Create a responsive navbar with mobile menu"
   → Claude biết cần responsive + mobile-specific features
```

### ❌ Vague Prompts (Mơ hồ, không rõ)

```
❌ "Make it better"
   → Claude không biết "better" là gì

❌ "Fix CSS"
   → Quá chung chung, fix cái gì?

❌ "Setup project"
   → Setup cái gì? Frontend? Backend? Docker?

❌ "Add features"
   → Features nào?
```

### 💡 Cách Cải Thiện Prompt

**Thay vì:** "Setup project"
**Nên viết:** "Setup React project with TypeScript and Tailwind CSS"

**Thay vì:** "Make it responsive"
**Nên viết:** "Make the navbar responsive with mobile hamburger menu"

**Thay vì:** "Add database"
**Nên viết:** "Add PostgreSQL database with Docker Compose"

---

## 🚦 Workflow Commands (Optional)

Nếu bạn muốn CONTROL workflow, dùng commands này:

### Planning Phase (Optional)
```bash
/plan [task]
# Claude sẽ tạo plan chi tiết trước khi execute
# Bạn review và approve
```

### Execution Phase
```bash
/cook [task]
# Claude execute task
# Tự động chọn skills/plugins
```

### Debug Phase (Nếu có lỗi)
```bash
/debug [issue]
# Claude analyze và fix issue
```

### Commit Phase (Sau khi done)
```bash
/cmp
# Claude commit và push changes
```

---

## 📊 So Sánh: Bạn Cần Biết Gì?

### ❌ Trước Đây (ClaudeKit style) - Phức tạp!

```
Bạn cần biết:
❌ Skill nào tồn tại
❌ Skill nào làm gì
❌ Khi nào dùng skill nào
❌ Cách combine skills
❌ Syntax để invoke skills
❌ Quản lý context manually

→ PHỨC TẠP, khó nhớ!
```

### ✅ Bây Giờ (Optimized) - Đơn giản!

```
Bạn chỉ cần:
✅ Mô tả task bằng ngôn ngữ tự nhiên
✅ Claude tự động chọn approach phù hợp
✅ Claude tự động load/unload skills
✅ Claude tự động báo cáo kết quả

→ ĐƠN GIẢN, chỉ cần nói là xong!
```

---

## 🎯 Quick Start - 3 Bước

### Bước 1: Mô tả task
```
Bạn: "Setup Tailwind CSS with dark mode for my React app"
```

### Bước 2: Đợi Claude làm việc
```
[Claude tự động]:
- Phân tích task
- Chọn skills (tailwind-setup, tailwind-darkmode)
- Execute từng bước
- Report kết quả
```

### Bước 3: Check kết quả
```
✅ Tailwind CSS: installed and configured
✅ Dark mode: working with toggle button
✅ All tests: passing

→ DONE! Bạn có thể dùng ngay!
```

---

## 🆘 Troubleshooting

### "Claude không tự động chọn skill đúng"

**Giải pháp:** Be more specific in prompt
```
Thay vì: "Setup CSS"
Viết: "Setup Tailwind CSS"

Thay vì: "Add dark theme"
Viết: "Add dark mode with Tailwind CSS"
```

### "Tôi muốn biết Claude đang dùng skill nào"

**Claude sẽ tự báo cáo:**
```
"I'm using the tailwind-setup micro-skill to..."
"Loading frontend-fullstack-setup plugin to orchestrate..."
```

### "Tôi muốn control từng bước"

**Dùng /plan trước:**
```bash
/plan setup complete frontend with React, Tailwind, shadcn

# Claude sẽ show plan:
# Phase 1: Project setup
# Phase 2: Tailwind config
# Phase 3: shadcn/ui
# ...

# Bạn approve hoặc modify

Then:
/cook [execute the plan]
```

---

## 🎉 Tóm Tắt

### Những Gì Bạn CẦN Biết:

1. **Viết prompt rõ ràng, cụ thể**
   - "Setup Tailwind CSS"
   - "Add dark mode"
   - "Dockerize my app"

2. **Claude tự động xử lý phần còn lại**
   - Chọn skills/plugins
   - Load/unload context
   - Execute steps
   - Report results

3. **Check kết quả và dùng!**

### Những Gì Bạn KHÔNG CẦN Biết:

❌ Skills nào tồn tại
❌ Skill syntax
❌ Context management
❌ Khi nào dùng micro-skill vs plugin

**Claude tự động lo hết!**

---

## 📚 Tài Liệu Tham Khảo (Nếu muốn tìm hiểu sâu)

- `USAGE_GUIDE.md` - Hướng dẫn chi tiết
- `CHEATSHEET.md` - Reference nhanh
- `OPTIMIZATION_PLAN.md` - Kỹ thuật chi tiết

**Nhưng bạn KHÔNG CẦN đọc nếu chỉ muốn sử dụng!**

---

## 🚀 Bắt Đầu Ngay

### Test ngay bây giờ:

1. **Mở Claude Code**
2. **Nhập prompt:**
   ```
   Setup Tailwind CSS for my React project
   ```
3. **Đợi Claude làm việc**
4. **Check kết quả**
5. **Done! 🎉**

**Easy, right? Chỉ cần nói, Claude lo!**

---

**Motto: "Nói là làm, không cần nhớ skills!" 🎯**
