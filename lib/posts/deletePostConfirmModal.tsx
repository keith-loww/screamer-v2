import { Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { NextRouter } from "next/router";
import deletePost from "./deletePost";

const deletePostConfirmModal = (postID: string, router: NextRouter) => openConfirmModal({
    title: 'Delete Post?',
    children: (
      <Text size="sm">
        Are you sure you want to delete this post? This action cannot be undone.
      </Text>
    ),
    labels: { confirm: 'Confirm', cancel: 'Cancel' },
    confirmProps: { color : 'red' },
    onConfirm: () => deletePost(postID, router),
});

export default deletePostConfirmModal;{}