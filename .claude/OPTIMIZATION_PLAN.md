# Kế Hoạch Tối Ưu Context & Cải Thiện Output Quality

## 🎯 Mục Tiêu

1. **Tối ưu context/tokens**: Giảm 60-80% context usage khi load skills
2. **Cải thiện output quality**: Tăng chất lượng output cho frontend, debug, backend tasks

## 📊 Phân Tích Hiện Trạng

### Vấn đề lớn nhất: SKILLS quá to

| Skill | Dòng code | Context impact |
|-------|-----------|----------------|
| tailwindcss | 1133 | 🔴 Cực cao |
| shadcn-ui | 1052 | 🔴 Cực cao |
| docker | 1016 | 🔴 Cực cao |
| writing-skills | 622 | 🟡 Cao |
| cloudflare-r2 | 464 | 🟡 Trung bình |

**Nguyên nhân**: Skills được tổ chức theo chủ đề lớn (như ClaudeKit) → prompt/instructions rất to → tốn nhiều tokens

### Hiện trạng tốt:

- ✅ **Agents**: 59-124 dòng - kích thước hợp lý
- ✅ **Commands**: 3-11 dòng - cực kỳ nhẹ

---

## 🏗️ Kiến Trúc Mới: Micro-Skills + Plugins

### 1. Nguyên tắc thiết kế Micro-Skills

**Skill KHÔNG phải là Agent** - Đừng lấy System Prompt của Agent đập qua làm Skill!

**Micro-Skill = Single Responsibility Principle**
- Mỗi skill chỉ làm 1 việc cụ thể
- Kích thước mục tiêu: 50-150 dòng
- Context nhỏ gọn, load nhanh
- Dễ maintain, dễ test

**Ví dụ cụ thể:**

❌ **BAD (hiện tại)**: `docker/SKILL.md` (1016 dòng)
```
- Dockerfile best practices
- Docker Compose
- Networking
- Volumes
- Security
- CI/CD integration
- Multi-platform builds
- ... (tất cả về Docker)
```

✅ **GOOD (mới)**: Chia thành micro-skills
```
docker-core/
  ├── dockerfile-basics.md (80 dòng)
  ├── dockerfile-multistage.md (60 dòng)
  ├── docker-compose-setup.md (100 dòng)
  ├── docker-networking.md (70 dòng)
  ├── docker-volumes.md (80 dòng)
  ├── docker-security.md (90 dòng)
  └── docker-optimization.md (85 dòng)
```

### 2. Plugin System - Stack Micro-Skills

**Plugin = Orchestration Layer**
- Tổng hợp nhiều micro-skills cho task phức tạp
- Định nghĩa workflow, dependencies giữa skills
- Chỉ load khi cần burn tokens cho complex tasks

**Cấu trúc Plugin:**

```markdown
---
name: docker-fullstack
type: plugin
description: Complete Docker setup for fullstack apps
skills:
  - docker-core/dockerfile-multistage
  - docker-core/docker-compose-setup
  - docker-core/docker-networking
  - docker-core/docker-security
agents:
  - debugger (for troubleshooting)
  - code-reviewer (for Dockerfile review)
---

# Plugin: Docker Fullstack Setup

## Workflow

1. Use `dockerfile-multistage` to create optimized Dockerfiles
2. Use `docker-compose-setup` for multi-service orchestration
3. Use `docker-networking` for service communication
4. Use `docker-security` for production hardening
5. Call `code-reviewer` agent to review configs
```

### 3. Cấu trúc thư mục mới

```
.claude/
├── skills/
│   ├── _meta/                    # Meta-skills để tạo skills mới
│   │   ├── meta-skill-generator.md
│   │   └── meta-plugin-generator.md
│   │
│   ├── docker-core/              # Micro-skills cho Docker
│   │   ├── PLUGIN.md             # Plugin tổng hợp (optional)
│   │   ├── dockerfile-basics.md
│   │   ├── dockerfile-multistage.md
│   │   ├── docker-compose-setup.md
│   │   ├── docker-networking.md
│   │   ├── docker-volumes.md
│   │   ├── docker-security.md
│   │   └── docker-optimization.md
│   │
│   ├── frontend-core/            # Micro-skills cho Frontend
│   │   ├── PLUGIN.md
│   │   ├── tailwind-setup.md      (80 dòng)
│   │   ├── tailwind-responsive.md (70 dòng)
│   │   ├── tailwind-darkmode.md   (60 dòng)
│   │   ├── shadcn-setup.md        (90 dòng)
│   │   ├── shadcn-forms.md        (100 dòng)
│   │   ├── shadcn-theming.md      (85 dòng)
│   │   └── react-patterns.md      (120 dòng)
│   │
│   ├── debugging-core/           # Micro-skills cho Debug
│   │   ├── root-cause-analysis.md
│   │   ├── log-analysis.md
│   │   ├── performance-profiling.md
│   │   └── error-tracking.md
│   │
│   └── backend-core/             # Micro-skills cho Backend
│       ├── api-design.md
│       ├── database-optimization.md
│       ├── caching-strategies.md
│       └── error-handling.md
│
├── plugins/                       # Complex task orchestration
│   ├── fullstack-setup.md        # Docker + Frontend + Backend
│   ├── debug-production.md       # Full debugging workflow
│   └── performance-audit.md      # Complete performance optimization
│
├── agents/                        # Không đổi, giữ nguyên
└── commands/                      # Không đổi, giữ nguyên
```

---

## 🔧 Implementation Plan

### Phase 1: Meta-Skill Framework (Foundation)

**Tạo 2 Meta-skills cốt lõi:**

#### 1.1. `meta-skill-generator.md`
- Input: Task description, domain, requirements
- Output: Micro-skill file (50-150 dòng)
- Best practices: Single responsibility, clear examples, minimal context

#### 1.2. `meta-plugin-generator.md`
- Input: Complex task description, required capabilities
- Output: Plugin file với workflow, skill dependencies
- Auto-suggest relevant micro-skills và agents

**Lợi ích**: Không cần nghĩ, chỉ cần chạy meta-skill là tạo được skills mới chuẩn format

### Phase 2: Refactor Existing Large Skills

**Priority 1 - Frontend Skills** (cải thiện output quality cho frontend):

| Old Skill | Size | → | New Micro-Skills | Est. Size |
|-----------|------|---|-----------------|-----------|
| `tailwindcss/SKILL.md` | 1133 | → | 6-8 micro-skills | 70-100 ea |
| `shadcn-ui/SKILL.md` | 1052 | → | 5-7 micro-skills | 80-120 ea |

**Breakdown example - Tailwind:**
```
tailwindcss (1133) →
  ├── tailwind-setup.md (80)         # Installation, config
  ├── tailwind-utilities.md (90)     # Common utilities
  ├── tailwind-responsive.md (70)    # Breakpoints, mobile-first
  ├── tailwind-darkmode.md (60)      # Dark mode setup
  ├── tailwind-components.md (100)   # Reusable components
  ├── tailwind-forms.md (85)         # Form styling
  ├── tailwind-animations.md (75)    # Transitions, animations
  └── tailwind-optimization.md (70)  # PurgeCSS, JIT mode

Plugin: tailwind-fullstack.md (150) # Orchestrates all above
```

**Priority 2 - Infrastructure Skills**:

| Old Skill | Size | → | New Micro-Skills |
|-----------|------|---|-----------------|
| `docker/SKILL.md` | 1016 | → | 7-9 micro-skills |
| `cloudflare-r2/SKILL.md` | 464 | → | 3-4 micro-skills |

**Priority 3 - Development Skills**:

| Old Skill | Size | → | New Micro-Skills |
|-----------|------|---|-----------------|
| `writing-skills/SKILL.md` | 622 | → | 4-5 micro-skills |
| `testing-skills-with-subagents/SKILL.md` | 387 | → | 3-4 micro-skills |

### Phase 3: Enhanced Agents for Output Quality

#### 3.1. Frontend-Focused Agent Enhancement

**Tạo mới: `frontend-specialist` agent**
```yaml
name: frontend-specialist
model: sonnet
focus:
  - UI/UX implementation
  - Component architecture
  - Accessibility (a11y)
  - Performance optimization
  - Responsive design
  - Animation/interaction
skills_access:
  - frontend-core/* (tất cả micro-skills)
plugins_access:
  - frontend-fullstack
  - component-library-setup
```

**Cải thiện `code-reviewer` agent** - thêm frontend checklist:
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Accessibility (ARIA, keyboard navigation)
- [ ] Performance (bundle size, lazy loading)
- [ ] Cross-browser compatibility
- [ ] Dark mode support

#### 3.2. Debug/Backend Agent Enhancement

**Cải thiện `debugger` agent**:
- Thêm systematic debugging workflow từ `systematic-debugging/SKILL.md`
- Integration với `root-cause-tracing` skill
- Auto-instrumentation suggestions
- Performance profiling capabilities

**Tạo mới: `backend-architect` agent**:
```yaml
name: backend-architect
model: sonnet
focus:
  - API design (REST, GraphQL)
  - Database schema design
  - Caching strategies
  - Error handling patterns
  - Security best practices
  - Scalability patterns
skills_access:
  - backend-core/*
  - debugging-core/*
plugins_access:
  - api-optimization
  - database-performance
```

### Phase 4: Plugin Templates

**Tạo 5 plugin templates phổ biến:**

1. **`fullstack-app-setup.md`**
   - Docker multi-stage builds
   - Frontend setup (React + Tailwind + shadcn)
   - Backend setup (API + DB)
   - CI/CD pipeline

2. **`debug-production-issue.md`**
   - Log collection & analysis
   - Performance profiling
   - Root cause tracing
   - Fix implementation + testing

3. **`component-library-setup.md`**
   - Design system setup
   - Component architecture
   - Documentation generation
   - Storybook integration

4. **`performance-audit.md`**
   - Frontend performance (Lighthouse)
   - Backend performance (APM)
   - Database optimization
   - Caching strategies

5. **`security-hardening.md`**
   - Frontend security (XSS, CSRF)
   - Backend security (injection, auth)
   - Docker security
   - Secret management

---

## 📏 Success Metrics

### Context Usage Reduction

**Target**: Giảm 60-80% context khi load skills

**Before** (ví dụ với Docker + Tailwind + shadcn):
```
docker/SKILL.md:        1016 dòng  (~50k tokens)
tailwindcss/SKILL.md:   1133 dòng  (~55k tokens)
shadcn-ui/SKILL.md:     1052 dòng  (~52k tokens)
─────────────────────────────────────────────
TOTAL:                  3201 dòng  (~157k tokens) 🔴
```

**After** (chỉ load skills cần thiết):
```
Scenario 1: Chỉ cần Docker basics
  dockerfile-basics.md:     80 dòng   (~4k tokens)

Scenario 2: Setup Tailwind responsive
  tailwind-setup.md:        80 dòng   (~4k tokens)
  tailwind-responsive.md:   70 dòng   (~3.5k tokens)
  TOTAL:                   150 dòng   (~7.5k tokens) 🟢

Scenario 3: Complex task - Full frontend setup
  Load plugin: frontend-fullstack.md
    → Auto-loads 5-6 micro-skills  (~30k tokens) 🟡
```

**Kết quả**:
- Simple task: Giảm ~95% context (4k vs 157k)
- Medium task: Giảm ~85% context (7.5k vs 157k)
- Complex task: Giảm ~60% context (30k vs 157k)

### Output Quality Improvement

**Frontend tasks:**
- ✅ Component code có responsive design by default
- ✅ Accessibility built-in (ARIA, keyboard nav)
- ✅ Dark mode support
- ✅ Performance optimized (lazy loading, code splitting)
- ✅ Cross-browser tested patterns

**Debug tasks:**
- ✅ Systematic root cause analysis (không guess)
- ✅ Proper instrumentation before fixing
- ✅ Evidence-based debugging
- ✅ Comprehensive error reproduction
- ✅ Test-driven bug fixes

**Backend tasks:**
- ✅ Scalable API design
- ✅ Proper error handling patterns
- ✅ Security best practices built-in
- ✅ Performance optimization (caching, indexing)
- ✅ Comprehensive logging & monitoring

---

## 🚀 Migration Strategy

### Step 1: Create Foundation (Week 1)
- [ ] Create `_meta/` directory
- [ ] Implement `meta-skill-generator.md`
- [ ] Implement `meta-plugin-generator.md`
- [ ] Test meta-skills với vài examples

### Step 2: Refactor Frontend Skills (Week 2)
- [ ] Break down `tailwindcss/SKILL.md` → 7 micro-skills
- [ ] Break down `shadcn-ui/SKILL.md` → 6 micro-skills
- [ ] Create `frontend-core/PLUGIN.md`
- [ ] Test với real frontend tasks

### Step 3: Refactor Infrastructure Skills (Week 3)
- [ ] Break down `docker/SKILL.md` → 8 micro-skills
- [ ] Break down `cloudflare-r2/SKILL.md` → 4 micro-skills
- [ ] Create relevant plugins
- [ ] Test với deployment tasks

### Step 4: Enhanced Agents (Week 4)
- [ ] Create `frontend-specialist` agent
- [ ] Create `backend-architect` agent
- [ ] Enhance `debugger` agent
- [ ] Enhance `code-reviewer` agent
- [ ] Test agent improvements

### Step 5: Plugin Templates (Week 5)
- [ ] Create 5 plugin templates
- [ ] Document usage patterns
- [ ] Create examples for each plugin
- [ ] Integration testing

### Step 6: Validation & Iteration (Week 6)
- [ ] Measure context usage before/after
- [ ] A/B test output quality
- [ ] Collect feedback
- [ ] Refine based on results
- [ ] Document best practices

---

## 💡 Best Practices for New Micro-Skills

### DO:
✅ Single responsibility (1 skill = 1 specific task)
✅ Clear, actionable examples
✅ 50-150 dòng max
✅ Include "When to use" section
✅ Reference related micro-skills
✅ Minimal context overhead

### DON'T:
❌ Không copy Agent system prompt vào Skill
❌ Không viết skill "all-in-one" cho 1 topic
❌ Không duplicate content giữa skills
❌ Không tạo skill >200 dòng (nếu >200 → chia nhỏ hơn)
❌ Không quên link micro-skills vào plugin

### Template for Micro-Skill:

```markdown
---
name: [specific-task-name]
category: [docker-core|frontend-core|debugging-core|backend-core]
description: One-line description (max 100 chars)
related_skills:
  - skill-a
  - skill-b
---

# [Skill Name]

## When to Use
[1-2 sentences: specific scenario]

## Quick Start
[Minimal working example, ~10-15 dòng]

## Core Concepts
[2-3 key concepts, bullet points]

## Step-by-Step Guide
[Numbered steps, code examples, ~40-60 dòng]

## Common Patterns
[2-3 common use cases, ~20-30 dòng]

## Gotchas & Tips
[Common mistakes, best practices, ~10-15 dòng]

## Related
- Use `[skill-x]` for ...
- Combine with `[skill-y]` when ...
```

---

## 📚 References

**Inspired by:**
- ClaudeKit architecture analysis
- Token optimization principles
- Single Responsibility Principle
- Plugin/Extension patterns
- Micro-services architecture

**Key insights from your analysis:**
> "Skills hiện tại được tổ chức theo chủ đề lớn (VD như Nextjs, Mongodb,...), prompt/instructions rất to. Dẫn đến sẽ phản tác dụng!"

> "SKILL không phải là Agent, nên đừng lấy System Prompt của Agent đập qua rồi gọi là SKILL nhé."

> "Các bạn có thể làm thành các mini/micro SKILLs sau đó stack chúng lại hoặc tổ hợp thành PLUGIN."

---

## 🎯 Expected Outcomes

1. **Context Usage**: Giảm 60-80% tokens cho typical tasks
2. **Loading Speed**: Faster skill loading, only load what's needed
3. **Maintainability**: Dễ update, test từng micro-skill
4. **Reusability**: Micro-skills có thể dùng trong nhiều plugins
5. **Output Quality**:
   - Frontend: Production-ready components với a11y, responsive, performance
   - Debug: Systematic, evidence-based debugging
   - Backend: Scalable, secure, optimized APIs
6. **Developer Experience**: Clear structure, easy to find relevant skills

**Motto**:
> "Small skills, big impact. Load less, achieve more."
