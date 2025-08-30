import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/notes";
import NotesClient from "./NotesPage.client";

export default async function NotesPage() {
  const qc = new QueryClient();
  await qc.prefetchQuery({
    queryKey: ["notes", 1, 12, ""],
    queryFn: () => fetchNotes(1, 12, { search: "" }),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
