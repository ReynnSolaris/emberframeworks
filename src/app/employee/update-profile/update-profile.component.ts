import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  bioForm: FormGroup = this.fb.group({
    bio: ['']
  });
  contactsDataSource = new MatTableDataSource<Contact>([]);
  addressesDataSource = new MatTableDataSource<Address>([]);
  phoneNumbersDataSource = new MatTableDataSource<PhoneNumber>([]);
  
  contactColumns: string[] = ['fullName', 'phone', 'actions'];
  addressColumns: string[] = ['address', 'actions'];
  phoneColumns: string[] = ['phoneNumber', 'actions'];

  constructor(private fb: FormBuilder, public authService: AuthService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadEmployeeDetails();
  }

  loadEmployeeDetails() {
    // Use the AuthService to get the employee details
    this.authService.getUserInfo(this.authService.v.get('EmployeeName')).subscribe( 
        response => {
            console.log(response);
            this.contactsDataSource.data = response.emergencyContacts || [];
            // Assuming addresses and phone numbers are part of the employeeDetails
            this.addressesDataSource.data = response.address ? [{ address: response.address }] : [];
            this.phoneNumbersDataSource.data = response.phoneNumbers || [];
        },
        error => {
            console.log(error);
        }
    )
  }

  onSubmitBio() {
    // Save bio logic here
    console.log('Bio updated:', this.bioForm.value);
  }

  openEditContactDialog(contact?: Contact) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '300px',
      data: contact ? {...contact} : {fullName: '', phone: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (contact) {
          // Update existing contact
          const index = this.contactsDataSource.data.indexOf(contact);
          this.contactsDataSource.data[index] = result;
        } else {
          // Add new contact
          this.contactsDataSource.data.push(result);
        }
        this.contactsDataSource._updateChangeSubscription(); // Refresh data
      }
    });
  }

  confirmDeleteContact(contact: Contact) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {message: 'Are you sure you want to delete this contact?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.contactsDataSource.data = this.contactsDataSource.data.filter(c => c !== contact);
      }
    });
  }

  openEditAddressDialog(address?: Address) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '300px',
      data: address ? {...address} : {address: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (address) {
          // Update existing address
          const index = this.addressesDataSource.data.indexOf(address);
          this.addressesDataSource.data[index] = result;
        } else {
          // Add new address
          this.addressesDataSource.data.push(result);
        }
        this.addressesDataSource._updateChangeSubscription(); // Refresh data
      }
    });
  }

  confirmDeleteAddress(address: Address) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {message: 'Are you sure you want to delete this address?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addressesDataSource.data = this.addressesDataSource.data.filter(a => a !== address);
      }
    });
  }

  openEditPhoneNumberDialog(phoneNumber?: PhoneNumber) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '300px',
      data: phoneNumber ? {...phoneNumber} : {phoneNumber: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (phoneNumber) {
          // Update existing phone number
          const index = this.phoneNumbersDataSource.data.indexOf(phoneNumber);
          this.phoneNumbersDataSource.data[index] = result;
        } else {
          // Add new phone number
          this.phoneNumbersDataSource.data.push(result);
        }
        this.phoneNumbersDataSource._updateChangeSubscription(); // Refresh data
      }
    });
  }

  confirmDeletePhoneNumber(phoneNumber: PhoneNumber) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {message: 'Are you sure you want to delete this phone number?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.phoneNumbersDataSource.data = this.phoneNumbersDataSource.data.filter(p => p !== phoneNumber);
      }
    });
  }
}

interface Contact {
  contactId: number;
  fullName: string;
  phone: string;
}

interface Address {
  address: string;
}

interface PhoneNumber {
  phoneNumber: string;
}
