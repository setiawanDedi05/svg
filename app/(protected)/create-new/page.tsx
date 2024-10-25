"use client";

import React from "react";
import { SelectTopic } from "./_components/SelectTopic";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import { CreateAiShortAction } from "@/lib/action";
import { FormProvider, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { createAiShortSchema } from "@/lib/zodSchema";
import { SelectDuration } from "./_components/SelectDuration";
import { SelectStyle } from "./_components/SelectStyle";
import { useLoadingStore } from "@/app/store/loading";

export default function CreateNew() {
  const [lastResult, action] = useFormState(CreateAiShortAction, undefined);
  const { showLoading, hideLoading } = useLoadingStore();

  const [form, fields] = useForm({
    id: "create-new",
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: createAiShortSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold text-primary">CreateNew</h2>
      <FormProvider context={form.context}>
        <form
          action={async (formData) => {
            showLoading();
            await action(formData);
            setTimeout(() => {
              hideLoading();
            }, 5000)
          }}
          id={form.id}
          onSubmit={form.onSubmit}
          noValidate
        >
          {/* select topic */}
          <SelectTopic name={fields.topic.name} formId={form.id} />
          {/* select style */}
          <SelectStyle name={fields.style.name} formId={form.id} />
          {/* select duration */}
          <SelectDuration name={fields.duration.name} formId={form.id} />
          {/* create button */}
          <Button type="submit">Create</Button>
        </form>
      </FormProvider>
    </div>
  );
}
