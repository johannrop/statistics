import { Component } from '@angular/core';
import { LoadDataService } from 'src/app/services/load-data.service';

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

  fileUploaded: boolean = false;
  csvData!: any[];
  constructor(private loadDataService: LoadDataService) {}


  ngOnInit() {
    this.csvData = this.loadDataService.getCsvData();
    this.sumarPorEstado();
    this.sumPopulation();
    this.stateAfected();
    this.fileUploaded = !!this.csvData;
  }

  sumarPorEstado(): { [estado: string]: number } {
    /**
     * @param sumarPorEstado
     * array para guardar los estados y su cantidad de muertes
     */
    const sumasPorEstado: { [estado: string]: number } = {};
  
    this.csvData.forEach((item) => {
      const estado = item.Province_State;
      const deaths = parseInt(item.deaths);
  
      if (!isNaN(deaths)) {
        sumasPorEstado[estado] = (sumasPorEstado[estado] || 0) + deaths;
      }
    });

    console.log(sumasPorEstado);

    let maxState: string | null = null;
    let maxValue = Number.MIN_SAFE_INTEGER;

    let minState: string | null = null;
    let minValue = Number.MAX_SAFE_INTEGER;

    for (const state in sumasPorEstado) {
      //encpntrar estado con mas muertes
      if (sumasPorEstado[state] > maxValue) {
        maxState = state;
        maxValue = sumasPorEstado[state];
      }
      //encpntrar estado con menos muertes
      if (sumasPorEstado[state] < minValue) {
        minState = state;
        minValue = sumasPorEstado[state];
      }
    }

    console.log(`El estado con el menor valor es ${minState} con un valor de ${minValue}.`);

    console.log(`El estado con el mayor valor es ${maxState} con un valor de ${maxValue}.`);

    return sumasPorEstado;
  }

  sumPopulation(): { [estado: string]: number } {
    /**
     * @param sumPopulation
     * array para guardar los estados y su cantidad de muertes
     */
    const sumPopulation: { [estado: string]: number } = {};
  
    this.csvData.forEach((item) => {
      const estado = item.Province_State;
      const population = parseInt(item.Population);

      if (!isNaN(population)) {
        sumPopulation[estado] = (sumPopulation[estado] || 0) + population;
      }
    });

    console.log(sumPopulation);
    return sumPopulation;
  }

  
  stateAfected(){
    const arrayPopulation = this.sumPopulation();
    const arrayDeaths= this.sumarPorEstado();
    for (const state in arrayPopulation) {
      console.log("what is state = " + state)

    }
    console.log("tttttttttt" + JSON.stringify(arrayPopulation));

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