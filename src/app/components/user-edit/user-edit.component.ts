import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {
  public pageTitle: string;
  public user: User;
  public identity;
  public token;
  public status;
  public afuConfig;
  public url;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService
  ) {
    this.pageTitle = 'Ajustes de usuarios';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = this.identity;
    this.url = global.url;
    this.afuConfig = {
      multiple: false,
      formatsAllowed: '.jpg, .jpeg, .png, .gif',
      maxSize: '50',
      uploadAPI: {
        url: this.url + 'upload-avatar',
        headers: {
          'Authorization': this.token
        }
      },
      theme: 'attachPin',
      hideProgressBar: false,
      hideResetBtn: true,
      hideSelectBtn: false,
      replaceTexts: {
        selectFileBtn: 'Select Files',
        resetBtn: 'Reset',
        uploadBtn: 'Upload',
        dragNDropBox: 'Drag N Drop',
        attachPinBtn: 'Sube tu foto...',
        afterUploadMsg_success: 'Successfully Uploaded !',
        afterUploadMsg_error: 'Upload Failed !',
        sizeLimit: 'Size Limit'
      }
    };
  }

  avatarUpload(data): void {
    console.log(data.body);
    const dataObj = JSON.parse(JSON.stringify(data.body));
    this.user.image = dataObj.user.image;
    console.log(this.user);
  }

  resetVar() {
    console.log('resetVar');
  }

  ngOnInit(): void {
  }

  onSubmit(form) {
    this._userService.update(this.user).subscribe(
      response => {
        if (!response.user) {
          this.status = 'error';
        }
        else {
          this.status = 'success';
          localStorage.setItem('identity', JSON.stringify(this.user));
        }
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );

  }

}
