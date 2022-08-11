import { Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import changeNickname from "./ChangeNickname";

const ChangeNickNameConfirmModal = (nickname: string, id: string, setLoading: (state: boolean) => void) => {
    openConfirmModal({
        title: "Change Nickname?",
        children: (
        <Text size="sm">
            Are you sure you want to change your nickname to {nickname}? This action cannot be undone.
        </Text>
        ),
        labels: { confirm: "Confirm", cancel: "Cancel" },
        onConfirm: () => changeNickname(nickname, id, setLoading),
    });
}

export default ChangeNickNameConfirmModal;