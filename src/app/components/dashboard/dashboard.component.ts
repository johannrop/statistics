import { Component } from '@angular/core';
import { LoadDataService } from 'src/app/services/load-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  fileUploaded: boolean = false;
  csvData!: any[];

  constructor(private loadDataService: LoadDataService) {}

  ngOnInit() {
    this.csvData = this.loadDataService.getCsvData();
    this.fileUploaded = !!this.csvData;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.loadDataService.processCSVFile(file).subscribe((data) => {
        this.csvData = data;
        this.fileUploaded = true;
      });
    }
  }


}