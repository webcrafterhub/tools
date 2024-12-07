import { GetFormById } from "@/actions/form";
import FormBuilder from "@/components/FormBuilder";
import React from "react";

async function BuilderPage(
  props: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const params = await props.params;
  const { id } = params;
  const form = await GetFormById(id);
  if (!form) {
    throw new Error("form not found");
  }
  return <FormBuilder form={form} />;
}

export default BuilderPage;
