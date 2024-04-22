import {
  PipeTransform,
  BadRequestException,
} from "@nestjs/common";
import { ZodError, ZodSchema } from "zod";

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {

        if(error instanceof ZodError){
            throw new BadRequestException({
                errors: error.formErrors,
                message: "Erro ao validar um campo",
                status_code: 400
            })
        }
      throw new BadRequestException("Erro ao validar schema");
    }
  }
}
