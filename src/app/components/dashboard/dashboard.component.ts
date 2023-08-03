import { Component, ViewChild, OnInit} from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexStroke, ApexDataLabels, ApexYAxis, ApexTitleSubtitle, ApexLegend } from 'ng-apexcharts';
import { LoadDataService } from 'src/app/services/load-data.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit{

  chartOptions!: ChartOptions;


  labels: any;
  data: any;
  popu: any

  

  minEs: any = '';
  minVal: string = '';

  maxEs: any = '';
  maxVal: string = '';

  estateBad : any = '';
  estateBadVal: string = '';

  fileUploaded: boolean = false;
  csvData!: any[];
  dataGra!: any[];

  constructor(private loadDataService: LoadDataService,
    ) {}

  ngOnInit() {

      
    this.csvData = this.loadDataService.getCsvData();
    this.sumState();
    this.sumPopulation();
    this.stateAfected();
    this.load();


    this.fileUploaded = !!this.csvData;
    //start graph
    this.chartOptions = {
      series: this.data
      ,
      chart: {
        type: "polarArea",
        height: 350,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },

      title: {
        text: "MUERTES POR COVID EN EUA",
        align: "center"
      },
      subtitle: {
        text: "Grafica:",
        align: "left",
        
      },
      labels: this.labels,
      xaxis: {
        categories: this.data
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: "left"
      }
    };
    //end graph
    
    
  }


  

   load(){
     this.labels = this.dataGra.map((item) => item.state);
     this.data = this.dataGra.map((item) => item.deaths);
     this.popu = this.dataGra.map((item) => item.population);
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

  const stateMax = affectedPopulation.reduce((max, stateCurrent) => {
    return stateCurrent.value > max.value ? stateCurrent : max;
  }, affectedPopulation[0]); // ininitialice in position 0
  this.estateBad  = stateMax.state;
  this.estateBadVal= (stateMax.value).toString();
}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.loadDataService.processCSVFile(file).subscribe((data) => {
        this.csvData = data;
        this.fileUploaded = true;    
        window.location.reload()
      });
    }
    
  }

  }
