const Mailgen = require("mailgen");

function TemplateGenerator(
  name,
  introMsg,
  instructMsg,
  link,
  msg,
  outro,
  color
) {
  const MailGenerator = new Mailgen({
    product: {
      name: "Fitness Networking",
      link: "http://localhost:5173/",
    },
  });

  const emailContent = {
    body: {
      name: name,
      intro: introMsg,
      action: {
        instructions: instructMsg,
        button: {
          text: msg,
          link: link,
        },
      },
      outro: outro,
    },
  };

  return MailGenerator.generate(emailContent);
}

module.exports = TemplateGenerator;
