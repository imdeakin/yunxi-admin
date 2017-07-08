import {Component, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.html',
  styleUrls: ['./date-picker.css']
})

export class DatePickerComponent implements OnChanges {

  @Input() public minDate: string;
  @Input() public maxDate: string;
  @Input() public disableDays: number[];
  @Input() public toContainPrevMonth: boolean;
  @Input() public toContainNextMonth: boolean;
  @Input() public value: string = '';

  @Output() public selectedDate = new EventEmitter();

  public daysofWeek: string[];
  public currMonthStr: string;
  public currMonth: number;
  public currYear: number;
  public months: string[];
  public dates: any = [];
  public completeDates: any;
  public tempArray: any;
  public prevMonth: number;
  public nextMonth: number;
  public prevYear: number;
  public nextYear: number;
  public showDp = 'none';

  public ngOnChanges(): void {
    // this.daysofWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    // this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.daysofWeek = ['日', '一', '二', '三', '四', '五', '六'];
    this.months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    this.currMonth = new Date().getMonth();
    this.currMonthStr = this.months[this.currMonth];
    this.currYear = new Date().getFullYear();
    // Set previous and next months
    this.prevMonth = this.currMonth - 1;
    this.nextMonth = this.currMonth + 1;
    this.prevYear = this.currYear - 1;
    this.nextYear = this.currYear + 1;
    // Set Date Array
    if (this.value !== '') {
      let givenDate = moment(this.value, 'MM/DD/YYYY', true);
      this.currMonth = givenDate.month();
      this.currMonthStr = this.months[this.currMonth];
      this.currYear = givenDate.year();
      this.dates = this.setDateArray(this.currMonth, this.currYear, givenDate.date());
    } else {
      this.dates = this.setDateArray(this.currMonth, this.currYear, '');
    }

  }

  public openDatePicker(): void {
    if (this.showDp === 'none') {
      this.showDp = 'block';
    } else {
      this.showDp = 'none';
    }
  }

  public setPrevMonth(): void {
    this.nextMonth = this.currMonth;
    this.currMonth = this.prevMonth;
    this.currMonthStr = this.months[this.currMonth];
    // Set new previous month
    let tempDate = new Date(this.currMonth + 1 + '/' + '1' + '/' + this.currYear);
    if (this.currMonth === 0) {
      // Set previous month to December
      this.prevMonth = 11;
    } else {
      this.prevMonth = tempDate.getMonth() - 1;
    }
    if (this.currMonth === 11) {
      // Set current year to previous year
      this.currYear = this.prevYear;
      this.prevYear = this.currYear - 1;
      this.nextYear = this.currYear + 1;
    }
    // Set Date Array to previous month
    this.dates = this.setDateArray(this.currMonth, this.currYear, '');
  }

  public setNextMonth() {
    this.prevMonth = this.currMonth;
    this.currMonth = this.nextMonth;
    this.currMonthStr = this.months[this.currMonth];
    // Set new next month
    let tempDate = new Date(this.currMonth + 1 + '/' + '1' + '/' + this.currYear);
    if (this.currMonth === 11) {
      // Set next month to January
      this.nextMonth = 0;
    } else {
      this.nextMonth = tempDate.getMonth() + 1;
    }
    if (this.currMonth === 0) {
      // Set current year to previous year
      this.currYear = this.nextYear;
      this.prevYear = this.currYear - 1;
      this.nextYear = this.currYear + 1;
    }
    // Set Date Array to next month
    this.dates = this.setDateArray(this.currMonth, this.currYear, '');
  }

  public  setDateArray(month, year, date): any {

    let tempLastDate = this.decideDate(month, year);
    let temp = [];
    for (let i = 1; i <= tempLastDate; i++) {
      let currentDate = moment().year(year).month(month).date(i);
      let pastDate = moment(this.minDate);
      let futureDate = moment(this.maxDate).add(1, 'd');
      let dbld = false;
      // To disable Days - Index based 0-6
      for (let dayIndex = 0; dayIndex < this.disableDays.length; dayIndex++) {
        if (currentDate.day() === this.disableDays[dayIndex]) {
          dbld = true;
        }
      }
      if (currentDate.isBefore(this.minDate) || currentDate.isAfter(futureDate)) {
        dbld = true;
      }
      if (i !== date) {
        temp.push({
          month: this.currMonth + 1,
          date: i,
          disabled: dbld,
          selected: false,
          empty: false
        });
      } else {
        temp.push({
          month: this.currMonth + 1,
          date: i,
          disabled: dbld,
          selected: true,
          empty: false
        });
      }
    }
    this.completeDates = temp;

    // Determine Date of First of the Month
    let firstDate = new Date(month+1 + '/' + '1' + '/' + year);
    let lastDate = new Date(month+1 + '/' + tempLastDate + '/' + year);

    // Prepend Prev Month Dates
    let spaceArray = [];
    if (firstDate.getDay() !== 0) {
      // Not Sunday
      let pMonth = month - 1;
      let prevLast = this.decideDate(month, year);
      // Fix it to display last date last
      for (let i = 0; i < firstDate.getDay(); i++) {
        if (this.toContainPrevMonth) {
          spaceArray.push({
            month: firstDate.getMonth() - 1,
            date: prevLast,
            disabled: true,
            selected: false,
            empty: false
          });
        } else {
          spaceArray.push({
            month: '',
            date: '',
            disabled: false,
            selected: false,
            empty: true
          });
        }
        prevLast--;
      }
    }
    this.tempArray = spaceArray.reverse().concat(this.completeDates);
    // Append Next Month Dates
    if (lastDate.getDay() !== 6) {
      // Not Saturday
      let nIndex = 1;
      for (let i = 6; i > lastDate.getDay(); i--) {
        if (this.toContainNextMonth) {
          this.tempArray.push({
            month: firstDate.getMonth() + 1,
            date: nIndex,
            disabled: true,
            selected: false,
            empty: false
          });
        } else {
          this.tempArray.push({
            month: '',
            date: '',
            disabled: false,
            selected: false,
            empty: true
          });
        }
        nIndex++;
      }
    }

    let tempDateChild = [];
    let tempDateMain = [];
    for (let date in this.tempArray) {
      if ((parseInt(date) + 1) % 7 === 0) {
        tempDateChild.push(this.tempArray[date]);
        tempDateMain.push(tempDateChild);
        tempDateChild = [];
      } else {
        tempDateChild.push(this.tempArray[date]);
      }
    }
    return tempDateMain;
  }

  public  decideDate(month, year): number {
    let last = 31;
    switch (month) {
      case 1:
        // Feb
        last = 28;
        if ((parseInt(year) % 4) === 0) {
          last = last + 1;
        }
        break;
      case 3 :
      case 5 :
      case 8 :
      case 10 :
        // April, June, September, November
        last = 30;
        break;
      default :
        break;
    }
    return last;
  }

  public setDate(sDate) {
    if (!sDate.disabled) {
      if (sDate.date !== '') {
        // Set the new date array with active date
        this.dates = this.setDateArray(this.currMonth, this.currYear, sDate.date);
        let selDate = moment().year(this.currYear).month(this.currMonth).date(sDate.date).format('YYYY-MM-DD');
        this.selectedDate.next(selDate);
      }
    }
  }

}
