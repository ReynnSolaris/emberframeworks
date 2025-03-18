import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { AuthService } from '../../auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  bioForm: FormGroup;
  contactsDataSource = new MatTableDataSource<Contact>([]);
  addressesDataSource = new MatTableDataSource<Address>([]);
  phoneNumbersDataSource = new MatTableDataSource<PhoneNumber>([]);
  
  contactColumns: string[] = ['fullName', 'phone', 'actions'];
  addressColumns: string[] = ['address', 'actions'];
  phoneColumns: string[] = ['phoneNumber', 'actions'];

  constructor(private fb: FormBuilder, public authService: AuthService, private dialog: MatDialog) {
    this.bioForm = this.fb.group({ bio: [''] });
  }

  async ngOnInit(): Promise<void> {
    await this.loadEmployeeDetails();
  }

  /** Load employee details and update UI */
  async loadEmployeeDetails() {
    try {
      const username = this.authService.getTokenInformation().get('EmployeeName');
      if (!username) return;

      const response = await firstValueFrom(this.authService.getUserInfo(username));
      console.log('Employee Data:', response);

      // Populate the form and tables
      this.bioForm.patchValue({ bio: response.bio || '' });
      this.contactsDataSource.data = response.emergencyContacts || [];
      this.addressesDataSource.data = response.address ? [{ address: response.address }] : [];
      this.phoneNumbersDataSource.data = response.phoneNumbers || [];
    } catch (error) {
      console.error('Error fetching employee details:', error);
    }
  }

  /** Save bio form */
  onSubmitBio() {
    console.log('Bio updated:', this.bioForm.value);
    // TODO: Send this to the API to save bio
  }

  /** Generic function to handle adding/editing table items */
  openEditDialog<T>(item: T | null, dataSource: MatTableDataSource<T>, defaultData: T) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '300px',
      data: item ? { ...item } : defaultData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (item) {
          // Update existing item
          const updatedData = [...dataSource.data];
          const index = updatedData.findIndex(d => d === item);
          updatedData[index] = result;
          dataSource.data = updatedData; // Immutable update to trigger change detection
        } else {
          // Add new item
          dataSource.data = [...dataSource.data, result];
        }
      }
    });
  }

  /** Generic function to handle deleting table items */
  confirmDelete<T>(item: T, dataSource: MatTableDataSource<T>, message: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        dataSource.data = dataSource.data.filter(i => i !== item); // Immutable update
      }
    });
  }

  /** Edit Contact */
  openEditContactDialog(contact?: Contact) {
    this.openEditDialog(contact || null, this.contactsDataSource, { contactId: 0, fullName: '', phone: '' });
  }

  /** Delete Contact */
  confirmDeleteContact(contact: Contact) {
    this.confirmDelete(contact, this.contactsDataSource, 'Are you sure you want to delete this contact?');
  }

  /** Edit Address */
  openEditAddressDialog(address?: Address) {
    this.openEditDialog(address || null, this.addressesDataSource, { address: '' });
  }

  /** Delete Address */
  confirmDeleteAddress(address: Address) {
    this.confirmDelete(address, this.addressesDataSource, 'Are you sure you want to delete this address?');
  }

  /** Edit Phone Number */
  openEditPhoneNumberDialog(phoneNumber?: PhoneNumber) {
    this.openEditDialog(phoneNumber || null, this.phoneNumbersDataSource, { phoneNumber: '' });
  }

  /** Delete Phone Number */
  confirmDeletePhoneNumber(phoneNumber: PhoneNumber) {
    this.confirmDelete(phoneNumber, this.phoneNumbersDataSource, 'Are you sure you want to delete this phone number?');
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
