export interface IMenu{
    id:number,
    nom:string,
    image:string,
    description: string,
    prix:number,
    burgers:Burger[],
    tailles:ITaille[],
    frites:Frite [],
    quantity:number,
}

export interface Produit {
    id?:number
    nom?:string
    image?:Blob
    prix?:number
    type?:string
}
export interface Catalogue {
    burgers: Produit[]
    menus: Produit[]
    produits?: Produit[]
}

export interface ICatalogue{
    burgers:IBurger[],
    menus:IMenu[],
}
export interface Taille{
    nom:string,
    tailleBoissons:ITailleBoisson[],
}
export interface ITailleBoisson{
    boisson:IBoisson,
    stock:number,
    prixBoisson:number,
}
export interface ITaille{
    taille:Taille,
    quantite:number,
}
export interface Frite{
    frite:IFrite,
    quantite:number,
}
export interface Burger{
    quatite:number;
    burger:IBurger,
}
export interface IFrite{
    id:number,
    nom:string,
    prix:number,
    description: string,
    image:string,
    // quantite:number
}

export interface IBoisson{
    id:number,
    nom:string,
    image:string,
    description: string,
    prix:number,
    // quantite:number
}
export interface IBurger{
    id:number,
    nom:string,
    image:string,
    description: string,
    prix:number,
    quantity:number
}
export interface ChoixBoisson{
    qteTotal:number,
    somQte:number
}