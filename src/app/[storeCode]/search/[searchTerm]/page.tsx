"use client";
import SearchTermPage from "@/lib/component/project/page/SearchTermPage";
import { PageProps } from "@/lib/data/types/PageProps";

export default function page({ params }: PageProps) {
  return <SearchTermPage params={params} />;
}
