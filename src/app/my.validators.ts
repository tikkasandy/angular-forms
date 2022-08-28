import {AbstractControl, FormControl} from "@angular/forms";
import {Observable} from "rxjs";

export class MyValidators {
  static restrictedEmails(control: FormControl): { [p: string]: boolean } | null {
    if (['s@s', 'a@a'].includes(control.value)) {
      return {restrictedEmail: true}
    }
    return null
  }

  static uniqueEmail(control: AbstractControl): Promise<any> | Observable<any> {
    return new Promise(
      resolve => {
        setTimeout(() => {
          if (control.value === 'async@mail.com') {
            resolve({uniqueEmail: true})
          } else {
            resolve(null)
          }
        }, 5000)
      }
    )
  }
}
