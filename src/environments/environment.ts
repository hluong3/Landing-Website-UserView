// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // API_URL: "https://dxc-microservices-dev.azure-api.net/ms-landing-website-demo-dev/api",
  API_URL:
    "https://ad6c-2405-4803-c866-38b0-941e-71e1-1616-ab8c.ap.ngrok.io/api",
  Ocp_Apim_Subscription_Key: "8ee71ecee91647e5af730cf0a50b89f1",
  API_SCOPE: "",
  CLIENT_ID: "0oa6fk77keyJAt8cU5d7",
  ISSUER: "https://dev-59150012.okta.com",
  LOGIN_REDIRECT_URI: "http://localhost:4200/login/callback",
  LOGOUT_REDIRECT_URI: "http://localhost:4200/login",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
