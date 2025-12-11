---
sidebar_position: 7
---

# Problem Solving

Problem-solving questions assess your analytical thinking, creativity, and approach to tackling complex challenges.

## Common Questions

### Q1: Tell me about a complex problem you solved.

**What they're looking for:**
- Analytical approach to breaking down problems
- Creativity in finding solutions
- Ability to work through ambiguity

**Example Answer (STAR):**

> **Situation:** Our application had intermittent performance issues that only appeared in production and affected random users. Logs showed no clear pattern, and the issue had persisted for months without resolution.
>
> **Task:** I volunteered to investigate and find the root cause that had eluded multiple engineers.
>
> **Action:** I started by gathering all available data: logs, metrics, user reports, and timing correlations. When initial analysis showed no pattern, I added more granular instrumentation to production. After two weeks of data collection, I noticed the issue correlated with specific database connection pool exhaustion. I traced it to a subtle bug where connections weren't being released under certain error conditions. The bug only triggered with a specific sequence of requests that was rare but not random.
>
> **Result:** The fix was a three-line code change. Response time variance dropped by 90%, and we eliminated hundreds of support tickets per month. I documented the debugging approach and created a runbook for similar investigations. I learned that "random" problems usually have hidden patterns—the key is collecting enough data to find them.

---

### Q2: Describe a time you had to learn something quickly to solve a problem.

**What they're looking for:**
- Learning agility
- Resourcefulness
- Applying new knowledge effectively

**Example Answer (STAR):**

> **Situation:** We had a critical bug in our mobile app's image caching, but our mobile developer had just left and I was primarily a backend engineer with no iOS experience.
>
> **Task:** I needed to diagnose and fix the issue before our next app store release in three days.
>
> **Action:** I spent the first day learning the basics: how iOS caching works, our app's architecture, and the specific image library we used. I read the library's source code on GitHub and found discussions of similar issues. By day two, I had narrowed it down to a race condition in our custom caching layer. I wrote a fix, then found an iOS developer on another team who could review my code since I wasn't confident in iOS best practices. I also wrote tests to verify the fix.
>
> **Result:** The fix shipped on time and resolved the issue completely. The experience gave me confidence to handle cross-platform issues. I've since become the go-to person for caching problems across all platforms. I learned that deep expertise in one area transfers more than I expected—debugging skills and understanding of systems apply everywhere.

---

### Q3: Tell me about a time you improved an existing process or system.

**What they're looking for:**
- Initiative to improve status quo
- Systems thinking
- Measuring impact

**Example Answer (STAR):**

> **Situation:** Our code review process was a bottleneck—PRs often sat for 2-3 days waiting for reviews, slowing down the entire team's velocity.
>
> **Task:** I wanted to find a way to reduce review time without compromising quality or overloading anyone.
>
> **Action:** First, I analyzed the data: PR sizes, review times, who was reviewing what. I found that large PRs took disproportionately longer, and a few team members were doing most reviews. I proposed several changes: a PR size limit of 400 lines, a rotation system for reviews, and a daily "review hour" where everyone focused on clearing the queue. I created dashboards to track metrics and make the improvement visible.
>
> **Result:** Average review time dropped from 2.5 days to 6 hours. The number of reviewers participating increased, spreading knowledge across the team. We also caught more bugs because smaller PRs were easier to review carefully. The approach was adopted by two other teams in the company.

---

### Q4: Describe a situation where you had to solve a problem with limited information.

**What they're looking for:**
- Comfort with ambiguity
- Hypothesis-driven approach
- Knowing when to act vs. gather more information

**Example Answer (STAR):**

> **Situation:** A key client reported that "the app feels slow," but they couldn't be more specific. Our internal testing showed everything was fine, and we had no access to their environment.
>
> **Task:** I needed to diagnose the issue remotely with only vague symptoms to work from.
>
> **Action:** I started by asking clarifying questions to narrow down the problem space: which features, what times of day, how many users affected. I learned it was primarily their data export feature. I hypothesized several causes: their data volume, network issues, or our batch processing. I built a simple diagnostic tool they could run that would measure key timings and send results to us. The data revealed that exports worked fine until they exceeded 10,000 rows, at which point memory usage spiked.
>
> **Result:** I found we were loading all rows into memory before streaming. The fix was to implement true streaming, which I shipped within a week. Export times dropped from minutes to seconds for large datasets. The diagnostic tool I built became part of our support toolkit for similar issues. I learned that when information is limited, investing in gathering the right data is usually faster than guessing.

---

### Q5: Tell me about a time you identified a problem before it became critical.

**What they're looking for:**
- Proactive thinking
- Attention to warning signs
- Preventing problems vs. just fixing them

**Example Answer (STAR):**

> **Situation:** While reviewing our database metrics for an unrelated task, I noticed our user table's growth rate was accelerating. At current rates, we'd exceed our database capacity in about three months.
>
> **Task:** I needed to validate my concern and raise it before it became an emergency.
>
> **Action:** I built a projection model showing when we'd hit capacity under different growth scenarios. I researched solutions: database sharding, archiving old data, or upgrading hardware. I prepared a brief document outlining the problem, timeline, and options with trade-offs. I presented this to my manager and the database team, framing it as "here's something I noticed that we might want to plan for."
>
> **Result:** We implemented an archiving strategy that gave us 2 years of runway at a fraction of the cost of scaling the database. The migration happened during a planned maintenance window with zero downtime. My manager specifically called out this proactive identification in my review. I now regularly schedule "system health" reviews to catch similar trends early.

---

## Key Themes to Demonstrate

| Theme | How to Show It |
|-------|----------------|
| **Analytical Thinking** | Breaking down complex problems into components |
| **Creativity** | Finding non-obvious solutions |
| **Persistence** | Not giving up when initial approaches fail |
| **Data-Driven** | Using evidence to guide decisions |
| **Proactivity** | Finding problems before they find you |

## Problem-Solving Framework

When facing a problem, demonstrate this approach:

1. **Understand** - Clarify the problem and its impact
2. **Analyze** - Break it down and gather data
3. **Hypothesize** - Form theories about root causes
4. **Test** - Validate hypotheses with evidence
5. **Solve** - Implement and verify the solution
6. **Prevent** - Ensure it doesn't happen again

## Stories to Prepare

Have at least 2-3 stories ready that demonstrate:

- [ ] Solving a complex technical problem
- [ ] Learning quickly to address a challenge
- [ ] Improving an existing process or system
- [ ] Making decisions with incomplete information
- [ ] Identifying and preventing potential problems
