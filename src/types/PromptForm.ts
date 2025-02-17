import { z } from "zod";

export const FormSchema = z.object({
  prompt: z.string().nonempty("Prompt is required"),
  options: z.object({
    changeCase: z.boolean().default(true),
    shuffleLetters: z.boolean().default(true),
    replaceLetters: z.boolean().default(true),
  }),
});

export type FormValidation = z.infer<typeof FormSchema>;

export type JbResult = {
  prompt: string;
  output: string;
  options: {
    changeCase: boolean;
    shuffleLetters: boolean;
    replaceLetters: boolean;
  };
};
