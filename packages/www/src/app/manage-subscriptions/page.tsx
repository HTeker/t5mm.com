"use client";

import {
  capitalizeFirst,
  NewsletterEnum,
  useSubscriptions,
} from "@t5mm-com/shared";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

type FormData = {
  newsletters: NewsletterEnum[];
};

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export default function ManageSubscriptionsPage() {
  const { t } = useTranslation();

  const searchParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams();

  const tokenParam = searchParams.get("token");

  const subscriptions = useSubscriptions({ subscriberUuid: tokenParam });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>();

  useEffect(() => {
    if (!subscriptions.subscriptions.length) return;
    reset({
      newsletters: subscriptions.subscriptions.map((s) => s.newsletter),
    });
  }, [subscriptions.subscriptions, reset]);

  const onSubmit = async (data: FormData) => {
    await delay(5000);
    console.log("data", data);
    // await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/subscriptions`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });
  };

  return (
    <>
      <h1>Manage your subscriptions</h1>
      {subscriptions.subscriptions.length ? (
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <p>
            <b>Newsletters:</b>
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: ".5rem",
            }}
          >
            {Object.values(NewsletterEnum).map((newsletter, index) => (
              <label
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: ".35rem",
                }}
              >
                <input
                  type="checkbox"
                  value={newsletter}
                  {...register("newsletters")}
                />
                {capitalizeFirst(t(newsletter))}
              </label>
            ))}
            {errors.newsletters && (
              <p
                style={{
                  color: "#ff4444",
                  fontSize: ".9rem",
                  margin: ".25rem 0 0 0",
                }}
              >
                {errors.newsletters.message}
              </p>
            )}
          </div>
          <br />
          <div className="form-submit-group">
            {/* <div>
            <input
              id="email"
              type="email"
              placeholder="you@company.com"
              style={{ width: "100%", minWidth: "18rem" }}
              autoFocus
              autoComplete="on"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <p
                style={{
                  color: "#ff4444",
                  fontSize: ".9rem",
                  margin: ".25rem 0 0 0",
                }}
              >
                {errors.email.message}
              </p>
            )}
          </div> */}
            <button
              type="submit"
              data-loading={isSubmitting}
              disabled={isSubmitting}
            >
              Update
            </button>
          </div>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
