---
title: Hướng Dẫn Sử Dụng Claude Code - Tối Ưu Context
version: 1.0
date: 2025-12-01
---

# 📘 Hướng Dẫn Sử Dụng Claude Code (Optimized Version)

## 🎯 Triết Lý Thiết Kế

### Vấn đề cũ (ClaudeKit style):
```
❌ Skills lớn (1000+ dòng) → Load hết vào context → Tốn 150k+ tokens
❌ Làm task đơn giản nhưng phải load cả "toolkit"
❌ Hết tokens nhanh, giá cao
```

### Giải pháp mới (Micro-skills + Plugins):
```
✅ Micro-skills nhỏ (50-150 dòng) → Load only what you need → Tiết kiệm 60-80% tokens
✅ Làm task nhỏ → load 1-2 micro-skills (4-8k tokens)
✅ Làm task lớn → load plugin (20-30k tokens, vẫn rẻ hơn load hết)
✅ Tokens dùng hiệu quả hơn, kết quả vẫn tốt
```

---

## 📊 So Sánh Trước và Sau

### TRƯỚC (Old ClaudeKit style):
| Task | Skills Loaded | Context Usage |
|------|---------------|---------------|
| "Setup Tailwind" | Load toàn bộ `tailwindcss/SKILL.md` | ~55k tokens |
| "Add dark mode" | Load toàn bộ `tailwindcss/SKILL.md` | ~55k tokens |
| "Dockerize app" | Load toàn bộ `docker/SKILL.md` | ~50k tokens |
| **Simple task** | **Load BIG skill** | **😢 Lãng phí** |

### SAU (Micro-skills approach):
| Task | Skills Loaded | Context Usage |
|------|---------------|---------------|
| "Setup Tailwind" | `tailwind-setup.md` only | ~4k tokens ✅ |
| "Add dark mode" | `tailwind-darkmode.md` only | ~5k tokens ✅ |
| "Dockerize app" | `dockerfile-multistage.md` + `docker-compose-setup.md` | ~15k tokens ✅ |
| **Simple task** | **Load SPECIFIC micro-skill** | **🎉 Tiết kiệm 60-80%** |

### Khi nào dùng Plugin?
| Task | Approach | Context Usage |
|------|----------|---------------|
| "Complete frontend setup" | Use plugin `frontend-fullstack-setup` | ~25k tokens |
| "Dockerize fullstack app" | Use plugin `docker-fullstack` | ~20k tokens |
| **Complex multi-step task** | **Use Plugin** | **Still cheaper than old way!** |

**Kết luận:**
- Task đơn giản → Micro-skill (tiết kiệm 80%)
- Task phức tạp → Plugin (tiết kiệm 50%)
- **Luôn luôn rẻ hơn ClaudeKit style!**

---

## 🚀 Quick Start Guide

### 1. Hiểu Cấu Trúc Mới

```
.claude/
├── skills/
│   ├── _meta/                    # Meta-skills (công cụ tạo skills mới)
│   │   ├── meta-skill-generator.md
│   │   └── meta-plugin-generator.md
│   │
│   ├── frontend-core/            # Micro-skills Frontend
│   │   ├── tailwind-setup.md          (80 dòng)
│   │   ├── tailwind-responsive.md     (90 dòng)
│   │   ├── tailwind-darkmode.md       (100 dòng)
│   │   └── shadcn-setup.md            (assumed)
│   │
│   └── docker-core/              # Micro-skills Docker
│       ├── dockerfile-multistage.md   (120 dòng)
│       ├── docker-compose-setup.md    (150 dòng)
│       └── docker-networking.md       (assumed)
│
├── plugins/                      # Plugins cho complex tasks
│   ├── frontend-fullstack-setup.md
│   └── docker-fullstack.md
│
├── agents/                       # Không đổi (đã tối ưu sẵn)
└── commands/                     # Không đổi (đã tối ưu sẵn)
```

### 2. Workflow Cơ Bản

**A. Task đơn giản → Dùng Micro-Skill trực tiếp**

```
User: "I need to setup Tailwind CSS in my React project"

You: "I'll use the tailwind-setup micro-skill"
     [Load ONLY tailwind-setup.md - 4k tokens]
     [Execute steps]
     [Unload skill]

✅ Context used: ~4k tokens (vs 55k old way)
```

**B. Task trung bình → Dùng 2-3 Micro-Skills**

```
User: "Setup Tailwind with dark mode"

You: "I'll use tailwind-setup and tailwind-darkmode micro-skills"
     [Load tailwind-setup.md - 4k tokens]
     [Execute setup]
     [Unload tailwind-setup]

     [Load tailwind-darkmode.md - 5k tokens]
     [Execute dark mode]
     [Unload tailwind-darkmode]

✅ Peak context: ~5k tokens (only one skill at a time)
✅ Total: ~9k tokens (vs 55k old way)
```

**C. Task phức tạp → Dùng Plugin**

```
User: "Setup complete frontend app with React, Tailwind, shadcn, dark mode"

You: "I'll use the frontend-fullstack-setup plugin"
     [Load plugin - orchestrates multiple micro-skills automatically]
     [Plugin loads/unloads skills as needed]
     [Call code-reviewer agent for final review]

✅ Peak context: ~15k tokens (during Phase 2)
✅ Average: ~10k tokens
✅ Total: ~25k tokens (vs 150k+ old way)
```

---

## 💡 Cách Sử Dụng Commands

### Command Syntax

```bash
# Method 1: Direct command
/cook [task description]

# Method 2: With micro-skill
/cook [task] using skill: [skill-name]

# Method 3: With plugin
/cook [task] using plugin: [plugin-name]
```

### Examples

#### 1. Setup Tailwind CSS (Simple)

```bash
# Auto-detect và dùng micro-skill phù hợp
/cook setup Tailwind CSS in this React project

# Hoặc explicit
/cook setup Tailwind using skill: tailwind-setup
```

**Behind the scenes:**
```
1. Claude loads tailwind-setup.md (4k tokens)
2. Executes: npm install, config files, etc.
3. Unloads skill
4. Done! ✅
```

#### 2. Add Dark Mode (Medium)

```bash
/cook add dark mode to my Tailwind app
```

**Behind the scenes:**
```
1. Claude detects you need tailwind-darkmode
2. Loads tailwind-darkmode.md (5k tokens)
3. Implements class-based dark mode
4. Creates toggle component
5. Unloads skill
6. Done! ✅
```

#### 3. Complete Frontend Setup (Complex)

```bash
/cook setup complete frontend app with React, TypeScript, Tailwind, shadcn/ui
```

**Behind the scenes:**
```
1. Claude detects complex task → uses plugin
2. Loads frontend-fullstack-setup plugin
3. Plugin orchestrates:
   Phase 1: Load react-vite-setup → execute → unload
   Phase 2: Load tailwind-setup → execute → unload
           Load tailwind-responsive → execute → unload
           Load tailwind-darkmode → execute → unload
   Phase 3: Load shadcn-setup → execute → unload
   Phase 4: Call code-reviewer agent
4. Done! ✅
```

#### 4. Dockerize Application (Complex)

```bash
/cook dockerize my fullstack app with frontend, backend, postgres, redis
```

**Behind the scenes:**
```
1. Claude uses docker-fullstack plugin
2. Plugin orchestrates:
   Phase 1: dockerfile-multistage for each service
   Phase 2: docker-compose-setup
   Phase 3: docker-networking
   Phase 4: code-reviewer agent
3. Done! ✅
```

---

## 🎓 Advanced Usage

### 1. Tạo Micro-Skill Mới (Using Meta-Skill)

```bash
# Invoke meta-skill-generator
/cook create new micro-skill for [specific task]

# Example
/cook create new micro-skill for React Router setup

# Claude will:
1. Load meta-skill-generator.md
2. Ask you for details:
   - Task name: react-router-setup
   - Category: frontend-core
   - Description: Setup React Router v6 with routes
   - Core concepts: Routes, nested routes, navigation
3. Generate skill following template (50-150 lines)
4. Save to .claude/skills/frontend-core/react-router-setup.md
5. Done! New skill ready to use ✅
```

### 2. Tạo Plugin Mới (Using Meta-Plugin)

```bash
# Invoke meta-plugin-generator
/cook create new plugin for [complex workflow]

# Example
/cook create new plugin for complete backend API setup with Node.js, Express, TypeScript, Prisma

# Claude will:
1. Load meta-plugin-generator.md
2. Ask for details:
   - Plugin name: backend-fullstack-setup
   - Required skills: typescript-setup, express-setup, prisma-setup
   - Workflow steps: 1) Init project, 2) Setup Express, 3) Setup Prisma, etc.
3. Generate plugin file
4. Save to .claude/plugins/backend-fullstack-setup.md
5. Done! New plugin ready to use ✅
```

### 3. Combine Multiple Skills

```bash
# Stack skills for custom workflow
/cook setup Tailwind with responsive design and dark mode

# Claude automatically:
1. Loads tailwind-setup → execute → unload
2. Loads tailwind-responsive → execute → unload
3. Loads tailwind-darkmode → execute → unload
4. All done with minimal context usage! ✅
```

### 4. Customize Plugin Execution

```bash
# Use plugin but skip certain steps
/cook use plugin: frontend-fullstack-setup but skip shadcn/ui setup

# Claude will:
1. Load plugin
2. Execute Phase 1 (Vite + React)
3. Execute Phase 2 (Tailwind)
4. Skip Phase 3 (shadcn/ui) ← as requested
5. Execute Phase 4 (Code review)
6. Done! ✅
```

---

## 🔍 Khi Nào Dùng Gì?

### Decision Tree

```
Start: I have a task
│
├─ Is it a SINGLE, SPECIFIC task?
│  ├─ YES → Use Micro-Skill
│  │        Examples:
│  │        - "Setup Tailwind" → tailwind-setup
│  │        - "Add dark mode" → tailwind-darkmode
│  │        - "Create Dockerfile" → dockerfile-multistage
│  │
│  │        ✅ Context: 4-8k tokens
│  │        ✅ Fast, focused
│  │
│  └─ NO → Is it MULTI-STEP with 3+ skills needed?
│          ├─ YES → Use Plugin
│          │        Examples:
│          │        - "Complete frontend setup" → frontend-fullstack-setup
│          │        - "Dockerize fullstack app" → docker-fullstack
│          │
│          │        ✅ Context: 20-30k tokens
│          │        ✅ Orchestrated workflow
│          │
│          └─ NO → Stack 2-3 Micro-Skills
│                   Examples:
│                   - "Tailwind + dark mode"
│                   - "Docker + Compose"
│
│                   ✅ Context: 8-15k tokens
│                   ✅ Flexible combination
```

### Quick Reference Table

| Task Complexity | Approach | Tools | Context Usage | Example |
|----------------|----------|-------|---------------|---------|
| **Single task** | Micro-Skill | 1 skill | 4-8k tokens | "Setup Tailwind" |
| **2-3 related tasks** | Stack Micro-Skills | 2-3 skills | 8-15k tokens | "Tailwind + responsive + dark mode" |
| **Complex workflow** | Plugin | Plugin orchestrates | 20-30k tokens | "Complete frontend setup" |
| **Create new skill** | Meta-Skill | `meta-skill-generator` | 10k tokens | Generate custom micro-skill |
| **Create new plugin** | Meta-Plugin | `meta-plugin-generator` | 12k tokens | Generate custom plugin |

---

## 📝 Best Practices

### ✅ DO:

1. **For simple tasks → Use micro-skills directly**
   ```bash
   /cook add dark mode using skill: tailwind-darkmode
   ```

2. **For complex tasks → Use plugins**
   ```bash
   /cook complete frontend setup using plugin: frontend-fullstack-setup
   ```

3. **Be specific about what you need**
   ```bash
   # Good
   /cook setup Tailwind with JIT mode and custom colors

   # Less good (Claude has to guess)
   /cook setup CSS
   ```

4. **Use meta-skills to create custom skills**
   ```bash
   /cook create micro-skill for Zustand state management setup
   ```

5. **Check related skills for combinations**
   - Each micro-skill lists "Related Skills"
   - Stack them for custom workflows

### ❌ DON'T:

1. **Don't ask for "everything" if you only need one thing**
   ```bash
   # Bad (loads too much)
   /cook setup complete frontend stack
   # (when you only need Tailwind)

   # Good (specific)
   /cook setup Tailwind CSS
   ```

2. **Don't manually specify skills if task is simple**
   ```bash
   # Let Claude auto-detect
   /cook add dark mode
   # (Claude will choose tailwind-darkmode automatically)
   ```

3. **Don't create new skills for already-covered tasks**
   - Check existing skills first
   - Reuse and combine existing micro-skills

4. **Don't use plugins for simple single tasks**
   ```bash
   # Bad (overkill)
   /cook use plugin: frontend-fullstack-setup just to install Tailwind

   # Good (appropriate)
   /cook setup Tailwind using skill: tailwind-setup
   ```

---

## 🎯 Common Scenarios

### Scenario 1: Starting New Frontend Project

**Goal:** React + TypeScript + Tailwind + Dark Mode

**Approach:** Use Plugin (complex multi-step)

```bash
/cook setup new frontend project with React, TypeScript, Tailwind, dark mode
```

**What happens:**
1. Claude detects complex task → uses `frontend-fullstack-setup` plugin
2. Plugin orchestrates:
   - Phase 1: Vite + React + TypeScript
   - Phase 2: Tailwind + Responsive + Dark Mode
   - Phase 3: Code review
3. ✅ Complete setup in ~15 minutes, ~25k tokens

**Alternative (manual):**
```bash
# Step-by-step with micro-skills (if you want control)
/cook create Vite React TypeScript project
/cook setup Tailwind using skill: tailwind-setup
/cook add responsive design using skill: tailwind-responsive
/cook add dark mode using skill: tailwind-darkmode
```

### Scenario 2: Adding Feature to Existing App

**Goal:** Add dark mode to existing Tailwind app

**Approach:** Single Micro-Skill

```bash
/cook add dark mode to my Tailwind app
```

**What happens:**
1. Claude loads `tailwind-darkmode.md` (5k tokens)
2. Implements class-based dark mode
3. Creates toggle component
4. Updates existing components with dark: variants
5. ✅ Done in ~5 minutes, ~5k tokens

### Scenario 3: Dockerizing Existing App

**Goal:** Containerize fullstack app (frontend + backend + postgres + redis)

**Approach:** Use Plugin (complex multi-step)

```bash
/cook dockerize my fullstack app with frontend, backend, postgres, redis
```

**What happens:**
1. Claude uses `docker-fullstack` plugin
2. Plugin orchestrates:
   - Phase 1: Create optimized Dockerfiles (multi-stage)
   - Phase 2: Setup docker-compose.yml
   - Phase 3: Configure networking & volumes
   - Phase 4: Code review
3. ✅ Complete Dockerization in ~20 minutes, ~20k tokens

### Scenario 4: Quick Dockerfile for Single Service

**Goal:** Just create a Dockerfile for Node.js API

**Approach:** Single Micro-Skill

```bash
/cook create optimized Dockerfile for my Node.js API
```

**What happens:**
1. Claude loads `dockerfile-multistage.md` (8k tokens)
2. Creates multi-stage Dockerfile
3. Adds .dockerignore
4. ✅ Done in ~3 minutes, ~8k tokens

---

## 📊 Token Savings Breakdown

### Real Examples

#### Example 1: "Setup Tailwind CSS"

**Old ClaudeKit Way:**
```
Load: tailwindcss/SKILL.md (1133 lines)
Context: ~55k tokens
Time: 5 minutes
Result: ✅ Works, but expensive
```

**New Micro-Skill Way:**
```
Load: tailwind-setup.md (80 lines)
Context: ~4k tokens
Time: 5 minutes
Result: ✅ Works, cheap!
Savings: 92% tokens saved! 🎉
```

#### Example 2: "Complete Frontend Setup"

**Old ClaudeKit Way:**
```
Load: tailwindcss/SKILL.md (1133 lines)
Load: shadcn-ui/SKILL.md (1052 lines)
Load: react/SKILL.md (assumed ~800 lines)
Context: ~150k tokens
Time: 25 minutes
Result: ✅ Works, but VERY expensive
```

**New Plugin Way:**
```
Use: frontend-fullstack-setup plugin
Loads skills lazily, one at a time:
  Phase 1: react-vite-setup (5k) → unload
  Phase 2: tailwind-* skills (15k) → unload
  Phase 3: shadcn-setup (7k) → unload
Peak context: ~15k tokens
Average: ~10k tokens
Time: 25 minutes
Result: ✅ Works, much cheaper!
Savings: 83% tokens saved! 🎉
```

#### Example 3: "Add Dark Mode"

**Old ClaudeKit Way:**
```
Load: tailwindcss/SKILL.md (1133 lines)
Context: ~55k tokens
Time: 7 minutes
Result: ✅ Works, but expensive for simple task
```

**New Micro-Skill Way:**
```
Load: tailwind-darkmode.md (100 lines)
Context: ~5k tokens
Time: 7 minutes
Result: ✅ Works, cheap!
Savings: 91% tokens saved! 🎉
```

---

## 🛠️ Troubleshooting

### Issue 1: Claude Không Tự Động Chọn Micro-Skill

**Symptoms:**
```
User: "Setup Tailwind"
Claude: [Tries to do it manually without loading skill]
```

**Fix:**
```bash
# Be explicit
/cook setup Tailwind using skill: tailwind-setup

# Or ask Claude to use the skill system
"Please use the tailwind-setup micro-skill for this"
```

### Issue 2: Plugin Không Load Skills Đúng

**Symptoms:**
```
Plugin loads all skills at once instead of lazily
```

**Fix:**
- Check plugin definition has clear phases
- Each phase should load/unload skills explicitly
- Remind Claude: "Load skills one phase at a time, unload after each phase"

### Issue 3: Muốn Tạo Skill Mới Nhưng Không Biết Category

**Available Categories:**
- `frontend-core` - Frontend skills (React, Tailwind, etc.)
- `backend-core` - Backend skills (Express, Prisma, etc.)
- `docker-core` - Docker & containerization
- `debugging-core` - Debugging & troubleshooting
- `testing-core` - Testing skills
- `_meta` - Meta-skills (generators)

**Fix:**
```bash
/cook create new micro-skill for [task] in category: [category]

# Example
/cook create new micro-skill for Express middleware setup in category: backend-core
```

### Issue 4: Plugin Quá Dài, Muốn Chỉ Chạy Một Phase

**Fix:**
```bash
/cook use plugin: frontend-fullstack-setup but only run Phase 2 (Tailwind setup)

# Or
/cook use plugin: docker-fullstack but skip Phase 4 (code review)
```

---

## 📚 Quick Reference Cheatsheet

### Micro-Skills Available

#### Frontend Core
| Skill | Purpose | Context | File |
|-------|---------|---------|------|
| `tailwind-setup` | Install & configure Tailwind | ~4k | `frontend-core/tailwind-setup.md` |
| `tailwind-responsive` | Responsive design | ~4k | `frontend-core/tailwind-responsive.md` |
| `tailwind-darkmode` | Dark mode implementation | ~5k | `frontend-core/tailwind-darkmode.md` |
| `shadcn-setup` | Setup shadcn/ui | ~7k | `frontend-core/shadcn-setup.md` (assumed) |

#### Docker Core
| Skill | Purpose | Context | File |
|-------|---------|---------|------|
| `dockerfile-multistage` | Optimize with multi-stage builds | ~8k | `docker-core/dockerfile-multistage.md` |
| `docker-compose-setup` | Multi-container orchestration | ~7k | `docker-core/docker-compose-setup.md` |

### Plugins Available

| Plugin | Purpose | Context | File |
|--------|---------|---------|------|
| `frontend-fullstack-setup` | Complete React + Tailwind + shadcn | ~25k | `plugins/frontend-fullstack-setup.md` |
| `docker-fullstack` | Complete Docker setup | ~20k | `plugins/docker-fullstack.md` |

### Commands Quick Reference

```bash
# Simple task - use micro-skill
/cook [simple task]
/cook [task] using skill: [skill-name]

# Complex task - use plugin
/cook [complex task]
/cook [task] using plugin: [plugin-name]

# Create new skill
/cook create micro-skill for [task]

# Create new plugin
/cook create plugin for [complex workflow]

# Debug
/debug [issue]

# Plan
/plan [task]

# Commit changes
/cmp
```

---

## 🎉 Summary

### Key Takeaways

1. **Micro-Skills (50-150 lines)**
   - Single, focused tasks
   - Load only what you need
   - 4-8k tokens per skill
   - 60-80% token savings vs old way

2. **Plugins (orchestrate multiple skills)**
   - Complex multi-step workflows
   - Load skills lazily (one at a time)
   - 20-30k tokens total
   - Still 50%+ savings vs old way

3. **Meta-Skills (skill generators)**
   - Create new micro-skills following best practices
   - Create new plugins for custom workflows
   - Maintain consistency across codebase

4. **Best Practice**
   - Simple task → Micro-skill
   - Complex task → Plugin
   - Need new workflow → Meta-skill to generate

### Token Savings Examples

| Task | Old Way | New Way | Savings |
|------|---------|---------|---------|
| Setup Tailwind | 55k | 4k | **92%** |
| Add dark mode | 55k | 5k | **91%** |
| Dockerize app | 40k | 15k | **62%** |
| Complete frontend | 150k | 25k | **83%** |

### Where to Go Next

1. **Try simple task first:**
   ```bash
   /cook setup Tailwind CSS
   ```

2. **Then try complex task:**
   ```bash
   /cook setup complete frontend with React, Tailwind, dark mode
   ```

3. **Create your own micro-skill:**
   ```bash
   /cook create micro-skill for [your specific need]
   ```

4. **Create your own plugin:**
   ```bash
   /cook create plugin for [your complex workflow]
   ```

---

**Happy Coding! 🚀**

Bạn vừa nâng cấp từ "tốn tokens như nước" lên "tiết kiệm tokens như pro"! 🎯

**Lời khuyên cuối:**
- Gói $20/tháng: Có thể xài thoải mái với micro-skills
- Gói $100/tháng: Có thể xài cả plugins thường xuyên
- Gói $200/tháng: Xài thoải mái, không lo tokens

**Mọi thắc mắc, check:**
- `OPTIMIZATION_PLAN.md` - Chi tiết kỹ thuật
- `skills/_meta/meta-skill-generator.md` - Cách tạo skills mới
- `skills/_meta/meta-plugin-generator.md` - Cách tạo plugins mới
