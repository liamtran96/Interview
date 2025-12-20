---
sidebar_position: 5
---

# State Management

## Q1: How do you manage state across micro frontends?

### Answer:
State management in micro frontends ranges from fully isolated (each owns its state) to shared (common state store). Strategies include event-driven communication, shared store (Redux/Zustand), custom events, or dedicated state synchronization service. The goal is minimizing coupling while enabling necessary data sharing.

Most applications use hybrid: isolated local state with selective sharing of critical global state (user info, cart, notifications).

### Code Example:

```javascript
// Strategy 1: Isolated state (preferred when possible)
// product-catalog micro frontend
function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  // State stays within this micro frontend
}

// Strategy 2: Shared event bus
class EventBus {
  constructor() {
    this.events = {};
  }

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);

    return () => {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    };
  }
}

export const eventBus = new EventBus();

// Usage
// In product-catalog
eventBus.emit('PRODUCT_ADDED_TO_CART', { productId, quantity });

// In shopping-cart
eventBus.on('PRODUCT_ADDED_TO_CART', ({ productId, quantity }) => {
  updateCart(productId, quantity);
});

// Strategy 3: Shared Zustand store
import create from 'zustand';

// Shared store accessible by all micro frontends
export const useGlobalStore = create((set) => ({
  user: null,
  cartItemCount: 0,
  setUser: (user) => set({ user }),
  updateCartCount: (count) => set({ cartItemCount: count })
}));

// Usage in any micro frontend
function CartBadge() {
  const cartItemCount = useGlobalStore(state => state.cartItemCount);
  return <span>{cartItemCount}</span>;
}
```

### Key Points:
- Prefer isolated state when possible
- Share only essential global state (user, cart)
- Use event bus for loosely coupled communication
- Shared store creates tight coupling
- Document shared state contracts clearly

### Common Pitfalls:
- Over-sharing state (tight coupling)
- Not cleaning up event listeners (memory leaks)
- State synchronization race conditions
- Multiple sources of truth
- Breaking encapsulation

### Interview Tips:
- Discuss isolation vs sharing trade-offs
- Mention event-driven architecture benefits
- Show awareness of coupling implications
- Explain when to use shared store
- Discuss testing isolated vs shared state

### Further Reading:
- [Micro Frontend State Management](https://martinfowler.com/articles/micro-frontends.html#Cross-applicationCommunication)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
