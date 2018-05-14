import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { MatDialog } from '@angular/material';
import { EditCourseComponent } from './edit-course/edit-course.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoading: boolean;
  title = 'app';
  isChecked = false;
  colors = [
    { id: 1, name: 'Red'},
    { id: 2, name: 'Green'},
    { id: 3, name: 'Blue'}
  ];
  col = 1;
  minDate = new Date(2018, 1, 1);
  maxDate = new Date(2018, 4, 21);
  categories = [
    { name: 'one' },
    { name: 'two' },
    { name: 'three' }
  ];
  progress = 0;
  timer;

  constructor( private dialog: MatDialog) {
    this.timer = setInterval(() => {
      this.progress ++;
      if (this.progress == 100) clearInterval(this.timer);
    }, 20);
    this.isLoading = true;
    this.getCourses().subscribe(() => this.isLoading = false);
  }

  getCourses() {
    return Observable.timer(2000); // returns an observable that will emit a value after a given time (2s)
  }

  onChange($event) {
    console.log($event);
  }

  selectCategory(category) {
    this.categories.filter(c => c !== category).forEach(c => c['selected'] = false); // compilation error if we use c.selected
    category.selected = !category.selected;
  }

  openDialog() {
    this.dialog.open(EditCourseComponent, {
      data: {
        courseId: 1
      }
    }).afterClosed().subscribe(result => console.log(result));
  }
}
