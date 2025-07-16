import { z } from "zod/v4";

export const baseSchema = z.object({ name: z.string(), url: z.url() });
export type BaseSchema = z.infer<typeof baseSchema>;

export const registriesSchema = z.object({
  default: baseSchema,
  registries: z.array(baseSchema),
});
export type RegistriesSchema = z.infer<typeof registriesSchema>;

// export const addOptionsSchema = z.object({
//   components: z.array(z.string()).optional(),
//   yes: z.boolean(),
//   overwrite: z.boolean(),
//   cwd: z.string(),
//   all: z.boolean(),
//   path: z.string().optional(),
//   silent: z.boolean(),
//   srcDir: z.boolean().optional(),
//   cssVariables: z.boolean(),
// });

// type AddOptionSchema = z.infer<typeof addOptionsSchema>;
// const jsonSchem = z.toJSONSchema(registriesSchema, {
//   target: "draft-2020-12",
// });
