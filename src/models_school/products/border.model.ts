import { Column, Entity, OneToMany } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator'
import { Profile } from './profile.model'
import { Product } from './product.model'

@Entity()
@Exclude()
export class Border extends BaseModel {
  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsString()
  @Length(1, 30)
  @Column('varchar', { length: 30 })
    name: string

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsString()
  @IsOptional()
  @Length(1, 100)
  @Column({ type: 'varchar', length: 100, nullable: true })
    file: string

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsBoolean()
  @Column('boolean')
    available: boolean

  // RELATIONS

  @OneToMany(() => Profile, (profile) => profile.border)
    profiles: Profile[]

  @OneToMany(() => Product, (product) => product.border, { nullable: true })
    products: Product[]
}

export interface IBorder extends Border {}
