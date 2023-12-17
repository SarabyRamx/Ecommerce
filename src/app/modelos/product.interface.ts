export interface Producto {
    idProducto: number;
    nombre: string;
    descripcion: string;
    precio: number;
    precioCompra: number;
    unidad_de_compra: string;
    costo_unitario_unidad_compra: number;
    unidad_de_venta: string;
    precio_unitario_unidad_venta: number;
    cantidad: number;
    estatus: boolean;
    descuento: boolean;
    porcentaje: number;
    fechaCreacion: Date;
    codigoBarra: string;
    Categoria_idCategoria: number;
    cantidaddescuento: number;
    preciototal: number;
    imageurl: string;
}