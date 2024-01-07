// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  apiUrl: 'https://www.e-autodealerportal.co.za/Vehicles.svc/logins?',
 // apiUrls: 'https://www.e-autodealerportal.co.za/Vehicles.svc/createaccount?',
  apiRegister: "https://imageprocessing.e-dealerportal.co.za/api/UserRegister",
  apiProfile: 'https://www.e-autodealerportal.co.za/Vehicles.svc/GetUserDetails?',
  apiGetCode: 'https://www.e-autodealerportal.co.za/Vehicles.svc/GetResetPasswordCode?',
  apiConfirmCode: 'https://www.e-autodealerportal.co.za/Vehicles.svc/GetConfrimPasswordCode?',
  apiResetPassword: 'https://www.e-autodealerportal.co.za/Vehicles.svc/ResetPassword?',
  apiUpdateProfile: 'https://imageprocessing.e-dealerportal.co.za/api/UpdateUserProfile',
  apiGetReceivedLeads: 'https://e-autodealerportal.co.za/Vehicles.svc/GetUserVehicleleads?',
  apiGetReceivedOffers: 'https://e-autodealerportal.co.za/Vehicles.svc/GetUserVehicleListingReceivedOffers?',
  apiGetVehicleAuctionLog: 'https://e-autodealerportal.co.za/Vehicles.svc/GetVehicleAuctionLog?',
  apiGetloadToListing: 'https://e-autodealerportal.co.za/Vehicles.svc/loadToListing?',
  apiGetAuctionOfferStatus: 'https://e-autodealerportal.co.za/Vehicles.svc/AuctionOfferStatus?'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
