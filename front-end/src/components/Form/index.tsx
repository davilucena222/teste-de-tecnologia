import { toast } from "react-toastify";
import { Button, FormContainer, Input, InputArea, Label } from "./styles";
import { useRef, useEffect } from 'react';
import { api } from "../../lib/axios";
import { formatDate } from "../../utils/formattedDate";

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
  setOnEdit: (user: UserDataEdit) => void;
  getUsers: () => void;
}

export function Form({ getUsers, onEdit, setOnEdit }: FormProps) {
  const ref = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (onEdit && ref.current) {
      const user = ref.current;

      user.name.value = onEdit.name;
      user.email.value = onEdit.email;
      user.phone.value = onEdit.phone;
    }
  }, [onEdit]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const user = ref.current;

    if (!user) {
      return toast.warn("Erro ao atualizar usuário!");
    }

    console.log("USER: ", user.phone.value);

    if (!user.name.value || !user.email.value || !user.phone.value) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      const userData = {
        name: user.name.value,
        email: user.email.value,
        phone: user.phone.value,
        // updated_at: formatDate(new Date())
      };

      await api.put(`/${onEdit.id}`, userData).then(({ data }) => toast.success(data)).catch(({ data }) => toast.error(data));
    } else {
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

    setOnEdit(null);
    getUsers();
  } 

  return (
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

      <Button type="submit">CADASTRAR</Button>
    </FormContainer>
  )
}