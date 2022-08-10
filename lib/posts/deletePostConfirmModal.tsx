import { Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";

const deletePostConfirmModal = () => openConfirmModal({
    title: 'Please confirm your action',
    children: (
      <Text size="sm">
        This action is so important that you are required to confirm it with a modal. Please click
        one of these buttons to proceed.
      </Text>
    ),
    labels: { confirm: 'Confirm', cancel: 'Cancel' },
    onCancel: () => console.log('Cancelnpm '),
    onConfirm: () => console.log('Confirmed'),
});

export default deletePostConfirmModal;{}