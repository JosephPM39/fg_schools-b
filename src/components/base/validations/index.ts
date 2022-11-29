import { ValidateIdOptions, ValidateDtoOptions } from '../types'
import { ClassConstructor, plainToInstance } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import Boom from '@hapi/boom'

export const validateId = async <Model extends {}>(params: ValidateIdOptions<Model>) => {
  const { id, version, model } = params
  if (typeof id === 'string') {
    await validateDto<Model>({
      dto: { id },
      model,
      version,
      validatorOptions: {
        skipMissingProperties: true
      }
    })
    return { id }
  }
  if (typeof id === 'object') {
    return id
  }
}

export const validateDto = async <Model extends {}>(params: ValidateDtoOptions<Model>) => {
  const { model, dto, version } = params
  const instance = plainToInstance(
    model as ClassConstructor<Model>,
    dto,
    { version }
  )
  const errors = await validate(instance, params.validatorOptions)
  if (errors.length > 0) {
    const boomError = Boom.badRequest('Invalid data')
    boomError.output.payload = {
      ...boomError.output.payload,
      details: formatValidationError(errors)
    }
    throw boomError
  }
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
