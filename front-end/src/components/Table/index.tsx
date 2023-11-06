import { useState } from "react";
import { ModalDelete } from "../ModalDelete";
import { ButtonDate, TableContainer, Tbody, Td, Th, Thead, Tr } from "./styles";
import { FaTrash, FaEdit } from "react-icons/fa";
import { convertDateShow } from "../../utils/formattedDate";
import { useSettingsContext } from "../context/SettingsContext";

export function Table() {
  const { users, handleEdit, handleDelete, setModalDelete, modalDelete } = useSettingsContext();

  const [userIdDeleted, setUserIdDeleted] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("asc");

  const filteredUsers = users.slice().sort((previous, next) => {
    const previousDate = new Date(previous.created_at);
    const nextDate = new Date(next.created_at);

    if (sortOption === "asc") {
      return previousDate.getTime() - nextDate.getTime();
    } else {
      return nextDate.getTime() - previousDate.getTime();
    }
  });

  function openModalDelete(id: string) {
    setModalDelete(true);
    setUserIdDeleted(id);
  }

  function closeModalDelete() {
    setModalDelete(false);
  }

  return (
    <>
      <TableContainer>
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Email</Th>
            <Th>Telefone</Th>
            <Th>
              Data de criação
              <ButtonDate
                onClick={() =>
                  setSortOption(sortOption === "asc" ? "desc" : "asc")
                }
              >
                {sortOption === "asc" ? "↑" : "↓"}
              </ButtonDate>
            </Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredUsers.map((user) => (
            <Tr key={user.id}>
              <Td width="20%">{user.name}</Td>
              <Td width="20%">{user.email}</Td>
              <Td width="20%">{user.phone}</Td>
              <Td width="20%">{convertDateShow(user.created_at)}</Td>

              <Td align={"center"} width="5%">
                <FaEdit onClick={() => handleEdit(user)} />
              </Td>
              <Td align={"center"} width="5%">
                <FaTrash onClick={() => openModalDelete(user.id)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </TableContainer>

      <div>
        {modalDelete && (
          <ModalDelete 
            handleDelete={handleDelete}
            userIdDeleted={userIdDeleted}
            closeModalDelete={closeModalDelete}
          />
        )}
      </div>
    </>
  );
}