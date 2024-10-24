"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { useField } from "@conform-to/react";

type ComponentProps = {
  name: string;
  formId: string;
};

export function SelectDuration({ name, formId }: ComponentProps) {
  const [meta] = useField(name, { formId });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Duration</CardTitle>
        <CardDescription className="text-muted-foreground">
          Choose duration you want
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-5">
        <Select name={meta.name} form={meta.formId}>
          <SelectTrigger className="w-1/2">
            <SelectValue placeholder="Select Topic" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30 seconds">30 Second</SelectItem>
            <SelectItem value="60 seconds">60 Second</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}
