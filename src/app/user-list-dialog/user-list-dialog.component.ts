import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-list-dialog',
  templateUrl: './user-list-dialog.component.html',
  styleUrls: ['./user-list-dialog.component.css']
})
export class UserListDialogComponent implements OnInit {
  users: any[] = [];

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<UserListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.loadUsers();
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

  loadUsers(): void {
    this.http.get<any[]>('http://localhost:3000/users').subscribe(users => {
      this.users = users;
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
