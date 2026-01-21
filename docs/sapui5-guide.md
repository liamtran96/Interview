# SAPUI5 Complete Learning Guide: Basic to Advanced

A comprehensive guide covering all SAPUI5 concepts from fundamentals to advanced topics for deep understanding.

---

## Table of Contents

1. [Introduction to SAPUI5](#1-introduction-to-sapui5)
2. [Architecture Overview](#2-architecture-overview)
3. [MVC Pattern](#3-mvc-pattern)
4. [Project Structure](#4-project-structure)
5. [Views](#5-views)
6. [Controllers](#6-controllers)
7. [Models](#7-models)
8. [Data Binding](#8-data-binding)
9. [Controls Library](#9-controls-library)
10. [manifest.json (App Descriptor)](#10-manifestjson-app-descriptor)
11. [Routing and Navigation](#11-routing-and-navigation)
12. [Fragments](#12-fragments)
13. [Internationalization (i18n)](#13-internationalization-i18n)
14. [Custom Controls](#14-custom-controls)
15. [OData Integration](#15-odata-integration)
16. [Expression Binding and Formatters](#16-expression-binding-and-formatters)
17. [Testing](#17-testing)
18. [Performance Optimization](#18-performance-optimization)
19. [SAP Fiori Elements](#19-sap-fiori-elements)
20. [Smart Controls](#20-smart-controls)
21. [Security Best Practices](#21-security-best-practices)
22. [Debugging and Troubleshooting](#22-debugging-and-troubleshooting)
23. [Deployment](#23-deployment)
24. [Resources and References](#24-resources-and-references)

---

## 1. Introduction to SAPUI5

### What is SAPUI5?

SAPUI5 (SAP UI Development Toolkit for HTML5) is SAP's enterprise-grade JavaScript framework for building responsive web applications. It provides a rich set of UI controls, data binding capabilities, and follows enterprise design guidelines.

### Key Characteristics

| Feature | Description |
|---------|-------------|
| **Enterprise-Ready** | Built for business applications with comprehensive features |
| **Responsive Design** | Runs on desktop, tablet, and mobile devices |
| **MVC Architecture** | Clear separation of concerns |
| **Rich Control Library** | 500+ pre-built UI controls |
| **OData Support** | Native integration with SAP backends |
| **Theming** | Multiple SAP themes (Horizon, Quartz, Belize) |
| **i18n Support** | Built-in internationalization |
| **Accessibility** | WCAG 2.1 compliant |

### SAPUI5 vs OpenUI5

| Aspect | SAPUI5 | OpenUI5 |
|--------|--------|---------|
| **License** | SAP proprietary | Apache 2.0 (Open Source) |
| **Controls** | Full library including smart controls | Core controls only |
| **Charting** | VizFrame charts included | Not included |
| **Support** | SAP support available | Community support |

### Prerequisites for Learning

- HTML5, CSS3, JavaScript (ES6+)
- Understanding of MVC pattern
- Basic knowledge of JSON and XML
- Familiarity with RESTful services

---

## 2. Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    SAPUI5 Application                        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │    Views    │  │ Controllers │  │       Models        │  │
│  │   (XML/JS)  │  │    (.js)    │  │ (JSON/OData/XML)    │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                    SAPUI5 Core Framework                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────────┐   │
│  │ Controls │ │  Routing │ │  Binding │ │ Event Handler │   │
│  └──────────┘ └──────────┘ └──────────┘ └───────────────┘   │
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

### Module Loading (AMD)

SAPUI5 uses Asynchronous Module Definition (AMD) for module loading:

```javascript
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], function(Controller, MessageToast, JSONModel) {
    "use strict";

    return Controller.extend("myapp.controller.Main", {
        // Controller implementation
    });
});
```

**Key Points:**
- `sap.ui.define` - Define a module with dependencies
- `sap.ui.require` - Load modules without defining a new one
- Dependencies are loaded asynchronously
- Callback receives resolved modules in order

---

## 3. MVC Pattern

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

### Model

The Model holds application data and provides methods for data manipulation.

**Responsibilities:**
- Store application data
- Notify views of data changes
- Provide data access methods
- Handle data validation

**Example:**
```javascript
// Create a JSON Model
var oModel = new sap.ui.model.json.JSONModel({
    products: [
        { id: "1", name: "Laptop", price: 999.99 },
        { id: "2", name: "Phone", price: 699.99 }
    ],
    selectedProduct: null
});

// Set model to view
this.getView().setModel(oModel);

// Access data
var aProducts = oModel.getProperty("/products");

// Update data
oModel.setProperty("/products/0/price", 899.99);
```

### View

The View defines the UI structure and layout.

**Responsibilities:**
- Define UI structure
- Display data from models
- Handle user interface elements
- Bind to model data

**Example (XML View):**
```xml
<mvc:View
    controllerName="myapp.controller.Main"
    xmlns:mvc="sap.ui.core.mvc"
    xmlns="sap.m">

    <Page title="Products">
        <content>
            <List items="{/products}">
                <StandardListItem
                    title="{name}"
                    description="{price}"
                    type="Navigation"
                    press=".onItemPress" />
            </List>
        </content>
    </Page>
</mvc:View>
```

### Controller

The Controller handles user interactions and application logic.

**Responsibilities:**
- Handle user events
- Update models
- Control navigation
- Coordinate between model and view

**Example:**
```javascript
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function(Controller, MessageToast) {
    "use strict";

    return Controller.extend("myapp.controller.Main", {

        onInit: function() {
            // Initialization logic
        },

        onItemPress: function(oEvent) {
            var oItem = oEvent.getSource();
            var sPath = oItem.getBindingContext().getPath();
            MessageToast.show("Selected: " + sPath);
        }
    });
});
```

---

## 4. Project Structure

### Standard SAPUI5 Project Layout

```
my-sapui5-app/
├── webapp/
│   ├── controller/
│   │   ├── App.controller.js
│   │   ├── Main.controller.js
│   │   └── Detail.controller.js
│   ├── view/
│   │   ├── App.view.xml
│   │   ├── Main.view.xml
│   │   └── Detail.view.xml
│   ├── model/
│   │   ├── models.js
│   │   └── formatter.js
│   ├── i18n/
│   │   ├── i18n.properties
│   │   ├── i18n_en.properties
│   │   └── i18n_de.properties
│   ├── css/
│   │   └── style.css
│   ├── test/
│   │   ├── unit/
│   │   │   └── unitTests.qunit.html
│   │   └── integration/
│   │       └── opaTests.qunit.html
│   ├── localService/
│   │   ├── metadata.xml
│   │   └── mockserver.js
│   ├── Component.js
│   ├── manifest.json
│   └── index.html
├── ui5.yaml
├── package.json
└── README.md
```

### Key Files Explained

| File/Folder | Purpose |
|-------------|---------|
| `manifest.json` | Application descriptor (configuration) |
| `Component.js` | Application component (entry point) |
| `index.html` | HTML host page |
| `controller/` | JavaScript controllers |
| `view/` | XML/JS views |
| `model/` | Helper models and formatters |
| `i18n/` | Translation files |
| `test/` | Unit and integration tests |
| `localService/` | Mock server for development |

### Component.js

The component is the central entry point for a SAPUI5 application:

```javascript
sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "myapp/model/models"
], function(UIComponent, Device, models) {
    "use strict";

    return UIComponent.extend("myapp.Component", {

        metadata: {
            manifest: "json"  // Load configuration from manifest.json
        },

        init: function() {
            // Call parent init
            UIComponent.prototype.init.apply(this, arguments);

            // Set device model
            this.setModel(models.createDeviceModel(), "device");

            // Initialize router
            this.getRouter().initialize();
        },

        destroy: function() {
            // Cleanup
            UIComponent.prototype.destroy.apply(this, arguments);
        }
    });
});
```

### index.html

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My SAPUI5 App</title>

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
         data-settings='{"id": "myapp"}'>
    </div>
</body>
</html>
```

---

## 5. Views

### View Types

SAPUI5 supports multiple view types:

| Type | Extension | Use Case |
|------|-----------|----------|
| **XML** | `.view.xml` | Recommended, declarative, clean |
| **JavaScript** | `.view.js` | Dynamic UI generation |
| **JSON** | `.view.json` | Rare, declarative JSON |
| **HTML** | `.view.html` | Legacy, not recommended |

### XML Views (Recommended)

XML Views are the standard and recommended approach:

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
                       value="{/userName}" />

                <Button text="{i18n>submit}"
                        type="Emphasized"
                        press=".onSubmit" />

                <List items="{/items}">
                    <StandardListItem title="{name}" description="{desc}" />
                </List>
            </l:VerticalLayout>
        </content>

        <footer>
            <Bar>
                <contentRight>
                    <Button text="Save" press=".onSave" />
                </contentRight>
            </Bar>
        </footer>
    </Page>
</mvc:View>
```

### JavaScript Views

For dynamic UI generation:

```javascript
sap.ui.define([
    "sap/ui/core/mvc/View",
    "sap/m/Page",
    "sap/m/Button",
    "sap/m/List",
    "sap/m/StandardListItem"
], function(View, Page, Button, List, StandardListItem) {
    "use strict";

    return View.extend("myapp.view.Dynamic", {

        getControllerName: function() {
            return "myapp.controller.Dynamic";
        },

        createContent: function(oController) {
            var oPage = new Page({
                title: "Dynamic View",
                content: [
                    new Button({
                        text: "Click Me",
                        press: [oController.onButtonPress, oController]
                    }),
                    new List({
                        items: {
                            path: "/items",
                            template: new StandardListItem({
                                title: "{name}"
                            })
                        }
                    })
                ]
            });

            return oPage;
        }
    });
});
```

### Typed Views (TypeScript)

With TypeScript support:

```typescript
import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";
import Event from "sap/ui/base/Event";

/**
 * @namespace myapp.controller
 */
export default class Main extends Controller {

    public onInit(): void {
        // Typed initialization
    }

    public onButtonPress(oEvent: Event): void {
        MessageToast.show("Button pressed!");
    }
}
```

### View Lifecycle

| Phase | Description |
|-------|-------------|
| **Loading** | View definition is loaded and parsed |
| **Initialization** | Controls are created but not rendered |
| **Rendering** | Controls are rendered to DOM |
| **Re-rendering** | Triggered by model or property changes |
| **Destruction** | View and controls are destroyed |

---

## 6. Controllers

### Controller Structure

```javascript
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], function(Controller, JSONModel, MessageBox, MessageToast) {
    "use strict";

    return Controller.extend("myapp.controller.Main", {

        /* =========================================================== */
        /* Lifecycle Methods                                           */
        /* =========================================================== */

        /**
         * Called when the controller is instantiated.
         * @public
         */
        onInit: function() {
            // Initialize local model
            var oViewModel = new JSONModel({
                busy: false,
                delay: 0,
                currency: "USD"
            });
            this.getView().setModel(oViewModel, "view");

            // Attach route matched handler
            this.getOwnerComponent().getRouter()
                .getRoute("main")
                .attachPatternMatched(this._onRouteMatched, this);
        },

        /**
         * Called before the view is rendered.
         * @public
         */
        onBeforeRendering: function() {
            // Pre-render logic
        },

        /**
         * Called after the view is rendered.
         * @public
         */
        onAfterRendering: function() {
            // DOM manipulation if needed
        },

        /**
         * Called when the controller is destroyed.
         * @public
         */
        onExit: function() {
            // Cleanup resources
        },

        /* =========================================================== */
        /* Event Handlers                                              */
        /* =========================================================== */

        /**
         * Handle button press event.
         * @param {sap.ui.base.Event} oEvent - The press event
         * @public
         */
        onButtonPress: function(oEvent) {
            var oButton = oEvent.getSource();
            MessageToast.show("Button pressed: " + oButton.getText());
        },

        /**
         * Handle list item press.
         * @param {sap.ui.base.Event} oEvent - The press event
         * @public
         */
        onListItemPress: function(oEvent) {
            var oItem = oEvent.getSource();
            var oContext = oItem.getBindingContext();
            var sId = oContext.getProperty("id");

            this.getOwnerComponent().getRouter().navTo("detail", {
                id: sId
            });
        },

        /**
         * Handle delete action.
         * @param {sap.ui.base.Event} oEvent - The press event
         * @public
         */
        onDelete: function(oEvent) {
            var that = this;

            MessageBox.confirm("Are you sure you want to delete?", {
                title: "Confirm Delete",
                onClose: function(oAction) {
                    if (oAction === MessageBox.Action.OK) {
                        that._performDelete();
                    }
                }
            });
        },

        /* =========================================================== */
        /* Private Methods                                             */
        /* =========================================================== */

        /**
         * Handle route matched event.
         * @param {sap.ui.base.Event} oEvent - The route matched event
         * @private
         */
        _onRouteMatched: function(oEvent) {
            var oArgs = oEvent.getParameter("arguments");
            this._loadData(oArgs.id);
        },

        /**
         * Load data for the view.
         * @param {string} sId - The ID to load
         * @private
         */
        _loadData: function(sId) {
            var oModel = this.getView().getModel();
            // Load data logic
        },

        /**
         * Perform the delete operation.
         * @private
         */
        _performDelete: function() {
            // Delete logic
            MessageToast.show("Item deleted");
        },

        /* =========================================================== */
        /* Helper Methods                                              */
        /* =========================================================== */

        /**
         * Get the resource bundle for i18n.
         * @returns {sap.base.i18n.ResourceBundle} The resource bundle
         * @public
         */
        getResourceBundle: function() {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle();
        },

        /**
         * Get translated text.
         * @param {string} sKey - The i18n key
         * @param {array} aArgs - Optional arguments
         * @returns {string} The translated text
         * @public
         */
        getText: function(sKey, aArgs) {
            return this.getResourceBundle().getText(sKey, aArgs);
        }
    });
});
```

### Controller Lifecycle Methods

| Method | When Called | Frequency | Use Case |
|--------|-------------|-----------|----------|
| `onInit()` | View instantiation | Once | Setup models, attach events |
| `onBeforeRendering()` | Before render | Each render | Pre-render preparations |
| `onAfterRendering()` | After render | Each render | DOM access, jQuery plugins |
| `onExit()` | View destruction | Once | Cleanup, detach events |

### Accessing View Elements

```javascript
// Get control by ID
var oInput = this.byId("myInput");

// Get the view
var oView = this.getView();

// Get owner component
var oComponent = this.getOwnerComponent();

// Get router
var oRouter = this.getOwnerComponent().getRouter();

// Get model
var oModel = this.getView().getModel();
var oNamedModel = this.getView().getModel("modelName");
```

### Base Controller Pattern

Create a reusable base controller:

```javascript
// BaseController.js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], function(Controller, History) {
    "use strict";

    return Controller.extend("myapp.controller.BaseController", {

        getRouter: function() {
            return this.getOwnerComponent().getRouter();
        },

        getModel: function(sName) {
            return this.getView().getModel(sName);
        },

        setModel: function(oModel, sName) {
            return this.getView().setModel(oModel, sName);
        },

        getResourceBundle: function() {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle();
        },

        onNavBack: function() {
            var sPreviousHash = History.getInstance().getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                this.getRouter().navTo("main", {}, true);
            }
        }
    });
});
```

Usage in other controllers:

```javascript
sap.ui.define([
    "myapp/controller/BaseController"
], function(BaseController) {
    "use strict";

    return BaseController.extend("myapp.controller.Detail", {
        onInit: function() {
            // Use inherited methods
            this.getRouter().getRoute("detail")
                .attachPatternMatched(this._onPatternMatched, this);
        },

        onBack: function() {
            this.onNavBack();  // From BaseController
        }
    });
});
```

---

## 7. Models

### Model Types Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        SAPUI5 Models                         │
├────────────────┬────────────────┬────────────────┬──────────┤
│   JSON Model   │   XML Model    │   OData Model  │ Resource │
│  (Client-Side) │  (Client-Side) │  (Server-Side) │  Model   │
├────────────────┼────────────────┼────────────────┼──────────┤
│ Small datasets │ XML data       │ SAP backends   │ i18n     │
│ Local data     │ Legacy systems │ Large datasets │ texts    │
│ Two-way bind   │ One-way bind   │ CRUD ops       │ Static   │
└────────────────┴────────────────┴────────────────┴──────────┘
```

### JSON Model

Most commonly used for client-side data:

```javascript
sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function(JSONModel) {
    "use strict";

    // Create with initial data
    var oModel = new JSONModel({
        products: [],
        selectedProduct: null,
        settings: {
            currency: "USD",
            showDetails: true
        }
    });

    // Set size limit (default is 100)
    oModel.setSizeLimit(1000);

    // Set default binding mode
    oModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);

    // Load from URL
    oModel.loadData("./model/data.json");

    // Load with callback
    oModel.loadData("./model/data.json").then(function() {
        console.log("Data loaded");
    });

    // Get property
    var sValue = oModel.getProperty("/settings/currency");

    // Set property
    oModel.setProperty("/selectedProduct", { id: "1", name: "Test" });

    // Get entire data
    var oData = oModel.getData();

    // Set entire data
    oModel.setData({ newData: true });

    // Merge data
    oModel.setData({ additionalProp: "value" }, true);  // merge = true

    return oModel;
});
```

### OData V2 Model

For SAP backend integration:

```javascript
sap.ui.define([
    "sap/ui/model/odata/v2/ODataModel"
], function(ODataModel) {
    "use strict";

    // Create OData V2 Model
    var oModel = new ODataModel({
        serviceUrl: "/sap/opu/odata/sap/ZPRODUCT_SRV/",
        defaultBindingMode: sap.ui.model.BindingMode.TwoWay,
        useBatch: true,
        defaultCountMode: sap.ui.model.odata.CountMode.Inline
    });

    // Read operation
    oModel.read("/Products", {
        urlParameters: {
            "$top": 10,
            "$skip": 0,
            "$orderby": "Name"
        },
        filters: [
            new sap.ui.model.Filter("Category", sap.ui.model.FilterOperator.EQ, "Electronics")
        ],
        success: function(oData) {
            console.log("Products:", oData.results);
        },
        error: function(oError) {
            console.error("Error:", oError);
        }
    });

    // Create operation
    oModel.create("/Products", {
        Name: "New Product",
        Price: 99.99
    }, {
        success: function(oData) {
            console.log("Created:", oData);
        },
        error: function(oError) {
            console.error("Error:", oError);
        }
    });

    // Update operation
    oModel.update("/Products('123')", {
        Price: 89.99
    }, {
        success: function() {
            console.log("Updated");
        }
    });

    // Delete operation
    oModel.remove("/Products('123')", {
        success: function() {
            console.log("Deleted");
        }
    });

    // Batch operations
    oModel.setDeferredGroups(["batchGroup"]);

    oModel.create("/Products", product1, { groupId: "batchGroup" });
    oModel.create("/Products", product2, { groupId: "batchGroup" });

    oModel.submitChanges({
        groupId: "batchGroup",
        success: function() {
            console.log("Batch completed");
        }
    });

    return oModel;
});
```

### OData V4 Model

Modern OData standard:

```javascript
sap.ui.define([
    "sap/ui/model/odata/v4/ODataModel"
], function(ODataModel) {
    "use strict";

    // Create OData V4 Model
    var oModel = new ODataModel({
        serviceUrl: "/sap/opu/odata4/sap/API_PRODUCT/",
        synchronizationMode: "None",
        groupId: "$auto",
        autoExpandSelect: true
    });

    // V4 uses binding-based operations
    // Create in controller:
    var oListBinding = oModel.bindList("/Products");

    // Create new entry
    var oContext = oListBinding.create({
        Name: "New Product",
        Price: 99.99
    });

    // Wait for creation
    oContext.created().then(function() {
        console.log("Created successfully");
    });

    // Delete
    oContext.delete();

    return oModel;
});
```

### Resource Model (i18n)

For translations:

```javascript
sap.ui.define([
    "sap/ui/model/resource/ResourceModel"
], function(ResourceModel) {
    "use strict";

    var oModel = new ResourceModel({
        bundleName: "myapp.i18n.i18n",
        supportedLocales: ["en", "de", "fr"],
        fallbackLocale: "en"
    });

    // Get resource bundle
    var oBundle = oModel.getResourceBundle();

    // Get text
    var sText = oBundle.getText("welcomeMessage", ["John"]);

    return oModel;
});
```

### Model Binding Modes

| Mode | Direction | Description |
|------|-----------|-------------|
| `OneWay` | Model → View | View reflects model changes |
| `TwoWay` | Model ↔ View | Bidirectional synchronization |
| `OneTime` | Model → View (once) | Initial value only |

```javascript
// Set default binding mode for model
oModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);

// Set binding mode for specific binding in XML
// {path: '/name', mode: 'OneWay'}
```

---

## 8. Data Binding

### Binding Syntax

#### Simple Property Binding
```xml
<!-- Absolute path -->
<Text text="{/company/name}" />

<!-- Relative path (requires element binding context) -->
<Text text="{name}" />

<!-- Named model -->
<Text text="{myModel>/company/name}" />
```

#### Complex Binding Syntax
```xml
<!-- With binding options -->
<Text text="{
    path: '/date',
    type: 'sap.ui.model.type.Date',
    formatOptions: { style: 'long' }
}" />
```

### Property Binding

Bind a control property to model data:

```xml
<Input value="{/userName}" />
<Text text="{/userDetails/email}" />
<CheckBox selected="{/settings/notifications}" />
```

In JavaScript:
```javascript
var oInput = new sap.m.Input({
    value: "{/userName}"
});

// Or using bindProperty
oInput.bindProperty("value", {
    path: "/userName",
    type: new sap.ui.model.type.String()
});
```

### Aggregation Binding

Bind collections to list controls:

```xml
<List items="{/products}">
    <StandardListItem
        title="{name}"
        description="{description}"
        info="{price}"
        type="Navigation" />
</List>

<!-- With sorting and filtering -->
<List items="{
    path: '/products',
    sorter: { path: 'name' },
    filters: [{ path: 'active', operator: 'EQ', value1: true }]
}">
    <StandardListItem title="{name}" />
</List>
```

In JavaScript:
```javascript
var oList = new sap.m.List();

oList.bindAggregation("items", {
    path: "/products",
    template: new sap.m.StandardListItem({
        title: "{name}",
        description: "{price}"
    }),
    sorter: new sap.ui.model.Sorter("name"),
    filters: [
        new sap.ui.model.Filter("active", sap.ui.model.FilterOperator.EQ, true)
    ]
});
```

### Element Binding (Context Binding)

Bind a context to a container:

```xml
<VBox binding="{/products/0}">
    <Text text="{name}" />
    <Text text="{price}" />
</VBox>
```

In JavaScript:
```javascript
this.getView().bindElement({
    path: "/products/0",
    events: {
        change: this._onBindingChange.bind(this),
        dataRequested: function() {
            // Show busy indicator
        },
        dataReceived: function() {
            // Hide busy indicator
        }
    }
});
```

### Data Types

SAPUI5 provides built-in data types for formatting and validation:

```xml
<!-- String with constraints -->
<Input value="{
    path: '/name',
    type: 'sap.ui.model.type.String',
    constraints: { minLength: 2, maxLength: 50 }
}" />

<!-- Integer -->
<Input value="{
    path: '/quantity',
    type: 'sap.ui.model.type.Integer',
    constraints: { minimum: 0, maximum: 100 }
}" />

<!-- Float/Currency -->
<Text text="{
    path: '/price',
    type: 'sap.ui.model.type.Currency',
    formatOptions: { showMeasure: false }
}" />

<!-- Date -->
<DatePicker value="{
    path: '/birthDate',
    type: 'sap.ui.model.type.Date',
    formatOptions: { pattern: 'yyyy-MM-dd' }
}" />

<!-- DateTime -->
<DateTimePicker value="{
    path: '/createdAt',
    type: 'sap.ui.model.type.DateTime'
}" />
```

### Composite Binding

Combine multiple model values:

```xml
<!-- Simple concatenation -->
<Text text="{/firstName} {/lastName}" />

<!-- With formatter -->
<Text text="{
    parts: [
        { path: '/firstName' },
        { path: '/lastName' }
    ],
    formatter: '.formatFullName'
}" />

<!-- Currency with amount and currency code -->
<Text text="{
    parts: [
        { path: '/amount' },
        { path: '/currency' }
    ],
    type: 'sap.ui.model.type.Currency'
}" />
```

Controller formatter:
```javascript
formatFullName: function(sFirstName, sLastName) {
    return sFirstName + " " + sLastName;
}
```

---

## 9. Controls Library

### Control Categories

#### Layout Controls (`sap.ui.layout`)

```xml
<!-- VerticalLayout -->
<l:VerticalLayout>
    <Text text="Item 1" />
    <Text text="Item 2" />
</l:VerticalLayout>

<!-- HorizontalLayout -->
<l:HorizontalLayout>
    <Button text="Left" />
    <Button text="Right" />
</l:HorizontalLayout>

<!-- Grid -->
<l:Grid defaultSpan="L4 M6 S12">
    <Text text="Cell 1" />
    <Text text="Cell 2" />
    <Text text="Cell 3" />
</l:Grid>

<!-- Form Layout -->
<f:SimpleForm editable="true" layout="ResponsiveGridLayout">
    <f:content>
        <Label text="Name" />
        <Input value="{/name}" />
        <Label text="Email" />
        <Input value="{/email}" />
    </f:content>
</f:SimpleForm>
```

#### Container Controls (`sap.m`)

```xml
<!-- Page -->
<Page title="My Page" showNavButton="true" navButtonPress=".onNavBack">
    <content>
        <!-- Page content -->
    </content>
</Page>

<!-- Panel -->
<Panel headerText="Details" expandable="true" expanded="true">
    <content>
        <Text text="Panel content" />
    </content>
</Panel>

<!-- IconTabBar -->
<IconTabBar>
    <items>
        <IconTabFilter text="Tab 1" key="tab1">
            <Text text="Content 1" />
        </IconTabFilter>
        <IconTabFilter text="Tab 2" key="tab2">
            <Text text="Content 2" />
        </IconTabFilter>
    </items>
</IconTabBar>

<!-- Dialog -->
<Dialog id="myDialog" title="Confirm">
    <content>
        <Text text="Are you sure?" />
    </content>
    <buttons>
        <Button text="OK" press=".onConfirm" />
        <Button text="Cancel" press=".onCancel" />
    </buttons>
</Dialog>
```

#### Input Controls

```xml
<!-- Input -->
<Input value="{/name}" placeholder="Enter name" />

<!-- TextArea -->
<TextArea value="{/description}" rows="5" />

<!-- Select -->
<Select selectedKey="{/selectedCountry}">
    <items>
        <core:Item key="US" text="United States" />
        <core:Item key="DE" text="Germany" />
    </items>
</Select>

<!-- ComboBox -->
<ComboBox selectedKey="{/city}" items="{/cities}">
    <core:Item key="{key}" text="{name}" />
</ComboBox>

<!-- MultiComboBox -->
<MultiComboBox selectedKeys="{/selectedTags}" items="{/tags}">
    <core:Item key="{id}" text="{name}" />
</MultiComboBox>

<!-- DatePicker -->
<DatePicker value="{/date}" valueFormat="yyyy-MM-dd" displayFormat="long" />

<!-- TimePicker -->
<TimePicker value="{/time}" valueFormat="HH:mm" />

<!-- Slider -->
<Slider value="{/volume}" min="0" max="100" />

<!-- Switch -->
<Switch state="{/isActive}" customTextOn="Yes" customTextOff="No" />

<!-- RadioButtonGroup -->
<RadioButtonGroup selectedIndex="{/selectedOption}">
    <buttons>
        <RadioButton text="Option 1" />
        <RadioButton text="Option 2" />
    </buttons>
</RadioButtonGroup>
```

#### List Controls

```xml
<!-- List with StandardListItem -->
<List items="{/products}" mode="SingleSelectMaster">
    <StandardListItem
        title="{name}"
        description="{description}"
        icon="{icon}"
        info="{status}"
        type="Navigation"
        press=".onItemPress" />
</List>

<!-- List with ObjectListItem -->
<List items="{/orders}">
    <ObjectListItem
        title="{orderNumber}"
        number="{amount}"
        numberUnit="{currency}">
        <firstStatus>
            <ObjectStatus text="{status}" state="{statusState}" />
        </firstStatus>
        <attributes>
            <ObjectAttribute text="{customer}" />
            <ObjectAttribute text="{date}" />
        </attributes>
    </ObjectListItem>
</List>

<!-- Table -->
<Table items="{/employees}">
    <columns>
        <Column><Text text="Name" /></Column>
        <Column><Text text="Department" /></Column>
        <Column hAlign="End"><Text text="Salary" /></Column>
    </columns>
    <items>
        <ColumnListItem>
            <Text text="{name}" />
            <Text text="{department}" />
            <Text text="{salary}" />
        </ColumnListItem>
    </items>
</Table>
```

#### Display Controls

```xml
<!-- Text -->
<Text text="{/message}" maxLines="2" />

<!-- FormattedText -->
<FormattedText htmlText="&lt;strong&gt;Bold&lt;/strong&gt; text" />

<!-- Title -->
<Title text="{/pageTitle}" level="H1" />

<!-- Label -->
<Label text="Name" required="true" labelFor="nameInput" />

<!-- ObjectHeader -->
<ObjectHeader
    title="{/product/name}"
    number="{/product/price}"
    numberUnit="USD">
    <statuses>
        <ObjectStatus text="Available" state="Success" />
    </statuses>
</ObjectHeader>

<!-- ObjectStatus -->
<ObjectStatus text="{status}" state="{= ${status} === 'Active' ? 'Success' : 'Error'}" />

<!-- ProgressIndicator -->
<ProgressIndicator percentValue="{/progress}" displayValue="{/progress}%" />

<!-- BusyIndicator -->
<BusyIndicator size="Large" />
```

---

## 10. manifest.json (App Descriptor)

The `manifest.json` is the central configuration file for SAPUI5 applications.

### Complete Example

```json
{
    "_version": "1.42.0",

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
        },
        "crossNavigation": {
            "inbounds": {
                "displayProducts": {
                    "semanticObject": "Product",
                    "action": "display",
                    "signature": {
                        "parameters": {},
                        "additionalParameters": "allowed"
                    }
                }
            }
        }
    },

    "sap.ui": {
        "technology": "UI5",
        "icons": {
            "icon": "sap-icon://product",
            "favIcon": "icon/favicon.ico"
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
            "viewName": "com.mycompany.myapp.view.App",
            "type": "XML",
            "async": true,
            "id": "app"
        },
        "dependencies": {
            "minUI5Version": "1.108.0",
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
                    "bundleName": "com.mycompany.myapp.i18n.i18n",
                    "supportedLocales": ["en", "de"],
                    "fallbackLocale": "en"
                }
            },
            "": {
                "dataSource": "mainService",
                "preload": true,
                "settings": {
                    "defaultBindingMode": "TwoWay",
                    "defaultCountMode": "Inline",
                    "refreshAfterChange": false
                }
            },
            "device": {
                "type": "sap.ui.model.json.JSONModel",
                "settings": {
                    "data": {}
                },
                "preload": true
            }
        },
        "resources": {
            "css": [
                {
                    "uri": "css/style.css"
                }
            ]
        },
        "routing": {
            "config": {
                "routerClass": "sap.m.routing.Router",
                "viewType": "XML",
                "viewPath": "com.mycompany.myapp.view",
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
                },
                {
                    "name": "create",
                    "pattern": "product/create",
                    "target": "create"
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
                "create": {
                    "viewName": "Create",
                    "viewLevel": 2
                },
                "notFound": {
                    "viewName": "NotFound",
                    "viewLevel": 3
                }
            }
        }
    },

    "sap.platform.abap": {
        "uri": "/sap/bc/ui5_ui5/sap/zproduct_app"
    }
}
```

### Key Sections Explained

| Section | Purpose |
|---------|---------|
| `sap.app` | General app info, data sources, cross-navigation |
| `sap.ui` | UI technology, icons, device types |
| `sap.ui5` | UI5-specific: models, routing, dependencies |
| `sap.platform.abap` | ABAP deployment settings |
| `sap.platform.hcp` | SAP BTP deployment settings |

---

## 11. Routing and Navigation

### Configuration

Routing is configured in `manifest.json` under `sap.ui5.routing`:

```json
{
    "sap.ui5": {
        "routing": {
            "config": {
                "routerClass": "sap.m.routing.Router",
                "viewType": "XML",
                "viewPath": "myapp.view",
                "controlId": "app",
                "controlAggregation": "pages",
                "async": true
            },
            "routes": [
                {
                    "name": "home",
                    "pattern": "",
                    "target": "home"
                },
                {
                    "name": "productList",
                    "pattern": "products",
                    "target": "productList"
                },
                {
                    "name": "productDetail",
                    "pattern": "products/{productId}",
                    "target": "productDetail"
                },
                {
                    "name": "productEdit",
                    "pattern": "products/{productId}/edit",
                    "target": "productEdit"
                },
                {
                    "name": "search",
                    "pattern": "search:?query:",
                    "target": "search"
                }
            ],
            "targets": {
                "home": {
                    "viewName": "Home",
                    "viewLevel": 1
                },
                "productList": {
                    "viewName": "ProductList",
                    "viewLevel": 2
                },
                "productDetail": {
                    "viewName": "ProductDetail",
                    "viewLevel": 3
                },
                "productEdit": {
                    "viewName": "ProductEdit",
                    "viewLevel": 3
                },
                "search": {
                    "viewName": "Search",
                    "viewLevel": 2
                }
            }
        }
    }
}
```

### Route Patterns

| Pattern | Example URL | Parameters |
|---------|-------------|------------|
| `""` | `#/` | None |
| `products` | `#/products` | None |
| `products/{id}` | `#/products/123` | `id: "123"` |
| `products/{id}/edit` | `#/products/123/edit` | `id: "123"` |
| `search:?query:` | `#/search?query=test` | `query: "test"` (optional) |
| `*path` | `#/any/path/here` | `path: "any/path/here"` |

### Navigation in Controller

```javascript
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], function(Controller, History) {
    "use strict";

    return Controller.extend("myapp.controller.Main", {

        onInit: function() {
            // Attach route matched handler
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("productDetail")
                .attachPatternMatched(this._onProductMatched, this);
        },

        // Navigate to a route
        onNavigateToDetail: function(oEvent) {
            var oItem = oEvent.getSource();
            var sProductId = oItem.getBindingContext().getProperty("ProductID");

            this.getOwnerComponent().getRouter().navTo("productDetail", {
                productId: sProductId
            });
        },

        // Navigate with query parameters
        onSearch: function(sQuery) {
            this.getOwnerComponent().getRouter().navTo("search", {
                "?query": {
                    search: sQuery,
                    page: 1
                }
            });
        },

        // Navigate back
        onNavBack: function() {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                this.getOwnerComponent().getRouter().navTo("home", {}, true);
            }
        },

        // Handle route matched
        _onProductMatched: function(oEvent) {
            var sProductId = oEvent.getParameter("arguments").productId;

            // Bind element to the view
            this.getView().bindElement({
                path: "/Products('" + sProductId + "')",
                events: {
                    change: this._onBindingChange.bind(this),
                    dataRequested: function() {
                        this.getView().setBusy(true);
                    }.bind(this),
                    dataReceived: function() {
                        this.getView().setBusy(false);
                    }.bind(this)
                }
            });
        },

        _onBindingChange: function() {
            var oView = this.getView();
            var oContext = oView.getBindingContext();

            if (!oContext) {
                // Product not found - navigate to not found page
                this.getOwnerComponent().getRouter()
                    .getTargets()
                    .display("notFound");
            }
        }
    });
});
```

### Hash Changer

Direct hash manipulation (use sparingly):

```javascript
var oHashChanger = sap.ui.core.routing.HashChanger.getInstance();

// Get current hash
var sHash = oHashChanger.getHash();

// Set hash
oHashChanger.setHash("products/123");

// Replace hash (no history entry)
oHashChanger.replaceHash("products/456");
```

### Cross-Application Navigation (Fiori Launchpad)

```javascript
// Navigate to external app
var oCrossAppNav = sap.ushell.Container.getService("CrossApplicationNavigation");

oCrossAppNav.toExternal({
    target: {
        semanticObject: "SalesOrder",
        action: "display"
    },
    params: {
        orderNumber: "12345"
    }
});

// Check if navigation is supported
oCrossAppNav.isNavigationSupported([{
    target: {
        semanticObject: "SalesOrder",
        action: "display"
    }
}]).done(function(aResults) {
    if (aResults[0].supported) {
        // Navigation is supported
    }
});

// Generate external link
oCrossAppNav.hrefForExternal({
    target: {
        semanticObject: "SalesOrder",
        action: "display"
    },
    params: {
        orderNumber: "12345"
    }
});
```

---

## 12. Fragments

Fragments are reusable UI pieces that don't have their own controller. They use the controller of the hosting view.

### XML Fragment

**Dialog.fragment.xml:**
```xml
<core:FragmentDefinition
    xmlns="sap.m"
    xmlns:core="sap.ui.core">

    <Dialog id="confirmDialog" title="{i18n>confirmTitle}">
        <content>
            <VBox class="sapUiSmallMargin">
                <Text text="{i18n>confirmMessage}" />
                <Input id="reasonInput"
                       placeholder="{i18n>enterReason}"
                       value="{/reason}" />
            </VBox>
        </content>
        <beginButton>
            <Button text="{i18n>confirm}"
                    type="Emphasized"
                    press=".onConfirmDialog" />
        </beginButton>
        <endButton>
            <Button text="{i18n>cancel}"
                    press=".onCancelDialog" />
        </endButton>
    </Dialog>

</core:FragmentDefinition>
```

**ProductCard.fragment.xml:**
```xml
<core:FragmentDefinition
    xmlns="sap.m"
    xmlns:core="sap.ui.core"
    xmlns:f="sap.f">

    <f:Card>
        <f:header>
            <f:cards.Header
                title="{name}"
                subtitle="{category}"
                iconSrc="sap-icon://product" />
        </f:header>
        <f:content>
            <VBox class="sapUiSmallMargin">
                <ObjectStatus text="{status}" state="{statusState}" />
                <Text text="{description}" maxLines="3" />
                <HBox justifyContent="SpaceBetween">
                    <Text text="{price} {currency}" />
                    <Button icon="sap-icon://cart" press=".onAddToCart" />
                </HBox>
            </VBox>
        </f:content>
    </f:Card>

</core:FragmentDefinition>
```

### Loading Fragments

#### Lazy Loading (Recommended)

```javascript
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
], function(Controller, Fragment) {
    "use strict";

    return Controller.extend("myapp.controller.Main", {

        _pDialog: null,

        onOpenDialog: function() {
            var oView = this.getView();

            // Lazy load - create only once
            if (!this._pDialog) {
                this._pDialog = Fragment.load({
                    id: oView.getId(),
                    name: "myapp.view.fragments.Dialog",
                    controller: this
                }).then(function(oDialog) {
                    // Add as dependent for lifecycle management
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }

            this._pDialog.then(function(oDialog) {
                oDialog.open();
            });
        },

        onConfirmDialog: function() {
            // Handle confirm
            this._closeDialog();
        },

        onCancelDialog: function() {
            this._closeDialog();
        },

        _closeDialog: function() {
            this.byId("confirmDialog").close();
        }
    });
});
```

#### Inline Fragment in XML View

```xml
<mvc:View
    xmlns:mvc="sap.ui.core.mvc"
    xmlns="sap.m"
    xmlns:core="sap.ui.core">

    <Page>
        <content>
            <!-- Inline fragment -->
            <core:Fragment fragmentName="myapp.view.fragments.ProductCard" type="XML" />
        </content>
    </Page>

</mvc:View>
```

### Fragment vs View

| Aspect | Fragment | View |
|--------|----------|------|
| **Controller** | Uses host controller | Has own controller |
| **Lifecycle** | Managed by host | Independent |
| **Routing** | Cannot be routed to | Can be routing target |
| **Use Case** | Reusable UI pieces | Full pages/screens |

### Best Practices

1. **Use fragments for dialogs, popovers, and reusable UI pieces**
2. **Always add fragments as dependents** for proper lifecycle management
3. **Lazy load fragments** to improve initial load time
4. **Use view ID prefix** when accessing fragment controls: `this.byId("fragmentControlId")`

---

## 13. Internationalization (i18n)

### File Structure

```
webapp/
  i18n/
    i18n.properties          # Default (fallback)
    i18n_en.properties       # English
    i18n_en_US.properties    # US English
    i18n_de.properties       # German
    i18n_fr.properties       # French
    i18n_ja.properties       # Japanese
```

### Resource Bundle Format

**i18n.properties (default):**
```properties
# App Titles
appTitle=Product Management
appDescription=Manage your products efficiently

# Common Actions
save=Save
cancel=Cancel
delete=Delete
edit=Edit
create=Create

# Messages
welcomeMessage=Welcome, {0}!
itemCount=You have {0} item(s)
confirmDelete=Are you sure you want to delete "{0}"?

# Validation
requiredField=This field is required
invalidEmail=Please enter a valid email address
minLength=Minimum {0} characters required

# Product
productName=Product Name
productDescription=Description
productPrice=Price
productCategory=Category
productStatus=Status

# Status
statusActive=Active
statusInactive=Inactive
statusPending=Pending
```

**i18n_de.properties:**
```properties
# App Titles
appTitle=Produktverwaltung
appDescription=Verwalten Sie Ihre Produkte effizient

# Common Actions
save=Speichern
cancel=Abbrechen
delete=Löschen
edit=Bearbeiten
create=Erstellen

# Messages
welcomeMessage=Willkommen, {0}!
itemCount=Sie haben {0} Artikel
confirmDelete=Möchten Sie "{0}" wirklich löschen?
```

### Configuration in manifest.json

```json
{
    "sap.ui5": {
        "models": {
            "i18n": {
                "type": "sap.ui.model.resource.ResourceModel",
                "settings": {
                    "bundleName": "myapp.i18n.i18n",
                    "supportedLocales": ["en", "de", "fr", "ja"],
                    "fallbackLocale": "en",
                    "async": true
                }
            }
        }
    }
}
```

### Using in XML Views

```xml
<mvc:View
    xmlns:mvc="sap.ui.core.mvc"
    xmlns="sap.m">

    <Page title="{i18n>appTitle}">
        <content>
            <Label text="{i18n>productName}" />
            <Input placeholder="{i18n>productName}" />

            <Button text="{i18n>save}" press=".onSave" />
            <Button text="{i18n>cancel}" press=".onCancel" />
        </content>
    </Page>

</mvc:View>
```

### Using in Controllers

```javascript
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], function(Controller, MessageBox) {
    "use strict";

    return Controller.extend("myapp.controller.Main", {

        getResourceBundle: function() {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle();
        },

        getText: function(sKey, aArgs) {
            return this.getResourceBundle().getText(sKey, aArgs);
        },

        onDelete: function() {
            var sProductName = this.getView().getModel().getProperty("/name");
            var sMessage = this.getText("confirmDelete", [sProductName]);

            MessageBox.confirm(sMessage, {
                title: this.getText("delete"),
                onClose: function(oAction) {
                    if (oAction === MessageBox.Action.OK) {
                        this._performDelete();
                    }
                }.bind(this)
            });
        },

        showWelcome: function(sUserName) {
            var sMessage = this.getText("welcomeMessage", [sUserName]);
            sap.m.MessageToast.show(sMessage);
        }
    });
});
```

### Language Determination

SAPUI5 determines language in this order:
1. URL parameter: `?sap-language=de`
2. Configuration in bootstrap
3. Browser language setting
4. Fallback locale

### Date, Number, and Currency Formatting

```xml
<!-- Date formatting -->
<Text text="{
    path: '/createdAt',
    type: 'sap.ui.model.type.Date',
    formatOptions: { style: 'long' }
}" />

<!-- Number formatting -->
<Text text="{
    path: '/quantity',
    type: 'sap.ui.model.type.Integer',
    formatOptions: { groupingEnabled: true }
}" />

<!-- Currency formatting -->
<Text text="{
    parts: ['/price', '/currency'],
    type: 'sap.ui.model.type.Currency',
    formatOptions: { showMeasure: true }
}" />
```

---

## 14. Custom Controls

### Creating a Custom Control

**controls/RatingIndicator.js:**
```javascript
sap.ui.define([
    "sap/ui/core/Control",
    "sap/ui/core/Icon"
], function(Control, Icon) {
    "use strict";

    return Control.extend("myapp.controls.RatingIndicator", {

        metadata: {
            // Properties
            properties: {
                value: {
                    type: "float",
                    defaultValue: 0
                },
                maxValue: {
                    type: "int",
                    defaultValue: 5
                },
                editable: {
                    type: "boolean",
                    defaultValue: true
                },
                iconSize: {
                    type: "sap.ui.core.CSSSize",
                    defaultValue: "1rem"
                }
            },

            // Aggregations
            aggregations: {
                _icons: {
                    type: "sap.ui.core.Icon",
                    multiple: true,
                    visibility: "hidden"
                }
            },

            // Events
            events: {
                change: {
                    parameters: {
                        value: { type: "float" }
                    }
                }
            }
        },

        // Lifecycle: Initialize
        init: function() {
            // Create icons
            this._createIcons();
        },

        // Create star icons
        _createIcons: function() {
            var iMaxValue = this.getMaxValue();

            for (var i = 0; i < iMaxValue; i++) {
                var oIcon = new Icon({
                    src: "sap-icon://favorite",
                    press: this._onIconPress.bind(this, i + 1)
                });
                this.addAggregation("_icons", oIcon);
            }
        },

        // Handle icon press
        _onIconPress: function(iValue) {
            if (this.getEditable()) {
                this.setValue(iValue);
                this.fireChange({ value: iValue });
            }
        },

        // Lifecycle: Before rendering
        onBeforeRendering: function() {
            this._updateIcons();
        },

        // Update icon states
        _updateIcons: function() {
            var fValue = this.getValue();
            var aIcons = this.getAggregation("_icons") || [];

            aIcons.forEach(function(oIcon, iIndex) {
                if (iIndex < fValue) {
                    oIcon.setColor("#f0ab00");  // Filled
                } else {
                    oIcon.setColor("#cccccc");  // Empty
                }
                oIcon.setSize(this.getIconSize());
            }.bind(this));
        },

        // Renderer
        renderer: {
            apiVersion: 2,

            render: function(oRm, oControl) {
                oRm.openStart("div", oControl);
                oRm.class("myRatingIndicator");

                if (!oControl.getEditable()) {
                    oRm.class("myRatingIndicatorReadOnly");
                }

                oRm.openEnd();

                // Render icons
                var aIcons = oControl.getAggregation("_icons") || [];
                aIcons.forEach(function(oIcon) {
                    oRm.renderControl(oIcon);
                });

                oRm.close("div");
            }
        },

        // Lifecycle: Exit (cleanup)
        exit: function() {
            // Cleanup if needed
        }
    });
});
```

**CSS for the control (css/RatingIndicator.css):**
```css
.myRatingIndicator {
    display: inline-flex;
    gap: 0.25rem;
    cursor: pointer;
}

.myRatingIndicator .sapUiIcon {
    transition: transform 0.2s, color 0.2s;
}

.myRatingIndicator .sapUiIcon:hover {
    transform: scale(1.2);
}

.myRatingIndicatorReadOnly {
    cursor: default;
}

.myRatingIndicatorReadOnly .sapUiIcon:hover {
    transform: none;
}
```

### Using the Custom Control

```xml
<mvc:View
    xmlns:mvc="sap.ui.core.mvc"
    xmlns="sap.m"
    xmlns:custom="myapp.controls">

    <Page>
        <content>
            <custom:RatingIndicator
                value="{/product/rating}"
                maxValue="5"
                editable="true"
                change=".onRatingChange" />
        </content>
    </Page>

</mvc:View>
```

### Extending Existing Controls

```javascript
sap.ui.define([
    "sap/m/Input"
], function(Input) {
    "use strict";

    return Input.extend("myapp.controls.EmailInput", {

        metadata: {
            properties: {
                validateOnChange: {
                    type: "boolean",
                    defaultValue: true
                }
            }
        },

        init: function() {
            Input.prototype.init.apply(this, arguments);

            this.setType("Email");
            this.setPlaceholder("Enter email address");

            this.attachLiveChange(this._onLiveChange.bind(this));
        },

        _onLiveChange: function(oEvent) {
            if (this.getValidateOnChange()) {
                this._validateEmail();
            }
        },

        _validateEmail: function() {
            var sValue = this.getValue();
            var rEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (sValue && !rEmail.test(sValue)) {
                this.setValueState("Error");
                this.setValueStateText("Invalid email format");
            } else {
                this.setValueState("None");
                this.setValueStateText("");
            }
        },

        renderer: {}  // Use parent renderer
    });
});
```

### Control Lifecycle Hooks

| Hook | Called | Use Case |
|------|--------|----------|
| `init()` | Once at instantiation | Create internal controls |
| `onBeforeRendering()` | Before each render | Update states |
| `onAfterRendering()` | After each render | DOM operations |
| `exit()` | At destruction | Cleanup resources |

---

## 15. OData Integration

### OData V2 vs V4

| Feature | OData V2 | OData V4 |
|---------|----------|----------|
| **Model Class** | `sap.ui.model.odata.v2.ODataModel` | `sap.ui.model.odata.v4.ODataModel` |
| **Batch Mode** | Deferred groups | Auto batching |
| **CRUD** | Model methods (read, create, update) | Binding-based |
| **Count** | $inlinecount | $count |
| **Supported** | Most SAP systems | Newer SAP systems |

### OData V2 Complete Example

```javascript
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function(Controller, ODataModel, Filter, FilterOperator, Sorter, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("myapp.controller.Products", {

        onInit: function() {
            // Model is usually set from Component via manifest.json
        },

        /* =========================================================== */
        /* READ Operations                                             */
        /* =========================================================== */

        // Read entity set
        onLoadProducts: function() {
            var oModel = this.getView().getModel();

            oModel.read("/Products", {
                urlParameters: {
                    "$top": 20,
                    "$skip": 0,
                    "$orderby": "Name asc",
                    "$expand": "Category,Supplier"
                },
                success: function(oData) {
                    console.log("Products:", oData.results);
                },
                error: function(oError) {
                    MessageBox.error("Failed to load products");
                }
            });
        },

        // Read single entity
        onLoadProduct: function(sProductId) {
            var oModel = this.getView().getModel();

            oModel.read("/Products('" + sProductId + "')", {
                urlParameters: {
                    "$expand": "Category,Supplier,Reviews"
                },
                success: function(oData) {
                    console.log("Product:", oData);
                },
                error: function(oError) {
                    MessageBox.error("Product not found");
                }
            });
        },

        // Read with filters
        onSearchProducts: function(sQuery) {
            var oModel = this.getView().getModel();
            var aFilters = [];

            if (sQuery) {
                aFilters.push(new Filter({
                    filters: [
                        new Filter("Name", FilterOperator.Contains, sQuery),
                        new Filter("Description", FilterOperator.Contains, sQuery)
                    ],
                    and: false  // OR condition
                }));
            }

            aFilters.push(new Filter("Discontinued", FilterOperator.EQ, false));

            oModel.read("/Products", {
                filters: aFilters,
                sorters: [new Sorter("Name", false)],
                success: function(oData) {
                    console.log("Search results:", oData.results);
                }
            });
        },

        /* =========================================================== */
        /* CREATE Operations                                           */
        /* =========================================================== */

        onCreateProduct: function() {
            var oModel = this.getView().getModel();

            var oNewProduct = {
                Name: "New Product",
                Description: "Product description",
                Price: "99.99",
                CategoryID: "1",
                Discontinued: false
            };

            oModel.create("/Products", oNewProduct, {
                success: function(oData) {
                    MessageToast.show("Product created: " + oData.ProductID);
                },
                error: function(oError) {
                    MessageBox.error("Failed to create product");
                }
            });
        },

        /* =========================================================== */
        /* UPDATE Operations                                           */
        /* =========================================================== */

        onUpdateProduct: function(sProductId, oChanges) {
            var oModel = this.getView().getModel();
            var sPath = "/Products('" + sProductId + "')";

            // PATCH - partial update
            oModel.update(sPath, oChanges, {
                success: function() {
                    MessageToast.show("Product updated");
                },
                error: function(oError) {
                    MessageBox.error("Failed to update product");
                }
            });
        },

        /* =========================================================== */
        /* DELETE Operations                                           */
        /* =========================================================== */

        onDeleteProduct: function(sProductId) {
            var oModel = this.getView().getModel();
            var sPath = "/Products('" + sProductId + "')";

            MessageBox.confirm("Delete this product?", {
                onClose: function(oAction) {
                    if (oAction === MessageBox.Action.OK) {
                        oModel.remove(sPath, {
                            success: function() {
                                MessageToast.show("Product deleted");
                            },
                            error: function(oError) {
                                MessageBox.error("Failed to delete product");
                            }
                        });
                    }
                }
            });
        },

        /* =========================================================== */
        /* BATCH Operations                                            */
        /* =========================================================== */

        onBatchUpdate: function(aProducts) {
            var oModel = this.getView().getModel();

            // Create batch group
            oModel.setDeferredGroups(["productBatch"]);

            // Queue operations
            aProducts.forEach(function(oProduct) {
                var sPath = "/Products('" + oProduct.ProductID + "')";
                oModel.update(sPath, oProduct, {
                    groupId: "productBatch"
                });
            });

            // Submit batch
            oModel.submitChanges({
                groupId: "productBatch",
                success: function() {
                    MessageToast.show("Batch update completed");
                },
                error: function(oError) {
                    MessageBox.error("Batch update failed");
                }
            });
        },

        /* =========================================================== */
        /* Function Imports                                            */
        /* =========================================================== */

        onCallFunction: function() {
            var oModel = this.getView().getModel();

            oModel.callFunction("/ActivateProduct", {
                method: "POST",
                urlParameters: {
                    ProductID: "123"
                },
                success: function(oData) {
                    MessageToast.show("Product activated");
                },
                error: function(oError) {
                    MessageBox.error("Activation failed");
                }
            });
        }
    });
});
```

### OData V4 Complete Example

```javascript
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function(Controller, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("myapp.controller.ProductsV4", {

        /* =========================================================== */
        /* CREATE with V4                                              */
        /* =========================================================== */

        onCreateProduct: function() {
            var oList = this.byId("productList");
            var oBinding = oList.getBinding("items");

            // Create new entry
            var oContext = oBinding.create({
                Name: "New Product",
                Price: 99.99,
                CategoryID: "1"
            });

            // Wait for creation to complete
            oContext.created().then(function() {
                MessageToast.show("Product created");
            }).catch(function(oError) {
                MessageBox.error("Creation failed: " + oError.message);
            });
        },

        /* =========================================================== */
        /* DELETE with V4                                              */
        /* =========================================================== */

        onDeleteProduct: function(oEvent) {
            var oContext = oEvent.getSource().getBindingContext();

            oContext.delete().then(function() {
                MessageToast.show("Product deleted");
            }).catch(function(oError) {
                MessageBox.error("Deletion failed");
            });
        },

        /* =========================================================== */
        /* UPDATE with V4 (automatic via Two-Way binding)              */
        /* =========================================================== */

        onSaveChanges: function() {
            var oModel = this.getView().getModel();

            // Check for pending changes
            if (oModel.hasPendingChanges()) {
                oModel.submitBatch("$auto").then(function() {
                    MessageToast.show("Changes saved");
                });
            }
        },

        onDiscardChanges: function() {
            var oModel = this.getView().getModel();
            oModel.resetChanges();
        }
    });
});
```

### Binding to OData in XML View

```xml
<mvc:View
    xmlns:mvc="sap.ui.core.mvc"
    xmlns="sap.m">

    <Page title="Products">
        <content>
            <!-- List bound to OData entity set -->
            <List id="productList"
                  items="{
                      path: '/Products',
                      parameters: {
                          $expand: 'Category',
                          $orderby: 'Name',
                          $count: true
                      },
                      sorter: { path: 'Name' }
                  }">
                <StandardListItem
                    title="{Name}"
                    description="{Category/Name}"
                    info="{Price}"
                    type="Navigation"
                    press=".onProductPress" />
            </List>
        </content>
    </Page>

</mvc:View>
```

---

## 16. Expression Binding and Formatters

### Expression Binding

Expression binding allows inline JavaScript expressions in XML views:

```xml
<!-- Basic expression -->
<Text text="{= ${/quantity} * ${/price} }" />

<!-- Ternary operator -->
<ObjectStatus
    text="{= ${status} === 'active' ? 'Available' : 'Unavailable' }"
    state="{= ${status} === 'active' ? 'Success' : 'Error' }" />

<!-- Boolean expressions -->
<Input enabled="{= ${/editable} === true }" />
<Button visible="{= ${/items}.length > 0 }" />

<!-- Comparison -->
<Text text="{= ${/price} &gt; 100 ? 'Premium' : 'Standard' }" />

<!-- Multiple model values -->
<Text text="{= ${/firstName} + ' ' + ${/lastName} }" />

<!-- With formatting -->
<Text text="{= 'Total: ' + ${/amount}.toFixed(2) + ' ' + ${/currency} }" />

<!-- Null check -->
<Text text="{= ${/description} || 'No description available' }" />

<!-- Array length -->
<Title text="{= 'Items (' + ${/items}.length + ')' }" />
```

### Special Characters in Expression Binding

XML requires escaping certain characters:

| Character | Escaped Form |
|-----------|--------------|
| `<` | `&lt;` |
| `>` | `&gt;` |
| `&` | `&amp;` |
| `"` | `&quot;` |

```xml
<!-- Less than comparison -->
<Text visible="{= ${/quantity} &lt; 10 }" text="Low Stock" />

<!-- Greater than or equal -->
<Text visible="{= ${/price} &gt;= 100 }" text="Premium" />
```

### Formatter Functions

#### In Controller

```javascript
sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller) {
    "use strict";

    return Controller.extend("myapp.controller.Main", {

        // Simple formatter
        formatPrice: function(fPrice) {
            if (!fPrice) {
                return "N/A";
            }
            return parseFloat(fPrice).toFixed(2) + " USD";
        },

        // Formatter with multiple values
        formatFullName: function(sFirstName, sLastName) {
            return [sFirstName, sLastName].filter(Boolean).join(" ");
        },

        // Status formatter
        formatStatus: function(sStatus) {
            var mStatusText = {
                "A": "Active",
                "I": "Inactive",
                "P": "Pending"
            };
            return mStatusText[sStatus] || "Unknown";
        },

        // State formatter (for ObjectStatus)
        formatStatusState: function(sStatus) {
            var mStatusState = {
                "A": "Success",
                "I": "Error",
                "P": "Warning"
            };
            return mStatusState[sStatus] || "None";
        },

        // Date formatter
        formatDate: function(oDate) {
            if (!oDate) {
                return "";
            }
            var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
                pattern: "MMM d, yyyy"
            });
            return oDateFormat.format(oDate);
        },

        // Currency formatter
        formatCurrency: function(fAmount, sCurrency) {
            var oNumberFormat = sap.ui.core.format.NumberFormat.getCurrencyInstance();
            return oNumberFormat.format(fAmount, sCurrency);
        }
    });
});
```

#### Using Formatters in XML

```xml
<mvc:View
    controllerName="myapp.controller.Main"
    xmlns:mvc="sap.ui.core.mvc"
    xmlns="sap.m">

    <!-- Simple formatter -->
    <Text text="{ path: '/price', formatter: '.formatPrice' }" />

    <!-- Composite formatter -->
    <Text text="{
        parts: [
            { path: '/firstName' },
            { path: '/lastName' }
        ],
        formatter: '.formatFullName'
    }" />

    <!-- Status with state -->
    <ObjectStatus
        text="{ path: '/status', formatter: '.formatStatus' }"
        state="{ path: '/status', formatter: '.formatStatusState' }" />

    <!-- Currency formatter -->
    <Text text="{
        parts: [
            { path: '/amount' },
            { path: '/currency' }
        ],
        formatter: '.formatCurrency'
    }" />

</mvc:View>
```

### Separate Formatter Module

**model/formatter.js:**
```javascript
sap.ui.define([
    "sap/ui/core/format/DateFormat",
    "sap/ui/core/format/NumberFormat"
], function(DateFormat, NumberFormat) {
    "use strict";

    return {

        formatPrice: function(fPrice) {
            if (!fPrice) {
                return "0.00";
            }
            var oNumberFormat = NumberFormat.getCurrencyInstance({
                currencyCode: false
            });
            return oNumberFormat.format(fPrice);
        },

        formatDate: function(oDate) {
            if (!oDate) {
                return "";
            }
            var oDateFormat = DateFormat.getDateTimeInstance({
                style: "medium"
            });
            return oDateFormat.format(new Date(oDate));
        },

        formatStatus: function(sStatus) {
            var mStatus = {
                "A": "Active",
                "I": "Inactive",
                "P": "Pending",
                "D": "Draft"
            };
            return mStatus[sStatus] || sStatus;
        },

        formatStatusState: function(sStatus) {
            var mState = {
                "A": "Success",
                "I": "Error",
                "P": "Warning",
                "D": "None"
            };
            return mState[sStatus] || "None";
        },

        formatPercentage: function(fValue) {
            if (!fValue && fValue !== 0) {
                return "";
            }
            var oNumberFormat = NumberFormat.getPercentInstance({
                maxFractionDigits: 1
            });
            return oNumberFormat.format(fValue / 100);
        }
    };
});
```

**Using in Controller:**
```javascript
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "myapp/model/formatter"
], function(Controller, formatter) {
    "use strict";

    return Controller.extend("myapp.controller.Main", {

        formatter: formatter,

        onInit: function() {
            // Formatter is now available as this.formatter
        }
    });
});
```

**Using in XML View:**
```xml
<Text text="{ path: '/status', formatter: '.formatter.formatStatus' }" />
```

---

## 17. Testing

### Test Project Structure

```
webapp/
  test/
    unit/
      controller/
        Main.controller.js
      model/
        formatter.js
      AllTests.js
      unitTests.qunit.html
      unitTests.qunit.js
    integration/
      pages/
        Main.js
        Detail.js
      arrangements/
        Startup.js
      AllJourneys.js
      MainJourney.js
      opaTests.qunit.html
      opaTests.qunit.js
    testsuite.qunit.html
    testsuite.qunit.js
```

### Unit Testing with QUnit

**test/unit/model/formatter.js:**
```javascript
sap.ui.define([
    "myapp/model/formatter"
], function(formatter) {
    "use strict";

    QUnit.module("Formatter Tests");

    QUnit.test("formatPrice - should format price correctly", function(assert) {
        // Arrange
        var fPrice = 99.5;

        // Act
        var sResult = formatter.formatPrice(fPrice);

        // Assert
        assert.strictEqual(sResult, "99.50", "Price formatted with 2 decimals");
    });

    QUnit.test("formatPrice - should handle null", function(assert) {
        var sResult = formatter.formatPrice(null);
        assert.strictEqual(sResult, "0.00", "Null returns 0.00");
    });

    QUnit.test("formatStatus - should return correct status text", function(assert) {
        assert.strictEqual(formatter.formatStatus("A"), "Active");
        assert.strictEqual(formatter.formatStatus("I"), "Inactive");
        assert.strictEqual(formatter.formatStatus("X"), "X", "Unknown status returns input");
    });
});
```

**test/unit/controller/Main.controller.js:**
```javascript
sap.ui.define([
    "myapp/controller/Main.controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/thirdparty/sinon",
    "sap/ui/thirdparty/sinon-qunit"
], function(MainController, JSONModel) {
    "use strict";

    QUnit.module("Main Controller", {
        beforeEach: function() {
            this.oController = new MainController();

            // Mock the view
            this.oViewStub = {
                getModel: sinon.stub(),
                setModel: sinon.stub(),
                byId: sinon.stub()
            };

            sinon.stub(this.oController, "getView").returns(this.oViewStub);
        },
        afterEach: function() {
            this.oController.destroy();
        }
    });

    QUnit.test("onInit - should initialize view model", function(assert) {
        // Act
        this.oController.onInit();

        // Assert
        assert.ok(this.oViewStub.setModel.called, "Model was set");
    });

    QUnit.test("formatFullName - should concatenate names", function(assert) {
        // Act
        var sResult = this.oController.formatFullName("John", "Doe");

        // Assert
        assert.strictEqual(sResult, "John Doe");
    });
});
```

### Integration Testing with OPA5

**test/integration/pages/Main.js:**
```javascript
sap.ui.define([
    "sap/ui/test/Opa5",
    "sap/ui/test/actions/Press",
    "sap/ui/test/actions/EnterText",
    "sap/ui/test/matchers/PropertyStrictEquals",
    "sap/ui/test/matchers/AggregationLengthEquals"
], function(Opa5, Press, EnterText, PropertyStrictEquals, AggregationLengthEquals) {
    "use strict";

    Opa5.createPageObjects({
        onTheMainPage: {

            // Arrangements
            arrangements: {
                iStartTheApp: function() {
                    return this.iStartMyUIComponent({
                        componentConfig: {
                            name: "myapp",
                            async: true
                        }
                    });
                }
            },

            // Actions
            actions: {
                iPressTheCreateButton: function() {
                    return this.waitFor({
                        controlType: "sap.m.Button",
                        matchers: new PropertyStrictEquals({
                            name: "text",
                            value: "Create"
                        }),
                        actions: new Press(),
                        errorMessage: "Create button not found"
                    });
                },

                iEnterProductName: function(sName) {
                    return this.waitFor({
                        id: "productNameInput",
                        actions: new EnterText({ text: sName }),
                        errorMessage: "Product name input not found"
                    });
                },

                iPressListItem: function(sTitle) {
                    return this.waitFor({
                        controlType: "sap.m.StandardListItem",
                        matchers: new PropertyStrictEquals({
                            name: "title",
                            value: sTitle
                        }),
                        actions: new Press(),
                        errorMessage: "List item not found: " + sTitle
                    });
                }
            },

            // Assertions
            assertions: {
                iShouldSeeTheProductList: function() {
                    return this.waitFor({
                        id: "productList",
                        success: function() {
                            Opa5.assert.ok(true, "Product list is visible");
                        },
                        errorMessage: "Product list not found"
                    });
                },

                theListShouldHaveItems: function(iCount) {
                    return this.waitFor({
                        id: "productList",
                        matchers: new AggregationLengthEquals({
                            name: "items",
                            length: iCount
                        }),
                        success: function() {
                            Opa5.assert.ok(true, "List has " + iCount + " items");
                        },
                        errorMessage: "List does not have " + iCount + " items"
                    });
                },

                iShouldSeeThePageTitle: function(sTitle) {
                    return this.waitFor({
                        controlType: "sap.m.Page",
                        matchers: new PropertyStrictEquals({
                            name: "title",
                            value: sTitle
                        }),
                        success: function() {
                            Opa5.assert.ok(true, "Page title is: " + sTitle);
                        }
                    });
                }
            }
        }
    });
});
```

**test/integration/MainJourney.js:**
```javascript
sap.ui.define([
    "sap/ui/test/opaQunit",
    "./pages/Main"
], function(opaTest) {
    "use strict";

    QUnit.module("Product List Journey");

    opaTest("Should see the product list", function(Given, When, Then) {
        // Arrangements
        Given.onTheMainPage.iStartTheApp();

        // Assertions
        Then.onTheMainPage.iShouldSeeTheProductList();
        Then.onTheMainPage.iShouldSeeThePageTitle("Products");

        // Cleanup
        Then.iTeardownMyApp();
    });

    opaTest("Should navigate to detail when clicking item", function(Given, When, Then) {
        Given.onTheMainPage.iStartTheApp();

        // Actions
        When.onTheMainPage.iPressListItem("Product 1");

        // Assertions
        Then.onTheDetailPage.iShouldSeeTheDetailPage();

        Then.iTeardownMyApp();
    });
});
```

### Running Tests

**testsuite.qunit.html:**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>QUnit Test Suite</title>
    <script
        src="https://ui5.sap.com/resources/sap/ui/qunit/qunit-redirect.js">
    </script>
</head>
<body>
    <script>
        var defined = QUnit.config.modules.length;
        QUnit.config.modules.push({ name: "All Tests" });

        // Load test modules
        sap.ui.require([
            "myapp/test/unit/AllTests",
            "myapp/test/integration/AllJourneys"
        ], function() {
            QUnit.start();
        });
    </script>
</body>
</html>
```

---

## 18. Performance Optimization

### Loading Optimization

#### Async Loading
```html
<!-- Enable async loading in bootstrap -->
<script
    id="sap-ui-bootstrap"
    src="https://ui5.sap.com/resources/sap-ui-core.js"
    data-sap-ui-async="true"
    data-sap-ui-theme="sap_horizon"
    data-sap-ui-compatVersion="edge">
</script>
```

#### Component Preload

Build preload files for production:
```bash
ui5 build preload
```

This creates `Component-preload.js` with all bundled modules.

### Lazy Loading

#### Lazy Target Loading
```json
{
    "routing": {
        "targets": {
            "heavyView": {
                "viewName": "HeavyView",
                "viewLevel": 2
            }
        }
    }
}
```

#### Lazy Fragment Loading
```javascript
// Load fragment only when needed
onOpenDialog: function() {
    if (!this._pDialog) {
        this._pDialog = Fragment.load({
            name: "myapp.view.fragments.HeavyDialog",
            controller: this
        });
    }
    this._pDialog.then(function(oDialog) {
        oDialog.open();
    });
}
```

### OData Optimization

#### Select and Expand
```javascript
// Only request needed fields
oModel.read("/Products", {
    urlParameters: {
        "$select": "ProductID,Name,Price",
        "$expand": "Category($select=Name)"
    }
});
```

#### Batch Requests
```javascript
// Combine multiple requests
oModel.setDeferredGroups(["batch"]);

oModel.read("/Products", { groupId: "batch" });
oModel.read("/Categories", { groupId: "batch" });

oModel.submitChanges({ groupId: "batch" });
```

#### Growing List (Pagination)
```xml
<List items="{/Products}"
      growing="true"
      growingThreshold="20"
      growingScrollToLoad="true">
    <StandardListItem title="{Name}" />
</List>
```

### Rendering Optimization

#### Busy Indicators
```javascript
// Show busy during data load
this.getView().setBusy(true);

oModel.read("/Products", {
    success: function() {
        this.getView().setBusy(false);
    }.bind(this)
});
```

#### Avoid Unnecessary Re-renders
```javascript
// Batch property changes
oModel.setProperty("/prop1", value1);
oModel.setProperty("/prop2", value2);
// vs single update
oModel.setData({
    prop1: value1,
    prop2: value2
}, true);
```

### Performance Checklist

| Area | Best Practice |
|------|--------------|
| **Bootstrap** | Use `data-sap-ui-async="true"` |
| **Preload** | Build Component-preload.js |
| **CDN** | Load UI5 from SAP CDN |
| **Views** | Use XML views (faster parsing) |
| **Models** | Use `$select` and `$expand` |
| **Lists** | Enable growing/pagination |
| **Fragments** | Lazy load dialogs |
| **Images** | Use lazy loading |

---

## 19. SAP Fiori Elements

### Overview

SAP Fiori Elements are pre-built, metadata-driven application templates that automatically generate UIs based on OData service annotations.

### Template Types

| Template | Use Case |
|----------|----------|
| **List Report** | Display and filter entity collections |
| **Object Page** | Display detailed entity information |
| **Worklist** | Simple list with actions |
| **Analytical List Page** | Analytics with charts and KPIs |
| **Overview Page** | Dashboard with cards |

### Annotations

Annotations drive the UI generation:

**CDS View (Backend):**
```abap
@UI.lineItem: [{ position: 10, importance: #HIGH }]
@UI.selectionField: [{ position: 10 }]
@UI.identification: [{ position: 10 }]
element ProductName;

@UI.lineItem: [{ position: 20, importance: #MEDIUM }]
element Price;

@UI.facet: [{
    id: 'GeneralInfo',
    type: #IDENTIFICATION_REFERENCE,
    label: 'General Information',
    position: 10
}]
```

**Local Annotations (annotations.xml):**
```xml
<Annotations Target="ProductService.Products">

    <Annotation Term="UI.LineItem">
        <Collection>
            <Record Type="UI.DataField">
                <PropertyValue Property="Value" Path="ProductName" />
                <PropertyValue Property="Label" String="Product Name" />
            </Record>
            <Record Type="UI.DataField">
                <PropertyValue Property="Value" Path="Price" />
                <PropertyValue Property="Label" String="Price" />
            </Record>
        </Collection>
    </Annotation>

    <Annotation Term="UI.SelectionFields">
        <Collection>
            <PropertyPath>Category</PropertyPath>
            <PropertyPath>Supplier</PropertyPath>
        </Collection>
    </Annotation>

    <Annotation Term="UI.HeaderInfo">
        <Record Type="UI.HeaderInfoType">
            <PropertyValue Property="TypeName" String="Product" />
            <PropertyValue Property="TypeNamePlural" String="Products" />
            <PropertyValue Property="Title">
                <Record Type="UI.DataField">
                    <PropertyValue Property="Value" Path="ProductName" />
                </Record>
            </PropertyValue>
        </Record>
    </Annotation>

</Annotations>
```

### Creating a Fiori Elements App

**manifest.json:**
```json
{
    "sap.app": {
        "id": "myapp",
        "type": "application",
        "dataSources": {
            "mainService": {
                "uri": "/sap/opu/odata/sap/ZPRODUCT_SRV/",
                "type": "OData",
                "settings": {
                    "odataVersion": "4.0",
                    "localUri": "localService/metadata.xml",
                    "annotations": ["annotation"]
                }
            },
            "annotation": {
                "uri": "annotations/annotation.xml",
                "type": "ODataAnnotation"
            }
        }
    },
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
                            "navigation": {
                                "Products": {
                                    "detail": {
                                        "route": "ProductDetail"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
```

---

## 20. Smart Controls

### Overview

Smart Controls interpret OData metadata and annotations to generate appropriate UI controls automatically.

### Smart Table

```xml
<smartTable:SmartTable
    id="productTable"
    entitySet="Products"
    smartFilterId="productFilter"
    tableType="ResponsiveTable"
    useExportToExcel="true"
    useVariantManagement="true"
    useTablePersonalisation="true"
    header="Products"
    showRowCount="true"
    enableAutoBinding="true"
    beforeRebindTable=".onBeforeRebindTable">

    <smartTable:customToolbar>
        <OverflowToolbar>
            <ToolbarSpacer />
            <Button icon="sap-icon://add" text="Create" press=".onCreate" />
        </OverflowToolbar>
    </smartTable:customToolbar>

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
    showRestoreButton="true"
    clear=".onFilterClear">

    <smartFilterBar:controlConfiguration>
        <smartFilterBar:ControlConfiguration
            key="Category"
            visibleInAdvancedArea="true"
            preventInitialDataFetchInValueHelpDialog="false" />
    </smartFilterBar:controlConfiguration>

</smartFilterBar:SmartFilterBar>
```

### Smart Field

```xml
<smartField:SmartField
    value="{ProductName}"
    editable="true"
    showValueHelp="true" />

<smartField:SmartField
    value="{Price}"
    editable="true"
    uomEditState="0" />

<smartField:SmartField
    value="{Category}"
    editable="true" />
```

### Smart Form

```xml
<smartForm:SmartForm
    id="productForm"
    editable="true"
    editTogglable="true"
    title="Product Details">

    <smartForm:Group label="General Information">
        <smartForm:GroupElement>
            <smartField:SmartField value="{ProductName}" />
        </smartForm:GroupElement>
        <smartForm:GroupElement>
            <smartField:SmartField value="{Description}" />
        </smartForm:GroupElement>
    </smartForm:Group>

    <smartForm:Group label="Pricing">
        <smartForm:GroupElement>
            <smartField:SmartField value="{Price}" />
        </smartForm:GroupElement>
        <smartForm:GroupElement>
            <smartField:SmartField value="{Currency}" />
        </smartForm:GroupElement>
    </smartForm:Group>

</smartForm:SmartForm>
```

---

## 21. Security Best Practices

### XSS Prevention

```javascript
// Always encode user input
var sUserInput = jQuery.sap.encodeHTML(sRawInput);

// Use FormattedText for safe HTML
var oFormattedText = new sap.m.FormattedText({
    htmlText: sEncodedHtml
});

// Avoid innerHTML manipulation
// BAD: element.innerHTML = userInput;
// GOOD: element.textContent = userInput;
```

### CSRF Protection

```javascript
// CSRF token is automatically handled by ODataModel
var oModel = new sap.ui.model.odata.v2.ODataModel({
    serviceUrl: "/sap/opu/odata/...",
    headers: {
        "X-CSRF-Token": "Fetch"  // Token is fetched automatically
    }
});
```

### Secure Data Handling

```javascript
// Validate input
function validateEmail(sEmail) {
    var rEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return rEmail.test(sEmail);
}

// Sanitize before display
function sanitizeInput(sInput) {
    return sInput.replace(/[<>]/g, '');
}
```

### Content Security Policy

```html
<!-- Recommended CSP header -->
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self';
               script-src 'self' 'unsafe-eval' https://ui5.sap.com;
               style-src 'self' 'unsafe-inline';">
```

---

## 22. Debugging and Troubleshooting

### UI5 Diagnostics

Access via keyboard shortcut: `Ctrl + Alt + Shift + S`

Features:
- Control Tree inspection
- Binding information
- Performance traces
- Console access

### URL Parameters

| Parameter | Purpose |
|-----------|---------|
| `sap-ui-debug=true` | Load debug sources |
| `sap-ui-trace=true` | Enable tracing |
| `sap-ui-xx-viewCache=false` | Disable view cache |
| `sap-ui-theme=sap_horizon_dark` | Change theme |

### Common Debugging Techniques

```javascript
// Log levels
jQuery.sap.log.setLevel(jQuery.sap.log.Level.DEBUG);

// Trace binding issues
console.log(oControl.getBinding("items"));
console.log(oControl.getBindingContext());

// Inspect model data
console.log(oModel.getData());
console.log(oModel.getProperty("/path"));

// Check OData requests
// Network tab in browser DevTools

// Breakpoints in controller
debugger;  // Will pause execution
```

### Support Assistant

Access via: `Ctrl + Alt + Shift + P`

Checks for:
- Deprecated API usage
- Performance issues
- Best practice violations
- Accessibility problems

---

## 23. Deployment

### SAP Business Technology Platform (BTP)

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
    requires:
      - name: myapp-uaa
      - name: myapp-destination

  - name: myapp-ui
    type: html5
    path: webapp
    build-parameters:
      builder: custom
      commands:
        - npm run build
      supported-platforms: []

resources:
  - name: myapp-uaa
    type: org.cloudfoundry.managed-service
    parameters:
      service: xsuaa
      service-plan: application

  - name: myapp-destination
    type: org.cloudfoundry.managed-service
    parameters:
      service: destination
      service-plan: lite
```

### SAP NetWeaver ABAP

Deploy via:
1. SAP Web IDE → Deploy to SAPUI5 ABAP Repository
2. UI5 Tooling with `@sap/ux-ui5-tooling`

```bash
# Deploy using UI5 CLI
ui5 deploy
```

### Build for Production

**ui5.yaml:**
```yaml
specVersion: "2.6"
type: application
metadata:
  name: myapp

builder:
  customTasks:
    - name: ui5-task-minify
      afterTask: generateComponentPreload

resources:
  configuration:
    propertiesFileSourceEncoding: UTF-8
```

```bash
# Build for production
ui5 build preload --all --clean-dest

# Output in dist/ folder
```

---

## 24. Resources and References

### Official Documentation

- [SAPUI5 SDK Demo Kit](https://sapui5.hana.ondemand.com/)
- [SAP Developers Portal](https://developers.sap.com/topics/ui5.html)
- [SAP Help Portal](https://help.sap.com/docs/SAPUI5)
- [OpenUI5 Documentation](https://openui5.org/)

### Learning Resources

- [SAP Learning Journey - SAPUI5](https://learning.sap.com/learning-journeys/develop-sapui5-applications)
- [UI5 Walkthrough Tutorial](https://sapui5.hana.ondemand.com/#/topic/3da5f4be63264db99f2e5b04c5e853db)
- [DSAG UI5 Best Practice Guide](https://1dsag.github.io/UI5-Best-Practice/)

### Community

- [SAP Community - UI5](https://community.sap.com/topics/ui5)
- [Stack Overflow - SAPUI5](https://stackoverflow.com/questions/tagged/sapui5)
- [GitHub - OpenUI5](https://github.com/SAP/openui5)

### Tools

- [SAP Business Application Studio](https://www.sap.com/products/business-application-studio.html)
- [UI5 Tooling](https://sap.github.io/ui5-tooling/)
- [UI5 Inspector (Chrome Extension)](https://chrome.google.com/webstore/detail/ui5-inspector/)

---

## Quick Reference Card

### Common Patterns

```javascript
// Get component
this.getOwnerComponent()

// Get router
this.getOwnerComponent().getRouter()

// Navigate
this.getOwnerComponent().getRouter().navTo("route", { id: "123" })

// Get model
this.getView().getModel()
this.getView().getModel("modelName")

// Get control by ID
this.byId("controlId")

// Get i18n text
this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("key")

// Show message
sap.m.MessageToast.show("Message")
sap.m.MessageBox.error("Error message")
```

### XML Namespaces

```xml
xmlns:mvc="sap.ui.core.mvc"
xmlns="sap.m"
xmlns:core="sap.ui.core"
xmlns:l="sap.ui.layout"
xmlns:f="sap.ui.layout.form"
xmlns:t="sap.ui.table"
xmlns:semantic="sap.f.semantic"
xmlns:smartTable="sap.ui.comp.smarttable"
xmlns:smartField="sap.ui.comp.smartfield"
xmlns:smartForm="sap.ui.comp.smartform"
```

---

*Document Version: 1.0*
*Last Updated: January 2026*
*Covers SAPUI5 version 1.120+*
