# SAPUI5 Complete Learning Guide: Basic to Advanced (TypeScript Edition)

A comprehensive guide covering all SAPUI5 concepts from fundamentals to advanced topics using TypeScript.

---

## Table of Contents

1. [Introduction to SAPUI5](#1-introduction-to-sapui5)
2. [TypeScript Setup](#2-typescript-setup)
3. [Architecture Overview](#3-architecture-overview)
4. [MVC Pattern](#4-mvc-pattern)
5. [Project Structure](#5-project-structure)
6. [Views](#6-views)
7. [Controllers](#7-controllers)
8. [Models](#8-models)
9. [Data Binding](#9-data-binding)
10. [Controls Library](#10-controls-library)
11. [manifest.json (App Descriptor)](#11-manifestjson-app-descriptor)
12. [Routing and Navigation](#12-routing-and-navigation)
13. [Fragments](#13-fragments)
14. [Internationalization (i18n)](#14-internationalization-i18n)
15. [Custom Controls](#15-custom-controls)
16. [OData Integration](#16-odata-integration)
17. [Expression Binding and Formatters](#17-expression-binding-and-formatters)
18. [Testing](#18-testing)
19. [Performance Optimization](#19-performance-optimization)
20. [SAP Fiori Elements](#20-sap-fiori-elements)
21. [Smart Controls](#21-smart-controls)
22. [Security Best Practices](#22-security-best-practices)
23. [Debugging and Troubleshooting](#23-debugging-and-troubleshooting)
24. [Deployment](#24-deployment)
25. [Resources and References](#25-resources-and-references)

---

## 1. Introduction to SAPUI5

### What is SAPUI5?

SAPUI5 (SAP UI Development Toolkit for HTML5) is SAP's enterprise-grade JavaScript/TypeScript framework for building responsive web applications. It provides a rich set of UI controls, data binding capabilities, and follows enterprise design guidelines.

### Key Characteristics

| Feature | Description |
|---------|-------------|
| **Enterprise-Ready** | Built for business applications with comprehensive features |
| **Responsive Design** | Runs on desktop, tablet, and mobile devices |
| **MVC Architecture** | Clear separation of concerns |
| **Rich Control Library** | 500+ pre-built UI controls |
| **OData Support** | Native integration with SAP backends |
| **TypeScript Support** | Full TypeScript support since UI5 1.116+ |
| **Theming** | Multiple SAP themes (Horizon, Quartz, Belize) |
| **i18n Support** | Built-in internationalization |

### Why TypeScript for SAPUI5?

| Benefit | Description |
|---------|-------------|
| **Type Safety** | Catch errors at compile time |
| **IntelliSense** | Better IDE support and autocompletion |
| **Refactoring** | Safe and easy code refactoring |
| **Documentation** | Types serve as documentation |
| **Modern Syntax** | Use latest ECMAScript features |

### SAPUI5 vs OpenUI5

| Aspect | SAPUI5 | OpenUI5 |
|--------|--------|---------|
| **License** | SAP proprietary | Apache 2.0 (Open Source) |
| **Controls** | Full library including smart controls | Core controls only |
| **Charting** | VizFrame charts included | Not included |
| **Support** | SAP support available | Community support |

---

## 2. TypeScript Setup

### Project Initialization

```bash
# Create new UI5 TypeScript project using Easy-UI5 generator
npm install -g yo generator-easy-ui5
yo easy-ui5 ts-app

# Or use UI5 CLI
npm install -g @ui5/cli
ui5 init
```

### Required Dependencies

**package.json:**
```json
{
  "name": "myapp",
  "version": "1.0.0",
  "scripts": {
    "build": "ui5 build --clean-dest",
    "build:ts": "tsc && ui5 build --clean-dest",
    "start": "ui5 serve --open index.html",
    "lint": "eslint src --ext .ts",
    "test": "karma start"
  },
  "devDependencies": {
    "@types/openui5": "^1.120.0",
    "@ui5/cli": "^3.8.0",
    "typescript": "^5.3.0",
    "@typescript-eslint/parser": "^6.0.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "ui5-tooling-transpile": "^3.0.0"
  }
}
```

### TypeScript Configuration

**tsconfig.json:**
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "Node",
    "strict": true,
    "strictNullChecks": true,
    "strictPropertyInitialization": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "rootDir": "./src",
    "outDir": "./webapp",
    "baseUrl": "./",
    "paths": {
      "myapp/*": ["./src/*"]
    },
    "types": ["@types/openui5", "@types/qunit"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "webapp"]
}
```

### UI5 Tooling Configuration

**ui5.yaml:**
```yaml
specVersion: "3.0"
type: application
metadata:
  name: myapp
framework:
  name: SAPUI5
  version: "1.120.0"
  libraries:
    - name: sap.m
    - name: sap.ui.core
    - name: sap.ui.layout
    - name: sap.f

builder:
  customTasks:
    - name: ui5-tooling-transpile-task
      afterTask: replaceVersion
      configuration:
        debug: true

server:
  customMiddleware:
    - name: ui5-tooling-transpile-middleware
      afterMiddleware: compression
      configuration:
        debug: true
```

### Global Type Definitions

**src/types/global.d.ts:**
```typescript
// Extend global namespace for custom types
declare namespace myapp {
  interface Product {
    ProductID: string;
    Name: string;
    Description: string;
    Price: number;
    Currency: string;
    Category: string;
    InStock: boolean;
  }

  interface AppSettings {
    busy: boolean;
    delay: number;
    currency: string;
  }

  interface ViewModel {
    busy: boolean;
    hasUIChanges: boolean;
    editMode: boolean;
  }
}
```

---

## 3. Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    SAPUI5 Application                        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │    Views    │  │ Controllers │  │       Models        │  │
│  │   (XML)     │  │    (.ts)    │  │ (JSON/OData/XML)    │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                    SAPUI5 Core Framework                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────────┐   │
│  │ Controls │ │  Routing │ │  Binding │ │ Event Handler │   │
│  └──────────┘ └──────────┘ └──────────┘ └───────────────┘   │
├─────────────────────────────────────────────────────────────┤
│               TypeScript Compiler (tsc)                      │
├─────────────────────────────────────────────────────────────┤
│                    Browser (HTML5/CSS3/JS)                   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend Services                          │
│           (OData, REST APIs, SAP Gateway)                    │
└─────────────────────────────────────────────────────────────┘
```

### Core Libraries

| Library | Purpose |
|---------|---------|
| `sap.ui.core` | Core functionality, base classes |
| `sap.m` | Mobile-first responsive controls |
| `sap.ui.layout` | Layout controls (Grid, Splitter, etc.) |
| `sap.ui.table` | Desktop-optimized table controls |
| `sap.ui.unified` | Unified controls (Calendar, FileUploader) |
| `sap.f` | SAP Fiori specific controls |
| `sap.uxap` | Object Page layouts |

### Module System with TypeScript

SAPUI5 uses AMD modules. With TypeScript, use ES6 imports that transpile to AMD:

```typescript
import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";
import JSONModel from "sap/ui/model/json/JSONModel";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";

/**
 * @namespace myapp.controller
 */
export default class Main extends Controller {
  // Controller implementation
}
```

---

## 4. MVC Pattern

### Overview

The Model-View-Controller (MVC) pattern separates an application into three interconnected components:

```
┌─────────────────────────────────────────────────────────────┐
│                         USER                                 │
└─────────────────────────────────────────────────────────────┘
                    │                    ▲
                    │ User Action        │ UI Update
                    ▼                    │
┌─────────────────────────────────────────────────────────────┐
│                         VIEW                                 │
│              (Renders UI, displays data)                     │
└─────────────────────────────────────────────────────────────┘
                    │                    ▲
                    │ Event              │ Data
                    ▼                    │
┌─────────────────────────────────────────────────────────────┐
│                      CONTROLLER                              │
│         (Handles logic, processes user input)                │
└─────────────────────────────────────────────────────────────┘
                    │                    ▲
                    │ Request            │ Data
                    ▼                    │
┌─────────────────────────────────────────────────────────────┐
│                         MODEL                                │
│              (Manages data, business logic)                  │
└─────────────────────────────────────────────────────────────┘
```

### Model (TypeScript)

```typescript
import JSONModel from "sap/ui/model/json/JSONModel";
import BindingMode from "sap/ui/model/BindingMode";

interface ProductData {
  products: myapp.Product[];
  selectedProduct: myapp.Product | null;
  settings: {
    currency: string;
    showDetails: boolean;
  };
}

// Create typed JSON Model
const oData: ProductData = {
  products: [
    { ProductID: "1", Name: "Laptop", Description: "Business laptop", Price: 999.99, Currency: "USD", Category: "Electronics", InStock: true },
    { ProductID: "2", Name: "Phone", Description: "Smartphone", Price: 699.99, Currency: "USD", Category: "Electronics", InStock: true }
  ],
  selectedProduct: null,
  settings: {
    currency: "USD",
    showDetails: true
  }
};

const oModel = new JSONModel(oData);
oModel.setDefaultBindingMode(BindingMode.TwoWay);

// Type-safe property access
const products = oModel.getProperty("/products") as myapp.Product[];
oModel.setProperty("/selectedProduct", products[0]);
```

### View (XML)

```xml
<mvc:View
    controllerName="myapp.controller.Main"
    xmlns:mvc="sap.ui.core.mvc"
    xmlns="sap.m">

    <Page title="Products">
        <content>
            <List items="{/products}">
                <StandardListItem
                    title="{Name}"
                    description="{Description}"
                    info="{Price}"
                    type="Navigation"
                    press=".onItemPress" />
            </List>
        </content>
    </Page>
</mvc:View>
```

### Controller (TypeScript)

```typescript
import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";
import Event from "sap/ui/base/Event";
import ListItemBase from "sap/m/ListItemBase";
import Context from "sap/ui/model/Context";

/**
 * @namespace myapp.controller
 */
export default class Main extends Controller {

  public onInit(): void {
    // Initialization logic
  }

  public onItemPress(oEvent: Event): void {
    const oItem = oEvent.getSource() as ListItemBase;
    const oContext = oItem.getBindingContext() as Context;
    const sPath = oContext.getPath();
    MessageToast.show(`Selected: ${sPath}`);
  }
}
```

---

## 5. Project Structure

### Complete TypeScript Project Layout

```
my-sapui5-app/
├── src/
│   ├── controller/
│   │   ├── App.controller.ts
│   │   ├── BaseController.ts
│   │   ├── Main.controller.ts
│   │   └── Detail.controller.ts
│   ├── view/
│   │   ├── App.view.xml
│   │   ├── Main.view.xml
│   │   ├── Detail.view.xml
│   │   └── fragments/
│   │       ├── Dialog.fragment.xml
│   │       └── ProductCard.fragment.xml
│   ├── model/
│   │   ├── models.ts
│   │   ├── formatter.ts
│   │   └── types.ts
│   ├── service/
│   │   └── ProductService.ts
│   ├── types/
│   │   └── global.d.ts
│   ├── i18n/
│   │   ├── i18n.properties
│   │   ├── i18n_en.properties
│   │   └── i18n_de.properties
│   ├── css/
│   │   └── style.css
│   ├── Component.ts
│   ├── manifest.json
│   └── index.html
├── test/
│   ├── unit/
│   └── integration/
├── tsconfig.json
├── ui5.yaml
├── package.json
└── README.md
```

### Component.ts

```typescript
import UIComponent from "sap/ui/core/UIComponent";
import Device from "sap/ui/Device";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace myapp
 */
export default class Component extends UIComponent {

  public static metadata = {
    manifest: "json",
    interfaces: ["sap.ui.core.IAsyncContentCreation"]
  };

  public init(): void {
    // Call parent init
    super.init();

    // Create and set device model
    const oDeviceModel = new JSONModel(Device);
    oDeviceModel.setDefaultBindingMode("OneWay");
    this.setModel(oDeviceModel, "device");

    // Initialize router
    this.getRouter().initialize();
  }

  public destroy(): void {
    super.destroy();
  }

  public getContentDensityClass(): string {
    if (!Device.support.touch) {
      return "sapUiSizeCompact";
    }
    return "sapUiSizeCozy";
  }
}
```

### index.html

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My SAPUI5 TypeScript App</title>

    <script
        id="sap-ui-bootstrap"
        src="https://ui5.sap.com/resources/sap-ui-core.js"
        data-sap-ui-theme="sap_horizon"
        data-sap-ui-async="true"
        data-sap-ui-compatVersion="edge"
        data-sap-ui-resourceroots='{"myapp": "./"}'
        data-sap-ui-oninit="module:sap/ui/core/ComponentSupport">
    </script>
</head>
<body class="sapUiBody">
    <div data-sap-ui-component
         data-name="myapp"
         data-id="container"
         data-settings='{"id": "myapp"}'
         data-handle-validation="true">
    </div>
</body>
</html>
```

---

## 6. Views

### View Types

| Type | Extension | Recommendation |
|------|-----------|----------------|
| **XML** | `.view.xml` | Recommended for declarative UI |
| **TypeScript** | `.view.ts` | Dynamic UI generation |

### XML Views (Recommended)

```xml
<mvc:View
    controllerName="myapp.controller.Main"
    xmlns:mvc="sap.ui.core.mvc"
    xmlns="sap.m"
    xmlns:core="sap.ui.core"
    xmlns:l="sap.ui.layout">

    <Page id="mainPage" title="{i18n>title}">
        <headerContent>
            <Button icon="sap-icon://action" press=".onAction" />
        </headerContent>

        <content>
            <l:VerticalLayout class="sapUiContentPadding" width="100%">
                <Input id="nameInput"
                       placeholder="{i18n>enterName}"
                       value="{/userName}"
                       liveChange=".onNameChange" />

                <Button text="{i18n>submit}"
                        type="Emphasized"
                        press=".onSubmit" />

                <List id="productList"
                      items="{/products}"
                      mode="SingleSelectMaster"
                      selectionChange=".onSelectionChange">
                    <StandardListItem
                        title="{Name}"
                        description="{Description}"
                        info="{Price} {Currency}"
                        type="Navigation"
                        press=".onItemPress" />
                </List>
            </l:VerticalLayout>
        </content>

        <footer>
            <Bar>
                <contentRight>
                    <Button text="{i18n>save}" type="Emphasized" press=".onSave" />
                </contentRight>
            </Bar>
        </footer>
    </Page>
</mvc:View>
```

---

## 7. Controllers

### BaseController.ts

Create a reusable base controller:

```typescript
import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import Router from "sap/ui/core/routing/Router";
import History from "sap/ui/core/routing/History";
import Model from "sap/ui/model/Model";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import View from "sap/ui/core/mvc/View";

/**
 * @namespace myapp.controller
 */
export default class BaseController extends Controller {

  /**
   * Get the owner component
   */
  public getOwnerComponent(): UIComponent {
    return super.getOwnerComponent() as UIComponent;
  }

  /**
   * Get the router instance
   */
  public getRouter(): Router {
    return this.getOwnerComponent().getRouter();
  }

  /**
   * Get model by name
   */
  public getModel<T extends Model = Model>(sName?: string): T {
    return this.getView()?.getModel(sName) as T;
  }

  /**
   * Set model to view
   */
  public setModel(oModel: Model, sName?: string): View {
    return this.getView()!.setModel(oModel, sName);
  }

  /**
   * Get resource bundle
   */
  public getResourceBundle(): ResourceBundle {
    const oModel = this.getModel<ResourceModel>("i18n");
    return oModel.getResourceBundle() as ResourceBundle;
  }

  /**
   * Get translated text
   */
  public getText(sKey: string, aArgs?: string[]): string {
    return this.getResourceBundle().getText(sKey, aArgs) || sKey;
  }

  /**
   * Navigate to route
   */
  public navTo(sRouteName: string, oParameters?: object, bReplace?: boolean): void {
    this.getRouter().navTo(sRouteName, oParameters, bReplace);
  }

  /**
   * Navigate back
   */
  public onNavBack(): void {
    const sPreviousHash = History.getInstance().getPreviousHash();

    if (sPreviousHash !== undefined) {
      window.history.go(-1);
    } else {
      this.navTo("main", {}, true);
    }
  }
}
```

### Main.controller.ts

```typescript
import BaseController from "./BaseController";
import JSONModel from "sap/ui/model/json/JSONModel";
import Event from "sap/ui/base/Event";
import MessageToast from "sap/m/MessageToast";
import MessageBox from "sap/m/MessageBox";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import ListItemBase from "sap/m/ListItemBase";
import List from "sap/m/List";
import Input from "sap/m/Input";
import Context from "sap/ui/model/Context";
import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";

interface ViewModelData {
  busy: boolean;
  delay: number;
  currency: string;
  itemCount: number;
}

/**
 * @namespace myapp.controller
 */
export default class Main extends BaseController {

  private _oViewModel!: JSONModel;

  /* =========================================================== */
  /* Lifecycle Methods                                           */
  /* =========================================================== */

  public onInit(): void {
    // Initialize view model
    this._oViewModel = new JSONModel({
      busy: false,
      delay: 0,
      currency: "USD",
      itemCount: 0
    } as ViewModelData);
    this.setModel(this._oViewModel, "view");

    // Attach route handlers
    this.getRouter()
      .getRoute("main")
      ?.attachPatternMatched(this._onRouteMatched, this);
  }

  public onBeforeRendering(): void {
    // Pre-render logic
  }

  public onAfterRendering(): void {
    // Post-render logic - DOM is available
  }

  public onExit(): void {
    // Cleanup resources
  }

  /* =========================================================== */
  /* Event Handlers                                              */
  /* =========================================================== */

  public onItemPress(oEvent: Event): void {
    const oItem = oEvent.getSource() as ListItemBase;
    const oContext = oItem.getBindingContext() as Context;
    const sProductId = oContext.getProperty("ProductID") as string;

    this.navTo("detail", { productId: sProductId });
  }

  public onSearch(oEvent: Event): void {
    const sQuery = (oEvent.getParameter("query") as string) || "";
    const oList = this.byId("productList") as List;
    const oBinding = oList.getBinding("items");

    const aFilters: Filter[] = [];
    if (sQuery) {
      aFilters.push(
        new Filter({
          filters: [
            new Filter("Name", FilterOperator.Contains, sQuery),
            new Filter("Description", FilterOperator.Contains, sQuery)
          ],
          and: false
        })
      );
    }

    oBinding?.filter(aFilters);
  }

  public onNameChange(oEvent: Event): void {
    const oInput = oEvent.getSource() as Input;
    const sValue = oInput.getValue();

    if (sValue.length < 3) {
      oInput.setValueState("Error");
      oInput.setValueStateText(this.getText("minLengthError", ["3"]));
    } else {
      oInput.setValueState("None");
      oInput.setValueStateText("");
    }
  }

  public onDelete(oEvent: Event): void {
    const oItem = oEvent.getSource() as ListItemBase;
    const oContext = oItem.getBindingContext() as Context;
    const sName = oContext.getProperty("Name") as string;

    MessageBox.confirm(this.getText("confirmDelete", [sName]), {
      title: this.getText("delete"),
      onClose: (oAction: string) => {
        if (oAction === MessageBox.Action.OK) {
          this._performDelete(oContext.getPath());
        }
      }
    });
  }

  /* =========================================================== */
  /* Private Methods                                             */
  /* =========================================================== */

  private _onRouteMatched(oEvent: Route$PatternMatchedEvent): void {
    this._loadData();
  }

  private _loadData(): void {
    this._setViewBusy(true);
    // Load data logic
    setTimeout(() => {
      this._setViewBusy(false);
    }, 500);
  }

  private _setViewBusy(bBusy: boolean): void {
    this._oViewModel.setProperty("/busy", bBusy);
  }

  private _performDelete(sPath: string): void {
    // Delete logic
    MessageToast.show(this.getText("deleteSuccess"));
  }
}
```

### Controller Lifecycle

| Method | When Called | Frequency | Use Case |
|--------|-------------|-----------|----------|
| `onInit()` | View instantiation | Once | Setup models, attach events |
| `onBeforeRendering()` | Before render | Each render | Pre-render preparations |
| `onAfterRendering()` | After render | Each render | DOM access |
| `onExit()` | View destruction | Once | Cleanup, detach events |

---

## 8. Models

### Model Types Overview

| Type | Class | Use Case |
|------|-------|----------|
| **JSON** | `sap.ui.model.json.JSONModel` | Client-side, small datasets |
| **OData V2** | `sap.ui.model.odata.v2.ODataModel` | SAP backends |
| **OData V4** | `sap.ui.model.odata.v4.ODataModel` | Modern OData |
| **Resource** | `sap.ui.model.resource.ResourceModel` | i18n texts |

### models.ts - Model Factory

```typescript
import JSONModel from "sap/ui/model/json/JSONModel";
import BindingMode from "sap/ui/model/BindingMode";
import Device from "sap/ui/Device";

export interface DeviceModel {
  support: typeof Device.support;
  system: typeof Device.system;
}

export interface AppStateModel {
  busy: boolean;
  delay: number;
  layout: string;
}

/**
 * Create device model
 */
export function createDeviceModel(): JSONModel {
  const oModel = new JSONModel(Device);
  oModel.setDefaultBindingMode(BindingMode.OneWay);
  return oModel;
}

/**
 * Create application state model
 */
export function createAppStateModel(): JSONModel {
  const oData: AppStateModel = {
    busy: false,
    delay: 0,
    layout: "OneColumn"
  };

  const oModel = new JSONModel(oData);
  oModel.setDefaultBindingMode(BindingMode.TwoWay);
  return oModel;
}

/**
 * Create product model with sample data
 */
export function createProductModel(): JSONModel {
  const oData = {
    products: [] as myapp.Product[],
    selectedProduct: null as myapp.Product | null,
    filters: {
      search: "",
      category: ""
    }
  };

  const oModel = new JSONModel(oData);
  oModel.setSizeLimit(1000);
  return oModel;
}
```

### Typed JSON Model Usage

```typescript
import JSONModel from "sap/ui/model/json/JSONModel";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "guest";
  preferences: {
    theme: string;
    language: string;
    notifications: boolean;
  };
}

// Create typed model
const userData: UserData = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  role: "admin",
  preferences: {
    theme: "sap_horizon",
    language: "en",
    notifications: true
  }
};

const oUserModel = new JSONModel(userData);

// Type-safe access
const sName = oUserModel.getProperty("/name") as string;
const sRole = oUserModel.getProperty("/role") as UserData["role"];
const bNotifications = oUserModel.getProperty("/preferences/notifications") as boolean;

// Type-safe update
oUserModel.setProperty("/preferences/theme", "sap_horizon_dark");
```

---

## 9. Data Binding

### Binding Types

| Type | Description | Example |
|------|-------------|---------|
| **Property** | Bind single property | `text="{/name}"` |
| **Aggregation** | Bind collections | `items="{/products}"` |
| **Element** | Bind context | `binding="{/product}"` |
| **Expression** | Inline expressions | `visible="{= ${/count} > 0}"` |

### Property Binding

```xml
<!-- Absolute path -->
<Text text="{/company/name}" />

<!-- Relative path (with context) -->
<Text text="{name}" />

<!-- Named model -->
<Text text="{view>/busy}" />

<!-- With type and format -->
<Text text="{
    path: '/price',
    type: 'sap.ui.model.type.Currency',
    formatOptions: { showMeasure: false }
}" />
```

### Aggregation Binding

```xml
<!-- Simple binding -->
<List items="{/products}">
    <StandardListItem title="{Name}" description="{Price}" />
</List>

<!-- With sorter and filter -->
<List items="{
    path: '/products',
    sorter: { path: 'Name', descending: false },
    filters: [
        { path: 'InStock', operator: 'EQ', value1: true }
    ]
}">
    <StandardListItem title="{Name}" />
</List>
```

### Expression Binding

```xml
<!-- Ternary operator -->
<ObjectStatus
    text="{= ${status} === 'active' ? 'Available' : 'Unavailable'}"
    state="{= ${status} === 'active' ? 'Success' : 'Error'}" />

<!-- Boolean expressions -->
<Button enabled="{= ${/items}.length > 0}" />
<Panel visible="{= !!${/selectedProduct}}" />

<!-- Calculations -->
<Text text="{= ${/quantity} * ${/price}}" />

<!-- Comparisons (XML escaped) -->
<Text visible="{= ${/quantity} &lt; 10}" text="Low Stock!" />
<Text visible="{= ${/price} &gt;= 100}" text="Premium" />
```

### Data Types

```xml
<!-- String with constraints -->
<Input value="{
    path: '/name',
    type: 'sap.ui.model.type.String',
    constraints: { minLength: 2, maxLength: 100 }
}" />

<!-- Integer -->
<Input value="{
    path: '/quantity',
    type: 'sap.ui.model.type.Integer',
    constraints: { minimum: 0, maximum: 999 }
}" />

<!-- Date -->
<DatePicker value="{
    path: '/birthDate',
    type: 'sap.ui.model.type.Date',
    formatOptions: { pattern: 'yyyy-MM-dd' }
}" />

<!-- Currency -->
<Text text="{
    parts: ['/price', '/currency'],
    type: 'sap.ui.model.type.Currency',
    formatOptions: { showMeasure: true }
}" />
```

---

## 10. Controls Library

### Layout Controls

```xml
<!-- VerticalLayout -->
<l:VerticalLayout class="sapUiContentPadding">
    <Text text="Item 1" />
    <Text text="Item 2" />
</l:VerticalLayout>

<!-- Grid -->
<l:Grid defaultSpan="L4 M6 S12">
    <Text text="Cell 1" />
    <Text text="Cell 2" />
    <Text text="Cell 3" />
</l:Grid>

<!-- FlexBox -->
<FlexBox direction="Row" justifyContent="SpaceBetween" alignItems="Center">
    <Text text="Left" />
    <Text text="Right" />
</FlexBox>

<!-- SimpleForm -->
<f:SimpleForm editable="true" layout="ResponsiveGridLayout">
    <f:content>
        <Label text="Name" />
        <Input value="{/name}" />
        <Label text="Email" />
        <Input value="{/email}" type="Email" />
    </f:content>
</f:SimpleForm>
```

### Container Controls

```xml
<!-- Page -->
<Page title="{i18n>title}" showNavButton="true" navButtonPress=".onNavBack">
    <headerContent>
        <Button icon="sap-icon://action" press=".onAction" />
    </headerContent>
    <content>
        <!-- Content here -->
    </content>
    <footer>
        <Bar>
            <contentRight>
                <Button text="Save" type="Emphasized" press=".onSave" />
            </contentRight>
        </Bar>
    </footer>
</Page>

<!-- Panel -->
<Panel headerText="Details" expandable="true" expanded="true">
    <content>
        <Text text="Panel content" />
    </content>
</Panel>

<!-- IconTabBar -->
<IconTabBar select=".onTabSelect">
    <items>
        <IconTabFilter text="Info" key="info" icon="sap-icon://hint">
            <Text text="Information content" />
        </IconTabFilter>
        <IconTabFilter text="Products" key="products" icon="sap-icon://product">
            <List items="{/products}">
                <StandardListItem title="{Name}" />
            </List>
        </IconTabFilter>
    </items>
</IconTabBar>
```

### Input Controls

```xml
<!-- Input -->
<Input
    value="{/name}"
    placeholder="{i18n>enterName}"
    required="true"
    liveChange=".onLiveChange" />

<!-- TextArea -->
<TextArea
    value="{/description}"
    rows="5"
    growing="true"
    growingMaxLines="10" />

<!-- Select -->
<Select selectedKey="{/selectedCountry}" forceSelection="false">
    <core:Item key="" text="{i18n>selectCountry}" />
    <core:Item key="US" text="United States" />
    <core:Item key="DE" text="Germany" />
</Select>

<!-- ComboBox with binding -->
<ComboBox
    selectedKey="{/categoryId}"
    items="{/categories}">
    <core:Item key="{id}" text="{name}" />
</ComboBox>

<!-- DatePicker -->
<DatePicker
    value="{/date}"
    valueFormat="yyyy-MM-dd"
    displayFormat="long"
    change=".onDateChange" />

<!-- Switch -->
<Switch
    state="{/isActive}"
    customTextOn="Yes"
    customTextOff="No"
    change=".onSwitchChange" />
```

### List Controls

```xml
<!-- List with StandardListItem -->
<List
    id="productList"
    items="{/products}"
    mode="SingleSelectMaster"
    selectionChange=".onSelectionChange">
    <headerToolbar>
        <Toolbar>
            <Title text="Products ({= ${/products}.length})" />
            <ToolbarSpacer />
            <SearchField width="30%" search=".onSearch" />
        </Toolbar>
    </headerToolbar>
    <StandardListItem
        title="{Name}"
        description="{Description}"
        info="{Price} {Currency}"
        infoState="{= ${InStock} ? 'Success' : 'Error'}"
        type="Navigation"
        press=".onItemPress" />
</List>

<!-- Table -->
<Table
    id="productTable"
    items="{/products}"
    growing="true"
    growingThreshold="20">
    <headerToolbar>
        <OverflowToolbar>
            <Title text="Products" />
            <ToolbarSpacer />
            <Button icon="sap-icon://add" press=".onCreate" />
        </OverflowToolbar>
    </headerToolbar>
    <columns>
        <Column><Text text="Name" /></Column>
        <Column><Text text="Category" /></Column>
        <Column hAlign="End"><Text text="Price" /></Column>
        <Column hAlign="Center"><Text text="Stock" /></Column>
    </columns>
    <items>
        <ColumnListItem type="Navigation" press=".onItemPress">
            <Text text="{Name}" />
            <Text text="{Category}" />
            <ObjectNumber number="{Price}" unit="{Currency}" />
            <ObjectStatus
                text="{= ${InStock} ? 'In Stock' : 'Out of Stock'}"
                state="{= ${InStock} ? 'Success' : 'Error'}" />
        </ColumnListItem>
    </items>
</Table>
```

---

## 11. manifest.json (App Descriptor)

### Complete Example

```json
{
  "_version": "1.49.0",

  "sap.app": {
    "id": "com.mycompany.myapp",
    "type": "application",
    "i18n": "i18n/i18n.properties",
    "title": "{{appTitle}}",
    "description": "{{appDescription}}",
    "applicationVersion": {
      "version": "1.0.0"
    },
    "dataSources": {
      "mainService": {
        "uri": "/sap/opu/odata/sap/ZPRODUCT_SRV/",
        "type": "OData",
        "settings": {
          "odataVersion": "2.0",
          "localUri": "localService/metadata.xml"
        }
      }
    }
  },

  "sap.ui": {
    "technology": "UI5",
    "icons": {
      "icon": "sap-icon://product"
    },
    "deviceTypes": {
      "desktop": true,
      "tablet": true,
      "phone": true
    }
  },

  "sap.ui5": {
    "flexEnabled": true,
    "rootView": {
      "viewName": "myapp.view.App",
      "type": "XML",
      "async": true,
      "id": "app"
    },
    "dependencies": {
      "minUI5Version": "1.120.0",
      "libs": {
        "sap.m": {},
        "sap.ui.core": {},
        "sap.ui.layout": {},
        "sap.f": {}
      }
    },
    "contentDensities": {
      "compact": true,
      "cozy": true
    },
    "models": {
      "i18n": {
        "type": "sap.ui.model.resource.ResourceModel",
        "settings": {
          "bundleName": "myapp.i18n.i18n",
          "supportedLocales": ["en", "de"],
          "fallbackLocale": "en",
          "async": true
        }
      },
      "": {
        "dataSource": "mainService",
        "preload": true,
        "settings": {
          "defaultBindingMode": "TwoWay",
          "defaultCountMode": "Inline",
          "useBatch": true
        }
      }
    },
    "resources": {
      "css": [
        { "uri": "css/style.css" }
      ]
    },
    "routing": {
      "config": {
        "routerClass": "sap.m.routing.Router",
        "viewType": "XML",
        "viewPath": "myapp.view",
        "controlId": "app",
        "controlAggregation": "pages",
        "async": true,
        "bypassed": {
          "target": "notFound"
        }
      },
      "routes": [
        {
          "name": "main",
          "pattern": "",
          "target": "main"
        },
        {
          "name": "detail",
          "pattern": "product/{productId}",
          "target": "detail"
        }
      ],
      "targets": {
        "main": {
          "viewName": "Main",
          "viewLevel": 1
        },
        "detail": {
          "viewName": "Detail",
          "viewLevel": 2
        },
        "notFound": {
          "viewName": "NotFound",
          "viewLevel": 3
        }
      }
    }
  }
}
```

---

## 12. Routing and Navigation

### Route Patterns

| Pattern | URL Example | Parameters |
|---------|-------------|------------|
| `""` | `#/` | None |
| `products` | `#/products` | None |
| `product/{id}` | `#/product/123` | `id: "123"` |
| `search:?query:` | `#/search?query=test` | Optional query |

### Navigation in TypeScript Controller

```typescript
import BaseController from "./BaseController";
import Event from "sap/ui/base/Event";
import ListItemBase from "sap/m/ListItemBase";
import Context from "sap/ui/model/Context";
import History from "sap/ui/core/routing/History";
import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";

/**
 * @namespace myapp.controller
 */
export default class ProductList extends BaseController {

  public onInit(): void {
    this.getRouter()
      .getRoute("productList")
      ?.attachPatternMatched(this._onRouteMatched, this);
  }

  /**
   * Navigate to detail view
   */
  public onItemPress(oEvent: Event): void {
    const oItem = oEvent.getSource() as ListItemBase;
    const oContext = oItem.getBindingContext() as Context;
    const sProductId = oContext.getProperty("ProductID") as string;

    this.navTo("detail", { productId: sProductId });
  }

  /**
   * Navigate with query parameters
   */
  public onSearch(sQuery: string): void {
    this.navTo("search", {
      "?query": {
        search: sQuery
      }
    });
  }

  /**
   * Navigate back with history check
   */
  public onNavBack(): void {
    const sPreviousHash = History.getInstance().getPreviousHash();

    if (sPreviousHash !== undefined) {
      window.history.go(-1);
    } else {
      this.navTo("main", {}, true /* replace */);
    }
  }

  /**
   * Handle route matched
   */
  private _onRouteMatched(oEvent: Route$PatternMatchedEvent): void {
    const oArgs = oEvent.getParameter("arguments") as Record<string, string>;
    const oQuery = oArgs["?query"] as Record<string, string> | undefined;

    if (oQuery?.search) {
      this._applySearch(oQuery.search);
    }
  }

  private _applySearch(sQuery: string): void {
    // Implementation
  }
}
```

---

## 13. Fragments

### XML Fragment Definition

**view/fragments/ProductDialog.fragment.xml:**
```xml
<core:FragmentDefinition
    xmlns="sap.m"
    xmlns:core="sap.ui.core"
    xmlns:f="sap.ui.layout.form">

    <Dialog id="productDialog" title="{i18n>productDetails}">
        <content>
            <f:SimpleForm editable="true" layout="ResponsiveGridLayout">
                <f:content>
                    <Label text="{i18n>name}" required="true" />
                    <Input id="nameInput" value="{/Name}" />

                    <Label text="{i18n>description}" />
                    <TextArea value="{/Description}" rows="3" />

                    <Label text="{i18n>price}" required="true" />
                    <Input value="{/Price}" type="Number" />

                    <Label text="{i18n>inStock}" />
                    <Switch state="{/InStock}" />
                </f:content>
            </f:SimpleForm>
        </content>
        <beginButton>
            <Button text="{i18n>save}" type="Emphasized" press=".onSaveProduct" />
        </beginButton>
        <endButton>
            <Button text="{i18n>cancel}" press=".onCancelDialog" />
        </endButton>
    </Dialog>

</core:FragmentDefinition>
```

### Loading Fragments with TypeScript

```typescript
import BaseController from "./BaseController";
import Fragment from "sap/ui/core/Fragment";
import Dialog from "sap/m/Dialog";
import JSONModel from "sap/ui/model/json/JSONModel";
import Input from "sap/m/Input";
import MessageToast from "sap/m/MessageToast";

/**
 * @namespace myapp.controller
 */
export default class ProductController extends BaseController {

  private _pDialog: Promise<Dialog> | null = null;
  private _oDialogModel: JSONModel | null = null;

  /**
   * Open product dialog for creating/editing
   */
  public async onOpenProductDialog(oProduct?: myapp.Product): Promise<void> {
    const oView = this.getView()!;

    // Initialize dialog model
    this._oDialogModel = new JSONModel(oProduct || {
      Name: "",
      Description: "",
      Price: 0,
      InStock: true
    });

    // Lazy load dialog
    if (!this._pDialog) {
      this._pDialog = Fragment.load({
        id: oView.getId(),
        name: "myapp.view.fragments.ProductDialog",
        controller: this
      }).then((oDialog) => {
        const dialog = oDialog as Dialog;
        oView.addDependent(dialog);
        return dialog;
      });
    }

    const oDialog = await this._pDialog;
    oDialog.setModel(this._oDialogModel);
    oDialog.open();
  }

  /**
   * Save product from dialog
   */
  public onSaveProduct(): void {
    const oNameInput = this.byId("nameInput") as Input;
    const sName = oNameInput.getValue();

    if (!sName || sName.trim().length < 2) {
      oNameInput.setValueState("Error");
      oNameInput.setValueStateText(this.getText("nameRequired"));
      return;
    }

    oNameInput.setValueState("None");

    const oData = this._oDialogModel?.getData() as myapp.Product;
    this._saveProduct(oData);
    this._closeDialog();
  }

  /**
   * Cancel dialog
   */
  public onCancelDialog(): void {
    this._closeDialog();
  }

  private async _closeDialog(): Promise<void> {
    if (this._pDialog) {
      const oDialog = await this._pDialog;
      oDialog.close();
    }
  }

  private _saveProduct(oProduct: myapp.Product): void {
    MessageToast.show(this.getText("productSaved"));
  }
}
```

---

## 14. Internationalization (i18n)

### Resource Bundle Files

**i18n/i18n.properties (default):**
```properties
# App
appTitle=Product Management
appDescription=Manage your products efficiently

# Actions
save=Save
cancel=Cancel
delete=Delete
edit=Edit
create=Create

# Messages
saveSuccess=Changes saved successfully
deleteSuccess=Item deleted successfully
confirmDelete=Are you sure you want to delete "{0}"?
noChanges=No changes to save

# Validation
nameRequired=Name is required (minimum 2 characters)
fieldRequired=This field is required

# Product
productName=Product Name
productDescription=Description
productPrice=Price
```

**i18n/i18n_de.properties:**
```properties
# App
appTitle=Produktverwaltung
appDescription=Verwalten Sie Ihre Produkte effizient

# Actions
save=Speichern
cancel=Abbrechen
delete=Löschen
edit=Bearbeiten
create=Erstellen

# Messages
saveSuccess=Änderungen erfolgreich gespeichert
deleteSuccess=Eintrag erfolgreich gelöscht
confirmDelete=Möchten Sie "{0}" wirklich löschen?
```

### Using i18n in TypeScript

```typescript
import BaseController from "./BaseController";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import MessageBox from "sap/m/MessageBox";
import MessageToast from "sap/m/MessageToast";

/**
 * @namespace myapp.controller
 */
export default class I18nExample extends BaseController {

  /**
   * Get resource bundle
   */
  public getResourceBundle(): ResourceBundle {
    const oModel = this.getModel<ResourceModel>("i18n");
    return oModel.getResourceBundle() as ResourceBundle;
  }

  /**
   * Get translated text
   */
  public getText(sKey: string, aArgs?: string[]): string {
    return this.getResourceBundle().getText(sKey, aArgs) || sKey;
  }

  /**
   * Example: Confirm delete with translated message
   */
  public onDeleteProduct(sProductName: string): void {
    const sMessage = this.getText("confirmDelete", [sProductName]);
    const sTitle = this.getText("delete");

    MessageBox.confirm(sMessage, {
      title: sTitle,
      onClose: (oAction: string) => {
        if (oAction === MessageBox.Action.OK) {
          this._performDelete();
        }
      }
    });
  }

  private _performDelete(): void {
    MessageToast.show(this.getText("deleteSuccess"));
  }
}
```

---

## 15. Custom Controls

### Creating a Custom Control with TypeScript

**controls/RatingIndicator.ts:**
```typescript
import Control from "sap/ui/core/Control";
import RenderManager from "sap/ui/core/RenderManager";
import Icon from "sap/ui/core/Icon";
import type { MetadataOptions } from "sap/ui/core/Element";

/**
 * @namespace myapp.controls
 */
export default class RatingIndicator extends Control {

  static readonly metadata: MetadataOptions = {
    properties: {
      value: { type: "float", defaultValue: 0 },
      maxValue: { type: "int", defaultValue: 5 },
      editable: { type: "boolean", defaultValue: true },
      iconSize: { type: "sap.ui.core.CSSSize", defaultValue: "1.5rem" }
    },
    aggregations: {
      _icons: { type: "sap.ui.core.Icon", multiple: true, visibility: "hidden" }
    },
    events: {
      change: { parameters: { value: { type: "float" } } }
    }
  };

  static renderer = {
    apiVersion: 2,
    render(oRm: RenderManager, oControl: RatingIndicator): void {
      oRm.openStart("div", oControl);
      oRm.class("myRatingIndicator");
      if (!oControl.getEditable()) {
        oRm.class("myRatingIndicatorReadOnly");
      }
      oRm.openEnd();

      const aIcons = oControl.getAggregation("_icons") as Icon[] || [];
      aIcons.forEach((oIcon) => {
        oRm.renderControl(oIcon);
      });

      oRm.close("div");
    }
  };

  public init(): void {
    this._createIcons();
  }

  public getValue(): number {
    return this.getProperty("value") as number;
  }

  public setValue(fValue: number): this {
    this.setProperty("value", fValue);
    this._updateIcons();
    return this;
  }

  public getMaxValue(): number {
    return this.getProperty("maxValue") as number;
  }

  public getEditable(): boolean {
    return this.getProperty("editable") as boolean;
  }

  public getIconSize(): string {
    return this.getProperty("iconSize") as string;
  }

  private _createIcons(): void {
    const iMaxValue = this.getMaxValue();

    for (let i = 0; i < iMaxValue; i++) {
      const oIcon = new Icon({
        src: "sap-icon://favorite",
        press: this._onIconPress.bind(this, i + 1)
      });
      this.addAggregation("_icons", oIcon);
    }
  }

  private _onIconPress(iValue: number): void {
    if (this.getEditable()) {
      this.setValue(iValue);
      this.fireEvent("change", { value: iValue });
    }
  }

  public onBeforeRendering(): void {
    this._updateIcons();
  }

  private _updateIcons(): void {
    const fValue = this.getValue();
    const aIcons = this.getAggregation("_icons") as Icon[] || [];

    aIcons.forEach((oIcon, iIndex) => {
      oIcon.setColor(iIndex < fValue ? "#f0ab00" : "#cccccc");
      oIcon.setSize(this.getIconSize());
    });
  }
}
```

### Using the Custom Control

```xml
<mvc:View
    xmlns:mvc="sap.ui.core.mvc"
    xmlns="sap.m"
    xmlns:custom="myapp.controls">

    <Page title="Custom Controls Demo">
        <content>
            <VBox class="sapUiMediumMargin">
                <Label text="Rate this product:" />

                <custom:RatingIndicator
                    id="productRating"
                    value="{/rating}"
                    maxValue="5"
                    editable="true"
                    iconSize="2rem"
                    change=".onRatingChange" />
            </VBox>
        </content>
    </Page>

</mvc:View>
```

---

## 16. OData Integration

### OData V2 Service Class

**service/ProductService.ts:**
```typescript
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import Sorter from "sap/ui/model/Sorter";

export interface ReadOptions {
  top?: number;
  skip?: number;
  expand?: string[];
  select?: string[];
  filters?: Filter[];
  sorters?: Sorter[];
}

/**
 * @namespace myapp.service
 */
export default class ProductService {
  private _oModel: ODataModel;

  constructor(oModel: ODataModel) {
    this._oModel = oModel;
  }

  /**
   * Get all products with optional filtering
   */
  public async getProducts(options?: ReadOptions): Promise<myapp.Product[]> {
    return new Promise((resolve, reject) => {
      const urlParameters: Record<string, string> = {};

      if (options?.top) urlParameters["$top"] = String(options.top);
      if (options?.skip) urlParameters["$skip"] = String(options.skip);
      if (options?.expand?.length) urlParameters["$expand"] = options.expand.join(",");
      if (options?.select?.length) urlParameters["$select"] = options.select.join(",");

      this._oModel.read("/Products", {
        urlParameters,
        filters: options?.filters || [],
        sorters: options?.sorters || [],
        success: (oData: { results: myapp.Product[] }) => resolve(oData.results),
        error: (oError: Error) => reject(oError)
      });
    });
  }

  /**
   * Get single product by ID
   */
  public async getProduct(sId: string, aExpand?: string[]): Promise<myapp.Product> {
    return new Promise((resolve, reject) => {
      const urlParameters: Record<string, string> = {};
      if (aExpand?.length) urlParameters["$expand"] = aExpand.join(",");

      this._oModel.read(`/Products('${sId}')`, {
        urlParameters,
        success: (oData: myapp.Product) => resolve(oData),
        error: (oError: Error) => reject(oError)
      });
    });
  }

  /**
   * Create new product
   */
  public async createProduct(oProduct: Partial<myapp.Product>): Promise<myapp.Product> {
    return new Promise((resolve, reject) => {
      this._oModel.create("/Products", oProduct, {
        success: (oData: myapp.Product) => resolve(oData),
        error: (oError: Error) => reject(oError)
      });
    });
  }

  /**
   * Update product
   */
  public async updateProduct(sId: string, oChanges: Partial<myapp.Product>): Promise<void> {
    return new Promise((resolve, reject) => {
      this._oModel.update(`/Products('${sId}')`, oChanges, {
        success: () => resolve(),
        error: (oError: Error) => reject(oError)
      });
    });
  }

  /**
   * Delete product
   */
  public async deleteProduct(sId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this._oModel.remove(`/Products('${sId}')`, {
        success: () => resolve(),
        error: (oError: Error) => reject(oError)
      });
    });
  }

  public refresh(): void {
    this._oModel.refresh();
  }

  public hasPendingChanges(): boolean {
    return this._oModel.hasPendingChanges();
  }

  public resetChanges(): void {
    this._oModel.resetChanges();
  }
}
```

### Using OData Service in Controller

```typescript
import BaseController from "./BaseController";
import ProductService from "myapp/service/ProductService";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import MessageBox from "sap/m/MessageBox";
import MessageToast from "sap/m/MessageToast";

/**
 * @namespace myapp.controller
 */
export default class Products extends BaseController {

  private _oProductService!: ProductService;

  public onInit(): void {
    const oModel = this.getModel<ODataModel>();
    this._oProductService = new ProductService(oModel);
    this._loadProducts();
  }

  private async _loadProducts(): Promise<void> {
    try {
      this._setViewBusy(true);

      const aProducts = await this._oProductService.getProducts({
        top: 50,
        expand: ["Category", "Supplier"]
      });

      console.log("Loaded products:", aProducts);
    } catch {
      MessageBox.error("Failed to load products");
    } finally {
      this._setViewBusy(false);
    }
  }

  public async onSearch(sQuery: string): Promise<void> {
    const aFilters = sQuery ? [
      new Filter({
        filters: [
          new Filter("Name", FilterOperator.Contains, sQuery),
          new Filter("Description", FilterOperator.Contains, sQuery)
        ],
        and: false
      })
    ] : [];

    const aProducts = await this._oProductService.getProducts({ filters: aFilters });
    // Update view
  }

  public async onCreate(oProduct: Partial<myapp.Product>): Promise<void> {
    try {
      const oCreated = await this._oProductService.createProduct(oProduct);
      MessageToast.show(`Product "${oCreated.Name}" created`);
    } catch {
      MessageBox.error("Failed to create product");
    }
  }

  public async onDelete(sProductId: string): Promise<void> {
    try {
      await this._oProductService.deleteProduct(sProductId);
      MessageToast.show("Product deleted");
    } catch {
      MessageBox.error("Failed to delete product");
    }
  }

  private _setViewBusy(bBusy: boolean): void {
    this.getModel<JSONModel>("view").setProperty("/busy", bBusy);
  }
}
```

---

## 17. Expression Binding and Formatters

### formatter.ts

```typescript
import DateFormat from "sap/ui/core/format/DateFormat";
import NumberFormat from "sap/ui/core/format/NumberFormat";

/**
 * Formatter functions for data binding
 * @namespace myapp.model
 */
const formatter = {

  formatPrice(fPrice: number | null | undefined): string {
    if (fPrice == null) return "N/A";

    const oFormat = NumberFormat.getCurrencyInstance({
      currencyCode: false,
      minFractionDigits: 2,
      maxFractionDigits: 2
    });

    return oFormat.format(fPrice);
  },

  formatCurrency(fAmount: number | null, sCurrency: string | null): string {
    if (fAmount == null) return "";

    const oFormat = NumberFormat.getCurrencyInstance();
    return oFormat.format(fAmount, sCurrency || "USD");
  },

  formatDate(oDate: Date | string | null): string {
    if (!oDate) return "";

    const oDateFormat = DateFormat.getDateInstance({ style: "medium" });
    const date = typeof oDate === "string" ? new Date(oDate) : oDate;
    return oDateFormat.format(date);
  },

  formatDateTime(oDate: Date | string | null): string {
    if (!oDate) return "";

    const oDateFormat = DateFormat.getDateTimeInstance({ style: "medium/short" });
    const date = typeof oDate === "string" ? new Date(oDate) : oDate;
    return oDateFormat.format(date);
  },

  formatStatus(sStatus: string | null): string {
    const mStatus: Record<string, string> = {
      "A": "Active",
      "I": "Inactive",
      "P": "Pending",
      "D": "Draft",
      "C": "Completed"
    };
    return mStatus[sStatus || ""] || sStatus || "Unknown";
  },

  formatStatusState(sStatus: string | null): string {
    const mState: Record<string, string> = {
      "A": "Success",
      "I": "Error",
      "P": "Warning",
      "D": "None",
      "C": "Success"
    };
    return mState[sStatus || ""] || "None";
  },

  formatYesNo(bValue: boolean | null): string {
    return bValue ? "Yes" : "No";
  },

  truncateText(sText: string | null, iMaxLength: number = 100): string {
    if (!sText) return "";
    if (sText.length <= iMaxLength) return sText;
    return sText.substring(0, iMaxLength - 3) + "...";
  }
};

export default formatter;
```

### Using Formatter in XML View

```xml
<mvc:View
    controllerName="myapp.controller.Main"
    xmlns:mvc="sap.ui.core.mvc"
    xmlns="sap.m">

    <Table items="{/products}">
        <columns>
            <Column><Text text="Name" /></Column>
            <Column><Text text="Price" /></Column>
            <Column><Text text="Status" /></Column>
        </columns>
        <items>
            <ColumnListItem>
                <Text text="{Name}" />

                <!-- Formatter function -->
                <Text text="{
                    parts: [{path: 'Price'}, {path: 'Currency'}],
                    formatter: '.formatter.formatCurrency'
                }" />

                <!-- Status with state -->
                <ObjectStatus
                    text="{path: 'Status', formatter: '.formatter.formatStatus'}"
                    state="{path: 'Status', formatter: '.formatter.formatStatusState'}" />
            </ColumnListItem>
        </items>
    </Table>

</mvc:View>
```

---

## 18. Testing

### Unit Testing with QUnit and TypeScript

**test/unit/model/formatter.ts:**
```typescript
import formatter from "myapp/model/formatter";

QUnit.module("Formatter Tests");

QUnit.test("formatPrice - should format price correctly", (assert) => {
  const fPrice = 99.5;
  const sResult = formatter.formatPrice(fPrice);
  assert.ok(sResult.includes("99"), "Price contains correct value");
});

QUnit.test("formatPrice - should handle null", (assert) => {
  const sResult = formatter.formatPrice(null);
  assert.strictEqual(sResult, "N/A", "Null returns N/A");
});

QUnit.test("formatStatus - should return correct status text", (assert) => {
  assert.strictEqual(formatter.formatStatus("A"), "Active");
  assert.strictEqual(formatter.formatStatus("I"), "Inactive");
  assert.strictEqual(formatter.formatStatus("P"), "Pending");
});

QUnit.test("formatStatusState - should return correct state", (assert) => {
  assert.strictEqual(formatter.formatStatusState("A"), "Success");
  assert.strictEqual(formatter.formatStatusState("I"), "Error");
  assert.strictEqual(formatter.formatStatusState("P"), "Warning");
});

QUnit.test("truncateText - should truncate long text", (assert) => {
  const sLongText = "This is a very long text that should be truncated";
  const sResult = formatter.truncateText(sLongText, 20);

  assert.strictEqual(sResult.length, 20);
  assert.ok(sResult.endsWith("..."));
});
```

### Integration Testing with OPA5

**test/integration/pages/Main.ts:**
```typescript
import Opa5 from "sap/ui/test/Opa5";
import Press from "sap/ui/test/actions/Press";
import EnterText from "sap/ui/test/actions/EnterText";
import { PropertyStrictEquals } from "sap/ui/test/matchers";

const sViewName = "myapp.view.Main";

class MainPage extends Opa5 {

  iStartTheApp(): this {
    return this.iStartMyUIComponent({
      componentConfig: { name: "myapp", async: true }
    });
  }

  iPressTheCreateButton(): this {
    return this.waitFor({
      controlType: "sap.m.Button",
      viewName: sViewName,
      matchers: new PropertyStrictEquals({ name: "text", value: "Create" }),
      actions: new Press(),
      errorMessage: "Create button not found"
    });
  }

  iEnterSearchText(sText: string): this {
    return this.waitFor({
      id: "searchField",
      viewName: sViewName,
      actions: new EnterText({ text: sText }),
      errorMessage: "Search field not found"
    });
  }

  iShouldSeeTheProductList(): this {
    return this.waitFor({
      id: "productList",
      viewName: sViewName,
      success: () => Opa5.assert.ok(true, "Product list is visible"),
      errorMessage: "Product list not found"
    });
  }

  iShouldSeeThePageTitle(sTitle: string): this {
    return this.waitFor({
      controlType: "sap.m.Page",
      viewName: sViewName,
      matchers: new PropertyStrictEquals({ name: "title", value: sTitle }),
      success: () => Opa5.assert.ok(true, `Page title is "${sTitle}"`),
      errorMessage: `Page with title "${sTitle}" not found`
    });
  }
}

export default new MainPage();
```

**test/integration/MainJourney.ts:**
```typescript
import opaTest from "sap/ui/test/opaQunit";
import MainPage from "./pages/Main";

QUnit.module("Product List Journey");

opaTest("Should see the product list", (Given, When, Then) => {
  Given.iStartTheApp();
  Then.iShouldSeeTheProductList();
  Then.iShouldSeeThePageTitle("Products");
  Then.iTeardownMyApp();
});

opaTest("Should filter products when searching", (Given, When, Then) => {
  Given.iStartTheApp();
  When.iEnterSearchText("Laptop");
  Then.theListShouldHaveItems(1);
  Then.iTeardownMyApp();
});
```

---

## 19. Performance Optimization

### Async Loading

```html
<script
    id="sap-ui-bootstrap"
    src="https://ui5.sap.com/resources/sap-ui-core.js"
    data-sap-ui-async="true"
    data-sap-ui-theme="sap_horizon"
    data-sap-ui-compatVersion="edge">
</script>
```

### Lazy Loading Fragments

```typescript
import Fragment from "sap/ui/core/Fragment";
import Dialog from "sap/m/Dialog";

private _pHeavyDialog: Promise<Dialog> | null = null;

public async onOpenHeavyDialog(): Promise<void> {
  const oView = this.getView()!;

  if (!this._pHeavyDialog) {
    this._pHeavyDialog = Fragment.load({
      id: oView.getId(),
      name: "myapp.view.fragments.HeavyDialog",
      controller: this
    }).then((oDialog) => {
      const dialog = oDialog as Dialog;
      oView.addDependent(dialog);
      return dialog;
    });
  }

  const oDialog = await this._pHeavyDialog;
  oDialog.open();
}
```

### OData Optimization

```typescript
// Only request needed fields
this._oModel.read("/Products", {
  urlParameters: {
    "$select": "ProductID,Name,Price,Currency",
    "$expand": "Category($select=Name)"
  }
});
```

### Growing List (Pagination)

```xml
<List
    items="{/Products}"
    growing="true"
    growingThreshold="20"
    growingScrollToLoad="true">
    <StandardListItem title="{Name}" />
</List>
```

### Performance Checklist

| Area | Best Practice |
|------|---------------|
| **Bootstrap** | Use `data-sap-ui-async="true"` |
| **Preload** | Build Component-preload.js |
| **CDN** | Load UI5 from SAP CDN |
| **Views** | Use XML views (faster parsing) |
| **Models** | Use `$select` and `$expand` |
| **Lists** | Enable growing/pagination |
| **Fragments** | Lazy load dialogs |

---

## 20. SAP Fiori Elements

### List Report Template

**manifest.json:**
```json
{
  "sap.ui5": {
    "routing": {
      "routes": [{
        "pattern": ":?query:",
        "name": "ProductsList",
        "target": "ProductsList"
      }],
      "targets": {
        "ProductsList": {
          "type": "Component",
          "id": "ProductsList",
          "name": "sap.fe.templates.ListReport",
          "options": {
            "settings": {
              "entitySet": "Products",
              "variantManagement": "Page",
              "initialLoad": true
            }
          }
        }
      }
    }
  }
}
```

---

## 21. Smart Controls

### Smart Table

```xml
<smartTable:SmartTable
    id="productTable"
    entitySet="Products"
    smartFilterId="productFilter"
    tableType="ResponsiveTable"
    useExportToExcel="true"
    useVariantManagement="true"
    header="Products"
    showRowCount="true"
    enableAutoBinding="true"
    beforeRebindTable=".onBeforeRebindTable">
</smartTable:SmartTable>
```

### Smart Filter Bar

```xml
<smartFilterBar:SmartFilterBar
    id="productFilter"
    entitySet="Products"
    persistencyKey="ProductFilter"
    liveMode="true"
    showClearButton="true"
    search=".onSearch" />
```

### Smart Form

```xml
<smartForm:SmartForm
    id="productForm"
    editable="{view>/editable}"
    editTogglable="true"
    title="Product Details">

    <smartForm:Group label="General">
        <smartForm:GroupElement>
            <smartField:SmartField value="{Name}" />
        </smartForm:GroupElement>
        <smartForm:GroupElement>
            <smartField:SmartField value="{Price}" />
        </smartForm:GroupElement>
    </smartForm:Group>

</smartForm:SmartForm>
```

---

## 22. Security Best Practices

### Input Validation

```typescript
import Input from "sap/m/Input";

function validateInput(oInput: Input): boolean {
  const sValue = oInput.getValue().trim();

  if (!sValue) {
    oInput.setValueState("Error");
    oInput.setValueStateText("This field is required");
    return false;
  }

  // Check for XSS patterns
  const rXSS = /<script|javascript:|on\w+=/i;
  if (rXSS.test(sValue)) {
    oInput.setValueState("Error");
    oInput.setValueStateText("Invalid characters detected");
    return false;
  }

  oInput.setValueState("None");
  return true;
}

function sanitizeHtml(sHtml: string): string {
  const oDiv = document.createElement("div");
  oDiv.textContent = sHtml;
  return oDiv.innerHTML;
}
```

---

## 23. Debugging and Troubleshooting

### Debug Mode

```
# URL parameters for debugging
?sap-ui-debug=true          # Load debug sources
?sap-ui-trace=true          # Enable tracing
?sap-ui-xx-viewCache=false  # Disable view cache
```

### UI5 Inspector

- Chrome Extension: UI5 Inspector
- Keyboard shortcut: `Ctrl + Alt + Shift + S`

### Common Debugging

```typescript
import Log from "sap/base/Log";

// Enable debug logging
Log.setLevel(Log.Level.DEBUG);

// Log messages
Log.debug("Debug message");
Log.info("Info message");
Log.warning("Warning message");
Log.error("Error message");

// Debug binding
const oBinding = oControl.getBinding("items");
console.log("Binding path:", oBinding?.getPath());

// Inspect model data
const oModel = this.getView()?.getModel();
console.log("Model data:", oModel?.getData());
```

---

## 24. Deployment

### Build for Production

```bash
# Build with UI5 CLI
ui5 build preload --clean-dest --all

# Output in dist/ folder
```

### Deploy to SAP BTP

**mta.yaml:**
```yaml
_schema-version: "3.1"
ID: myapp
version: 1.0.0

modules:
  - name: myapp-app
    type: approuter.nodejs
    path: approuter
    parameters:
      disk-quota: 256M
      memory: 256M

  - name: myapp-ui
    type: html5
    path: dist
    build-parameters:
      builder: custom
      commands:
        - npm run build:ts
```

---

## 25. Resources and References

### Official Documentation

- [SAPUI5 SDK Demo Kit](https://sapui5.hana.ondemand.com/)
- [UI5 TypeScript Tutorial](https://sap.github.io/ui5-typescript/)
- [SAP Developers Portal](https://developers.sap.com/topics/ui5.html)

### TypeScript Resources

- [@types/openui5](https://www.npmjs.com/package/@types/openui5)
- [UI5 TypeScript Guidelines](https://sap.github.io/ui5-typescript/docs/guidelines)
- [Easy-UI5 Generator](https://github.com/SAP/generator-easy-ui5)

### Community

- [SAP Community - UI5](https://community.sap.com/topics/ui5)
- [Stack Overflow - SAPUI5](https://stackoverflow.com/questions/tagged/sapui5)
- [GitHub - OpenUI5](https://github.com/SAP/openui5)

---

## Quick Reference Card

### TypeScript Imports

```typescript
// Core
import UIComponent from "sap/ui/core/UIComponent";
import Controller from "sap/ui/core/mvc/Controller";
import Fragment from "sap/ui/core/Fragment";

// Models
import JSONModel from "sap/ui/model/json/JSONModel";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import Sorter from "sap/ui/model/Sorter";

// Controls
import MessageToast from "sap/m/MessageToast";
import MessageBox from "sap/m/MessageBox";
import Dialog from "sap/m/Dialog";

// Events
import Event from "sap/ui/base/Event";

// Routing
import Router from "sap/ui/core/routing/Router";
import History from "sap/ui/core/routing/History";
import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";
```

### Common Patterns

```typescript
// Get component
this.getOwnerComponent()

// Get router
this.getOwnerComponent().getRouter()

// Navigate
this.getRouter().navTo("route", { id: "123" })

// Get model
this.getView()?.getModel()
this.getView()?.getModel<JSONModel>("view")

// Get control by ID
this.byId("controlId") as Button

// Get i18n text
this.getResourceBundle().getText("key", ["arg1"])

// Show messages
MessageToast.show("Message")
MessageBox.error("Error message")
```

### XML Namespaces

```xml
xmlns:mvc="sap.ui.core.mvc"
xmlns="sap.m"
xmlns:core="sap.ui.core"
xmlns:l="sap.ui.layout"
xmlns:f="sap.ui.layout.form"
xmlns:smartTable="sap.ui.comp.smarttable"
xmlns:smartField="sap.ui.comp.smartfield"
xmlns:smartForm="sap.ui.comp.smartform"
```

---

*Document Version: 2.0 (TypeScript Edition)*
*Last Updated: January 2026*
*Covers SAPUI5 version 1.120+ with TypeScript*
