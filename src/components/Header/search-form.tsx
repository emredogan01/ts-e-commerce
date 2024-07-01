import React from "react";
import z from "zod";
import { Form, FormItem, FormControl, FormField } from "@/components/ui/form";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";

export const searchSchema = z.object({
  search: z.string().min(1).max(50),
});

export type FormValues = z.infer<typeof searchSchema>;

interface SearchFormProps {
  onSubmit: SubmitHandler<FormValues>;
}

const SearchForm: React.FC<SearchFormProps> = React.memo(({ onSubmit }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchForm = useForm<FormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: "",
    },
  });

  const clearSearch = () => {
    searchForm.reset({ search: "" });
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    router.push(`?${params.toString()}`);
  };

  return (
    <Form {...searchForm}>
      <form
        onSubmit={searchForm.handleSubmit(onSubmit)}
        className="flex gap-2 justify-between text-black relative"
      >
        <div className="w-full relative">
          <FormField
            control={searchForm.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Search" {...field} className="pr-10" />
                </FormControl>
              </FormItem>
            )}
          />
          {searchForm.watch("search") && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <IoCloseCircleSharp className="font-light" size={20} />
            </button>
          )}
        </div>
        <Button type="submit" className="bg-white text-black hover:text-white">
          Search
        </Button>
      </form>
    </Form>
  );
});

SearchForm.displayName = "SearchForm";

export default SearchForm;
