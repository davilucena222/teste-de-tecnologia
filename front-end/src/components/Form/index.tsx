import { toast } from "react-toastify";
import { Button, ButtonClose, ContainerButtons, FormContainer, Input, InputArea, Label, Overlay } from "./styles";
import { useRef, useEffect } from 'react';
import { api } from "../../lib/axios";
import { formatDate } from "../../utils/formattedDate";
import "react-toastify/dist/ReactToastify.css";

interface UserDataEdit {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: Date;
  upated_at: Date;
  deleted_at: Date;
}

interface FormProps {
  onEdit: UserDataEdit | null;
  nameButton: string;
  compareData: UserDataEdit | null | undefined;
  users: UserDataEdit[];
  setOnEdit: (user: UserDataEdit | null) => void;
  getUsers: () => void;
  setNameButton: (name: string) => void;
  setCompareData: (user: UserDataEdit | null) => void;
  toggleFormVisibility: () => void;
}

export function Form({ 
    getUsers, 
    onEdit, 
    setOnEdit, 
    nameButton, 
    setNameButton, 
    setCompareData,
    compareData,
    toggleFormVisibility,
    users
  }: FormProps) {
  const ref = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if ((onEdit && ref.current)) {
      const user = ref.current;

      user.name.value = onEdit.name;
      user.email.value = onEdit.email;
      user.phone.value = onEdit.phone;
    }
  }, [onEdit]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const user = ref.current;

    setNameButton("cadastrar");

    if (!user) {
      return toast.warn("Erro ao atualizar usuário!");
    }

    if (!user.name.value || !user.email.value || !user.phone.value) {
      return toast.warn("Preencha todos os campos");
    }

    if (onEdit) {
      const userData = {
        name: user.name.value,
        email: user.email.value,
        phone: user.phone.value,
        updated_at: formatDate(new Date())
      };

      if (userData.name === compareData?.name && userData.email === compareData?.email && userData.phone === compareData?.phone) {
        alert("Nenhum dado foi alterado! Por favor, altere algum dado para atualizar o usuário!");
        toast.error("Usuário não foi atualizado!");

        setNameButton("atualizar");
        
        return;
      }

      await api.put(`/${onEdit.id}`, userData).then(({ data }) => toast.success(data)).catch(({ data }) => toast.error(data));

      user.name.value = "";
      user.email.value = "";
      user.phone.value = "";

      setOnEdit(null);
      setCompareData(null);
    } else {
      const emailExists = users.some((existingUser) => existingUser.email === user.email.value);
      const phoneExists = users.some((existingUser) => existingUser.phone === user.phone.value);

      if (emailExists && phoneExists) {
        return toast.error('Tanto o email quanto o telefone já estão cadastrados na plataforma. Por favor, tente com outros dados!');
      }

      await api.post("/", {
        name: user.name.value,
        email: user.email.value,
        phone: user.phone.value,
        created_at: formatDate(new Date())
      }).then(({ data }) => toast.success(data)).catch(({ data }) => toast.error(data));
    }

    user.name.value = "";
    user.email.value = "";
    user.phone.value = "";

    toggleFormVisibility();

    setOnEdit(null);
    getUsers();
  } 

  const clearFormFields = () => {
    if (ref.current) {
      ref.current.name.value = '';
      ref.current.email.value = '';
      ref.current.phone.value = '';
    }
  };

  const handleModalClose = () => {
    clearFormFields();
    toggleFormVisibility();
    setOnEdit(null);
    setNameButton("cadastrar");
  };

  return (
    <Overlay>
      <FormContainer ref={ref} onSubmit={handleSubmit}>
        <InputArea>
          <Label>Nome</Label>
          <Input name="name" />
        </InputArea>

        <InputArea>
          <Label>E-mail</Label>
          <Input name="email" type="email" />
        </InputArea>

        <InputArea>
          <Label>Telefone</Label>
          <Input name="phone" />
        </InputArea>

        <ContainerButtons>
          <Button type="submit">
            {nameButton === "atualizar" ? "ATUALIZAR" : "CADASTRAR"}
          </Button>
          <ButtonClose onClick={handleModalClose}>FECHAR</ButtonClose>
        </ContainerButtons>
      </FormContainer>
    </Overlay>
  )
}