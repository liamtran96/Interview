---
sidebar_position: 7
---

# Communication Patterns

## Q1: What are the main communication patterns between micro frontends?

### Answer:
Micro frontends communicate through custom events, shared state, callbacks/props, postMessage API, or backend integration. Choose based on coupling tolerance: custom events provide loose coupling, shared state enables tight integration, and backend coordination offers complete independence with API as contract.

Most applications use multiple patterns: custom events for notifications, shared state for critical global data (user, cart), and backend APIs for data synchronization.

### Code Example:

```javascript
// Pattern 1: Custom Events (loose coupling)
// Publishing micro frontend
const event = new CustomEvent('product-added', {
  detail: { productId: '123', name: 'Widget', price: 29.99 },
  bubbles: true,
  composed: true  // Crosses shadow DOM if using web components
});
document.dispatchEvent(event);

// Subscribing micro frontend
document.addEventListener('product-added', (event) => {
  const { productId, name, price } = event.detail;
  addToCart(productId, name, price);
});

// Pattern 2: Shared Event Bus
class EventBus {
  constructor() {
    this.subscribers = {};
  }

  subscribe(event, callback) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(callback);

    return () => {
      this.subscribers[event] = this.subscribers[event].filter(cb => cb !== callback);
    };
  }

  publish(event, data) {
    if (this.subscribers[event]) {
      this.subscribers[event].forEach(callback => callback(data));
    }
  }
}

export const eventBus = new EventBus();

// Usage
eventBus.publish('cart:updated', { itemCount: 5 });
eventBus.subscribe('cart:updated', ({ itemCount }) => {
  updateBadge(itemCount);
});

// Pattern 3: Props/Callbacks (tight coupling, use sparingly)
// Shell passes callbacks to micro frontend
function Shell() {
  const handleProductAdded = (product) => {
    updateCart(product);
  };

  return <ProductCatalog onProductAdded={handleProductAdded} />;
}

// Pattern 4: Backend as coordination point (loose coupling)
// Product catalog updates backend
async function addToCart(productId) {
  await fetch('/api/cart/items', {
    method: 'POST',
    body: JSON.stringify({ productId })
  });
  // Emit event for immediate UI update
  eventBus.publish('cart:updated', { productId });
}

// Shopping cart syncs with backend
function ShoppingCart() {
  useEffect(() => {
    // Poll or use WebSocket for cart updates
    const unsubscribe = eventBus.subscribe('cart:updated', () => {
      fetchLatestCart();
    });
    return unsubscribe;
  }, []);
}
```

### Key Points:
- Custom events for loose coupling
- Event bus for structured communication
- Props/callbacks for tight integration (use sparingly)
- Backend APIs for data synchronization
- WebSockets for real-time updates
- Always clean up event listeners

### Common Pitfalls:
- Over-coupling with props/callbacks
- Memory leaks from not unsubscribing
- No error handling for failed communication
- Tight coupling through shared state
- Not documenting communication contracts

### Interview Tips:
- Discuss loose vs tight coupling trade-offs
- Explain event-driven architecture benefits
- Mention memory leak prevention
- Show awareness of testing communication
- Discuss documenting contracts

### Further Reading:
- [Custom Events API](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent)
- [Micro Frontend Communication](https://martinfowler.com/articles/micro-frontends.html#Cross-applicationCommunication)
