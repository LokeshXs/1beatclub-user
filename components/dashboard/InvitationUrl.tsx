import { IconCopy, IconQrcode } from "@tabler/icons-react";
import { useMusicClub } from "@/store/musicClubStore";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { generateClubUrlInvite } from "@/actions/invites";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {QRCode} from "react-qrcode-logo"


export default function InvitationUrl() {
  const [openModal, setOpenModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [shareUrl, setShareUrl] = useState("");

  const { selectedClub } = useMusicClub();

  const handleUrlInvitation = () => {
    if (!selectedClub) {
      return toast.error("Select a club to create invitation!");
    }

    const selectedClubId = selectedClub.id;

    startTransition(async () => {
      const res = await generateClubUrlInvite(selectedClubId);

      if (res.status === "success") {
        setShareUrl(res.url!);
        setOpenModal(true);
      } else {
        toast.error(res.message);
      }
    });
  };

  const copyUrlHandler = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Invite Url is copied!");
    } catch (err) {
      toast.error("Cannot copy the Invite");
    }
  };

  return (
    <>
      <IconQrcode
        onClick={handleUrlInvitation}
        className=" w-8 h-8 text-primary hover:cursor-pointer sm:hover:text-terniary"
      />

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className=" outline-none bg-primary max-sm:w-full p-1">
          <DialogHeader >
            <DialogTitle className=" text-center text-2xl max-sm:text-xl text-secondary ">
              Share <span className=" text-terniary ">or</span> Scan to
              join!
            </DialogTitle>
            <DialogDescription className=" flex flex-col items-center gap-6 max-sm:gap-4 justify-center" >
            <QRCode value={shareUrl} bgColor="#ede5d9" fgColor="#41362a " logoImage="/logo/icon.svg" removeQrCodeBehindLogo={true} logoPaddingStyle="circle" qrStyle="dots"  />

          

              <div className=" flex items-center max-w-md max-sm:max-w-sm max-[400px]:max-w-[310px] bg-secondary py-2 px-3 rounded-full ">
                <p className=" truncate flex-1 text-secondary-foreground">
                  {shareUrl}
                </p>
                <span
                  onClick={copyUrlHandler}
                  className="bg-terniary rounded-full p-2 flex justify-center items-center cursor-pointer group "
                >
                  <IconCopy className=" text-terniary-foreground w-6 h-6 group-active:scale-95 " />
                </span>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
