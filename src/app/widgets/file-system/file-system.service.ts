import { Injectable } from '@angular/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class FileSystemService {

  constructor(private platform: Platform) {
     Filesystem.mkdir({
      path: 'app-name',
      directory: Directory.Data,
      recursive: true 
    }).catch(error=>{})
   }


  async writeFile(fileName:string , data:string | Blob){
    const saved = await Filesystem.writeFile({
      path: `app-name/${fileName}`,
      data: data,
      directory: Directory.Data,
    });
    return saved
  }

  async readFile(fileName:string){
   const fileData =   await Filesystem.readFile({
      path: `app-name/${fileName}`,
      directory:Directory.Data
    });
    return fileData
  }

 async  deleteFile(fileName:string){
   const deletedFile =  await Filesystem.deleteFile({ 
      path: `app-name/${fileName}`,
      directory: Directory.Data
    });
    return deletedFile
  }
  
}
