import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { onExit } from 'src/app/guards/exit.guard';
import { UsersService } from 'src/app/services/users.service';

import Swal from 'sweetalert2'
import { MyValidators } from './../../../utils/validators'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements onExit {

  formRegister!: FormGroup;
  showCompany: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router
    ) {
    this.buildFormRegister();
  }

  // private buildFormRegister() {
  //   this.formRegister = this.formBuilder.group({
  //     email: ['', [Validators.required]],
  //     password: ['', [Validators.required, Validators.minLength(6), MyValidators.validPassword]],
  //     confirmPassword: ['', [Validators.required]],
  //     type: ['company', [Validators.required]],
  //     companyName: ['', [Validators.required]]
  //   }, {
  //     validators: MyValidators.matchPasswords
  //   });

  private buildFormRegister() {
    this.formRegister = this.formBuilder.group({
      avatar: ['', [Validators.required]],
      name: ['', [Validators.required]],
      role: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6), MyValidators.validPassword]],
    });

    this.typeField?.valueChanges
    .subscribe(value =>{
      if(value === 'company'){
        this.companyNameField?.setValidators([Validators.required]);
        this.showCompany = true;
      } else {
        this.companyNameField?.setValidators(null);
        this.showCompany = false;
      }
      this.companyNameField?.updateValueAndValidity();
    })
  }

  saveRegister(event: Event): void {
    if (this.formRegister.valid) {
      console.log(this.formRegister.value);
      this.usersService.createUser(this.formRegister.value)
      .subscribe(() => {
        this.router.navigate(['/login']);
        Swal.fire(
          'Save!',
          'Please login in!',
          'success'
        );
      },
      err =>{
        if (err.status == 400) {
          Swal.fire('Bad Request!', 'Ok?', 'error');
        }
      });
    } else {
      this.formRegister.markAllAsTouched();
    }
  }

  onExit() {
    const confirm = Swal.fire({
      title: 'Are you sure?',
      icon: 'info',
      showDenyButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        return true;
      }
      return false;
    });
    return confirm;
  }

  get typeField(){
    return this.formRegister.get('type');
  }

  get companyNameField(){
    return this.formRegister.get('companyName');
  }

}
