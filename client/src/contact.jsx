import { useForm } from "react-hook-form";
import { useState } from "react";
import "./example.css";

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const onSubmit = async (data) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        setSuccess(true);
        setServerError("");
      } else {
        setServerError(result.error || "Submission failed.");
      }
    } catch {
      setServerError("Server error.");
    }
  };

  return (
    <div>
      <h2>My Contacts</h2>
      <p>
        Contact me at my email <b>kshiu8@my.centennialcollege.ca</b> or by phone <b>416-417-3135</b>!
      </p>
      <h2>Please fill out your information below to send me your contact information and we can chat!</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="hook">
        <label className="hook__text">Name</label>
        <input
          type="text"
          className="hook__input"
          {...register("name", { required: true })}
        />
        {errors.name && <p className="hook__error">Name is required</p>}

        <label className="hook__text">Email</label>
        <input
          type="email"
          className="hook__input"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <p className="hook__error">Valid email is required</p>}

        <label className="hook__text">Message</label>
        <textarea
          className="hook__input"
          rows="4"
          {...register("message", { required: true })}
        />
        {errors.message && <p className="hook__error">Message is required</p>}

        <button className="hook__button" type="submit">Submit</button>

        {success && !errors.email && !errors.name && !errors.message && (
          <p style={{ color: "green", fontSize: "1.2rem", margin: 0 }}>
            Message submitted successfully!
          </p>
        )}
        {serverError && (
          <p style={{ color: "red", fontSize: "1.2rem", margin: 0 }}>
            {serverError}
          </p>
        )}
      </form>
    </div>
  );
}