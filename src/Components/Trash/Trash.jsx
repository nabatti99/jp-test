import React, { useState } from "react";
import { Button, HStack, Text } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

function Trash({ colorScheme, isActive, selectedItems, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleTrashButtonClicked = async () => {
    setIsDeleting(true);

    const deleteWorkers = selectedItems.map((item) => window.nativeAPI.deleteDir(...item));
    await Promise.all(deleteWorkers);

    setIsDeleting(false);
    onDelete();
  };

  const canDelete = isActive && selectedItems.length > 0;

  let message = null;
  if (canDelete) message = "Move to trash";
  else if (isActive) message = "Close trash";

  return (
    <Button
      variant="ghost"
      colorScheme={canDelete ? "red" : colorScheme}
      isDisabled={!isActive}
      loadingText="Deleting"
      isLoading={isDeleting}
      onClick={handleTrashButtonClicked}
    >
      <HStack>
        <DeleteIcon />
        <Text>{message}</Text>
      </HStack>
    </Button>
  );
}

export default Trash;
