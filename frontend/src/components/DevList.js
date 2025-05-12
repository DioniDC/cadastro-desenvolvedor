export default function DevList({ devs, onDelete }) {
  return (
    <ul>
      {devs.map((dev) => (
        <li key={dev.id}>
          {dev.nome}
          <button onClick={() => onDelete(dev.id)}>Excluir</button>
        </li>
      ))}
    </ul>
  );
}