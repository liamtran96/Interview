# 🤖 Agent Development Guide

## 🔗 Agents và Skills - Mối Quan Hệ

### Câu Trả Lời Ngắn

```
❌ Agents KHÔNG phụ thuộc vào skills
❌ Agents KHÔNG cần load skills để hoạt động
✅ Agents CÓ THỂ tham khảo skills nếu hữu ích (optional)
✅ Agents CÓ THỂ suggest user dùng skills cho implementation tasks
```

### Ví Dụ Cụ Thể

**Agent: code-reviewer**
```
User: "Review my Tailwind setup"

Agent workflow:
1. Read Tailwind config files ✅
2. Analyze setup quality ✅
3. (Optional) Tham khảo tailwind-setup skill để check best practices
4. Report findings với recommendations ✅

Agent KHÔNG cần load skill để review.
Agent chỉ cần expertise để analyze và judge quality.
```

**Agent: planner-researcher**
```
User: "Plan implementation for dark mode"

Agent workflow:
1. Research dark mode patterns ✅
2. (Optional) Tham khảo tailwind-darkmode skill để understand approach
3. Create detailed implementation plan ✅
4. Suggest: "Use tailwind-darkmode skill for implementation"

Agent KHÔNG tự execute skill.
Agent chỉ research và plan, sau đó suggest skill cho implementation.
```

---

## 📊 Review Agents Hiện Tại Của Bạn

### Agents Bạn Có:

1. ✅ `code-reviewer.md` (124 lines)
2. ✅ `database-admin.md` (85 lines)
3. ✅ `debugger.md` (112 lines)
4. ✅ `docs-manager.md` (107 lines)
5. ✅ `git-manager.md` (59 lines)
6. ✅ `planner-researcher.md` (92 lines)
7. ✅ `tester.md` (92 lines)

---

## 🔍 Detailed Agent Analysis

### 1. code-reviewer Agent ⭐ (Good!)

**Current State:**
```markdown
✅ Clear responsibilities (code quality, security, performance)
✅ Systematic review process (4 phases)
✅ Structured output format
✅ Prioritized findings (Critical/High/Medium/Low)
✅ Actionable recommendations
```

**Strengths:**
- Very comprehensive scope
- Good methodology
- Clear output structure
- Balances ideal vs pragmatic

**Improvement Opportunities:**

#### A. Có thể tham khảo skills

```markdown
## Tools and Reference Materials

When reviewing code, you may reference:

**Skills for Best Practices:**
- `systematic-debugging` - For debugging methodology validation
- `test-driven-development` - For test quality assessment
- `testing-anti-patterns` - For identifying test issues
- `defense-in-depth` - For validation layer checks

**How to use:**
- Don't load skills automatically
- Reference them when relevant to findings
- Mention in recommendations: "Consider following [skill-name] pattern"
```

#### B. Add specific checklists

```markdown
## Review Checklists

### Security Checklist
- [ ] Input validation at boundaries
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF tokens where needed
- [ ] Secrets not in code
- [ ] Proper authentication/authorization

### Performance Checklist
- [ ] No N+1 queries
- [ ] Efficient algorithms (O(n) vs O(n²))
- [ ] Proper caching
- [ ] Lazy loading where appropriate
- [ ] No memory leaks

### Type Safety Checklist
- [ ] No `any` types without justification
- [ ] Proper null/undefined handling
- [ ] Type guards for runtime checks
- [ ] Discriminated unions for complex types
```

---

### 2. debugger Agent ⭐ (Good!)

**Current State:**
```markdown
✅ Clear investigation methodology (4 phases)
✅ Systematic approach
✅ Comprehensive log analysis
✅ Root cause identification
```

**Strengths:**
- Structured investigation process
- Multiple data sources (logs, metrics, DB, CI/CD)
- Root cause focused

**Improvement Opportunities:**

#### A. Explicitly reference systematic-debugging skill

```markdown
## Investigation Methodology

You will follow a systematic debugging approach similar to the `systematic-debugging` skill:

### Phase 1: Root Cause Investigation

**BEFORE attempting ANY fix:**

1. **Read Error Messages Carefully**
   - Don't skip past errors or warnings
   - Read stack traces completely
   - Note line numbers, file paths, error codes

2. **Reproduce Consistently**
   - Can you trigger it reliably?
   - What are the exact steps?
   - If not reproducible → gather more data, don't guess

3. **Check Recent Changes**
   - What changed that could cause this?
   - Git diff, recent commits
   - New dependencies, config changes

4. **Gather Evidence in Multi-Component Systems**
   - Log what data enters each component
   - Log what data exits each component
   - Verify environment/config propagation

5. **Trace Data Flow**
   - Where does bad value originate?
   - What called this with bad value?
   - Keep tracing up until you find the source

### Phase 2: Pattern Analysis

[Continue with your existing content but reference systematic-debugging patterns]

**Important:** Follow `systematic-debugging` skill's iron law:
```
NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST
```
```

#### B. Add diagnostic instrumentation templates

```markdown
## Diagnostic Tools

### Add Instrumentation

When investigation needs more data:

**For API endpoints:**
```javascript
// Add at request entry
console.log('=== Request Entry ===', {
  method: req.method,
  url: req.url,
  headers: req.headers,
  body: req.body,
  timestamp: new Date().toISOString()
})

// Add at response exit
console.log('=== Response Exit ===', {
  statusCode: res.statusCode,
  body: responseBody,
  duration: Date.now() - startTime
})
```

**For database queries:**
```javascript
// Log query + params
logger.debug('DB Query', {
  query: sql,
  params: params,
  caller: new Error().stack
})
```

**For async operations:**
```javascript
// Trace async flow
const traceId = uuidv4()
logger.info('Async Start', { traceId, operation: 'processUser' })
// ... async work
logger.info('Async End', { traceId, result: 'success' })
```
```

---

### 3. planner-researcher Agent ⭐ (Good!)

**Current State:**
```markdown
✅ Research and planning focus
✅ Web search and documentation lookup
✅ Structured plan creation
```

**Strengths:**
- Clear research methodology
- Can search for latest docs
- Creates actionable plans

**Improvement Opportunities:**

#### A. Reference existing skills in plans

```markdown
## Plan Creation Process

When creating implementation plans:

### 1. Research Phase
- Search latest documentation
- Review existing patterns in codebase
- **Check existing skills** for relevant patterns

### 2. Plan Structure

For each plan task:
```markdown
Task: [Task name]
Estimated effort: [time]
**Recommended approach:**
  - Use skill: [skill-name] if available
  - Or follow pattern: [pattern description]
Implementation notes: [specific guidance]
Verification: [how to verify completion]
```

### 3. Skill Recommendations

When relevant skills exist:
- "For Tailwind setup, use `tailwind-setup` skill"
- "For Docker optimization, use `dockerfile-multistage` skill"
- "For debugging, follow `systematic-debugging` methodology"

When no skill exists:
- Provide detailed implementation steps
- Suggest creating new micro-skill if pattern is reusable
```

#### B. Add research templates

```markdown
## Research Report Template

### Technology: [Name]

**Latest Version:** [version]
**Documentation:** [URL]
**Last Updated:** [date]

**Key Features:**
- Feature 1
- Feature 2

**Best Practices:**
1. Practice 1 with rationale
2. Practice 2 with rationale

**Common Pitfalls:**
- Pitfall 1: [how to avoid]
- Pitfall 2: [how to avoid]

**Integration Steps:**
1. Step 1
2. Step 2

**Existing Skills:**
- `[skill-name]`: [when to use]

**Testing Strategy:**
- How to validate implementation
```

---

### 4. tester Agent

**Current State:**
```markdown
✅ Test execution focus
✅ Coverage analysis
✅ Quality verification
```

**Improvement Opportunities:**

#### A. Reference testing skills

```markdown
## Testing Methodology

Follow these testing best practices from skills:

### Before Writing Tests
- Reference `test-driven-development` skill for TDD workflow
- Check `testing-anti-patterns` skill for common mistakes

### Test Quality Checks
- [ ] No testing mock behavior (real behavior only)
- [ ] No test-only methods in production code
- [ ] Proper test isolation
- [ ] Clear test names (what, when, expected)

### Coverage Analysis
- Unit test coverage: Target 80%+
- Integration test coverage: Critical paths
- E2E test coverage: User journeys

### When Tests Fail
1. Follow `systematic-debugging` for investigation
2. Don't just make tests pass - understand why they failed
3. Fix root cause, not symptoms
```

---

## 🎯 Guidelines for Building Good Agents

### 1. Clear Scope and Expertise

**Good:**
```markdown
You are a [specific role] with expertise in:
- [Specific expertise 1] (with examples)
- [Specific expertise 2] (with boundaries)
- [Specific expertise 3] (with use cases)
```

**Bad:**
```markdown
You are good at coding.
```

---

### 2. Systematic Methodology

**Good:**
```markdown
## Investigation Methodology

When [doing X], you will:

### Phase 1: [Phase Name] (time estimate)
1. **Step 1**
   - Specific action
   - Expected output

2. **Step 2**
   - Specific action
   - Expected output

### Phase 2: [Phase Name]
[Continue phases...]
```

**Bad:**
```markdown
You will analyze the code and find issues.
```

---

### 3. Tool Proficiency

**Good:**
```markdown
## Tools and Techniques

**Analysis Tools:**
- `Tool 1` - Specific use case
- `Tool 2` - When to use

**Skills Reference (Optional):**
- `skill-name` - For [specific purpose]
- Don't load automatically
- Reference in recommendations

**Techniques:**
- Technique 1: [When and how]
- Technique 2: [When and how]
```

---

### 4. Structured Output

**Good:**
```markdown
## Report Structure

Your report will include:

### 1. Executive Summary
- Key finding 1
- Key finding 2
- Recommended action

### 2. Detailed Analysis
[Structured sections]

### 3. Recommendations
[Prioritized, actionable]

### 4. Next Steps
[Clear action items]
```

---

### 5. Skills Integration (Optional)

```markdown
## Reference Materials

When relevant, you may reference these skills:

**For [domain] tasks:**
- `skill-1` - Use case description
- `skill-2` - Use case description

**How to use:**
- Don't load skills automatically
- Reference when findings relate to skill topics
- Suggest: "Consider following [skill-name] approach"
- Never execute skills yourself (you analyze, don't implement)
```

---

## 🔄 Agent vs Skill Decision Matrix

```
Task Type          → Agent or Skill?

ANALYSIS          → Agent ✅
  - Code review
  - Debug investigation
  - Performance audit
  - Security assessment

JUDGMENT          → Agent ✅
  - Design decisions
  - Architecture review
  - Priority setting
  - Risk assessment

RESEARCH          → Agent ✅
  - Find latest docs
  - Compare approaches
  - Best practices

IMPLEMENTATION    → Skill ✅
  - Setup Tailwind
  - Create Dockerfile
  - Configure tools
  - Write boilerplate

ORCHESTRATION     → Plugin ✅
  - Multi-step setup
  - Complex workflow
  - Multiple skills
```

---

## ✅ Checklist: Good Agent Definition

When creating or reviewing an agent:

- [ ] **Clear Scope**: Specific expertise areas defined
- [ ] **Systematic Process**: Step-by-step methodology
- [ ] **Tool Proficiency**: Specific tools and when to use them
- [ ] **Structured Output**: Clear report/deliverable format
- [ ] **Skills Reference (Optional)**: List relevant skills as reference
- [ ] **Best Practices**: Do's and don'ts documented
- [ ] **Examples**: Real usage examples provided
- [ ] **Communication Style**: How agent interacts with user
- [ ] **Success Criteria**: How to know agent succeeded
- [ ] **Model Selection**: Appropriate model (sonnet/haiku)

---

## 🎓 Recommended Improvements for Your Agents

### Priority 1: Add Skills Reference (All Agents)

Add this section to each agent:

```markdown
## Reference Materials (Optional)

When relevant to your analysis, you may reference:

**Debugging:**
- `systematic-debugging` - For debugging methodology
- `root-cause-tracing` - For tracing issues

**Testing:**
- `test-driven-development` - For TDD approach
- `testing-anti-patterns` - For test quality

**Code Quality:**
- `defense-in-depth` - For validation patterns
- `verification-before-completion` - For completion checks

**How to use:**
- Don't load automatically
- Reference when findings relate to these topics
- Suggest in recommendations: "Follow [skill-name] approach"
```

### Priority 2: Add Specific Checklists

Each agent should have domain-specific checklists:

**code-reviewer:** Security, Performance, Type Safety checklists
**debugger:** Root Cause Investigation checklist
**tester:** Test Quality checklist
**database-admin:** Query Optimization checklist

### Priority 3: Add Templates

Provide templates for common outputs:

**code-reviewer:** Issue report template
**debugger:** Investigation report template
**planner-researcher:** Research report + Plan template
**tester:** Test report template

---

## 💡 Key Takeaways

### Agents và Skills Relationship:

```
Agents:
  - Độc lập, không cần skills
  - CÓ THỂ tham khảo skills (optional)
  - Focus on: ANALYZE, JUDGE, INVESTIGATE
  - Output: Reports, Recommendations, Plans

Skills:
  - Instructions for implementation
  - Load khi cần execute task
  - Focus on: DO, IMPLEMENT, CONFIGURE
  - Output: Code, Config, Setup

Workflow:
  User task
    → Agent analyzes/plans
    → Agent suggests: "Use [skill] for implementation"
    → Claude loads skill and executes
    → Done!
```

### Agent Best Practices:

1. ✅ **Clear expertise** - What agent is good at
2. ✅ **Systematic process** - How agent works
3. ✅ **Structured output** - What agent produces
4. ✅ **Optional skills reference** - Skills agent can refer to
5. ✅ **Specific checklists** - Domain-specific checks
6. ✅ **Templates** - Consistent output format

---

## 🚀 Next Steps

1. **Review each agent** using checklist above
2. **Add "Reference Materials" section** to agents that could benefit
3. **Add domain-specific checklists** for quality assurance
4. **Add templates** for consistent outputs
5. **Test agents** with real scenarios

**Remember:** Agents are EXPERTS who ANALYZE. Skills are INSTRUCTIONS to EXECUTE.

---

**Questions to ask when building agent:**

1. What expertise does this agent have?
2. What process does agent follow?
3. What does agent produce?
4. What skills might be relevant? (optional reference)
5. How does agent communicate findings?

If you can answer these clearly → You have a good agent! ✅
