export interface producto {
    idProducto: string;
    nombre: string;
    tamaño: string;
    descripcion: string;
    precio: number;
    cantidad: number;
    estatus: number;
    unidades: number;
    descuento: boolean;
    porcentaje: number;
    Categoria_idCategoria: number;
    cantidaddescuento: number;
    preciototal: number;
}

export interface token {
    data: string;
}

export interface mensaje {
    msg: string;
}