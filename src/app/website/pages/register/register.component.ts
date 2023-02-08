import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { onExit } from 'src/app/guards/exit.guard';
import Swal from 'sweetalert2';
import { MyValidators } from './../../../utils/validators'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements onExit {

  formRegister!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.buildFormRegister();
  }

  private buildFormRegister() {
    this.formRegister = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6), MyValidators.validPassword]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: MyValidators.matchPasswords
    });
  }

  saveRegister(event: Event): void {
    if (this.formRegister.valid) {
      console.log(this.formRegister.value);
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

}
