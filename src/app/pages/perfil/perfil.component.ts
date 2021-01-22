import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';

import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = '';

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private fileUploadService: FileUploadService ) {

    this.usuario = usuarioService.usuario;
}

  ngOnInit() {
    this.perfilForm = this.fb.group({
      nombre: [ this.usuario.nombre, Validators.required ],
      email: [ this.usuario.email, [ Validators.required, Validators.email ] ]
    });
  }

  actualizarPerfil() {
    this.usuarioService.actualizarPerfil( this.perfilForm.value)
        .subscribe( ( resp: any  ) => {
          console.log( resp );
          const { nombre, email } = this.perfilForm.value;
          this.usuario.nombre = nombre;
          this.usuario.email = email;
          Swal.fire( 'Usuario Actualizado', resp.usuarioActualizado.nombre, 'success');
        }, ( err ) => {
          Swal.fire('Error', err.error.msg , 'error');
          // console.error( err.error.msg );
        });
  }

  cambiarImagen( file: File ) {
    this.imagenSubir = file;

    if ( !file ) { return this.imgTemp = null; }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };

  }

  subirImagen() {
    this.fileUploadService.actualizarFoto( this.imagenSubir, 'usuarios', this.usuario.uid )
          .then( img => {
            this.usuario.img = img;
            Swal.fire( 'Imagen Guardado', 'Imagen de usuario actualizada', 'success');
          } ).catch( err => {
            Swal.fire( 'Error', 'No se actualizo la imagen', 'error');
          });
  }

}
