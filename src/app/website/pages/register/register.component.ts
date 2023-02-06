import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { onExit } from 'src/app/guards/exit.guard';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements onExit{

  onExit(){
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
