const SkillCard = ({ skill, onEdit, onDelete, showUser }) => (
  <div className="skill-card">
    <h3>
      {skill.skillOffered} ⇆ {skill.skillNeeded}
    </h3>
    <p>{skill.description}</p>
    {showUser && <p>Posted by: {skill.user?.username}</p>}
    {(onEdit || onDelete) && (
      <div className="skill-actions">
        {onEdit && <button onClick={() => onEdit(skill._id)}>Edit</button>}
        {onDelete && (
          <button onClick={() => onDelete(skill._id)}>Delete</button>
        )}
      </div>
    )}
  </div>
);

export default SkillCard;
