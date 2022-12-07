import { Column, Entity, OneToMany } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator'
import { Profile } from './profile.model'
import { Product } from './product.model'

@Entity()
@Exclude()
export class Color extends BaseModel {
  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsString()
  @Length(1, 30)
  @Column('varchar', { length: 30 })
    name: string

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsString()
  @Length(7, 9)
  @Column('varchar', { length: 9 })
    hex: string

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsString()
  @IsOptional()
  @Length(1, 100)
  @Column({ type: 'varchar', length: 100, nullable: true })
    sample: string

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsBoolean()
  @Column('boolean')
    available: boolean

  @OneToMany(() => Profile, (profile) => profile.color)
    profiles: Profile[]

  @OneToMany(() => Product, (product) => product.color, { nullable: true })
    products: Product[]
}

export interface IColor extends Color {}
