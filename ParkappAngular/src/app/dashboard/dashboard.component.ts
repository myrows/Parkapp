import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { YearsService } from '../services/years.service';
import { YearResponse } from '../models/years.interface';
import { FirestoreDocumento } from '../models/firebase.interface';
import { FotocopiaService } from '../services/fotocopia.service';
import { FotocopiaResponse } from '../models/fotocopias.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  listadoYears: YearResponse[];
  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  listadoAnio: FotocopiaResponse[];

  public barChartData: ChartDataSets[] = [{data: []}];

  

  constructor(private yearService: YearsService, private fotocopiaService: FotocopiaService){}
  

  ngOnInit() {
    /* this.years(); */
    this.loadAnios()
  }

  loadAnios(){
    this.fotocopiaService.getFotocopiasPorAnyo().subscribe(resp => {
      this.listadoAnio = resp
      console.log(this.listadoAnio)
      var num = 0
      for (let i of this.listadoAnio) {
        num += i.num_fotocopias;
    }
    this.barChartData.push({data: [num], label: 'Copias', backgroundColor: ["rgba(245, 141, 66)"]})
    this.barChartLabels.push(localStorage.getItem('year'))
    }) 
  }



/*   totalAnios(){
    for (var item of this.listadoAnio){

      var total=0;
       total+= item.num_fotocopias; 

    }

    return total;
  } */



/*   years(){
    this.yearService.getYears().subscribe(resp => {
      resp.forEach((anyo: YearResponse) => {

        this.barChartLabels.push(anyo.fecha);
        this.barChartData.push({data: [anyo.fotocopias]});
      });
      
    })
  } */


}
