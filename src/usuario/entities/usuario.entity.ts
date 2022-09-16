import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cadastro } from "../../cadastro/entities/cadastro.entity";
import { Postagem } from "../../postagem/entities/postagem.entity";


@Entity({name:'tb_usuario'})
export class Usuario{
   
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number
    
    @IsNotEmpty()
    @MaxLength(1000)
    @Column({nullable: false, length: 1000})
    @ApiProperty()
    nickname: string

    @OneToMany(() => Postagem, (postagem) => postagem.usuario,{
        onDelete: "CASCADE"
    })
    @ApiProperty()
    postagem: Postagem

    @OneToOne(() => Cadastro, (cadastro) => cadastro.usuario) 
    @JoinColumn()
    @ApiProperty({type: () => Cadastro})
    cadastro: Cadastro

}