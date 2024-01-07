export interface Vehicles {
    ACC100_FIN: string,
    ASPIRATION: string,
    BODY: string,
    CITY: string,
    COLOUR: string,
    COMMENTS: string,
    CONDITION: string,
    DATEUPLOADED: string,
    DEALEREMAIL: string,
    DEALERID: string,
    DEALERNAME: string,
    DEALERSHIPID: string,
    DESCRIPTION: string,
    DOORS: string,
    DRIVE: string,
    DRIVETYPE: string,
    ENDSECONDS: string,
    ENDTIME: string,
    ENGINE: string,
    ENGINECAPACITY: string,
    ENGINEPOWER: string,
    EXTERIORCOLOR: string,
    EXTRAS: string,
    FUELCAPACITY: string,
    FUELTYPE: string,
    FirstOwner: string,
    INTERIORCOLOR: string,
    LOGO: string,
    MAKE: string,
    MILEAGE: string,
    MINUTE: string,
    MODEL: string,
    PHONENUMBER: string,
    POWERe: string,
    PRICE: string,
    PageNr: string,
    RESERVE: string,
    MODELRANGE: string,
    ReservePrice: string,
    SEATS: string,
    SECONDS: string,
    SERVICEHISTORY: string,
    STARTTIME: string,
    STREET1: string,
    STREET2: string,
    TELEPHONENUMBER: string,
    TORQUE: string,
    TOTALROWS: string,
    TRANSMISSION: string,
    VEHICLEID: string,
    YEAR: string,
    pageSize: string,
    rowNumber: string,
    statusstart: string,
    vehicleImageList: Array<VehicleImageDetails>,
    winner: string,
    VehicleAccessoriesList: Array<string>,
    vehicleImage: string,
    WIDTH: string,
    HEIGHT:string,
    LENGTH:string,
    CO2:string,
    REARTYPESIZE:string,
    FRONTTYPESIZE:string,
    FUELTANKSIZE:string,
    CUBICCAPACITY:string,
    NOGEARS:string,
    AXLECONFIGURATION:string,
    DISCDATE:string,
    INTRODATE:string


}

export interface VehicleImageDetails {
    IMAGEANGLE: string,
    IMAGEPATH: string,
    IMAGETYPE: string,
    VEHICLEIMAGE: string
    VEHICLEIMAGEID:string
}

export interface filterOptions {
    name: string,
    value: string,
}

export interface vehicleObject {
    aaData: Array<Vehicles>
}

export interface topNavigation {
    Home: boolean,
    listing: boolean,
    financeCalcutor: boolean,
    FAQ: boolean
}

export interface Banners {
    ADVERTSPATH: string,
    IMAGEANGLE: string,
    IMAGETYPE: string,
    URLS: string,
    TITLE: string
}
export interface topMAKES {
    BRAND: string,
    NUM: string,
   
}
export interface BodyType {
    body: string,
    index: number
}

export class User {
    id: number
    username: string
    password: string
    firstName: string
    lastName: string
    phone: string
    role: Role
    USERID?: string
}

export enum Role {
    User = 'User'
}

export interface tradeInVehicleInfors
{
  ListingVehicleInfo:Array<tradeInVehicleInfor>
  
}

export interface tradeInVehicleInfor
{
  DiscDate:string,
  IntroDate:string,
  Make:string,
  Model:string,
  ModelType:string,
  VehicleType:string,
  MMCode:string
}

export interface fileInterface
{
    document0: any,
    fileType0:string,
    fileName: string,
    vehicleID: string
}

export interface vehicleData
{
    aaData:addVehicle[]
}

export interface addVehicle
{
   MMCode:string
   VIN:string
   MAKE:string
   MODELTYPE:string
   MODEL:string
   YEAR:string
   Transmission:string
   MILEAGE:string
   Fuel:string
   InteriorColour:string
   ServiceHistory:string
   ExteriorColour:string
   Drive:string
   Description:string
   BodyType:string 
   ValidLicenseDisc:string
   FirstOwnerVehicle:string
   DiscDates:string
   IntroDates:string
   RegNo:string
   Model:string 
   userid :string
   Accessories: string
   AccidentFree:string
   AdvertisedOn:string
   ApprovedAuction:string
   CosmeticDamagesList:CosmeticDamagesList[]
   ENDSTATUS:string
   VehicleID:string
   VehicleAccessoriesList:string[]
}

export interface moveToVehicleDamages
{
    isMechanical:string,
    damageLocation:string,
    damageArea:string,
    damageType:string,
    damagePrice:string,
    damageDescription:string,
    vehicleID:string,
    damageImage:string
}

export interface CosmeticDamagesList
{
    Area:String
    DamagesID:string
    Description:String
    IMAGE:String
    IMAGETYPE:String
    ImagePath:String
    IsMechanical:String
    Position:String
    Price:String
    Type:String 
    vehicleID:string
}

export interface CosmeticDamagesListObject
{
    CosmeticDamagesList: CosmeticDamagesList[]
}
export interface images
{
    base64:string,
    isMainImage:boolean,
    vehicleID:string,
    imageType:string
    imagePath:string
    imageView:string
}
export interface UserVehicleObject
{
    aaData: UserVehicles[]
}

export interface UserVehicles 
{
  YEAR:string
  MAKE:string
  MODEL:string
  MODELTYPE:string
  TRADE:string
  RETAIL:string
  OFFER:string
  DiscYear:string
  IntroYear:string
  Description:string
  vehicleAuctioned:string
  ApprovedAuction:string
  STARTDATE:string
  STARTSTATUS:string
  ENDSTATUS:string
  OfferAccepted:string
  TRADEDATE:string
  MILEAGE:string
  REGNO:string
  MMCode:string
  VIN:string
  Fuel:string
  Drive:string
  Transmission:string
  BodyType:string
  InteriorMaterial:string
  InteriorColour:string
  ExteriorColour:string
  ServiceHistory:string
  ValidLicenseDisc:string
  FirstOwnerVehicle:string
  AccidentFree:string
  Price:string
  TotalLeads:string
  Totalviews:string
  TotalClicks:string 
  vehicleImages:string  
  AdvertisedOn:string
  VehicleID:string
  vehicleImageList:VehicleImageDetails[],
  VehicleAccessories:VehicleAccessoriesList[]
  CosmeticDamagesList:CosmeticDamagesList[]
  userid: string
  VehicleAccessoriesList:VehicleAccessoriesList[]
  Accessories:string
  IntroDates:string
  isEditVehicle:boolean
  Transvalues:string
  PendingAdvertise:string
  PendingAuction:string
}

interface VehicleAccessoriesList
{
    Accessories:string,
    IsAdditional:string
}


export interface introDateView
{
    introView:string,
    introDate:string
    discDate:string
}

export interface validateObject
{
    message:string,
    status:boolean
}

export interface profileData
{
    name:string,
    surname:string,
    email:string,
    contactNumber:string,
    imagePath:string
}

export interface feedStatus
{
    code:string
}

export interface imagesData
{
    first: string,
    second:string, 
    third:string, 
    fourth: string, 
    fifth:string, 
    sixth:string, 
    seventh:string, 
    eighth:string, 
    ninth:string, 
    tenth:string, 
    eleventh:string, 
    twelfth:string, 
    thirteenth:string, 
    fourteenth:string, 
    fifteenth:string,
    vehicleID:string
}