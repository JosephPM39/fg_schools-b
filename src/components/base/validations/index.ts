import { ValidateIdOptions, ValidateDtoOptions } from '../types'
import { ClassConstructor, ClassTransformOptions, plainToInstance } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import Boom from '@hapi/boom'

export const validateId = async <Model extends {}>(params: ValidateIdOptions<Model>) => {
  const { id, version, model } = params
  return await validateDto<Model>({
    dto: typeof id === 'object' ? id : { id },
    model,
    version,
    validatorOptions: {
      skipMissingProperties: true,
      skipUndefinedProperties: true
    }
  })
}

export const validateDto = async <Model extends {}>(params: ValidateDtoOptions<Model>) => {
  const { model, dto, version } = params
  console.log(dto, 'dto')
  const instance = plainToInstance(
    model as ClassConstructor<Model>,
    dto,
    { version, excludeExtraneousValues: true, exposeUnsetFields: false }
  )
  console.log(instance, 'instance')
  const errors = await validate(instance, params.validatorOptions)
  if (errors.length > 0) {
    const boomError = Boom.badRequest('Invalid data')
    boomError.output.payload = {
      ...boomError.output.payload,
      details: formatValidationError(errors)
    }
    throw boomError
  }
  return instance
}

const formatValidationError = (error: ValidationError[] | ValidationError) => {
  const format = (error: ValidationError) => {
    const constraints = JSON.stringify(error.constraints ?? '')

    return `{ "${error.property}": "${String(error.value)}", "constraints": ${constraints} }`
  }

  const reduceCB = (previous: string, current: ValidationError) => {
    const pre = previous ? previous + ',' : ''
    const cu = format(current)
    return `${pre} ${cu}`
  }

  if (Array.isArray(error)) {
    const errors = `[${error.reduce(reduceCB, '')}]`
    return JSON.parse(errors)
  }

  return JSON.parse(format(error))
}
