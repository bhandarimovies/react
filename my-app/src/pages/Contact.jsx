import { useState } from "react";
import emailjs from "emailjs-com";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_asxw30i",     // 🔥 replace
        "template_zcleh28",    // 🔥 replace
        form,
        "MCmrVqLcXrnO7HNAC"      // 🔥 replace
      )
      .then(
        () => {
          setStatus("✅ Message sent successfully!");
          setForm({ name: "", email: "", message: "" });
        },
        () => {
          setStatus("❌ Failed to send message.");
        }
      );
  };

  return (
    <div className="p-10 text-green-400">
      <h2 className="text-3xl font-bold mb-4">Contact</h2>

      <form onSubmit={handleSubmit} className="flex flex-col max-w-md">
        <input
          type="text"
          name="name"
          value={form.name}
          placeholder="Name"
          className="p-2 mb-3 bg-black border border-green-500"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          value={form.email}
          placeholder="Email"
          className="p-2 mb-3 bg-black border border-green-500"
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          value={form.message}
          placeholder="Message"
          className="p-2 mb-3 bg-black border border-green-500"
          onChange={handleChange}
          required
        />

        <button className="border border-green-500 p-2 hover:bg-green-500 hover:text-black">
          Send
        </button>
      </form>

      {status && <p className="mt-4">{status}</p>}
    </div>
  );
}

export default Contact;