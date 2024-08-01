import React from "react";
import { Input, Textarea, Button } from "@nextui-org/react";
import axios from "@api";

export default function Contact() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleContactFormSubmission = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`admin/contact-us`, formData);

      if (response.status === 200) {
        setFormData({ name: "", email: "", message: "" });
        console.log("Form submitted successfully!");
      } else {
        console.error(
          "Error submitting contact form. Server responded with status: ",
          response.status
        );
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
    }
  };

  return (
    <section
      id="contact"
      className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 grid place-items-center"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-200 px-3 py-1 text-sm dark:bg-gray-800">
              Contact Us
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Get in Touch
            </h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Have a question or want to learn more? Fill out the form below and
              we'll get back to you as soon as possible.
            </p>
          </div>
          <div className="w-full max-w-md space-y-4">
            <form className="grid gap-4" onSubmit={handleContactFormSubmission}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Input
                    id="name"
                    label="Name"
                    variant="underlined"
                    placeholder="Enter your name"
                    onChange={handleChange}
                    value={formData.name}
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    id="email"
                    label="Email"
                    variant="underlined"
                    placeholder="Enter your email"
                    type="email"
                    onChange={handleChange}
                    value={formData.email}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Textarea
                  label="Message"
                  variant="underlined"
                  className="min-h-[120px]"
                  id="message"
                  placeholder="Enter your message"
                  onChange={handleChange}
                  value={formData.message}
                />
              </div>
              <Button
                type="submit"
                className="w-full inline-flex h-9 items-center justify-center rounded-md 
            bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
