import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public pageTitle: string;
  public user: User;
  public status: string;

  constructor(
      private _userService: UserService
  ) {
    this.pageTitle = 'Registrate';
    this.user = new User('', '', '', '', '', '', 'ROLE_USER');
  }

  ngOnInit(): void {
    console.log(this._userService.prueba());
  }

  onSubmit(form): void {
    console.log(this.user);
    this._userService.register(this.user).subscribe(
      response => {
        if(response.user && response.user._id) {
          this.status = 'success';
          form.reset();
        }
        else {
          this.status = 'error';
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
