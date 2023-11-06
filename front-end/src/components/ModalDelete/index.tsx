import { ButtonCancel, ButtonDelete, ContainerButtons, ModalDeleteContainer, ModalDeleteWindow, Title } from "./styles";

interface ModalDeleteProps {
  handleDelete: (id: string) => void;
  closeModalDelete: () => void;
  userIdDeleted: string;
}

export function ModalDelete({ handleDelete, userIdDeleted, closeModalDelete }: ModalDeleteProps) {
  return(
    <ModalDeleteContainer>
      <ModalDeleteWindow>
        <Title>Você deseja excluir este usuário?</Title>
        
        <ContainerButtons>
          <ButtonDelete onClick={() => handleDelete(userIdDeleted)}>Sim</ButtonDelete>
          <ButtonCancel onClick={closeModalDelete}>Não</ButtonCancel>
        </ContainerButtons>
      </ModalDeleteWindow>
    </ModalDeleteContainer>
  );
}