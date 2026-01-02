import { useNavigate } from "react-router-dom";

function Messages() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Your Messages</h2>
      <p>Select a conversation to start chatting</p>

      {/* Temporary demo chat */}
      <button onClick={() => navigate("1")}>
        Open Chat (Match 1)
      </button>
    </div>
  );
}

export default Messages;
