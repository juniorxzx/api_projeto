import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Cadastro } from "../entities/cadastro.entity";


@Injectable()
export class cadastroService {

    constructor(
        @InjectRepository(Cadastro)
        private cadastroRepository: Repository<Cadastro>
    ) { }

    async findAll(): Promise<Cadastro[]> {
        return this.cadastroRepository.find({
            relations: {
                usuario: true
            }
        })
    }

    async findById(id: number): Promise<Cadastro> {
        let cadastro = await this.cadastroRepository.findOne({
            where: {
                id
            },
            relations: {
                usuario: true
            }
        })
        if (!cadastro)
            throw new HttpException('cadastro não foi encontrado!', HttpStatus.NOT_FOUND)
        return cadastro
    }

    async findByGenero(genero: string): Promise<Cadastro[]> {
        return this.cadastroRepository.find({
            where: {
                genero: ILike(`%${genero}%`)
            },
            relations: {
                usuario: true
            }
        })
    }


    async findByNome(nome: string): Promise<Cadastro[]> {
        return this.cadastroRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            },
            relations: {
                usuario: true
            }
        })
    }

    async create(cadastro: Cadastro): Promise<Cadastro> {
        return this.cadastroRepository.save(cadastro)
    }

    async update(cadastro: Cadastro): Promise<Cadastro> {
        let cadastroUpDate = await this.findById(cadastro.id)
        if (!cadastroUpDate || !cadastro.id)
            throw new HttpException('cadastro não encontrado!', HttpStatus.NOT_FOUND)
        return this.cadastroRepository.save(cadastro)
    }

    async delete(id: number): Promise<DeleteResult> {
        let cadastroDelete = await this.findById(id)
        if (!cadastroDelete)
            throw new HttpException('cadastro não foi encontrado!', HttpStatus.NOT_FOUND)
        return this.cadastroRepository.delete(id)
    }
}