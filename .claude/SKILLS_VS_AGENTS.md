# 🤖 Skills vs Agents - Khi Nào Dùng Gì?

## 🎯 Sự Khác Biệt Cốt Lõi

```
┌─────────────────────────────────────────────────────────┐
│                    SKILLS / PLUGINS                     │
├─────────────────────────────────────────────────────────┤
│  • Là INSTRUCTIONS (hướng dẫn làm gì)                  │
│  • Được LOAD vào context của Claude chính              │
│  • Claude ĐỌC và THỰC HIỆN theo instructions           │
│  • Dùng cho: TASKS THỰC THI trực tiếp                  │
│                                                         │
│  Ví dụ:                                                 │
│  - Setup Tailwind (step-by-step guide)                 │
│  - Create Dockerfile (template + instructions)         │
│  - Configure dark mode (how-to guide)                  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                       AGENTS                            │
├─────────────────────────────────────────────────────────┤
│  • Là SUBAGENTS (Claude phụ độc lập)                   │
│  • Có CONTEXT RIÊNG (không dùng chung với Claude chính)│
│  • Claude chính DELEGATE task cho agent                │
│  • Dùng cho: COMPLEX ANALYSIS / SPECIALIZED WORK       │
│                                                         │
│  Ví dụ:                                                 │
│  - Code review (need expertise + analysis)             │
│  - Debug production issues (need investigation)        │
│  - Database optimization (need specialized knowledge)  │
└─────────────────────────────────────────────────────────┘
```

---

## 📊 Khi Nào Dùng Gì?

### ✅ Dùng SKILLS/PLUGINS khi:

**1. Task có STEPS RÕ RÀNG, có thể follow instructions**
```
Example: "Setup Tailwind CSS"
→ Use skill: tailwind-setup

Why?
- Có step 1, 2, 3 rõ ràng
- Chỉ cần follow instructions
- Không cần analysis phức tạp
```

**2. Task là IMPLEMENTATION (coding, config, setup)**
```
Example: "Create Dockerfile with multi-stage build"
→ Use skill: dockerfile-multistage

Why?
- Có template rõ ràng
- Chỉ cần apply pattern
- Không cần creative problem solving
```

**3. Task CẦN CONTEXT EFFICIENCY (load/unload nhanh)**
```
Example: "Add dark mode"
→ Use skill: tailwind-darkmode

Why?
- Simple task
- Load 5k tokens → execute → unload
- Efficient, không cần agent overhead
```

---

### ✅ Dùng AGENTS khi:

**1. Cần ANALYSIS và JUDGMENT**
```
Example: "Review my code for best practices"
→ Use agent: code-reviewer

Why?
- Cần đọc code
- Cần phân tích quality
- Cần expert judgment
- Cần report với reasoning

Skill KHÔNG THỂ làm được vì:
❌ Skill chỉ là instructions, không có "intelligence" để analyze
```

**2. Cần INVESTIGATION (tìm hiểu, debug)**
```
Example: "Why is my API returning 500 errors?"
→ Use agent: debugger

Why?
- Cần đọc logs
- Cần trace errors
- Cần hypothesis testing
- Cần root cause analysis

Skill KHÔNG THỂ làm được vì:
❌ Skill không có capability để "investigate"
```

**3. Cần SPECIALIZED EXPERTISE**
```
Example: "Optimize my database queries"
→ Use agent: database-admin

Why?
- Cần database expertise
- Cần analyze query plans
- Cần suggest optimizations
- Cần consider tradeoffs

Skill KHÔNG THỂ làm được vì:
❌ Skill chỉ có generic instructions, không có "expertise"
```

**4. Cần PARALLEL WORK (chạy độc lập)**
```
Example: "Review code while I continue working"
→ Use agent: code-reviewer (parallel)

Why?
- Agent có context riêng
- Không block Claude chính
- Có thể chạy song song

Skill KHÔNG THỂ vì:
❌ Skill dùng chung context với Claude chính
```

---

## 🔄 Workflow So Sánh

### Workflow với SKILL

```
User: "Setup Tailwind CSS"
        ↓
Claude: [Load skill: tailwind-setup]
        ↓
Claude: [Read instructions from skill]
        ↓
Claude: [Execute step 1: npm install...]
Claude: [Execute step 2: create config...]
Claude: [Execute step 3: add directives...]
        ↓
Claude: [Unload skill]
        ↓
Done! ✅
```

**Claude TỰ THỰC HIỆN theo hướng dẫn trong skill**

---

### Workflow với AGENT

```
User: "Review my code for quality issues"
        ↓
Claude: "I need code review expertise"
        ↓
Claude: [Spawn agent: code-reviewer]
        ↓
Agent: [Has own context]
Agent: [Read all code files]
Agent: [Analyze patterns]
Agent: [Check best practices]
Agent: [Generate report]
        ↓
Agent: [Return report to Claude]
        ↓
Claude: [Present report to user]
        ↓
Done! ✅
```

**Agent LÀM CÔNG VIỆC CHUYÊN MÔN, Claude chỉ coordinate**

---

## 📚 Agents Có Sẵn Và Khi Nào Dùng

### 1. `code-reviewer` Agent

**Khi nào dùng:**
```
✅ "Review my code for best practices"
✅ "Check if this follows security guidelines"
✅ "Is my React component optimized?"
✅ "Review my Dockerfile for production readiness"
```

**Không dùng khi:**
```
❌ "Create a React component" → Use skill instead
❌ "Setup ESLint" → Use skill instead
```

**Tự động được gọi:**
- Sau khi plugin hoàn thành (Phase 4 của plugins)
- Khi user yêu cầu review
- Khi cần quality check

---

### 2. `debugger` Agent

**Khi nào dùng:**
```
✅ "Why is my app crashing?"
✅ "Debug the 500 error in my API"
✅ "Performance is slow, find bottlenecks"
✅ "Investigate CI/CD pipeline failures"
```

**Không dùng khi:**
```
❌ "Fix this bug" (nếu bạn đã biết bug) → Claude fix trực tiếp
❌ "Add error handling" → Use skill
```

**Tự động được gọi:**
- Khi có error phức tạp cần investigation
- Khi performance issue cần profiling
- Khi CI/CD fail cần analyze logs

---

### 3. `tester` Agent

**Khi nào dùng:**
```
✅ "Run all tests and fix failures"
✅ "Check test coverage"
✅ "Validate the implementation works"
✅ "Test this feature end-to-end"
```

**Không dùng khi:**
```
❌ "Write a test" → Claude viết trực tiếp
❌ "Setup Jest" → Use skill
```

**Tự động được gọi:**
- Sau khi implement feature lớn
- Trước khi commit code
- Khi user request test validation

---

### 4. `planner-researcher` Agent

**Khi nào dùng:**
```
✅ "Research best practices for authentication"
✅ "Plan the architecture for this feature"
✅ "Find the latest documentation for Next.js 14"
✅ "Design database schema for user management"
```

**Không dùng khi:**
```
❌ "Implement authentication" → Use plugin/skill
❌ "Create database table" → Claude làm trực tiếp
```

**Tự động được gọi:**
- Khi user dùng `/plan` command
- Khi task phức tạp cần research trước
- Khi cần tìm latest docs

---

### 5. `git-manager` Agent

**Khi nào dùng:**
```
✅ "Commit and push my changes"
✅ "Create PR with description"
✅ "Stage these files and commit"
```

**Không dùng khi:**
```
❌ "Check git status" → Claude dùng bash trực tiếp
❌ "View git diff" → Claude dùng bash trực tiếp
```

**Tự động được gọi:**
- Khi user dùng `/cmp` command
- Khi user request commit + push

---

### 6. `database-admin` Agent

**Khi nào dùng:**
```
✅ "Optimize my database queries"
✅ "Analyze database performance"
✅ "Design database schema with indexes"
✅ "Diagnose slow queries"
```

**Không dùng khi:**
```
❌ "Create a table" → Claude viết SQL trực tiếp
❌ "Setup PostgreSQL" → Use skill
```

**Tự động được gọi:**
- Khi có database performance issues
- Khi cần database expertise
- Khi design complex schema

---

### 7. `docs-manager` Agent

**Khi nào dùng:**
```
✅ "Update documentation for this API"
✅ "Create comprehensive README"
✅ "Document the codebase architecture"
✅ "Review docs for accuracy"
```

**Không dùng khi:**
```
❌ "Add comment to this function" → Claude làm trực tiếp
❌ "Create simple README" → Claude làm trực tiếp
```

**Tự động được gọi:**
- Sau major feature implementation
- Khi documentation cần update
- Khi user request docs review

---

## 🎯 Decision Tree

```
                    Task Description
                          ↓
        ┌─────────────────┼─────────────────┐
        ↓                 ↓                 ↓

  IMPLEMENTATION?    ANALYSIS?        SPECIALIZED?
        ↓                 ↓                 ↓

   ✅ Use SKILL     ✅ Use AGENT     ✅ Use AGENT

   Examples:         Examples:         Examples:
   - Setup X         - Review code     - DB optimization
   - Create Y        - Debug error     - Security audit
   - Configure Z     - Find bugs       - Performance tuning
```

---

## 💡 Combining Skills and Agents

### Example 1: Complete Feature Implementation

```
User: "Implement dark mode and make sure it's production-ready"

Claude workflow:
1. Use SKILL: tailwind-darkmode
   → Implement dark mode feature

2. Call AGENT: code-reviewer
   → Review implementation for quality

3. Call AGENT: tester
   → Run tests to validate

Result: Feature implemented + reviewed + tested ✅
```

---

### Example 2: Debug and Fix

```
User: "My API is slow, debug and optimize it"

Claude workflow:
1. Call AGENT: debugger
   → Investigate performance issue
   → Find bottleneck: N+1 query problem

2. Claude: Fix the N+1 query
   → Implement eager loading

3. Call AGENT: database-admin
   → Optimize database indexes
   → Validate query performance

4. Call AGENT: tester
   → Run performance tests

Result: Issue debugged + fixed + optimized + validated ✅
```

---

### Example 3: Complete Project Setup

```
User: "Setup complete frontend project, review it, and commit"

Claude workflow:
1. Use PLUGIN: frontend-fullstack-setup
   → Setup React + Tailwind + shadcn
   → (Plugin internally uses multiple SKILLS)

2. Call AGENT: code-reviewer
   → Review entire setup
   → Check best practices

3. Call AGENT: tester
   → Run build and tests

4. Call AGENT: git-manager
   → Commit and push changes

Result: Project setup + reviewed + tested + committed ✅
```

---

## 📊 Context Management

### Skills/Plugins:
```
Context: Shared with Claude
Usage: Load → Use → Unload
Cost: Based on skill size (4-30k tokens)
Lifecycle: Temporary

Timeline:
[Load skill] → Claude uses it → [Unload skill]
   +5k tokens                      -5k tokens
```

### Agents:
```
Context: Isolated (agent has own context)
Usage: Spawn → Agent works → Return result
Cost: Agent manages own context (doesn't affect main Claude)
Lifecycle: Independent

Timeline:
[Spawn agent] → Agent works independently → [Return result]
Agent context isolated from Claude
```

---

## 🎓 Key Takeaways

### Skills/Plugins:
- ✅ Instructions for Claude to follow
- ✅ Direct implementation
- ✅ Context efficient (load/unload)
- ✅ Fast execution
- 📝 Use for: Setup, config, implementation

### Agents:
- ✅ Independent workers with expertise
- ✅ Analysis and judgment
- ✅ Isolated context (parallel work)
- ✅ Specialized capabilities
- 🔍 Use for: Review, debug, analysis, planning

---

## 🚀 How Claude Automatically Decides

```
User: "Setup Tailwind CSS"
Claude: "This is implementation → Use SKILL" ✅

User: "Review my Tailwind setup"
Claude: "This is analysis → Use AGENT" ✅

User: "Setup Tailwind and review it"
Claude: "Implementation + Analysis → Use SKILL + AGENT" ✅
```

**You DON'T need to specify - Claude chooses automatically!**

---

## 💡 Pro Tip

```
Khi viết prompt:

"Setup X"           → Claude uses SKILL
"Create Y"          → Claude uses SKILL
"Implement Z"       → Claude uses SKILL

"Review X"          → Claude uses AGENT (code-reviewer)
"Debug Y"           → Claude uses AGENT (debugger)
"Optimize Z"        → Claude uses AGENT (database-admin, etc.)
"Plan X"            → Claude uses AGENT (planner-researcher)

"Setup X and review" → Claude uses SKILL + AGENT
```

**Chỉ cần nói, Claude tự biết dùng skill hay agent!** 🎯

---

**Bottom Line:**
- **Skills** = Instructions (you follow a recipe)
- **Agents** = Experts (you hire a consultant)

Both are automatically used by Claude based on your task! 🚀
