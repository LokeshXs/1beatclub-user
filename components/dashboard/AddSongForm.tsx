import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Input } from "@/components/ui/input";
import { getVideoInfo } from "@/actions/youtube";
import { useTransition } from "react";
import { toast } from "sonner";
import { useListedSongStore } from "@/store/store";
import { addSongFormSchema } from "@/schema/schema";
import { useContext } from "react";
import { WebSocketClientContext } from "@/context/WebSocketClientProvider";
import { useMusicClub } from "@/store/musicClubStore";
import { updateCurrentlyPlayingSong } from "@/actions/club";

export default function AddSongForm() {
  const [isPending, startTransition] = useTransition();
  const selectedClub = useMusicClub((state) => state.selectedClub);
  const currentSongPlaying = useListedSongStore(
    (state) => state.currentSongPlaying
  );
  const addSong = useListedSongStore((state) => state.addNewSong);
  const { wsClient } = useContext(WebSocketClientContext);
  const form = useForm<z.infer<typeof addSongFormSchema>>({
    resolver: zodResolver(addSongFormSchema),
    defaultValues: {
      url: "",
    },
  });

  function onSubmit(value: z.infer<typeof addSongFormSchema>) {
    startTransition(async () => {
      if (!selectedClub) {
        toast.error("No club selected");
        return;
      }
      const data = await getVideoInfo(value, selectedClub?.id);
      if (data.status === "success") {
        if (data.data) {
          addSong({ ...data.data, votes: [] });

          if (wsClient) {
            wsClient.send(
              JSON.stringify({
                type: "ADDSONG",
                data: { ...data.data, votes: [] },
              })
            );
          }



          if (!currentSongPlaying) {
            await updateCurrentlyPlayingSong(
              data.data.id,
              selectedClub.id
            );
          }

          toast.success(data.message);
        }
      } else if (data.status === "error") {
        toast.error(data.message);
      } else {
        toast.error("Cannot add song");
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-[500px] max-sm:w-full "
      >
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem >
              <FormLabel />
              <FormControl>
                <Input
                  placeholder="shadcn"
                  className=" border-primary-foreground "
                  {...field}
                />
              </FormControl>
              <FormDescription className=" text-center">
                Paste here a Youtube video song url.
              </FormDescription>
              <FormMessage className=" text-center" />
            </FormItem>
          )}
        />
        <div>
          <Button
            type="submit"
            className=" mx-auto block bg-secondary text-secondary-foreground hover:bg-secondary/90 px-12 "
            disabled={isPending}
          >
            {isPending ? "ADDING" : "ADD"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
