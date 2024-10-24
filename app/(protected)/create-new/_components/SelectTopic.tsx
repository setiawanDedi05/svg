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
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { useField } from "@conform-to/react";

type ComponentProps = {
  name: string;
  formId: string;
};

export function SelectTopic({ name, formId }: ComponentProps) {
  const [meta] = useField(name, { formId });
  const topicOptions = [
    "Custome prompt",
    "Random",
    "Scary",
    "History",
    "Motivations",
  ];
  const [selectedTopic, setSelectedTopic] = useState<string>();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Content</CardTitle>
        <CardDescription className="text-muted-foreground">
          what the topic of your video
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-5">
        <Select
          name={meta.name}
          form={meta.formId}
          onValueChange={(value) => {
            setSelectedTopic(value);
          }}
        >
          <SelectTrigger className="w-1/2">
            <SelectValue placeholder="Select Topic" />
          </SelectTrigger>
          <SelectContent>
            {topicOptions.map((topic) => (
              <SelectItem key={topic} value={topic}>
                {topic}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedTopic === topicOptions[0] && (
          <Textarea placeholder="type your prompt here..." />
        )}
      </CardContent>
    </Card>
  );
}
