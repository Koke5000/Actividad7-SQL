import Prestamo from "./Prestamo";

export default interface PrestamoRepository{
    getPrestamosUsuarioSQL(token: any): Promise<Prestamo[]>;
    postPrestarLibro(token : string | undefined, ejemplar: Number): Promise<Prestamo>;
    getPrestamosUsuario(token: any): Promise<Prestamo[]>;
    putDevolverLibro(token: string | undefined, ejemplar: string): Promise<Prestamo>;


}