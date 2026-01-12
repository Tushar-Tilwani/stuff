Awesome—here’s a tight, interview-oriented set of **at least 5 LeetCode problems per topic**, ordered roughly from foundational → tricky within each section. I added quick cues so you know why each one matters.

---

# 1) Advanced Binary Search (Arrays)

* **33. Search in Rotated Sorted Array** — rotation + exact match.
* **34. Find First and Last Position of Element in Sorted Array** — lower/upper bound.
* **153. Find Minimum in Rotated Sorted Array** — binary search on pivot.
* **162. Find Peak Element** — binary search on gradient.
* **875. Koko Eating Bananas** — binary search on answer (feasibility check).
* **1011. Capacity To Ship Packages Within D Days** — classic “min capacity” via check.
* **410. Split Array Largest Sum** — partition + binary search on max subarray sum.
* **4. Median of Two Sorted Arrays** — partition-based binary search (hard).

---

# 2) Monotonic Stacks (Arrays)

* **739. Daily Temperatures** — next greater to the right (distance).
* **496. Next Greater Element I** — classic NGE with hash map + stack.
* **503. Next Greater Element II** — circular array twist.
* **84. Largest Rectangle in Histogram** — canonical stack pattern.
* **85. Maximal Rectangle** — build on #84 row by row (hard).
* **42. Trapping Rain Water** — two-pointer or stack (know both).
* **907. Sum of Subarray Minimums** — count-contribution with mono stack.

---

# 3) 0/1 Knapsack – Dynamic Programming (and close relatives)

* **416. Partition Equal Subset Sum** — 1D subset-sum (0/1).
* **494. Target Sum** — transform to subset-sum count.
* **1049. Last Stone Weight II** — subset-sum to balance weights.
* **474. Ones and Zeroes** — 2D knapsack (m, n limits).
* **879. Profitable Schemes** — 2D/3D knapsack variant (harder).
* **322. Coin Change** — classic min-coins DP (unbounded; still core).
* **518. Coin Change II** — order vs combination nuance (count ways).

---

# 4) Union–Find / Disjoint Set (Graphs)

* **547. Number of Provinces** — count components (UF or DFS).
* **200. Number of Islands** — can be UF (great practice) or DFS.
* **721. Accounts Merge** — union by email → collect components.
* **1319. Number of Operations to Make Network Connected** — components + spare edges.
* **990. Satisfiability of Equality Equations** — equality groups vs inequalities.
* **684. Redundant Connection** — detect first cycle edge.
* **1202. Smallest String With Swaps** — union by index; reorder within components.

---

# 5) DAG Problems (Graphs)

* **207. Course Schedule** — cycle detection / topo existence.
* **210. Course Schedule II** — return a valid topo order.
* **1136. Parallel Courses** — minimum semesters via topo levels.
* **2050. Parallel Courses III** — topo + DP on path lengths (weights).
* **1203. Sort Items by Groups Respecting Dependencies** — topo on groups and items (hard).
* **329. Longest Increasing Path in a Matrix** — DAG on cells + memo DFS.

*(If you have LeetCode Premium, also do **269. Alien Dictionary**.)*

---

# 6) Strongly Connected Components (SCC) / Directed Cycles

*(SCC per se is rarer, but these reward SCC/cycle thinking.)*

* **2360. Longest Cycle in a Graph** — detect directed cycles and lengths.
* **2127. Maximum Employees to Be Invited to a Meeting** — cycles + in-trees DP.
* **802. Find Eventual Safe States** — nodes not in/leading to cycles (reverse topo).
* **1203. Sort Items by Groups Respecting Dependencies** — mixed graph layers; cycle checks help.
* **207/210. Course Schedule I/II** — cycle detection foundations (Kahn or DFS).
* **269. Alien Dictionary (Premium)** — topo with cycle invalidation.

---

# 7) Bridges & Articulation Points (Graphs)

* **1192. Critical Connections in a Network** — Tarjan’s bridges (must-do).
* **1489. Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree** — bridge/MST insight.
* **1568. Minimum Number of Days to Disconnect Island** — articulation-point style reasoning (grid).
* **2492. Minimum Score of a Path Between Two Cities** — bridge/UF perspective helps prune.
* **310. Minimum Height Trees** — not bridges, but “trim leaves” gives cut-structure intuition.
  *(True articulation-point problems are rare on LC; #1192 is your anchor.)*

---

## How to use this

* Work straight down your earlier **priority order**:

  1. **Advanced Binary Search**, 2) **Monotonic Stacks**, 3) **0/1 Knapsack**,
  2. **Union–Find**, 5) **DAG**, 6) **SCC**, 7) **Bridges/AP**.
* Do **2–3 warm-ups** then **2 hards** per topic.
* For each problem: write the **pattern summary** in 2–3 lines and one **gotcha** you’ll check before coding (e.g., “binary search on *answer*, monotone check = can finish with capacity X?”).

If you want, I can turn this into a **2-week plan** (daily blocks with exact problems + review days) tailored to your schedule.
