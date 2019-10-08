module.exports = {
  selectSkills: (selected = [], options) => {
    const skills = [
      "HTML5",
      "CSS3",
      "CSSGrid",
      "Flexbox",
      "JavaScript",
      "jQuery",
      "Node",
      "Angular",
      "VueJS",
      "ReactJS",
      "React Hooks",
      "Redux",
      "Apollo",
      "GraphQL",
      "TypeScript",
      "PHP",
      "Laravel",
      "Symfony",
      "Python",
      "Django",
      "ORM",
      "Sequelize",
      "Mongoose",
      "SQL",
      "MVC",
      "SASS",
      "WordPress"
    ];

    let html = "";

    // Mostrar las skills
    skills.forEach(skill => {
      html += `<li ${
        selected.includes(skill) ? 'class = "activo"' : ""
      }>${skill}</li>`;
    });

    return (options.fn().html = html);
  },

  tipoContrato: (selected, options) => {
    return options
      .fn()
      .replace(new RegExp(` value="${selected}"`), '$& selected="selected"');
  }
};
