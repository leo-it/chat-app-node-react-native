import { Chat } from "../models/index.js";

async function create(req, res) {
  const { participant_id_one, participant_id_two } = req.body;

  try {
    // Verificar si ya existe un chat entre los participantes
    const foundOne = await Chat.findOne({
      participant_one: participant_id_one,
      participant_two: participant_id_two,
    });

    const foundTwo = await Chat.findOne({
      participant_one: participant_id_two,
      participant_two: participant_id_one,
    });

    if (foundOne || foundTwo) {
      return res
        .status(200)
        .send({ msg: "Ya tienes un chat con este usuario" });
    }

    // Crear un nuevo chat
    const chat = new Chat({
      participant_one: participant_id_one,
      participant_two: participant_id_two,
    });

    // Guardar el chat y esperar la operación
    const chatStorage = await chat.save();

    res.status(201).send(chatStorage);
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error del servidor" });
  }
}

async function getAll(req, res) {
  try {
    const { user_id } = req.user;

    // Utiliza await para manejar la ejecución de la consulta
    const chats = await Chat.find({
      $or: [{ participant_one: user_id }, { participant_two: user_id }],
    })
      .populate("participant_one")
      .populate("participant_two")
      .exec();
    //todo obtener fecha del ultimo mensaje de cada chat
    res.status(200).send(chats);
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error del servidor" });
  }
}

async function deleteChat(req, res) {
  const chat_id = req.params.id;

  try {
    // Utiliza await para manejar la ejecución de la operación de eliminación
    const deletedChat = await Chat.findByIdAndDelete(chat_id);

    if (!deletedChat) {
      return res.status(404).json({ msg: "Chat no encontrado" });
    }

    res.status(200).json({ msg: "Chat eliminado exitosamente" });
  } catch (error) {
    console.error(error);

    // Si se produce un error, también puedes manejarlo con un callback
    res.status(500).json({ msg: "Error al eliminar el chat" });
  }
}

async function getChat(req, res) {
    const chat_id = req.params.id;
    try {
      // Utiliza await para manejar la ejecución de la consulta
      const chatStorage = await Chat.findById(chat_id)
        .populate("participant_one")
        .populate("participant_two");
  
      if (!chatStorage) {
        return res.status(404).json({ msg: "Chat no encontrado" });
      }
  
      res.status(200).json(chatStorage);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error en la búsqueda del chat" });
    }
  }
  

export const ChatController = { create, getAll, deleteChat, getChat };
