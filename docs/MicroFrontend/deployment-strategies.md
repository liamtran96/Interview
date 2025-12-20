---
sidebar_position: 6
---

# Deployment Strategies

## Q1: How do you deploy micro frontends independently?

### Answer:
Independent deployment is a core micro frontend benefit, allowing teams to release features without coordinating with other teams. Each micro frontend has its own CI/CD pipeline, version control, and deployment schedule. The shell application dynamically loads the latest version of each micro frontend from CDN or static hosting.

Key requirements: versioned artifacts, immutable deployments, health checks, rollback capability, and monitoring per micro frontend.

### Code Example:

```javascript
// Deployment configuration
// Each micro frontend deployed independently to CDN
const MFE_URLS = {
  productCatalog: 'https://cdn.example.com/product-catalog/v1.2.3/remoteEntry.js',
  shoppingCart: 'https://cdn.example.com/shopping-cart/v2.1.0/remoteEntry.js',
  checkout: 'https://cdn.example.com/checkout/v1.5.2/remoteEntry.js'
};

// CI/CD Pipeline (GitHub Actions)
// .github/workflows/deploy.yml
name: Deploy Product Catalog

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build
        run: npm run build
      - name: Version
        run: echo "VERSION=$(npm version patch)" >> $GITHUB_ENV
      - name: Deploy to CDN
        run: |
          aws s3 sync dist/ s3://mfe-bucket/product-catalog/$VERSION/
          aws s3 cp dist/remoteEntry.js s3://mfe-bucket/product-catalog/latest/
      - name: Update version manifest
        run: |
          echo '{"version":"$VERSION","timestamp":"$(date -u +%Y-%m-%dT%H:%M:%SZ)"}' > version.json
          aws s3 cp version.json s3://mfe-bucket/product-catalog/latest/

// Dynamic version loading with fallback
async function loadMicroFrontend(name) {
  try {
    // Try latest version
    const latestUrl = `https://cdn.example.com/${name}/latest/remoteEntry.js`;
    await loadRemote(latestUrl, name, './App');
  } catch (error) {
    console.error(`Failed to load latest ${name}, trying fallback`);
    // Fallback to known good version
    const fallbackUrl = `https://cdn.example.com/${name}/v1.0.0/remoteEntry.js`;
    await loadRemote(fallbackUrl, name, './App');
  }
}

// Canary deployment (gradual rollout)
async function loadCanaryMicroFrontend(name, userId) {
  const canaryPercentage = 10; // 10% of users
  const isCanaryUser = (userId % 100) < canaryPercentage;

  const version = isCanaryUser ? 'canary' : 'stable';
  const url = `https://cdn.example.com/${name}/${version}/remoteEntry.js`;

  return loadRemote(url, name, './App');
}
```

### Key Points:
- Each micro frontend has own CI/CD pipeline
- Version artifacts immutably (never overwrite)
- Use CDN for fast global distribution
- Implement health checks and monitoring
- Support rollback to previous versions
- Canary deployments for gradual rollout

### Common Pitfalls:
- Overwriting deployments (not immutable)
- No rollback strategy
- Missing health checks
- Not monitoring per micro frontend
- Coordinated deployments (defeats purpose)

### Interview Tips:
- Explain immutable deployment benefits
- Discuss versioning strategies
- Mention canary and blue-green deployments
- Show awareness of CDN benefits
- Discuss monitoring and rollback

### Further Reading:
- [Continuous Deployment Strategies](https://martinfowler.com/bliki/CanaryRelease.html)
- [Module Federation Deployment](https://webpack.js.org/concepts/module-federation/#deployment)
