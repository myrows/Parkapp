import { logging } from 'protractor';

export class AdminDto{

    constructor(public email: string, public password: string, public roles: string, public colegio: string){

    }
}