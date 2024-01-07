import { Component, OnInit } from '@angular/core';
import {InforDataService} from '../../service/infor-data.service'
import { HttprequestService} from '../../service/httprequest.service'
import {ValidationServiceService} from '../../service/validation-service.service'
import { addVehicle, CosmeticDamagesList, fileInterface, images, imagesData, introDateView, moveToVehicleDamages, UserVehicles } from 'src/app/interfaces/vehiclesInterface';
import { report } from 'process';
import { threadId } from 'worker_threads';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-your-vehicles',
  templateUrl: './your-vehicles.component.html',
  styleUrls: ['./your-vehicles.component.css']
})

export class YourVehiclesComponent implements OnInit {

  showAddVehicle:boolean=false  
  showAccessories:boolean=false
  showAdditionalInfor:boolean=false
  showDamages:boolean=false
  showImages:boolean=false
  showAdvertise:boolean=false
  showSummary:boolean=false
  showVehicleSummary:boolean=true
  showAddvehicleButton:boolean=true
  showdamagesHistory:boolean=false
  showUploadDamagesImage:boolean=false
  showUploadDamagesImagePreview:boolean=false
  showDamagesFrom:boolean=false
  showMechanicalCheckBox:boolean=false
  showDamagesToggle:boolean=false
  showAddDamagesPagination:boolean=false
  showMainDamagesPagination:boolean=false
  showAddDamageButton:boolean=false
  previewImageButton:boolean=false
  showDamagesPrice:boolean=false
  toggleDamage:boolean=false
  showDeleteImages:boolean=false
  years:string[]
  makes:string[]
  models:string[]
  vehicleImages:images[] = []
  modelTypes:string[]
  introDates:introDateView[]=[]
  accessories:string[]
  selectedAccessories:string[] = []
  damageAreas:string[]=[]
  vehicleDamagesView:CosmeticDamagesList[]=[]
  attachingFiles:File[]=[]
  base64PDf: fileInterface[] = []
  selectedYear:string = ""
  selectedMake:string = ""
  selectedModel:string = ""
  selectedModelType:string = ""
  selectedIntroDates:string = ""
  selectedBodyType:string = ""
  selectedDrive:string = ""
  selectedFuelType:string = ""
  mileage:string = ""
  registration:string = ""
  vinNumber:string = ""
  mmcode:string = ""
  selectedArea:string=""
  selectedType:string=""
  selecteDamageLocation:string="0"
  vehicleDesctription:string = ""
  interiorMaterial:string = ""
  interiorColour:string = ""
  exteriorColour:string=""
  selectedTransmission:string =""
  trade:string=""
  retail:string=""
  tradeCarInfor:string=""
  tradeCarKM:string=""
  imageErrorMessage:string=""
  VehicleAccidentFree:boolean = false;
  isFirstOwnerVehicle:boolean =false
  isValidLicenseDisc:boolean =false
  isFullServiceHistory:boolean =false
  showYearError:boolean =false
  showMakeError:boolean =false
  showModelError:boolean =false
  showModelTypeError:boolean=false
  showIntroDateError:boolean =false
  showMileageError:boolean =false
  showRegistrationError:boolean =false
  showVehicleDriveError:boolean =false
  showBodyTypeError:boolean =false
  showTransmissionError:boolean =false
  showFuelError:boolean=false
  showLocationError:boolean=false
  showAreaError:boolean=false
  showdamagePriceError:boolean=false
  showMarkAsMainImage:boolean=false
  showMainImageError:boolean=false
  showAcceptOffer:boolean=false
  showAdvertisePriceError:boolean=false
  vehicle = {} as UserVehicles 
  previewDamageImage:string=""
  damageDescription:string=""
  damagePrice:string=""
  damageLocation:string[] = ["Front", "Left", "Top", "Rear", "Right"]
  vehicleDamage = {} as CosmeticDamagesList
  selectedMechanical:string=""
  vehicleID:string=""
  userID:string=""
  selectedImages: number[]=[]
  userVehicles:UserVehicles[] = []
  vehicleAdvertisePrice:string=""
  mileageMessage:string=""
  vinErrorMessage:string=""
  showVinError:boolean=false
  priceStatus:string=""
  ImageData:imagesData[] = []
  showExteriorError:boolean=false
  showInteriorError:boolean=false
  showMaterialError:boolean = false
  constructor(private inforData:InforDataService, private http:HttprequestService
        , private validation:ValidationServiceService) { 
    $(".loader_div").show()
    this.http.getAllMakes().subscribe(response => {
      $(".loader_div").hide()
    });
  }

  ngOnInit(): void {
   
    this.userID = this.inforData.getUserId()
    console.log( this.userID)
    this.getUserVehicles()
   
    this.years = this.inforData.generateYearsForSellMyCar();

    if(this.inforData.isVehicleDetailsLoaded())
    {
      $(".loader_div").show()
      this.http.getAllMakes().subscribe(response => {
        $(".loader_div").hide()
        console.log(response)
        this.inforData.setVehiclesInfor(response.ListingVehicleInfo)
      });
    }
    this.damageAreas = this.inforData.getDamagesLocation(0)
    this.accessories = this.inforData.getAccessories();
  }
  addNewDamages() {
    this.showdamagesHistory = false
    this.showDamagesToggle = true
    this.showUploadDamagesImage = true
    this.showAddDamagesPagination = true
    this.showMainDamagesPagination = false
  }
  cancelAddDamages() {
    this.showdamagesHistory = true
    this.showDamagesToggle = false
    this.showUploadDamagesImage = false
    this.showAddDamagesPagination = false
    this.showMechanicalCheckBox = false
    this.showDamagesPrice = false
    this.showAddDamageButton = false
    this.toggleDamage = false
    this.showMainDamagesPagination = true
    this.showUploadDamagesImagePreview =false
    this.showDamagesFrom = false
    $("#toggle").removeAttr('class');
    $("#toggle").attr("class", "w-checkbox-input w-checkbox-input--inputType-custom checkbox-3")
    $('input:radio[name="Mechanical"]').prop('checked', false);
  }
  showAddVehicleDiv() {
    this.showAddVehicle = true
    this.showAddvehicleButton = false
    this.showVehicleSummary = false
  }

  getMakesByYear() {
    this.makes = this.inforData.getVehicleMakesByYear(parseFloat(this.selectedYear))
    this.models = []
    this.selectedMake = ""
    this.selectedModelType = ""
    this.selectedModel = ""
    this.modelTypes = []
    this.introDates = []
    this.selectedIntroDates = ""
    this.mmcode =""
   
  }
  getModelByMakes() {
    this.models = this.inforData.getvehicleModelByMakes(this.selectedMake)
    this.selectedModelType = ""
    this.selectedModel = ""
    this.modelTypes = []
    this.introDates = []
    this.selectedIntroDates = ""
    this.mmcode =""
  }

  getModelTypeByModel() {
    this.modelTypes = this.inforData.getvehicleModelTypeByModel(this.selectedModel)
    this.introDates = []
    this.selectedIntroDates = ""
    this.mmcode =""
    if (this.modelTypes.length == 1) {
      this.getIntroDate()
    }
  }

  getIntroDate() {
    this.introDates = this.inforData.getvehicleIntroDate(this.selectedModelType)
    if(this.introDates.length ==1)
    {
      this.getMMCODE()
      this.selectedIntroDates = this.introDates[0].introView
    }
    
  }
  getMMCODE() {
    this.mmcode = this.inforData.getvehicleMMcode(this.selectedModelType)
  }

  moveToAccessories() {

    this.showYearError = this.selectedYear == ""
    this.showMakeError = this.selectedMake == ""
    this.showModelError = this.selectedModel == ""
    this.showModelTypeError = this.selectedModelType == ""
    this.showIntroDateError = this.selectedIntroDates == ""
    let mileagefeedback = this.validation.validatePriceAndMilage(this.mileage.trim(),1,"")
    this.showMileageError = mileagefeedback.status
    this.mileageMessage = mileagefeedback.message
    this.showRegistrationError = this.registration == ""
    this.showVehicleDriveError = this.selectedDrive == ""
    this.showBodyTypeError = this.selectedBodyType == ""
    this.showTransmissionError = this.selectedTransmission == ""
    this.showFuelError = this.selectedFuelType == ""
    let vinMessage = this.validation.validateVin(this.vinNumber,17,"")
    this.showVinError = vinMessage.status
    this.vinErrorMessage = vinMessage.message
    if(this.selectedYear != "" && this.selectedMake != "" && this.selectedModel != "" && this.selectedModelType != "" && this.selectedIntroDates != "" && this.mileage != "" &&
        this.selectedBodyType != "" && this.selectedDrive != "" && this.selectedFuelType != "" && this.registration != "" &&  !this.showVinError) 
    {
      this.showAccessories = true
      this.showAddVehicle = false
      this.showSummary = true
      this.populateVehicleData()

    }
  }

  populateVehicleData() {
    this.vehicle.MAKE = this.selectedMake
    this.vehicle.MODEL = this.selectedModel
    this.vehicle.MODELTYPE = this.selectedModelType
    this.vehicle.YEAR = this.selectedYear.toString()
    this.vehicle.MILEAGE = this.mileage.trim()
    this.vehicle.BodyType = this.selectedBodyType
    this.vehicle.Drive = this.selectedDrive
    this.vehicle.Fuel = this.selectedFuelType
    this.vehicle.REGNO = this.registration
    this.vehicle.VIN = this.vinNumber
    this.vehicle.MMCode = this.mmcode
    this.vehicle.Description = this.vehicleDesctription
    this.vehicle.Transmission = this.selectedTransmission
    if( this.introDates.length > 0)
    {
      this.vehicle.IntroYear = this.introDates[0].introDate
      this.vehicle.DiscYear = this.introDates[0].discDate
    }
    this.vehicle.InteriorColour = this.interiorMaterial + " " + this.interiorColour
    this.vehicle.ExteriorColour = this.exteriorColour
    this.vehicle.ServiceHistory = this.isFullServiceHistory.toString()
    this.vehicle.ValidLicenseDisc = this.isValidLicenseDisc.toString()
    this.vehicle.FirstOwnerVehicle = this.isFirstOwnerVehicle.toString()
    this.vehicle.AccidentFree = this.VehicleAccidentFree.toString()
    this.vehicle.Accessories = this.selectedAccessories.toString()
  }
  populateDataToView() {
    this.selectedYear = this.vehicle.YEAR
    this.getMakesByYear()
    this.selectedMake = this.vehicle.MAKE
    this.getModelByMakes()
    this.selectedModel = this.vehicle.MODEL
    this.getModelTypeByModel()
    this.selectedModelType = this.vehicle.MODELTYPE
    this.getIntroDate()
    this.selectedIntroDates = this.vehicle.DiscYear + " " + this.vehicle.IntroYear
    this.mileage = this.vehicle.MILEAGE
    this.selectedBodyType = this.vehicle.BodyType
    this.selectedDrive = this.vehicle.Drive
    this.selectedFuelType = this.vehicle.Fuel
    this.registration = this.vehicle.REGNO
    this.vinNumber = this.vehicle.VIN
    this.vehicle.MMCode = this.mmcode
    this.vehicleDesctription = this.vehicle.Description
    this.selectedTransmission = this.vehicle.Transmission
    if (this.introDates.length > 0) {
      this.introDates[0].introDate = this.vehicle.DiscYear
      this.introDates[0].discDate = this.vehicle.DiscYear
    }
    this.interiorColour = this.vehicle.InteriorColour
    $("input[name='Material']").prop('checked', false);
    if(this.interiorColour.trim() != "")
    {
      $("input[name='Material'][value='" +  this.interiorColour + "']").prop('checked', true);
      $("input[name='Material'][value=" +  this.interiorColour + "]").prop('checked', true);
    }
    this.interiorMaterial = this.vehicle.InteriorMaterial
    $("input[name='Interior']").prop('checked', false);
    if( this.interiorColour.trim() != "")
    {
      $("input[name='Interior'][value='" +  this.interiorMaterial + "']").prop('checked', true);
      $("input[name='Interior'][value='" +  this.interiorMaterial + "']").attr('checked', 'checked');
    }
    this.vehicle.InteriorColour = this.interiorMaterial + " " + this.interiorColour
    
    this.exteriorColour  = this.vehicle.ExteriorColour 
    $("input[name='Exterior']").prop('checked', false);
    if(this.exteriorColour.trim() != "")
    {
      $("input[name='Exterior'][value='" +  this.exteriorColour + "']").prop('checked', true);
      $("input[name='Exterior'][value='" +  this.exteriorColour + "']").attr('checked', 'checked');
    }
    this.isFullServiceHistory = Boolean(this.vehicle.ServiceHistory)
    this.isValidLicenseDisc = Boolean(this.vehicle.ValidLicenseDisc)
    this.isFirstOwnerVehicle = Boolean(this.vehicle.FirstOwnerVehicle)
    this.VehicleAccidentFree =  Boolean(this.vehicle.AccidentFree)
    this.selectedAccessories = this.vehicle.VehicleAccessoriesList.map(item => item.Accessories)
    this.vehicle.Accessories = this.selectedAccessories.toString()
    this.vehicleDamagesView = this.vehicle.CosmeticDamagesList

    for(let index =0 ; index < this.vehicle.vehicleImageList.length; index++)
    {
        this.vehicleImages.push(
          {
            base64:"",
            isMainImage: this.vehicle.vehicleImageList[index].IMAGEANGLE == "Side view of the vehicle – right hand side",
            vehicleID: this.vehicleID,
            imageType:"",
            imagePath:this.vehicle.vehicleImageList[index].IMAGEPATH,
            imageView:this.vehicle.vehicleImageList[index].IMAGEPATH
          }
        )
    }


  }

  moveToAdditionalInformation() {
    this.showAccessories = false
    this.showAdditionalInfor = true
    this.populateVehicleData()
  }

  selectAccessoriesValue(accessory: string) {
    if (this.selectedAccessories.indexOf(accessory) >= 0) {
      let index = this.selectedAccessories.indexOf(accessory)
      this.selectedAccessories.splice(index, 1)
    }
    else {
      this.selectedAccessories.push(accessory)
    }
  }

  selectColor(type: number, color: string) {
    switch (type) {
      case 0:
        this.interiorMaterial = color
        this.showMaterialError = false
        break;
      case 1:
        this.interiorColour = color
        this.showInteriorError =false
        break;
      case 2:
        this.exteriorColour = color
        this.showExteriorError = false
    }
  }
  onAdditionalInforCheckBox(value: boolean, type: number) {
    switch (type) {
      case 0:
        this.isFullServiceHistory = value
        break;
      case 2:
        this.isFirstOwnerVehicle = value
        break;
      case 3:
        this.VehicleAccidentFree = value
        break;
      case 1:
        this.isValidLicenseDisc = value
        break;
    }
  }

  handleUpload(event: any, type: string) {

    const files = event.target.files;
    const reader = new FileReader();

    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      let base64 = reader.result?.toString() || ""
      this.convertUploadedImages(base64, type, files[0].name)

    };

  }

  handleImageUpload(event: any) 
  {
    $(".loader_div").show()
    this.vehicleImages = []
    let count = 0;
    const files = event.target.files;
    this.showMainImageError = false
    for (let index = 0; index < files.length; index++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[index]);
      reader.onload = () => {
       let im =  reader.result?.toString() || ""
      let loadedImageLength = typeof this.vehicle.vehicleImageList == "undefined" ? 0 : this.vehicle.vehicleImageList.length
        if((loadedImageLength +  this.vehicleImages.length)  <= 25)
        {
          this.vehicleImages.push({
          base64: im,
          isMainImage:false,
          vehicleID:this.vehicleID,
          imageType: im.split(",")[0].split(";")[0].split("/")[1],
          imagePath: "",
          imageView:im
          }) 
          
          if(count == (files.length -1))
          {
            this.loadImageVehicles()
          }
          count++

        }
        else
        {
          $(".loader_div").hide()
          this.showMainImageError = true
          this.imageErrorMessage = "Kindly Note images limit is 25"
          index = files.length
        }
    
      };

    }

  }

  handleImageUploadFile(event:any)
  {
    const files = event.target.files;
    let formData = new FormData()
    for(let index =0; index < files.length; index++)
    {
      formData.append(files[index].name,files)
    }

    this.http.sendFormGroup(formData).subscribe(reponse => {
      
    })
  }

  cancelPreviewImage() {
    this.showUploadDamagesImagePreview = false
  }
  confirmDamageImage() {
    this.previewImageButton = false
    this.showDamagesFrom = true
    this.showAddDamageButton = true
    this.showDamagesPrice = true
  }
  convertUploadedImages(base64: string, type: string, fileName: string) {
    switch (type) {
      case "vehiclefile":
        let base64Array = base64.split(",")
        this.base64PDf = []
        this.base64PDf.push({
          document0: base64Array[1],
          fileType0: base64Array[0].split(";")[0].split("/")[1],
          fileName: fileName,
          vehicleID: ""
        })
        break;

      case "damages":
        this.previewDamageImage = base64
        this.showUploadDamagesImagePreview = true
        this.previewImageButton = true

        break
    }
  }

  saveVehicleDetails() {
    this.populateVehicleData()
    this.vehicle.userid = this.userID
    this.showExteriorError = this.exteriorColour == ""
    this.showInteriorError = this.interiorColour == ""
    this.showMaterialError = this.interiorMaterial == ""
    if(this.showExteriorError == false && this.showMaterialError == false && this,this.showInteriorError == false)
    {
      $(".loader_div").show()
      this.http.saveVehicle(this.vehicle).subscribe(response =>
      {
          this.vehicleID = response
          this.vehicle.VehicleID =   this.vehicleID
          this.vehicle.isEditVehicle = true
          if(this.base64PDf.length > 0)
          {
            this.base64PDf[0].vehicleID = response
           
            this.http.postVehicleDocuments(this.base64PDf[0]).subscribe(response =>{
              this.moveToVehicleDamages()
              $(".loader_div").hide()
            })
          }
          else
          {
            $(".loader_div").hide()
            this.moveToVehicleDamages()
          }
        

      })
    }
   
  }

  moveToVehicleDamages() {
    this.showDamages = true
    this.showMainDamagesPagination = true
    this.showdamagesHistory = true
    this.showAdditionalInfor = false
  }

  backToStep(step: any) {
    switch (step) {
      case 0:
        this.showAddVehicle = false
        this.showAddvehicleButton = true
        this.showVehicleSummary =true
        this.showSummary = false
        break
      case 1:
        this.showAccessories = false
        this.showAddVehicle = true
        break
      case 2:
        this.showAccessories = true
        this.showAdditionalInfor = false
        break
      case 3:
        this.showDamages =false
        this.showAdditionalInfor = true
        break
      case 4:
        this.showImages =false
        this.showDamages = true
        break
    }
  }

  selectDamageLocation()
  {
    this.selecteDamageLocation = this.selecteDamageLocation == "4" ? "1" :  this.selecteDamageLocation
    this.damageAreas = this.inforData.getDamagesLocation(parseInt(this.selecteDamageLocation))
  }
  saveVehicleDamages() {
    if (!this.toggleDamage) {
      this.showLocationError = this.selecteDamageLocation == ""
      this.showAreaError = this.selectedArea == ""
    }
    this.showdamagePriceError = this.damagePrice == ""
    if ((!this.showdamagePriceError && !this.showAreaError && !this.showdamagePriceError) ||
      (this.toggleDamage && this.damagePrice != "")) {
      this.vehicleDamage = {} as CosmeticDamagesList
      if (!this.toggleDamage) {
        this.vehicleDamage.Area = this.selectedArea
        this.vehicleDamage.Position = this.damageLocation[parseInt(this.selecteDamageLocation)]
        this.vehicleDamage.Type = this.selectedType
        let images = this.previewDamageImage.split(",")

        if (images.length > 0) {
          this.vehicleDamage.ImagePath = images[1]
          this.vehicleDamage.IMAGETYPE = images[0].split(";")[0].split("/")[1]
        }
      }
      else {
        this.vehicleDamage.Position = this.selectedMechanical
      }
      this.vehicleDamage.Description = this.damageDescription
      this.vehicleDamage.Price = this.damagePrice
      this.vehicleDamage.IsMechanical = this.toggleDamage.toString()
      this.vehicleDamage.vehicleID = this.vehicleID
      
      
      $(".loader_div").show()
      this.http.postVehicleDamages(this.vehicleDamage).subscribe(reponse =>{
        $(".loader_div").hide()
        if(!this.toggleDamage)
        {
          this.vehicleDamage.IMAGE = this.previewDamageImage
        }
         
          this.vehicleDamagesView.push(this.vehicleDamage)
          this.resertAdddamagesProcess()
          this.getVehicleDamages()
      })
    }
  }
  resertAdddamagesProcess() {
    this.damagePrice = ""
    this.damageDescription = ""
    this.previewDamageImage = ""
    this.selectedArea = ""
    this.selecteDamageLocation = ""
    this.selectedType = ""
    this.showdamagesHistory = true
    this.showMainDamagesPagination = true
    this.showDamagesToggle = false
    this.showUploadDamagesImage = false
    this.showAddDamagesPagination = false
    this.showUploadDamagesImagePreview = false
    this.showDamagesFrom = false
    this.showDamagesPrice = false
    this.cancelAddDamages()
  }
  damageToggleChange() {
    if (this.toggleDamage) {
      this.toggleDamage = false
      this.showUploadDamagesImage = true
      this.showMechanicalCheckBox = false
    }
    else {
      this.toggleDamage = true
      this.showUploadDamagesImage = false
      this.showMechanicalCheckBox = true
    }
  }

  selectMechanical(mechanical: string) {
    this.selectedMechanical = mechanical
    this.showDamagesPrice = true
    this.showAddDamageButton = true
  }
  moveToPhotos() {
    this.showImages = true
    this.showDamages = false
  }

  selectedImage(index: number) {
    this.showMainImageError = false
    if (this.selectedImages.includes(index)) {
      let imageIndex = this.selectedImages.indexOf(index)
      this.selectedImages.splice(imageIndex, 1)
    }
    else {
      this.selectedImages.push(index)
    }
    if (this.selectedImages.length == 1) {
      this.showMarkAsMainImage = true
    }
    else {
      this.showMarkAsMainImage = false
    }
    if(this.selectedImages.length > 0)
    {
      this.showDeleteImages = true
    }
    else
    {
      this.showDeleteImages = false
    }
  }

  marksAsMainImage() {
   
      let tempVehicle = this.vehicle.vehicleImageList.filter((item,index) => this.selectedImages.includes(index))[0]
      this.http.markVehicleImageAsMain(tempVehicle.VEHICLEIMAGEID,this.vehicle.VehicleID).subscribe(reponse =>
      {
        this.getVehicleDetail(this.vehicleID)
        this.showMarkAsMainImage = false
        this.showDeleteImages = false
      })

      $("input[name='vehiclePhotos']").prop('checked', false);
      this.selectedImages = []
    
  }
  deleteVehicleImages()
  {
  
      let imageIDs =  this.vehicle.vehicleImageList.filter((item,index)=> this.selectedImages.includes(index) && item.VEHICLEIMAGEID != "").map(item => item.VEHICLEIMAGEID).toString()
      this.http.removeVehicleImage(imageIDs).subscribe(reponse => {
        this.vehicleImages = this.vehicleImages.filter((item,index)=> !this.selectedImages.includes(index))
        this.selectedImages = []
        this.showMarkAsMainImage = false
        this.showDeleteImages = false
        $("input[name='vehiclePhotos']").prop('checked', false);
        this.selectedImages = []
        this.getVehicleDetail(this.vehicleID)
      })
   
    
  }

  loadImageVehicles()
  {
    this.ImageData = []
    this.ImageData.push({ 
        first: this.vehicleImages.length > 0 ? this.vehicleImages[0].imageType + "," + this.vehicleImages[0].imageView.split(",")[1] : "",
        second: this.vehicleImages.length > 1 ? this.vehicleImages[1].imageType + "," + this.vehicleImages[1].imageView.split(",")[1]: "", 
        third: this.vehicleImages.length > 2 ? this.vehicleImages[2].imageType + "," + this.vehicleImages[2].imageView.split(",")[1]: "", 
        fourth: this.vehicleImages.length > 3 ? this.vehicleImages[3].imageType + "," + this.vehicleImages[3].imageView.split(",")[1]: "", 
        fifth:this.vehicleImages.length > 4 ? this.vehicleImages[4].imageType + "," + this.vehicleImages[4].imageView.split(",")[1]: "",
        sixth:this.vehicleImages.length > 5 ? this.vehicleImages[5].imageType + "," + this.vehicleImages[5].imageView.split(",")[1]: "",
        seventh:this.vehicleImages.length > 6 ? this.vehicleImages[6].imageType + "," + this.vehicleImages[6].imageView.split(",")[1]: "",
        eighth:this.vehicleImages.length > 7 ? this.vehicleImages[7].imageType + "," + this.vehicleImages[7].imageView.split(",")[1]: "",
        ninth:this.vehicleImages.length > 8 ? this.vehicleImages[8].imageType + "," + this.vehicleImages[8].imageView.split(",")[1]: "",
        tenth:this.vehicleImages.length > 9 ? this.vehicleImages[9].imageType + "," + this.vehicleImages[9].imageView.split(",")[1]: "",
        eleventh:this.vehicleImages.length > 10 ? this.vehicleImages[10].imageType + "," + this.vehicleImages[10].imageView.split(",")[1]: "", 
        twelfth:this.vehicleImages.length > 11 ? this.vehicleImages[11].imageType + "," + this.vehicleImages[11].imageView.split(",")[1]: "",
        thirteenth:this.vehicleImages.length > 12 ? this.vehicleImages[12].imageType + "," + this.vehicleImages[12].imageView.split(",")[1]: "", 
        fourteenth:this.vehicleImages.length > 13 ? this.vehicleImages[13].imageType + "," + this.vehicleImages[13].imageView.split(",")[1]: "",
        fifteenth:this.vehicleImages.length > 14 ? this.vehicleImages[14].imageType + "," + this.vehicleImages[14].imageView.split(",")[1]: "",
        vehicleID: this.vehicleID
    })
            this.http.postVehicleImages(this.ImageData[0]).subscribe(response => 
            {
                this.getVehicleDetail(this.vehicleID)
            }
          )
         
  }

  UpdateAddvehicles()
  {
    this.showMainImageError = false
    if(this.vehicle.vehicleImageList.some(item =>
      item.IMAGEANGLE == "Side view of the vehicle – right hand side"
      ))
    {
      this.showImages =false 
      this.showVehicleSummary = true
      this.showAddvehicleButton =true
      this.showSummary = false
      this.getUserVehicles()
    }
    else
    {
      if(this.vehicle.vehicleImageList.length > 0)
      {
        this.showMainImageError =true
        this.imageErrorMessage = "Please Select Main Image"
      }
      else
      {
        this.showMainImageError =true
        this.imageErrorMessage = "Kindly Add Images"
      }
    }

  }
  
 

  getUserVehicles()
  {
    $(".loader_div").show()
    this.http.getUserListing(this.userID).subscribe(response => {
      $(".loader_div").hide()
      this.userVehicles =  response.aaData
      console.log( this.userVehicles)
      if(this.userVehicles.length < 2)
      {
        this.showAddvehicleButton = true
      }
      else {
        this.showAddvehicleButton = false
      }
    })
  }

  resetAddVehicleProcess() {
    this.VehicleAccidentFree = false;
    this.isFirstOwnerVehicle = false
    this.isValidLicenseDisc = false
    this.isFullServiceHistory = false
    this.showYearError = false
    this.showMakeError = false
    this.showModelError = false
    this.showModelTypeError = false
    this.showIntroDateError = false
    this.showMileageError = false
    this.showRegistrationError = false
    this.showVehicleDriveError = false
    this.showBodyTypeError = false
    this.showTransmissionError = false
    this.showFuelError = false
    this.showLocationError = false
    this.showAreaError = false
    this.showdamagePriceError = false
    this.showMarkAsMainImage = false
    this.showMainImageError = false
    this.showAddVehicle = false
    this.showAccessories = false
    this.showAdditionalInfor = false
    this.showDamages = false
    this.showImages = false
    this.showAdvertise = false
    this.showSummary = false
    this.showVehicleSummary = false
    this.showAddvehicleButton = false
    this.showdamagesHistory = true
    this.showUploadDamagesImage = false
    this.showUploadDamagesImagePreview = false
    this.showDamagesFrom = false
    this.showMechanicalCheckBox = false
    this.showDamagesToggle = false
    this.showAddDamagesPagination = false
    this.showMainDamagesPagination = false
    this.showAddDamageButton = false
    this.previewImageButton = false
    this.showDamagesPrice = false
    this.toggleDamage = false
  }

  viewNumber(value: string) {
    if (value == "") {
      value = "0"
    }
    return value
  }

  getVehicleDetail(vehicleID:string)
  {
    $(".loader_div").show()
    this.http.getVehicleDetailsEdit(vehicleID,this.userID).subscribe(reponse =>{
      if(reponse.aaData.length > 0)
      {
        this.vehicle = reponse.aaData[0]
        this.populateDataToView()
      }
      $(".loader_div").hide()
    })
  }

  editUserVehicle(vehicleID:string)
  {
    
    $(".loader_div").show() 
    this.http.getVehicleDetailsEdit(vehicleID,this.userID).subscribe(reponse =>{
      $(".loader_div").hide()
      if(reponse.aaData.length > 0)
      {
        console.log(reponse.aaData)
        this.vehicle = reponse.aaData[0]
        this.vehicle.isEditVehicle =true
        this.showSummary = true
        this.populateDataToView()
        this.getVehicleDamages()
      }
      this.showAddVehicleDiv()
    })
  }
  removeUserVehicle(vehicleID:string)
  {
    $(".loader_div").show()
    this.http.deleteVehicleDetails(vehicleID,this.userID).subscribe(reponse =>
      {
        $(".loader_div").hide()
        this.getUserVehicles()
      })
  }
  
  showAdveriseVehicle(vehicleID:string)
  {
    this.priceStatus = "Advertise"
    if(this.userVehicles.some(item => item.VehicleID == vehicleID && item.Transvalues == "1"))
    {
      this.showAddvehicleButton = false
      this.showVehicleSummary =false
      this.showAdvertise =true
      this.populateTradeAndRetail(vehicleID)
    }
    else
    {
      this.getTradeAndRetail(vehicleID,true)
    }
  }
  editAdveriseVehiclePrice(vehicleID:string)
  {
    this.vehicleID = vehicleID
    this.priceStatus = "UpdatePrice"
    this.populateTradeAndRetail(vehicleID)
  }

  populateTradeAndRetail(vehicleID:string)
  {
    this.vehicleID = vehicleID
    let tempVehicle = this.userVehicles.find(item => item.VehicleID == vehicleID)
    this.trade = tempVehicle?.TRADE || ""
    this.retail = tempVehicle?.RETAIL || ""
    this.tradeCarInfor = tempVehicle?.YEAR  + " " +  tempVehicle?.MAKE + " " + tempVehicle?.MODELTYPE
    this.tradeCarKM = tempVehicle?.MILEAGE || ""
    this.vehicleAdvertisePrice = tempVehicle?.Price || ""
  }

  cancelAdvertisingVehicle()
  {
    this.showAddvehicleButton = true
    this.showVehicleSummary =true
    this.showAdvertise =false
  }
  submitVehicleAdvertisePrice()
  {
    this.showAdvertisePriceError = this.vehicleAdvertisePrice == "" 
    if(!this.showAdvertisePriceError) 
    {
      $(".loader_div").show()
      this.http.saveVehicleAdverisePrice(this.vehicleID,this.vehicleAdvertisePrice,this.userID,this.priceStatus).subscribe(response=>
      {
          $(".loader_div").hide()
          this.getUserVehicles()
          this.cancelAdvertisingVehicle()
      })
    }
  }

  getActionOffer(vehicleID:string)
  {
    $(".loader_div").show()
    this.http.saveVehicleAdverisePrice(vehicleID,"",this.userID,"Auction").subscribe(response=>
    {
      $(".loader_div").hide()
       this.getUserVehicles()
    })
  }

  isDefined(data:any):boolean
  {
    return typeof data != "undefined"
  }

  displayImage(images: images) {
    return images.base64 == "" ? images.imagePath : images.base64
  }
  getTradeAndRetail(vehicled:string, viewAdvertise:boolean)
  {
    let tempVehicle = this.userVehicles.filter(item => item.VehicleID == vehicled)
    $(".loader_div").show()
    this.http.getTradeAndRetail(tempVehicle[0],this.userID).subscribe(response =>{
      $(".loader_div").hide()
      this.userVehicles =  response.aaData
      if(viewAdvertise)
      {
        this.populateTradeAndRetail(vehicled)
        this.showAddvehicleButton = false
        this.showVehicleSummary =false
        this.showAdvertise =true
      }
    })
  }
  resetAddVehicle()
  {
    this.vehicle = {} as UserVehicles
    this.vehicle.isEditVehicle = false
    this.selectedYear  =   ""
    this.selectedMake = ""
    this.selectedModel = ""
    this.selectedModelType = ""
    this.selectedIntroDates = "'"
    this.mileage = ""
    this.selectedBodyType = ""
    this.selectedDrive =  ""
    this.selectedFuelType  = ""
    this.registration =""
    this.vinNumber =  ""
    this.mmcode = ""
    this.vehicleDesctription = ""
    this.selectedTransmission= ""
    
    this.interiorColour = ""
    
    $("input[name=mygroup]").prop('checked',false);
   
    this.interiorMaterial = this.vehicle.InteriorMaterial
    if( this.interiorColour.trim() != "")
    {
     $("input[name=Interior]").prop('checked', false);
    }
    this.interiorMaterial = ""
     this.interiorColour = ""
    
    this.exteriorColour  = "" 

    this.isFullServiceHistory =  false
    this.isValidLicenseDisc  =false
    this.isFirstOwnerVehicle = false
    this.VehicleAccidentFree = false
    this.selectedAccessories = []
    this.vehicleDamagesView = []
    this.vehicleImages = []
    this.showAddVehicleDiv()
  }

  isNumber(num: any) {
    if (typeof num == "undefined") {
      return 0
    }
    else {
      num = num.toString()
    }
    if (num.includes(",")) {
      num = num.substring(0, num.indexOf(","))
    }

    var result = "";
    var gap_size = 3;
    var numb = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return numb;
  }

  offerResponse(vehicleID:string, status:string)
  {
    $(".loader_div").show()
    this.http.offerResponse(vehicleID,this.userID,status).subscribe(response =>
      {
        $(".loader_div").hide()
        this.getUserVehicles()
      })
  }
  getVehicleDamages()
  {
    this.http.getVehicleDamages(this.vehicle.VehicleID).subscribe(reponse =>
      {
         this.vehicle.CosmeticDamagesList = reponse.CosmeticDamagesList
      })
  }
  removeVehicleDamage(damageID:string)
  {
    this.http.removeVehicleDamages(damageID,this.userID).subscribe(reponse =>
      {
         this.getVehicleDamages()
      })
  }

  removeVehicleFromAdvertise(vehicleID:string)
  {
    this.http.removeVehicleFromAdvertise(vehicleID, this.userID).subscribe(reponse =>
      {
        this.getUserVehicles()
      })
  }

  viewDate(date:string)
  {
    return date.split(" ")[0]
  }
  OfferPrice(offer:string)
  {
    if(offer == "0")
    {
      return "No Offer"
    }
    return "R " + offer
  }
 

}
