"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { JbResult } from "@/types/PromptForm";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { useForm } from "react-hook-form";
import { Checkbox } from "./ui/checkbox";
import { Options } from "./ui/icons";
import { PopoverContent } from "./ui/popover";

type OptionsForm = JbResult["options"];

interface OutputOptionsProps {
  itemIdx: number;
  options: OptionsForm;
  onChange: (idx: number, updatedOptions: OptionsForm) => void;
}

export function OutputOptions({
  itemIdx,
  options,
  onChange,
}: OutputOptionsProps) {
  const form = useForm<OptionsForm>({
    defaultValues: options,
    values: options,
  });

  const handleSubmit = (data: OptionsForm) => {
    onChange(itemIdx, data);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="rounded-md p-2 border mb-2">
          <Options className="w-3 h-3" />
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <Form {...form} key={itemIdx}>
          <form
            onChange={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="changeCase"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
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
              name="shuffleLetters"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
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
              name="replaceLetters"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Replace letters</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
