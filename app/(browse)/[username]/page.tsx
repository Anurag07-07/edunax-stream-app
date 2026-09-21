import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { StreamPlayer } from "@/components/stream-player";
import { isFollowing } from "@/lib/follow-service";
import { isBlockedByUser } from "@/lib/block-service";

export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  if (!username) notFound();

  const user = await getUserByUsername(username);
  if (!user || !user.stream) notFound();

  const [isFollow, isBlocked] = await Promise.all([
    isFollowing(user.id!),
    isBlockedByUser(user.id),
  ]);

  if (isBlocked) notFound();

  return (
    <div>
      <StreamPlayer
        user={user}
        stream={user.stream}
        isFollowing={isFollow}
      />
    </div>
  );
}