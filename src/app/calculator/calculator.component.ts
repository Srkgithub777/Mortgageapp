import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from './api.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  public form: FormGroup;
  public totalAmount: any;
  public EPSPCOM_ERRMSG: any;
  public customPatterns = { '0': { pattern: new RegExp('^[1-9]\d*$')} };
  constructor(private fb: FormBuilder, private apiService: ApiService,private _snackBar: MatSnackBar) { 
    this.totalAmount = 0;
    this.form = this.fb.group({
      loanAmount: [null, [Validators.required, Validators.min(1)]],
      loanYears: [null, [Validators.required, Validators.min(1)]],
      interestRate: [null, [Validators.required, Validators.min(1)]] 
    }); 
    // this.form = this.fb.group({
    //   loanAmount: [null, [Validators.required, Validators.pattern("^.{1,9}$")]],
    //   loanYears: [null, [Validators.required, Validators.pattern('^.{1,2}$')]],
    //   interestRate: [null, [Validators.required, Validators.pattern("^.{1,5}$")]] 
    // }); 
  }

  ngOnInit(): void {
   
  }

  onFocusOutEvent(event: any, action: string){
    if (!event.target.value.includes('.') && event.target.value !== '' ) {
      const formValue = event.target.value + '.00';
      this.form.controls[action].setValue(formValue);
    }
  }

  saveDetails(form: any) {
    const formValue = form.value;
    const data = {
      "EPSMTCOM": {
      "EPSPCOM_PRINCIPLE_DATA": Number(formValue.loanAmount),
      "EPSPCOM_NUMBER_OF_YEARS": Number(formValue.loanYears),
      "EPSPCOM_NUMBER_OF_MONTHS": 0,
      "EPSPCOM_QUOTED_INTEREST_RATE": Number(formValue.interestRate),
      "EPSPCOM_YEAR_MONTH_IND": "Y"
      }
    }
    // this.EPSPCOM_ERRMSG = 'PRINCIPAL EXCEEDEDMAXIMUM VALUE'
    this.apiService.loanCalculate(data).subscribe((res:any) => {
      console.log(res);
      this.totalAmount = res.EPSMTCOM.EPSPCOM_RETURN_MONTH_PAYMENT;
      this.EPSPCOM_ERRMSG = res.EPSMTCOM.EPSPCOM_ERRMSG;
    }, (error: any) => {
      this.form.reset();
      this._snackBar.open('Server Error', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      console.log(error);
    })
  }
}