export interface Recetas {
    recetas: Receta[];
}

export interface Receta {
    _id?:               string;
    titulo:            string;
    ingredientes:      string[];
    pasos:             string[];
    categoria:         string;
    tiempoPreparacion: number;
    autor:             string;
}
