import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formRegister!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
    ) {
    this.buildFormRegister();
  }

  private buildFormRegister() {
    this.formRegister = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
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

  loginUser(event: Event){
    if (this.formRegister.valid) {
      this.authService.loginAndGet(this.formRegister.get('email')?.value, this.formRegister.get('password')?.value)
      .subscribe(() => {
        this.router.navigate(['/profile']);
        Swal.fire(
          'Welcome!',
          'You are logged in!',
          'success'
        );
      },
      err =>{
        if (err.status == 401) {
          Swal.fire('Unauthorized', 'wrong email or password!', 'error');
        }
      });
    } else {
      this.formRegister.markAllAsTouched();
    }
  }
}
