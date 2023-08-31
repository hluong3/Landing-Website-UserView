# DXC MWP Landing Website User View
## 1. Introduction
Landing Website User View is a portal of the delivery where all information about activity of the delivery can be found here. It runs as a information center site and Users don't need to remember every specific site to look for information.

## 2. System deployment Architecture 
![system_architecture](/assets/overall_arch.png?raw=true)

The Landing Website User View provides information, some of which also references to other Web Sites.

## 3. Application Architecture
![system_architecture](/assets/app_arch.png?raw=true)


<table>
<tr><th>Name</th><th>Using</th></tr>
<tr><td>Module</td><td>NgModules are containers for a cohesive block of code dedicated to an application domain, a workflow, or a closely related set of capabilities. It contains  components, service providers, and other code files</td></tr>
<tr><td>Template</td><td>A component's view with its companion template. A template is a form of HTML that tells Angular how to render the component.</td></tr>
<tr><td>Component</td><td>A Component controls a patch of a screen. It includes Notation, Metadata, Template and service</td></tr>
<tr><td>Metadata</td><td>The metadata for a Component, tells Angular where to get the major building blocks that it needs to create and present the Component and its view</td></tr>
<tr><td>Directive</td><td>Directives are classes that add additional behavior to elements in your Angular applications</td></tr>
<tr><td>Injector</td><td>Provide dependency injection for component</td></tr>
<tr><td>Service</td><td>Injectable class</td></tr>
</table>

## 5. Authentication and Authorization
Azure AD was choosen as Anthentication and Authorization Provider. Using Authorization code flow (with PKCE). Refer: https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-configure-app-access-web-apis

## 6. Code Structure
![system_architecture](/assets/app_struct.png?raw=true)

We stick with Angular structure.

## 7. Build and Run on Local
#### 7.1. Build
1. npm install
2. npm run build

#### 7.2. Run on Local
npm start ... (look at the package for more commands)

## 8. Deploying on Azure Cloud
#### 8.1. Build Pipeline
refer to https://dev.azure.com/wm-microservice/Next%20Microservices%20Capabilities/_apps/hub/ms.vss-build-web.ci-designer-hub?pipelineId=1026&branch=main

#### 8.2. Release Pipeline
refer to https://dev.azure.com/wm-microservice/Next%20Microservices%20Capabilities/_releaseDefinition?definitionId=1760&_a=environments-editor-preview
