import { Injectable, OnInit } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { Observable } from 'rxjs';

interface NewData {
  Province_State: string;
  Population: string;
  deaths: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoadDataService {

  /**
   * @param localStorageKey
   * value of the key save in local storage
   */
  private localStorageKey = 'csvData';
  private csvData!: any[];
  private csvData2!: any[];
  private newCSV: NewData[] = [];

  /**
   * @param head
   * name of the end column
   */
  head: string = '';

  constructor(private papa: Papa) {
    this.loadDataFromLocalStorage();
  }


  private loadDataFromLocalStorage() {
    const data = localStorage.getItem(this.localStorageKey);
    /**
     * Check if the 'data' variable is not null
     * if is true, executed 'JSON parse to Data'
     */
    this.csvData = data ? JSON.parse(data) : null;
  }

  /**
   * @param processCSVFile 
   * method to process the CSV file
   * @param file
   * archive CSV
   */
  processCSVFile(file: File): Observable<any> {
    return new Observable((observer) => {
      //We implement the 'papa.parce' CSV analysis service
      this.papa.parse(file, {
        //Indicates that the CSV file has a header row
        header: true,
        //specifies that empty lines in the CSV file should be skipped
        skipEmptyLines: true,
        //call back funtion to finalized return 'result'
        complete: (result) => {
          //update data
          const columnsToSave = ['Province_State', 'Population', ...Object.keys(result.data[0]).slice(-1)];
          var nameTemp= Object.keys(result.data[0]).slice(-1);

          this.csvData = result.data; 
          
          this.head = nameTemp.toString();
          /**
           * @param newData
           * We create a json with the necessary data
           * so as not to overflow the browser's memory
           */
          this.csvData.forEach((data)=>{
            const newData: NewData ={
              Province_State: data.Province_State ,
              Population : data.Population,
              deaths : data[this.head]
            };
            //console.log("json" + JSON.stringify(data))
            console.log(" - state: " + data.Province_State + " - population: " + data.Population + " - deaths: " + data[this.head])            
            this.newCSV.push(newData);
          });

          //save the data in local storage
          localStorage.setItem(this.localStorageKey, JSON.stringify(this.newCSV));
          //set data to event Observer
          observer.next(this.newCSV);
          //cancel observable, do not emit data
          observer.complete();
          },
      });
    });
  }

  getCsvData(): any[] {
    return this.csvData;
  }
}