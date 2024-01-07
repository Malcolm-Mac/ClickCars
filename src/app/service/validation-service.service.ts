import { Injectable } from '@angular/core';
import { validateObject } from '../interfaces/vehiclesInterface';

@Injectable({
  providedIn: 'root'
})
export class ValidationServiceService {

  constructor() { }

  lengthOfInput(elementID: string, length: number, message: string) {

    if (this.validateImojis(elementID)) {
      let errorCode = '<div class="message_div" id="error' + elementID + '"><div >Emoji are not allowed</div> </div>';

      if ($("#error" + elementID).length == 0) {
        //  $(errorCode).insertAfter("#" + elementID)
      }
      else {
        $("#error" + elementID).remove();
        //$(errorCode).insertAfter("#" + elementID);
      }
      $("#" + elementID).addClass("error_input");
      return false;
    }
    let input: any = $("#" + elementID).val();
    let format = /[`!@#$%^&*+\=\[\]{};':"\\|,.<>\?~]/;

    let element: any = $("#" + elementID).val()

    if (element.length < length) {
      let errorCode = '<div class="message_div" id="error' + elementID + '"><div >' + message + '</div> </div>';
      $("#" + elementID).addClass("error_input");
      if ($("#error" + elementID).length == 0) {
        //$(errorCode).insertAfter("#" + elementID)
      }
      else {
        $("#error" + elementID).remove();
        // $(errorCode).insertAfter("#" + elementID);
      }
      return false
    }
    else {
      if (format.test(input)) {
        let errorCode = '<div class="message_div" id="error' + elementID + '"><div >Special characters like(!@#$) are not allowed</div> </div>';
        if ($("#error" + elementID).length == 0) {
          $("#" + elementID).addClass("error_input");
          //  $(errorCode).insertAfter("#" + elementID);
        }
        else {
          $("#error" + elementID).remove();
          //  $(errorCode).insertAfter("#" + elementID);
        }

        return false;
      }
      else {
        // $("#" + elementID).removeClass("error_input");
        $("#error" + elementID).remove();
      }

    }
    return true;
  }

  validateImojis(elementID: string) {
    let format = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/
    var element: any = $("#" + elementID).val()
    return format.test(element)
  }

  validateNumberPhones(elementID: string) {
    let formatNotAllowed = /[` !#$%^&*()+\=\[\]{};':"\\|,<>\/?~]/;

    let format = /^(0)[1-9][0-9]{8}$/
    let input: any = $("#" + elementID).val();
    input = this.myTrim(input)
    let ddd = formatNotAllowed.test(input)
    if (this.validateImojis(elementID)) {
      let errorCode = '<div class="message_div" id="error' + elementID + '"><div >Emoji are not allowed</div> </div>';

      if ($("#error" + elementID).length == 0) {
        //    $(errorCode).insertAfter("#" + elementID);
      }
      else {
        $("#error" + elementID).remove();
        //  $("#" + elementID).insertAfter(errorCode);

      }
      $("#" + elementID).addClass("error_input");
      return false;
    }

    if (input.length > 0) {
      if (formatNotAllowed.test(input)) {
        let errorCode = '<div class="message_div" id="error' + elementID + '"><div> Special characters like(!<>#$) are not allowed</div> </div>';
        if ($("#error" + elementID).length == 0) {
          $("#" + elementID).addClass("error_input");
          // $(errorCode).insertAfter("#" + elementID);
        }
        else {
          $("#error" + elementID).remove();
          $(errorCode).insertAfter("#" + elementID);
        }

        return false;

      }
      let sss = format.test(input);

      if (!format.test(input)) {
        let errorCode = '<div class="message_div" id="error' + elementID + '"><div> Numbers is not in the right format</div> </div>';
        if ($("#error" + elementID).length == 0) {
          //$(errorCode).insertAfter("#" + elementID)
        }
        else {
          $("#error" + elementID).remove();
          // $(errorCode).insertAfter("#" + elementID);
        }
        $("#" + elementID).addClass("error_input");
        return false;
      }

    }
    else {
      let errorCode = '<div class="message_div" id="error' + elementID + '"><div >Please Enter on Of The Contact Details</div> </div>';

      if ($("#error" + elementID).length == 0) {
        // $(errorCode).insertAfter("#" + elementID);
      }
      else {
        $("#error" + elementID).remove();
        //  $("#" + elementID).insertAfter(errorCode);

      }
      $("#" + elementID).addClass("error_input");
      return false;
    }

    $("#" + elementID).removeClass("error_input");
    $("#error" + elementID).remove();

    return true;
  }

  myTrim(x: string) {
    return x.replace(/\s+/g, '');
  }

  validateEmail(elementID: string) {
    let formatNotAllowed = /[` !#$%^&*()+\=\[\]{};':"\\|,<>\/?~]/;
    let format = /\S+@\S+/;

    let input: any = $("#" + elementID).val();
    let ddd = formatNotAllowed.test(input)
    if (this.validateImojis(elementID)) {
      let errorCode = '<div class="message_div" id="error' + elementID + '"><div >Emoji are not allowed</div> </div>';

      if ($("#error" + elementID).length == 0) {
        //$(errorCode).insertAfter("#" + elementID)
      }
      else {
        $("#error" + elementID).remove();
        //$(errorCode).insertAfter("#" + elementID);
      }
      $("#" + elementID).addClass("error_input");
      return false;
    }
    let sss = format.test(input);
    if (!format.test(input)) {
      let errorCode = '<div class="message_div" id="error' + elementID + '"><div> Email format is not correct</div> </div>';
      if ($("#error" + elementID).length == 0) {
        //  $(errorCode).insertAfter("#" + elementID)
      }
      else {
        $("#error" + elementID).remove();
        //    $(errorCode).insertAfter("#" + elementID);
      }
      $("#" + elementID).addClass("error_input");
      return false;
    }
    else if (formatNotAllowed.test(input)) {
      let errorCode = '<div class="message_div" id="error' + elementID + '"><div >Special characters like(!<>#$) are not allowed</div> </div>';
      if ($("#error" + elementID).length == 0) {
        $("#" + elementID).addClass("error_input");
        //     $(errorCode).insertAfter("#" + elementID);
      }
      else {
        $("#error" + elementID).remove();
        //       $(errorCode).insertAfter("#" + elementID);
      }

      return false;

    } else {
      $("#" + elementID).removeClass("error_input");
      $("#error" + elementID).remove();

    }
    return true;
  }

  validateDescrtion(elementID: string, length: number, message: string) {

    var input: any = $("#" + elementID).val();

    let formats = /[#$%^*_\\[\]{}\\|<>\~]/;

    if (input.length < length) {
      let errorCode = '<div class="message_div" id="error' + elementID + '"><div >' + message + '</div> </div>';
      $("#" + elementID).addClass("error_input");
      if ($("#error" + elementID).length == 0) {
        //$(errorCode).insertAfter("#" + elementID)
      }
      else {
        $("#error" + elementID).remove();
        //$(errorCode).insertAfter("#" + elementID);
      }
      return false
    }
    else {
      if (formats.test(input)) {
        let errorCode = '<div class="message_div" id="error' + elementID + '"><div >Special characters like(!@#$) are not allowed</div> </div>';
        if ($("#error" + elementID).length == 0) {
          $("#" + elementID).addClass("error_input");
          //   $(errorCode).insertAfter("#" + elementID);
        }
        else {
          $("#error" + elementID).remove();
          //     $(errorCode).insertAfter("#" + elementID);
        }

        return false;
      }
      else {
        $("#" + elementID).removeClass("error_input");
        $("#error" + elementID).remove();
      }

    }
    return true;
  }

  dropDownSelected(elementID: string, message: string) {
    let selected = $("#" + elementID + " option:selected").val();

    if (selected == "") {
      let errorCode = '<div class="message_div" id="error' + elementID + '"><div >' + message + '</div> </div>'

      $("#" + elementID).addClass("error_input");
      if ($("#error" + elementID).length == 0) {
        //  $(errorCode).insertAfter("#" + elementID)
      }
      return false
    }
    else {
      $("#" + elementID).removeClass("error_input");
      $("#error" + elementID).remove();
    }
    return true;
  }

  validatePriceAndMilage(value:string, length:number, message:string) 
  {
    let format = /[a-zA-Z`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    let input= value;

    let validateInfor = {} as validateObject
    if (input.length < length) { 
        validateInfor.message = `Please Mileage Must be at least ${length} characters`
        validateInfor.status = true
        return validateInfor;
    }
    else 
    {
        if (format.test(input)) 
        {
            validateInfor.message = `Only Numbers are allowed`
            validateInfor.status = true
            return validateInfor;
        }
        validateInfor.message = ""
        validateInfor.status = false
        return validateInfor;
    }
  }

  validateVin(value:string, length:number, message:string) 
  {
    let format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    let input= value;

    let validateInfor = {} as validateObject
    if (input.length != 17 && input.length  != 0) { 
        validateInfor.message = `Vin must be 17 character`
        validateInfor.status = true
        return validateInfor;
    }
    else 
    {
        if (format.test(input)) 
        {
            validateInfor.message = `Only Numbers and Letters are allowed`
            validateInfor.status = true
            return validateInfor;
        }
        validateInfor.message = ""
        validateInfor.status = false
        return validateInfor;
    }
  }

  passwordMatch(elementID: string, elementID2: string) {
    let password = $('#' + elementID).val()
    let cpassword = $('#' + elementID2).val()
    if ($("#" + elementID).length !== 0 && $("#" + elementID2).length !== 0) {
      if (password === cpassword) {
        return false;
      } 
      else 
      {
        return true;
      }
    } 
    else 
    {
      return true;
    }
  }

  passwordMatchReset(elementID: string, elementID2: string) {
    let password:any = $('#' + elementID).val()
    let cpassword:any = $('#' + elementID2).val()
    if (password.length !== 0 && cpassword.length !== 0) {
      if (password === cpassword) {
        return false;
      } else 
      {
        return true;
      }
    } else {
      return true;
    }
  }

  passwordValidator(elementID:string, length:number)
  {
    let inputLength:any = $("#" + elementID).val()
    if(inputLength.length >= length)
    {
      return true
    }
    return false
  }


}


