import { Column, Entity, OneToMany } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { IsBoolean, IsString, Length } from 'class-validator'
import { Profile } from './profile.model'
import { Product } from './product.model'

@Entity()
@Exclude()
export class Type extends BaseModel {
  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsString()
  @Length(1, 50)
  @Column('varchar', { length: 50 })
    name: string

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsBoolean()
  @Column('boolean')
    available: boolean

  @OneToMany(() => Profile, (profile) => profile.type)
    profiles: Profile[]

  @OneToMany(() => Product, (product) => product.type, { nullable: true })
    products: Product[]
}

export interface IType extends Type {}
