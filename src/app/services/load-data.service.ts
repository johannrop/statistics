import { Injectable } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class LoadDataService  {
  private localStorageKey = 'csvData';
  private csvData!: any[];

  constructor(private papa: Papa) {
    this.loadDataFromLocalStorage();
  }

  private loadDataFromLocalStorage() {
    const data = localStorage.getItem(this.localStorageKey);
    this.csvData = data ? JSON.parse(data) : null;
  }

  processCSVFile(file: File): Observable<any> {
    return new Observable((observer) => {
      this.papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          this.csvData = result.data; // Actualiza los datos sin verificar si ya existen
          localStorage.setItem(this.localStorageKey, JSON.stringify(this.csvData));
          observer.next(this.csvData);
          observer.complete();
        },
      });
    });
  }

  getCsvData(): any[] {
    return this.csvData;
  }
}