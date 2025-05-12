export default function LevelList({ levels, onDelete }) {
  return (
    <ul>
      {levels.map((nivel) => (
        <li key={nivel.id}>
          {nivel.nivel}
          <button onClick={() => onDelete(nivel.id)}>Excluir</button>
        </li>
      ))}
    </ul>
  );
}
