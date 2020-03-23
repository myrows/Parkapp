import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { YearResponse } from '../models/years.interface';

const collectionName = 'years'

@Injectable({
  providedIn: 'root'
})
export class YearsService {

  constructor(private db: AngularFirestore) { }

  getYears(){
    return this.db.collection<YearResponse>(collectionName).valueChanges();
  }
}
