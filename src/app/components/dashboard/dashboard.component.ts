import { Component, ViewChild } from '@angular/core';
import { LoadDataService } from 'src/app/services/load-data.service';
import { ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};


interface DataItem {
  Province_State: string;
  Population: string;
  deaths: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent {
  public chartOptions!: ChartOptions;


  minEs: any = '';
  minVal: string = '';

  maxEs: any = '';
  maxVal: string = '';

  estateBad : any = '';
  estateBadVal: string = '';

  fileUploaded: boolean = false;
  csvData!: any[];
  dataGra!: any[];


  ngOnInit() {
    this.csvData = this.loadDataService.getCsvData();
    this.sumState();
    this.sumPopulation();
    this.stateAfected();
    this.fileUploaded = !!this.csvData;
  }

  constructor(private loadDataService: LoadDataService,
    ) {
      
    }

  


  
  
  graphic(){
    
  }

  sumState(): { [state: string]: number } {
    /**
     * @param sumState
     * array to store the states and their number of deaths
     */
    const sumasPorEstado: { [state: string]: number } = {};
  
    this.csvData.forEach((item) => {
      const state = item.Province_State;
      const deaths = parseInt(item.deaths);
  
      if (!isNaN(deaths)) {
        sumasPorEstado[state] = (sumasPorEstado[state] || 0) + deaths;
      }
    });

    //console.log(sumasPorEstado);

    let maxState: string | null = null;
    let maxValue = Number.MIN_SAFE_INTEGER;

    let minState: string | null = null;
    let minValue = Number.MAX_SAFE_INTEGER;

    for (const state in sumasPorEstado) {
      //encontrar state con mas muertes
      if (sumasPorEstado[state] > maxValue) {
        maxState = state;
        maxValue = sumasPorEstado[state];
      }
      //encontrar state con menos muertes
    
      if (sumasPorEstado[state] < minValue) {
        minState = state;
        minValue = sumasPorEstado[state];
      }
    }
    this.maxEs = maxState;
    this.maxVal = maxValue.toString();
    this.minEs = minState;
    this.minVal = minValue.toString();

    console.log(`El estado con el menor taza demotarlidad  es ${minState} con un valor de ${minValue}.`);

    console.log(`El state con la mayor taza de motarlidad es ${maxState} con un valor de ${maxValue}.`);

    return sumasPorEstado;
  }


  sumPopulation(): { [state: string]: number } {
    /**
     * @param sumPopulation
     * array para guardar los state y su cantidad de muertes
     */
    const sumPopulation: { [state: string]: number } = {};
  
    this.csvData.forEach((item) => {
      const state = item.Province_State;
      const population = parseInt(item.Population);

      if (!isNaN(population)) {
        sumPopulation[state] = (sumPopulation[state] || 0) + population;
      }
    });

    //console.log(sumPopulation);
    return sumPopulation;
  }

  
  stateAfected(){
    const arrayPopulation = this.sumPopulation();
    const arrayDeaths= this.sumState();
    const affectedPopulation = [];
    const dataForGraphic = [];

    for (const state in arrayPopulation) {
      
      if (arrayPopulation.hasOwnProperty(state)) {
        if(arrayPopulation[state] != 0) {
          const valUpdate = ( arrayDeaths[state] / arrayPopulation[state] * 100 ) ;
          // Creamos un objeto con el state y el valor actualizado
          const stateUpdateObj = {
            state: state,
            value: parseFloat(valUpdate.toFixed(2))
        }
        const dataGrap={
          state: state,
          population: arrayPopulation[state],
          deaths: arrayDeaths[state]
        }
        dataForGraphic.push(dataGrap);
        affectedPopulation.push(stateUpdateObj);
        
       
        };
    }  
    
  }
  this.dataGra = dataForGraphic;
  //console.log('///****** ' + JSON.stringify(dataForGraphic) );  
  // console.log(JSON.stringify(affectedPopulation))

  const stateMax = affectedPopulation.reduce((max, stateCurrent) => {
    return stateCurrent.value > max.value ? stateCurrent : max;
  }, affectedPopulation[0]); // Inicializamos estadoMayor con el primer elemento del array
  console.log(stateMax); 
  this.estateBad  = stateMax.state;
  this.estateBadVal= (stateMax.value).toString();
}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.loadDataService.processCSVFile(file).subscribe((data) => {
        this.csvData = data;
        this.fileUploaded = true;
      });
    }
    window.location.reload();
  }

  }
