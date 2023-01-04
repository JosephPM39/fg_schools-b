import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel, baseRelationOptions } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { IsInt, IsUUID, Max, Min, ValidateIf, ValidateNested } from 'class-validator'
import { ISchool, School } from './school.model'
import { EmployeePosition, IEmployeePosition } from './employee-position.model'
import { SectionProm } from './section-prom.model'

@Entity()
@Exclude()
export class SchoolProm extends BaseModel {
  @Expose({ since: EV.UPDATE, until: EV.CREATE_NESTED })
  @IsUUID()
  @Column()
    principalId: IEmployeePosition['id']

  @Expose({ since: EV.UPDATE, until: EV.CREATE_NESTED })
  @IsUUID()
  @Column()
    schoolId: ISchool['id']

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsInt()
  @Max(9999)
  @Min(1900)
  @Column('smallint')
    year: number

  // RELATIONS
  @Expose({ since: EV.CREATE_NESTED, until: EV.DELETE })
  @ValidateIf(o => !o.principalId)
  @ValidateNested()
  @ManyToOne(() => EmployeePosition, (ep) => ep.schoolsProms, baseRelationOptions)
  @JoinColumn({ name: 'principalId' })
    principal: EmployeePosition

  @Expose({ since: EV.CREATE_NESTED, until: EV.DELETE })
  @ValidateIf(o => !o.schoolId)
  @ValidateNested()
  @ManyToOne(() => School, (school) => school.schoolsProms, baseRelationOptions)
  @JoinColumn({ name: 'schoolId' })
    school: School

  @OneToMany(() => SectionProm, (sectionProm) => sectionProm.schoolProm)
    sectionsProms: SectionProm[]
}

export interface ISchoolProm extends SchoolProm {}
