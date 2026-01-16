Here is the story of the **eBay Unified Chat Platform** formatted using the **STARR** (Situation, Task, Action, Result, Reflection) method.

---

## **Situation: A Fragmented Communication Landscape**

eBay needed to integrate real-time chat across diverse business units, including eBay Live, Support, and Auctions. However, the existing infrastructure was hampered by **vendor lock-in**. Vendor SDKs tightly coupled the UI to specific backend implementations, meaning any change to the provider would require a complete rewrite of the frontend. Furthermore, eBay’s ecosystem was fragmented across multiple frameworks (React, Marko, and Native), making it impossible to deliver a consistent user experience at scale.

## **Task: Architecting for Independence and Scale**

The mission was to build a unified chat platform that allowed any eBay team to integrate chat with minimal effort. The core objectives included:

* **Decoupling:** Breaking the dependency between UI frameworks and backend vendors.
* **Extensibility:** Supporting long-term growth and independent experimentation. Can we test UI without changing backend or change backend without changing UI.
* **Performance:** Achieving low-latency experiences (P50 RTT < 200ms) across all devices.
* **Framework Agnostic:** Creating a solution that worked seamlessly for Web (React/Marko) and Mobile (Native) teams.

## **Action: Implementing the "Integration Boundary"**

I led the design and implementation of an architecture centered on the principle: **"Own the integration boundary."** Key actions included:

* **Developed the Chat Adapter Contract:** Created a stable, transport-agnostic API (`listMessages`, `sendMessage`, `subscribe`). This acted as a buffer, ensuring the UI never communicated directly with the vendor.
* **Chat Service:** Normalized data and integrated eBay-specific context (catalog/pricing) via a Context Orchestrator.
* **Vendor Layer:** Restricted the vendor (Stream) to simple message delivery and fan-out.


* **Enabled Multi-Framework Support:** Separated the "Chat Core" (contracts and adaptor) from the renderers, allowing React, Marko, and Native teams to share the same underlying logic.
* **Optimized Performance:** Implemented optimistic UI updates and incremental loading to ensure a perceived round-trip time of under 800ms.

## **Result: Organizational Velocity and Flexibility**

The launch of the Unified Chat Platform transformed how eBay handles real-time communication:

* **Rapid Integration:** Teams can now integrate chat through a single, consistent contract rather than learning complex vendor SDKs.
* **Independent Experimentation:** The UI team can test new designs while the backend team tests new providers simultaneously without coordination bottlenecks.
* **Vendor Portability:** Because eBay owns the Gateway and Adapter, the company can migrate from one vendor to another (or move in-house) with zero changes to the frontend code.
* **Consistency:** Shared quality and performance guarantees are now standard across eBay Live, Support, and Transactions.

## **Reflection: Prioritizing Long-Term Scalability**

This project reinforced the value of **abstracting third-party dependencies.** While building a custom adapter and gateway required more initial effort than using a "plug-and-play" vendor SDK, the trade-off was worth it. By investing in an internal platform, we traded short-term setup time for long-term organizational velocity, ensuring that eBay’s infrastructure remains resilient to market changes and vendor shifts.

