"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useCompanyModal } from "@/hooks/useStoreModal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Multisteps } from "@/components/multisteps";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
  phone: z.string().min(10).max(20),
  address: z.string().min(10).max(255),
  city: z.string().min(3).max(255),
  state: z.string().min(2).max(255),
  zip: z.string().min(5).max(10),
  country: z.string().min(3).max(255),
  website: z.string().min(3).max(255),
  industry: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
});

export const CompanyForm = () => {
  const steps = Array.from(Array(3).keys()) as number[];
  const [stepState, setStepState] = useState(0);

  const companyModal = useCompanyModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      website: "",
      industry: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Create company
    console.log(values);
  };

  const renderCompanyStepsForm = () => {
    switch (stepState) {
      case 0:
        return (
          <div className="w-full space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="company name"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="company email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="company phone" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        );
        break;
      case 1:
        return (
          <div className="w-full space-y-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="company address" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="city" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="state" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip</FormLabel>
                  <FormControl>
                    <Input placeholder="zip code" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="country" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        );
        break;
      case 2:
        return (
          <div className="w-full space-y-4">
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="website" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry</FormLabel>
                  <FormControl>
                    <Input placeholder="industry" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="description" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        );
        break;

      default:
        break;
    }
  };

  const next = () => {
    setStepState(stepState + 1);
  };
  const previous = () => {
    setStepState(stepState > 0 ? stepState - 1 : stepState);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Multisteps activeStep={stepState} steps={steps} />
        <div className="w-full flex items-center h-[450px]">
          {renderCompanyStepsForm()}
        </div>
        <div className="pt-6 space-x-2 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={stepState === 0 ? companyModal.onClose : previous}
            disabled={false}
          >
            {stepState === 0 ? "Close" : "Previous"}
          </Button>
          <Button onClick={next} disabled={false}>
            {stepState === steps.length - 1 ? "Create" : "Next"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
