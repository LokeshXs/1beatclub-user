import prisma from "@/lib/prisma";
import clubInstance from "@/services/Club";
import RouteToSignin from "../RouteToSignin";

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: Promise<{ id: string }>;
  params: Promise<{ clubid: string }>;
}) {
  const tokenId = (await searchParams).id;
  const clubId = (await params).clubid;

  // Validating if the token in valid and also if club exists

  if (!tokenId) {
    return (
      <main className=" min-h-screen w-full bg-primary flex justify-center items-center">
        <p className=" text-primary-foreground text-2xl">Token is invalid</p>
      </main>
    );
  }


  // checking if token obj club is same as we requested to join and  token is valid
  const tokenObj = await prisma.clubInvitationUrl.findUnique({
    where: {
      token: tokenId,
    },
  });



  if (!tokenObj || tokenObj.clubId !== clubId) {
    return (
      <main className=" min-h-screen w-full bg-primary flex justify-center items-center">
        <p className=" text-primary-foreground text-2xl">Token is invalid</p>
      </main>
    );
  }

  // checking if club exists

  const club = await clubInstance.getClub(clubId);

  if (!club) {
    return (
      <main className=" min-h-screen w-full bg-primary flex justify-center items-center">
        <p className=" text-primary-foreground text-2xl">
          Club might be deleted or club id is wrong
        </p>
      </main>
    );
  }

  return (
    <main className=" min-h-screen w-full bg-primary flex justify-center items-center">
      <RouteToSignin clubId={clubId} />
    </main>
  );
}
