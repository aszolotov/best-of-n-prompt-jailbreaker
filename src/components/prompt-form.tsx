"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Textarea } from "@/components/ui/textarea";
import { FormSchema, FormValidation } from "@/types/PromptForm";
import { Checkbox } from "./ui/checkbox";
import { SpinSmall } from "./ui/spin-small";

interface PromptFormProps {
  isLoading: boolean;
  onSubmit: (data: FormValidation) => void;
}

export function PromptForm({ isLoading, onSubmit }: PromptFormProps) {
  const form = useForm<FormValidation>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <>
      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormDescription></FormDescription>
                <FormControl>
                  <Textarea
                    placeholder="Insert your prompt here..."
                    className="min-h-32"
                    cols={50}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription></FormDescription>
              </FormItem>
            )}
          />
          <div className="flex flex-row space-x-4">
            <FormField
              control={form.control}
              name="options.changeCase"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      defaultChecked
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Change case</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="options.shuffleLetters"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      defaultChecked
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Shuffle letters</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="options.replaceLetters"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      defaultChecked
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Replace letters</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>

      <div className="flex justify-end">
        <Button
          className="font-bold"
          type="submit"
          disabled={isLoading}
          onClick={form.handleSubmit(onSubmit)}
        >
          Generate {isLoading && <SpinSmall />}
        </Button>
      </div>
    </>
  );
}
