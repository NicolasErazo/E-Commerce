import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  form!: FormGroup;

  private buildForm() {
    this.form = this.formBuilder.group({
      fullName: this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^([Aa-zA-ZáéíóúÁÉÍÓÚÑñ]{2,}\s?){2,4}$/)]],
        last: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^([Aa-zA-ZáéíóúÁÉÍÓÚÑñ]{2,}\s?){2,4}$/)]]
      }),
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      agree: [false, [Validators.requiredTrue]],
      date: ['', [Validators.required]],
    })
  }



  // form = new FormGroup({
  //   name: new FormControl(),
  //   email: new FormControl(),
  //   phone: new FormControl(),
  //   color: new FormControl(),
  //   date: new FormControl(),
  //   age: new FormControl(),
  //   category: new FormControl(),
  //   tag: new FormControl(),
  //   agree: new FormControl(),
  //   gender: new FormControl(),
  //   zone: new FormControl(),
  // })

  telField = new FormControl();
  colorField = new FormControl();
  numberField = new FormControl();
  rangeField = new FormControl();
  timeField = new FormControl();
  urlField = new FormControl();
  categoryField = new FormControl('category-1');
  tagField = new FormControl();
  genderField = new FormControl();
  zoneField = new FormControl();

  ngOnInit(): void {
    this.zoneField.valueChanges
    .subscribe(value =>{
      console.log(value);
    })
  }

  getNameValue() {
    console.log(this.zoneField.value);    
  }

  get isNameFieldValid() {
    // return this.nameField.touched && this.nameField.valid;
    return this.form.get('fullName.name')?.touched && this.form.get('fullName.name')?.valid;
  }

  get isNameFieldInvalid() {
    // return this.nameField.touched && this.nameField.invalid;
    return this.form.get('fullName.name')?.touched && this.form.get('fullName.name')?.invalid;
  }

  get isLastFieldValid() {
    // return this.nameField.touched && this.nameField.valid;
    return this.form.get('fullName.last')?.touched && this.form.get('fullName.last')?.valid;
  }

  get isLastFieldInvalid() {
    // return this.nameField.touched && this.nameField.invalid;
    return this.form.get('fullName.last')?.touched && this.form.get('fullName.last')?.invalid;
  }

  get isEmailFieldValid() {
    // return this.nameField.touched && this.nameField.valid;
    return this.form.get('email')?.touched && this.form.get('email')?.valid;
  }

  get isEmailFieldInvalid() {
    // return this.nameField.touched && this.nameField.invalid;
    return this.form.get('email')?.touched && this.form.get('email')?.invalid;
  }

  get isAgeFieldValid() {
    // return this.nameField.touched && this.nameField.valid;
    return this.form.get('age')?.touched && this.form.get('age')?.valid;
  }

  get isAgeFieldInvalid() {
    // return this.nameField.touched && this.nameField.invalid;
    return this.form.get('age')?.touched && this.form.get('age')?.invalid;
  }

  get isAgreeFieldValid() {
    // return this.nameField.touched && this.nameField.valid;
    return this.form.get('agree')?.touched && this.form.get('agree')?.valid;
  }

  get isAgreeFieldInvalid() {
    // return this.nameField.touched && this.nameField.invalid;
    return this.form.get('agree')?.touched && this.form.get('agree')?.invalid;
  }

  get isDateFieldValid() {
    // return this.nameField.touched && this.nameField.valid;
    return this.form.get('date')?.touched && this.form.get('date')?.valid;
  }

  get isDateFieldInvalid() {
    // return this.nameField.touched && this.nameField.invalid;
    return this.form.get('date')?.touched && this.form.get('date')?.invalid;
  }

  save(event: Event): void {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  get nameField() {
    return this.form.get('fullName.name');
  }

  get lastField() {
    return this.form.get('fullName.last');
  }

  get emailField() {
    return this.form.get('email');
  }

  get phoneField() {
    return this.form.get('phone');
  }

  get ageField() {
    return this.form.get('age');
  }

  get agreeField() {
    return this.form.get('agree');
  }

  get dateField() {
    return this.form.get('date');
  }

}
