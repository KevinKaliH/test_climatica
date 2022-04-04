import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  ngOnInit(): void {
    console.log('interesante pues');
  }
  employee = {
    name: 'John Heart',
    position: 'CEO',
    hireDate: new Date(2012, 4, 13),
    officeNumber: 901,
    phone: '+1(213) 555-9392',
    skype: 'jheart_DX_skype',
    email: 'jheart@dx-email.com',
    notes: 'John has been in the Audio/Video industry since 1990.',
  };

  isFormReadOnly = false;

  submitButtonOptions = {
    text: 'Submit the Form',
    useSubmitBehavior: true,
  };

  handleSubmit = (e: any) => {
    console.log(this.employee);
    console.log(e);
    setTimeout(() => {
      alert('Submitted');
    }, 1000);
    e.preventDefault();
  };
}
