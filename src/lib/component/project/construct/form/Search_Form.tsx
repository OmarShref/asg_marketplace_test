"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/lib/component/generic/ui/form";
import { Input } from "@/lib/component/generic/ui/input";
import { Texts, getText } from "@/lib/assets/text";
import { SearchIcon } from "@/lib/assets/svg";
// import { CameraIcon, MicIcon } from "lucide-react";
// import { Button } from "@/lib/component/generic/ui/button";
import { useEffect } from "react";
import useSearchStore from "@/lib/data/stores/SearchStore";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "@/lib/component/generic/ui/use-toast";

type Props = {
  storeCode: string;
};

const formSchema = z.object({
  searchTrem: z.string().trim().min(2),
});

//TODO: seperate buttons
export function Search_Form({ storeCode }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const { lastSearchedTerms } = useSearchStore((state) => state);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchTrem: "",
    },
  });

  // ============================================================

  async function onSubmit(values: z.infer<typeof formSchema>) {
    router.push(`/${storeCode}/search/${values.searchTrem}`);

    if (lastSearchedTerms?.length >= 30) {
      useSearchStore.setState({
        lastSearchedTerms: [...lastSearchedTerms.slice(1), values.searchTrem],
      });
    } else {
      useSearchStore.setState({
        lastSearchedTerms: [...lastSearchedTerms, values.searchTrem],
      });
    }
  }

  // ============================================================

  const searchState = form.watch("searchTrem");
  useEffect(() => {
    useSearchStore.setState({ searchTerm: searchState });
  }, [searchState]);

  useEffect(() => {
    if (!pathname?.includes("/search")) {
      useSearchStore.setState({ searchTerm: "" });
      form.reset({ searchTrem: "" });
    }
  }, [pathname]);

  // ============================================================

  const { toast } = useToast();

  return (
    <Form {...form}>
      <div className="flex h-7 flex-row items-center justify-between gap-2">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto w-full "
          action=""
        >
          <FormField
            control={form.control}
            name="searchTrem"
            render={({ field }) => (
              <FormItem className=" flex-1">
                <FormControl>
                  <div className="flex flex-1 items-center justify-center gap-2 overflow-clip rounded bg-slate-100 px-2 py-0.5 lg:py-1.5">
                    <SearchIcon className=" w-5 text-accent" />
                    <Input
                      type="search"
                      inputMode="search"
                      maxLength={50}
                      placeholder={getText({
                        storeCode: storeCode,
                        text: Texts.whatAreYouLookingFor,
                      })}
                      className=" h-auto flex-1 border-0 bg-transparent p-0 text-sm"
                      onFocus={() => router.push(`/${storeCode}/search`)}
                      {...field}
                    />
                    {/* <Button>
                      <MicIcon className=" text-accent" />
                    </Button> */}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
        {/* <Button
          className=" flex w-fit flex-shrink-0 self-stretch  ps-2.5"
          onClick={() => {
            toast({
              description: getText({
                storeCode: storeCode,
                text: Texts?.comingSoon,
              }),
            });
          }}
        >
          <CameraIcon className=" w-6 stroke-[1.5] " />
        </Button> */}
      </div>
    </Form>
  );
}
