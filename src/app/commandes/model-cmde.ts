import { Produit } from "../catalogue/models/catalogue.model"

export interface GetCommande{
    id:number
    produits: {quantiteCmde: number,produit:Produit}[],
    client:IUser,
    dateCmde:Date,
    montantCommande: number,
    reference:string,
    etat:string,
    code:number,
    zone:{id: number,nom: string,etat: number},
  }
export interface IUser{
    id: number,
    nom: string,
    prenom: string
    telephone: string,
    login: string,
    a_deja_commander:boolean,
    commandes:GetCommande[]
}