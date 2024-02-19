import { hash } from "../../context/security/encrypter";
import { compare } from "bcrypt";
import LibroRepository from "../domain/Libro.Repository";
import PrestamoRepository from "../../prestamos/domain/Prestamo.Repository";

export default class LibroUseCases{

    private libroRepository : LibroRepository;
    private prestamoRepository : PrestamoRepository;

    constructor(libroRepository : LibroRepository, prestamoRepository : PrestamoRepository){
        this.libroRepository = libroRepository;
        this.prestamoRepository = prestamoRepository;
    }

    async getPaginas() {
        return await this.libroRepository.getPaginas();
    }    
    
    async getLibrosPagina(pagina: string) {
        const libros = await this.libroRepository.getLibrosPagina(pagina);
        for (const libro of libros) {
          libro.disponibles = await this.libroRepository.getDisponibles(libro.id);
        }
        return libros;
    }

    async getPaginasByNombreLibro(busca: string){
        return await this.libroRepository.getPaginasByNombreLibro(busca);
    }

    async getLibrosByNombreFromPagina(busca: string, pagina: string) {
        const libros = await this.libroRepository.getLibrosByNombreFromPagina(busca, pagina);
        for (const libro of libros) {
          libro.disponibles = await this.libroRepository.getDisponibles(libro.id);
        }
        return libros;
    }

    async postPrestarLibro(token : string | undefined, libro: string){
        const ejemplar = await this.libroRepository.getEjemplarRandom(libro);
        return this.prestamoRepository.postPrestarLibro(token,ejemplar);
    }

/*     async getPrestadosUsuario(token: string | undefined){
        const prestamos : any = await this.prestamoRepository.getPrestamosUsuario(token);
        for (const prestamo of prestamos) {
            const ejemplar = await this.libroRepository.getLibroByEjemplar(prestamo.ejemplar);
            const libro = await this.libroRepository.getLibroById(ejemplar)
            prestamo.ejemplar = {id : prestamo.ejemplar,libro};
        }
        return prestamos;
    } */

    async getPrestadosUsuario(token: string | undefined){
        const prestamos : any = await this.prestamoRepository.getPrestamosUsuarioSQL(token)
        return prestamos;
    }

    async putDevolverPrestado(token: string | undefined, ejemplar: string) {
        return this.prestamoRepository.putDevolverLibro(token,ejemplar);
    }

}