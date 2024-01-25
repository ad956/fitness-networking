const Mailgen = require("mailgen");

function mailTemplateGenrator(
  name,
  introMsg,
  instuctMsg,
  link,
  msg,
  outro,
  color
) {
  let MailGenerator = new Mailgen({
    theme: "cerberus",
    product: {
      name: "Fitness Networking",
      link: "http://localhost:5173/",
    },
  });

  let response = {
    body: {
      name: name,
      intro: introMsg,
      action: {
        instructions: instuctMsg,
        button: {
          color,
          text: msg,
          link: link,
        },
      },
      outro: outro,
    },
  };
  return MailGenerator.generate(response);
}

module.exports = mailTemplateGenrator;
