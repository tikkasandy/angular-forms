import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {MyValidators} from "./my.validators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form = new FormGroup ({})

  ngOnInit() {
    // @ts-ignore
    // @ts-ignore
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.email,
        Validators.required,
        MyValidators.restrictedEmails
      ], [MyValidators.uniqueEmail]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      address: new FormGroup( {
        country: new FormControl('ua'),
        city: new FormControl('', Validators.required)
      }),
      skills: new FormArray([])
    })
  }

  submit() {
    if (this.form.valid) {
      console.log('Form submitted: ', this.form)

      const formData = {...this.form.value}
      console.log('Form DAta:', formData)

      this.form.reset()
    }
  }

  setCapital() {
    const cityMap = {
      ua: 'Kyiv',
      pl: 'Warsaw',
      ge: 'Tbilisi',
    }
    const cityKey = this.form.get('address')?.get('country')?.value
    // @ts-ignore
    const city = cityMap[cityKey]

    this.form.patchValue({
      address: {city},
    })
  }

  getControls() {
    return (this.form.get('skills') as FormArray).controls
  }

  addSkill() {
    const control = new FormControl('', Validators.required);
    (this.form.get('skills') as FormArray).push(control)
  }
}
