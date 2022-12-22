import { Column, Entity, OneToMany } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { IsBoolean, IsNumber, IsString, Length, Max, Min } from 'class-validator'
import { Profile } from './profile.model'
import { Product } from './product.model'

@Entity()
@Exclude()
export class Model extends BaseModel {
  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsString()
  @Length(1, 50)
  @Column('varchar', { length: 50 })
    name: string

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsNumber()
  @Max(9999.99)
  @Min(0.01)
  @Column('real')
    offer: number

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsNumber()
  @Max(9999.99)
  @Min(0.01)
  @Column('real')
    price: number

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsBoolean()
  @Column('boolean')
    available: boolean

  // RELATIONS

  @OneToMany(() => Profile, (profile) => profile.model)
    profiles: Profile[]

  @OneToMany(() => Product, (product) => product.model, { nullable: true })
    products: Product[]
}

export interface IModel extends Model {}
