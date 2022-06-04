import { useCallback, useState } from "react";

export const useModal = () => {
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = useCallback(() => {
    setOpenModal(!openModal);
  }, [openModal]);

  return { openModal, toggleModal };
};
