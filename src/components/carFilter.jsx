// frontend/src/components/MuscleGroupFilter.jsx

function carFilter({ active, onChange }) {
  const groups = ['alle', 'chest', 'back', 'legs', 'arms'];

  return (
    <div className="filter">
      {groups.map(group => (
        <button
          key={group}
          className={active === group ? 'active' : ''}
          onClick={() => onChange(group)}
        >
          {group}
        </button>
      ))}
    </div>
  );
}

export default carFilter;