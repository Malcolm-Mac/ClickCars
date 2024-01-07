import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { addVehicle, tradeInVehicleInfors, vehicleObject, fileInterface, moveToVehicleDamages, images, UserVehicles, UserVehicleObject, vehicleData, CosmeticDamagesList, CosmeticDamagesListObject, User, feedStatus, imagesData } from '../interfaces/vehiclesInterface'
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttprequestService {
  ipAddress: string = ""
  websiteCode:number = 39
  constructor(private http: HttpClient) {
    this.getIPAddress()
  }

  getVehicleListing(): Observable<vehicleObject> {
    const url = `https://www.e-autodealerportal.co.za/Vehicles.svc/GetVehicleDetailsWithImages1?
      make=&body=&model=&Fuel=&TRANSMISSION=&typeseller=&DEALERNAME=&pricemin=&pricemax=&year=&mileagemin=&mileagemax=&pageNumber=1&pageSize=50000`
    return this.http.get<vehicleObject>(url).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  getVehicleDeatails(vehicleID: string): Observable<vehicleObject> {
    const url = `https://www.e-autodealerportal.co.za/Vehicles.svc/GetVehicleDetailSinglePath?VehicleID=${parseInt(vehicleID)}`
    return this.http.get<vehicleObject>(url).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  trackerRevelNumber(vehicleID: string, contactType: string, contactDetails: string): Observable<string> {
    const url = `https://www.e-autodealerportal.co.za/Vehicles.svc/ContactTracker?VehicleID=${vehicleID}&ips=${this.ipAddress}&Contacttype=${contactType}&contact=${contactDetails}`
    return this.http.get<string>(url).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  getVehicleListings(xmlName: string): Observable<any> {
    const url = `https://e-autodealerportal.co.za/ListingFeeds/${xmlName}`
    return this.http.get(url,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'text/xml')

        , responseType: 'text'
      }

    ).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }


  getIPAddress() {
    this.http.get("https://api.ipify.org/?format=json").subscribe((res: any) => {
      this.ipAddress = res.ip;
      console.log(this.ipAddress)
    });
  }

  sendEnquiry(DealerID: any, VehicleId: any, Listing: any, Name: any, Surname: any,
    ClientEmail: any, ClientPhone: any, Message: any, Make: any, Model: any, Price: any,
    DealerName: any, Mileage: any, Year: any, Finance: any, Insurance: any, VideoRequest: any, Location: any): Observable<HttpResponse<any>> {

    return this.http.get(`https://www.e-autodealerportal.co.za/Vehicles.svc/SendVehicleEnquiry?DealerID=
                          ${DealerID}&VehicleID=${VehicleId}&Listing=${Listing}&Name=${Name}&Surname=${Surname}&ClientEmail=${ClientEmail}&ClientPhone=${ClientPhone}
                          &Message=${Message}&MAKE=${Make}&MODEL=${Model}&PRICE=${Price}&DEALERNAME=${DealerName}&MILEAGE=${Mileage}
                          &YEAR=${Year}&FINANCE=${Finance}&INSURANCE=${Insurance}&videorequest=${VideoRequest}&Location=${Location}`,
      { observe: 'response' }).pipe(
        catchError(this.handleError)
      )
  }

  profile(userID: any) {
    return this.http.get(`${environment.apiProfile}UserId=` + parseInt(userID),
      { observe: 'response' }).pipe(
        catchError(this.handleError)
      )
  }

  getCode(email: any) {
    return this.http.get(`${environment.apiGetCode}Email=` + email,
      { observe: 'response' }).pipe(
        catchError(this.handleError)
      )
  }

  confirmCode(email: any, code: any) {
    return this.http.get(`${environment.apiConfirmCode}Email=` + email + "&Code=" + code,
      { observe: 'response' }).pipe(
        catchError(this.handleError)
      )
  }

  resetPassword(email: any, newpassword: any) {
    return this.http.get(`${environment.apiResetPassword}Email=` + email + "&passwordReset=" + newpassword,
      { observe: 'response' }).pipe(
        catchError(this.handleError)
      )
  }

  sendmessage(Name: any, Email: any, Contact: any, Message: any): Observable<HttpResponse<any>> {

    return this.http.get(`https://www.e-autodealerportal.co.za/Vehicles.svc/SendContactUs?ClientName=` + Name + "&ClientEmail=" + Email + "&ClientPhone=" + Contact + "&Message=" + Message, { observe: 'response' }).pipe(
      retry(0),
      catchError(this.handleError)
    )

  }

  receivedLeads(userID: any): Observable<HttpResponse<any>> {
    return this.http.get(`${environment.apiGetReceivedLeads}userid=` + userID, { observe: 'response' }).pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  receivedOffers(userID: any): Observable<HttpResponse<any>> {
    return this.http.get(`${environment.apiGetReceivedOffers}userid=` + userID, { observe: 'response' }).pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  auctionLogs(userID: any, vehicleID: any): Observable<HttpResponse<any>> {
    return this.http.get(`${environment.apiGetVehicleAuctionLog}userid=` + userID + '&vehicleid=' + vehicleID, { observe: 'response' }).pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  getRequestRelist(userID: any, vehicleID: any, price: any, status: any) {
    return this.http.get(`${environment.apiGetloadToListing}userid=` + userID + '&vehicleid=' + vehicleID + '&price=' + price + '&status=' + status,
      { observe: 'response' }).pipe(
        catchError(this.handleError)
      )
  }

  getAcceptedOrDeclined(userID: any, vehicleID: any, status: any) {
    return this.http.get(`${environment.apiGetAuctionOfferStatus}userid=` + userID + '&vehicleid=' + vehicleID + '&status=' + status,
      { observe: 'response' }).pipe(
        catchError(this.handleError)
      )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  sendErrorMessage(message: string) {

  }

  sendDealerSingUp(DEALERSHIPNAME: any, NAME: any, SURNAME: any, EMAIL: any, MESSAGES: any, PHONE: any, LOCATION: any, POSITION: any, FEEDS: any) {
    const url = `https://e-autodealerportal.co.za/Vehicles.svc/SendDealerSignup?DealershipName=${DEALERSHIPNAME}&Name=${NAME}&Surname=${SURNAME}&Email=${EMAIL}&Phone=${PHONE}&Messages=${MESSAGES}&Location=${LOCATION}&Feeds=${FEEDS}&position=${POSITION}`
    return this.http.get<vehicleObject>(url).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  getAllMakes(): Observable<tradeInVehicleInfors> {
    return this.http.get<tradeInVehicleInfors>(`https://e-autodealerportal.co.za/Vehicles.svc/GetVehicleInfo`).pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  updateUserProfile(name: any, surname: any, email: any, contactNumber: any, userID: any, imageBase64: any) {

    const body = { name: name, surname: surname, email: email, contactNumber: contactNumber, userID: userID, imageBase64: imageBase64 };

    return this.http.post(`${environment.apiUpdateProfile}`, body).pipe(map(user => {
      return user;
    }))
  }

  postVehicle(vehicle: addVehicle) {
    return this.http.post("https://e-autodealerportal.co.za/Vehicles.svc/AddVehicleS", JSON.stringify(vehicle)).pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  postVehicleDocuments(fileInterface: fileInterface) {
    return this.http.post("https://imageprocessing.e-dealerportal.co.za/api/AddVehicleDocuments", fileInterface).pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  postVehicleDamages(damages: CosmeticDamagesList) {
    return this.http.post("https://imageprocessing.e-dealerportal.co.za/api/AddDamages", damages).pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  saveVehicle(vehicle: UserVehicles)
  {
    return this.http.get<string>(`https://e-autodealerportal.co.za/Vehicles.svc/AddVehicleS?userid=${vehicle.userid}&MMCode=${vehicle.MMCode}&VIN=${vehicle.VIN}&Make=${vehicle.MAKE}&ModelType=${vehicle.MODELTYPE}&Model=${vehicle.MODEL}&year=${vehicle.YEAR}&Transmission=${vehicle.Transmission}&Mileage=${vehicle.MILEAGE}&Fuel=${vehicle.Fuel}&ExteriorColour=${vehicle.ExteriorColour}&InteriorColour=${vehicle.InteriorColour}&ServiceHistory=${vehicle.ServiceHistory}&Drive=${vehicle.Drive}&Description=${vehicle.Description}&BodyType=${vehicle.BodyType}&ValidLicenseDisc=${vehicle.ValidLicenseDisc}&FirstOwnerVehicle=${vehicle.FirstOwnerVehicle}&DiscDates=${vehicle.DiscYear}&IntroDates=${vehicle.IntroYear}&RegNo=${vehicle.REGNO}&Accessories=${vehicle.Accessories}&Vehiclesid=${vehicle.VehicleID}&updatestatus=${vehicle.isEditVehicle}`).pipe(
      retry(0),
      catchError(this.handleError)
    )
  }
  postVehicleImages(images:imagesData)
  {
    return this.http.post(`https://imageprocessing.e-dealerportal.co.za/api/AddVehicleImages`,images).pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  getUserListing(userID: string) {
    return this.http.get<UserVehicleObject>(`https://e-autodealerportal.co.za/Vehicles.svc/GetUserVehicleListing?userid=${userID}`).pipe(
      retry(0),
      catchError(this.handleError)
    )
  }
  saveVehicleAdverisePrice(vehicleID:string, VehiclePrice:string, userID:string, status:string)
  {
   return this.http.get<string>(`https://www.e-autodealerportal.co.za/Vehicles.svc/loadToListing?userid=${userID}&vehicleid=${vehicleID}&price=${VehiclePrice}&status=${status}`).pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  getTradeAndRetail(vehicle:UserVehicles, userID:string)
  {
    return this.http.get<UserVehicleObject>(`https://e-autodealerportal.co.za/Vehicles.svc/GetUserTradeRetail?userid=${userID}&vehicleid=${vehicle.VehicleID}&vehicleMMcode=${vehicle.MMCode}&vehicleVinNumber=${vehicle.VIN}&vehicleMileage=${vehicle.MILEAGE}&VehicleManufactureYear=${vehicle.YEAR}&Name=${vehicle.VehicleID}=&Reg=${vehicle.REGNO}&Email=gift@gmail.com&Contact=0759135508`).pipe(
        retry(0),
        catchError(this.handleError)
      )
  }

  getVehicleDetailsEdit(vehicleID:string, userID:string)
  {
   return this.http.get<UserVehicleObject>(`https://e-autodealerportal.co.za/Vehicles.svc/GetUserVehicleDetails?userid=${userID}&vehicleid=${vehicleID}`).pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  deleteVehicleDetails(vehicleID: string, userID: string) {
    return this.http.get<string>(`https://e-autodealerportal.co.za/Vehicles.svc/RemoveUserV?userid=${userID}&vehicleid=${vehicleID}`).pipe(
      retry(0),
      catchError(this.handleError)
    )
  }
  
  offerResponse(vehicleID:string, userID:string, status:string)
  {
   return this.http.get<string>(`https://e-autodealerportal.co.za/Vehicles.svc/AuctionOfferStatus?userid=${userID}&vehicleid=${vehicleID}&status=${status}`).pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  getVehicleDamages(vehicleID:string)
  {
   return this.http.get<CosmeticDamagesListObject>(`https://e-autodealerportal.co.za/Vehicles.svc/GetUserVehicleDamages?VehicleId=${vehicleID}`).pipe(
      retry(0),
      catchError(this.handleError)
    )
  }
 removeVehicleFromAdvertise(vehicleID:string, userID:string)
  {
   return this.http.get<string>(`https://e-autodealerportal.co.za/Vehicles.svc/RemoveVehicleSites?userid=${userID}&vehicleid=${vehicleID}`).pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  removeVehicleDamages(damageID:string,userID:string)
  {
   return this.http.get<string>(`https://e-autodealerportal.co.za/Vehicles.svc/RemoveUserVhecleDamages?userid=${userID}&vehicleid=${damageID}`).pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  removeVehicleImage(imageID:string)
  {
   return this.http.get<string>(`https://e-autodealerportal.co.za/Vehicles.svc/Removeimg?imageid=${imageID}`).pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  markVehicleImageAsMain(imageID:string, vehicleID:string)
  {
   return this.http.get<string>(`https://e-autodealerportal.co.za/Vehicles.svc/MARKMAIN?imageid=${imageID}&vehicleid=${vehicleID}`).pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  register(user: User) {
    let body = {
      name: user.firstName,
      surname: user.lastName,
      email: user.username,
      contact: user.phone,
      password: user.password,
      websiteID: this.websiteCode
    }
    
    return this.http.post<feedStatus>(`https://imageprocessing.e-dealerportal.co.za/api/UserRegister`,body).pipe(
        retry(0),
        catchError(this.handleError)
      );
  }

  userLogIn(email:string, password:string)
  {
    let body = {
      email: email,
      password: password,
      websiteID: this.websiteCode
    }
    return this.http.post<string>(`https://imageprocessing.e-dealerportal.co.za/api/UserLogIn`,body).pipe(
      retry(0),
      catchError(this.handleError)
    );
  }

  sendFormGroup(data:FormData)
  {
    return this.http.post<string>(`http://127.0.0.1:5000/api/AddFileImage`,data).pipe(
      retry(0),
      catchError(this.handleError)
    );
  }
}
