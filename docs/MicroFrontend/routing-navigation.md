---
sidebar_position: 4
---

# Routing & Navigation

## Q1: How do you implement routing in micro frontend architecture?

### Answer:
Micro frontend routing can be implemented at the shell level (shell controls all routing), app level (each micro frontend has its own router), or hybrid (shell handles top-level routes, micro frontends handle internal routes). The choice depends on independence requirements, URL structure needs, and integration complexity tolerance.

Shell-based routing is simpler but couples micro frontends to the shell. App-level routing provides maximum independence but requires coordination for URL conflicts. Most production systems use hybrid routing for balance between control and autonomy.

### Routing Strategies:

```javascript
// Strategy 1: Shell-based routing (centralized)
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductCatalog from 'productCatalog/App';
import ShoppingCart from 'shoppingCart/App';

function Shell() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/products/*" element={<ProductCatalog />} />
        <Route path="/cart/*" element={<ShoppingCart />} />
        <Route path="/checkout/*" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

// Strategy 2: App-level routing (decentralized)
// Shell just mounts micro frontends
function Shell() {
  return (
    <div>
      <div id="product-catalog-root"></div>
      <div id="cart-root"></div>
    </div>
  );
}

// Each micro frontend manages own routing
// product-catalog/index.js
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  { path: '/products', element: <ProductList /> },
  { path: '/products/:id', element: <ProductDetail /> }
]);

ReactDOM.createRoot(document.getElementById('product-catalog-root'))
  .render(<RouterProvider router={router} />);

// Strategy 3: Hybrid routing (best of both)
// Shell handles top-level routes
function Shell() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/products/*" element={
          <ProductCatalog basePath="/products" />
        } />
      </Routes>
    </BrowserRouter>
  );
}

// Micro frontend handles internal routes
function ProductCatalog({ basePath }) {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/:id" element={<ProductDetail />} />
      <Route path="/categories/:category" element={<CategoryView />} />
    </Routes>
  );
}
```

### Key Points:
- Shell-based: simpler, less independent deployments
- App-level: maximum independence, coordination needed
- Hybrid: balance between control and autonomy
- Use path prefixes to avoid conflicts
- Synchronize URL state across micro frontends

### Common Pitfalls:
- URL conflicts between micro frontends
- Not handling deep linking properly
- Multiple router instances conflicting
- Not synchronizing browser history
- Breaking back button functionality

### Interview Tips:
- Discuss trade-offs of each approach
- Mention URL conflict prevention
- Explain deep linking requirements
- Show awareness of browser history API
- Compare centralized vs decentralized control

### Further Reading:
- [React Router Documentation](https://reactrouter.com/)
- [Single-SPA Routing](https://single-spa.js.org/docs/recommended-setup#routing)

---

## Q2: How do you handle navigation between micro frontends?

### Answer:
Navigation between micro frontends requires coordinating route changes, updating active micro frontend, and managing browser history. Use custom events, shared navigation service, or framework-specific solutions. The key is maintaining single source of truth for current route while allowing each micro frontend to trigger navigation.

### Implementation:

```javascript
// Shared navigation service
class NavigationService {
  constructor() {
    this.listeners = [];
  }

  // Navigate to new route
  navigate(path) {
    window.history.pushState({}, '', path);
    this.notifyListeners(path);
  }

  // Listen for navigation changes
  onNavigate(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  notifyListeners(path) {
    this.listeners.forEach(listener => listener(path));
  }

  // Handle browser back/forward
  init() {
    window.addEventListener('popstate', () => {
      this.notifyListeners(window.location.pathname);
    });
  }
}

export const navigationService = new NavigationService();
navigationService.init();

// Usage in micro frontend
import { navigationService } from '@shared/navigation';

function ProductDetail({ productId }) {
  const handleAddToCart = () => {
    // Add product to cart
    addToCart(productId);

    // Navigate to cart
    navigationService.navigate('/cart');
  };

  return (
    <button onClick={handleAddToCart}>Add to Cart & View</button>
  );
}

// Shell listens to navigation
function Shell() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const unsubscribe = navigationService.onNavigate(setCurrentPath);
    return unsubscribe;
  }, []);

  return (
    <div>
      {currentPath.startsWith('/products') && <ProductCatalog />}
      {currentPath.startsWith('/cart') && <ShoppingCart />}
    </div>
  );
}
```

### Key Points:
- Use shared navigation service for coordination
- Maintain single source of truth for route
- Handle browser back/forward buttons
- Support deep linking
- Notify all micro frontends of route changes

### Common Pitfalls:
- Not handling popstate events
- Multiple navigation services conflicting
- Breaking browser back button
- Not cleaning up event listeners
- Memory leaks from subscriptions

### Interview Tips:
- Explain custom event vs shared service
- Discuss browser history API
- Mention memory leak prevention
- Show awareness of deep linking
- Discuss testing navigation flows

### Further Reading:
- [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)
- [Single-SPA Navigation](https://single-spa.js.org/docs/api#navigatetourl)
