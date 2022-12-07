import { Column, Entity, OneToMany } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { IsBoolean, IsInt, IsNumber, IsString, Length, Max, Min } from 'class-validator'
import { Profile } from './profile.model'
import { Product } from './product.model'

@Entity()
@Exclude()
export class Size extends BaseModel {
  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsString()
  @Length(1, 50)
  @Column('varchar', { length: 50 })
    name: string

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsNumber()
  @Max(9999.99999)
  @Min(0.5)
  @Column('real')
    width: number

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsNumber()
  @Max(9999.99999)
  @Min(0.5)
  @Column('real')
    height: number

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsInt()
  @Max(1200)
  @Min(1)
  @Column('smallint')
    ppp: number

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsBoolean()
  @Column('boolean')
    available: boolean

  @OneToMany(() => Profile, (profile) => profile.size)
    profiles: Profile[]

  @OneToMany(() => Product, (product) => product.size, { nullable: true })
    products: Product[]
}

export interface ISize extends Size {}
