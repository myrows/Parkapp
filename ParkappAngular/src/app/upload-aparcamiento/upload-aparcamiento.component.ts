import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AparcamientoDto } from '../models/aparcamiento.dto';
import { ZonaResponse } from '../models/zona-response.interface';
import { AparcamientosService } from '../services/aparcamiento.service';
import { PeticionesService } from '../services/peticiones.service';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

const URL = 'https://parkappsalesianos.herokuapp.com/parkapp/aparcamiento/';

@Component({
  selector: 'app-upload-aparcamiento',
  templateUrl: './upload-aparcamiento.component.html',
  styleUrls: ['./upload-aparcamiento.component.css'],
  providers: [AparcamientosService]
})
export class UploadAparcamientoComponent implements OnInit {

  aparcamiento: AparcamientoDto;
  listaZona: ZonaResponse[];

fileData: File = null;
previewUrl:any = null;
fileUploadProgress: string = null;
uploadedFilePath: string = null;
imageForm:FormGroup;
image:any;
file:any;
images;
todoForm: FormGroup = this.fb.group({
  todo: ['', Validators.required],
  puntuacion: ['', Validators.required],
  image: ['', Validators.required], //making the image required here
  dimension: ['', Validators.required],
  longitud: ['', Validators.required],
  latitud: ['', Validators.required],
  nombre: ['', Validators.required],
  userId: ['', Validators.required],
  zonaId: ['', Validators.required],
  done: [false]
})
  

  constructor(private aparcamientoService: AparcamientosService, private peticionesService: PeticionesService,
     private dialogRef: MatDialogRef<UploadAparcamientoComponent>, private http: HttpClient, public snackBar:MatSnackBar, private router:Router,
     private fb: FormBuilder,
     private cd: ChangeDetectorRef) {
    //this.aparcamiento = new AparcamientoDto('' ,'' ,'' ,'', null, '', '', '');
  }

  ngOnInit() {
    this.loadZonas();
     }

fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
}
 
preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
 
    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData); 
    console.log(this.fileData.size);
    reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
    }
}

/*onSubmit() {
    const formData = new FormData();
    this.headers.append("Content-Type", 'multipart/form-data');
    this.headers.append('Access-Control-Allow-Origin', '*');
      formData.append('puntuacion', '3');
      formData.append('dimension', '23');
      formData.append('longitud', '-35.324');
      formData.append('latitud', '-35.4535');
      formData.append('avatar', this.fileData);
      formData.append('nombre', 'B3');
      formData.append('userId', '5e6a3b7fd7d7b6073496dca6');
      formData.append('zonaId', '5e6e070536dd1732649c1cf1');
      this.http.post('http://localhost:3000/parkapp/aparcamiento/', formData)
        .subscribe(res => {
          console.log(res);
          alert('SUCCESS !!');
        })
}*/

  /*doUploadAparcamiento() {
    this.aparcamientoService.uploadAparcamiento(this.aparcamiento.puntuacion, this.aparcamiento.dimension, this.aparcamiento.longitud, this.aparcamiento.latitud,
      this.fileData, this.aparcamiento.nombre, this.aparcamiento.userId, this.aparcamiento.zonaId).subscribe(resp => {
      console.log(this.fileData.size, this.fileData.name);
      this.dialogRef.close(true);
    });
  }*/

  /*handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
}*/

  loadZonas() {
    this.peticionesService.loadZona().subscribe(resp => {
      this.listaZona = resp;
      console.log(this.listaZona);
    });
  }

  ficheroSeleccionado(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
  }

  close(){
    this.dialogRef.close(null);
  }

  //MEAN

  /*onFileChange(event){
    if(event.target.files && event.target.files.length>0){//Identifica si hay archivos
        const file=event.target.files[0];
        if(file.type.includes("image")){//Evaluar si es una imagen
            const reader= new FileReader();
            reader.readAsDataURL(file);
            reader.onload=function load(){
                this.image=reader.result; //Asignar al thumbnail
            }.bind(this);
            this.file=file;
        }else{
            this.snackBar.open('Error imagen');
        }
    }
}*/

/*onSubmit(){
  const form=this.imageForm;
  //Verifica que el formulario sea válido y pasa parámetros
      this.aparcamientoService.uploadAparcamiento(form.value.name,
        this.file)
      .subscribe(
          (data:any)=>{
              console.log(data);
              this.router.navigate([`/show/${data.file.filename}`]);
          },
          err=>console.log
      )
}*/

onFileChange(event, field) {
  if (event.target.files && event.target.files.length) {
    const [file] = event.target.files;
    // just checking if it is an image, ignore if you want
    if (!file.type.startsWith('image')) {
      this.todoForm.get(field).setErrors({
        required: true
      });
      this.cd.markForCheck();
    } else {
      // unlike most tutorials, i am using the actual Blob/file object instead of the data-url
      this.todoForm.patchValue({
        [field]: file
      });
      // need to run CD since file load runs outside of zone
      this.cd.markForCheck();
    }
  }
}

/*onSubmit(){
  const formData = new FormData();
  formData.append('avatar', this.images);

  this.http.post<any>('http://localhost:3000/parkapp/aparcamiento', formData).subscribe(
    (res) => console.log(res),
    (err) => console.log(err)
  );
}*/

    onSubmit() {
      const formData = new FormData();
      Object.entries(this.todoForm.value).forEach(
        ([key, value]: any[]) => {
          formData.set(key, value);
        }

        //submit the form using formData
        // if you are using nodejs use something like multer
      )
      this.http.post<any>('http://localhost:3000/parkapp/aparcamiento', formData).subscribe(
        (res) => console.log(res),
        (err) => console.log(err));
    }
}
