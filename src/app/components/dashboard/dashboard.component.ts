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
  cityDeaths: { [key: string]: number } = {};
  //sumasPorSexo: { [sexo: string]: number } = {};
  sumasPorSexo: { sexo: string; suma: number }[] = [];
  totalDeaths: number = 0;
  constructor(private loadDataService: LoadDataService) {}


  ngOnInit() {
    //get datas service
    this.csvData = this.loadDataService.getCsvData();
    this.fileUploaded = !!this.csvData;
  }

  calcularSumasPorSexo() {
    const tempSumas: { [sexo: string]: number } = {};

    // Identificar el nombre de la última columna
    const columnas = Object.keys(this.csvData[0]);
    const ultimaColumna = columnas[columnas.length - 1];

    this.csvData.forEach((empleado) => {
      if (empleado.sexo) {
        const sexo = empleado.sexo.toLowerCase();
        tempSumas[sexo] = (tempSumas[sexo] || 0) + parseInt(empleado[ultimaColumna]);
      }
    });
    console.log("****trmp******" + tempSumas['m'])

    this.sumasPorSexo = Object.keys(tempSumas).map((sexo) => ({
      sexo: sexo.toUpperCase(), // Convertir el sexo a mayúsculas para mostrarlo en el template
      suma: tempSumas[sexo]
    }));
  }


  calc(){ 
    // console.log(this.csvData);
    this.totalDeaths = this.csvData.reduce((total, empleado) => {
      if (empleado.sexo === 'm') {
        this.totalDeaths= this.totalDeaths + parseInt(empleado.sueldo);
        console.log("total muertes" + this.totalDeaths)
        console.log("***total del arre***" + total)
        return total +  parseInt(empleado.sueldo);
      }
      return total;
    }, 0);

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