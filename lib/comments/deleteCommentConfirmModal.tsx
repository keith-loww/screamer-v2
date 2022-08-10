import { NextRouter } from "next/router";
import { Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import deleteComment from "./deleteComment";
import { Comment } from "../../components/types";


const deleteCommentConfirmModal = (comment: Comment, router: NextRouter) => {
    openConfirmModal({
        title: "Delete Comment?",
        children: (
        <Text size="sm">
            Are you sure you want to delete this comment? This action cannot be undone.
        </Text>
        ),
        labels: { confirm: "Confirm", cancel: "Cancel" },
        confirmProps: { color: "red" },
        onConfirm: () => deleteComment(comment, router),
    });
    }
    
export default deleteCommentConfirmModal;