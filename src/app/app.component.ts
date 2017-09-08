import { Component, ViewChild, ElementRef } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title : string = 'app';
  widgets :any;
  @ViewChild('dataContainer') dataContainer: ElementRef;
  constructor(private http: HttpClient,
              private dragulaService: DragulaService) {

  }
  loadData(data) {
    this.dataContainer.nativeElement.innerHTML = data;
  }
/*  ngOnInit(){
    this.http.get('assets/data.json').subscribe(data => {
      // Read the result field from the JSON response.
      var results = data['results'];
      var x = results[0];
      this.http.get(x.content, { responseType: 'text' })
      .subscribe(
        (value: string) => {
          //this.myTemplate = value;
          this.loadData(value)
        }
      );
      console.log(results);
    });
  }*/
  ngOnInit(){
    this.http.get('assets/data.json').subscribe(data =>{
      this.widgets = data['widgets'];
      this.widgets.forEach(widget => {
         this.http.get(widget.path, { responseType: 'text' })
          .subscribe(
            (value: string) => {
              var element = document.getElementById("widget-"+widget.id);
              const fragment = document.createRange().createContextualFragment(value);
              //this.loadData(value);
              element.appendChild(fragment)
            }
          );
      });
      console.log(this.widgets);
    })
  }
  ngOnDestroy() {
    this.dragulaService.destroy('widgets-bag');
  }
}
