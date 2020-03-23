import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-pdf-generator',
  templateUrl: './pdf-generator.component.html',
  styleUrls: ['./pdf-generator.component.scss']
})
export class PdfGeneratorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  generatePdf(){
    const documentDefinition = { content: 'He creado este documento por amor al arte PD: Jesús trabaja de una vez' };
    pdfMake.createPdf(documentDefinition).download();
   }

}
