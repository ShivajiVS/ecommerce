"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { indianStates } from "@/lib/validators/addressSchema";

import { AddressSchema } from "@/lib/validators";

import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { MotionDiv } from "../framer-motion";

export default function AddressForm() {
  const [formStep, setFormStep] = useState(0);

  const form = useForm<z.infer<typeof AddressSchema>>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      state: "Andhra Pradesh",
      address: "",
      "city/District": "",
      pincode: "",
      addressType: "home",
    },
  });

  const {
    reset,
    formState: { isDirty, errors, touchedFields },
  } = form;

  const onSubmit = (values: z.infer<typeof AddressSchema>) => {
    console.log("submitted..");
    alert(JSON.stringify(values));
    reset();
    setFormStep(0);
  };

  const nextFormStep = () => {
    //validation: if the specific input fields are invalid then there is no sense to move to next form step..
    // trigger method helps to trigger the validations for specific input field.

    form.trigger(["fullName", "phoneNumber", "email"]);

    const fullNameState = form.getFieldState("fullName");
    const phoneNumberState = form.getFieldState("phoneNumber");
    const emailState = form.getFieldState("email");

    if (!fullNameState.isDirty || fullNameState.invalid) return;
    if (!phoneNumberState.isDirty || phoneNumberState.invalid) return;
    if (!emailState.isDirty || emailState.invalid) return;

    setFormStep(1);
  };

  // const nextFormStep = async () => {
  //   const isStepValid = await form.trigger([
  //     "fullName",
  //     "phoneNumber",
  //     "email",
  //   ]);
  //   if (!isStepValid) return;

  //   setFormStep(1);
  // };

  return (
    <div className="box-border px-2 py-1 lg:py-10">
      <Card className="mx-auto w-full max-w-sm lg:max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Address..</CardTitle>
          <CardDescription>Enter your address</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-sm lg:max-w-lg flex flex-col gap-4 relative overflow-x-hidden"
          >
            <CardContent>
              <div className="grid gap-4">
                {/* form step 1 */}
                <MotionDiv
                  className={cn("space-y-4", { hidden: formStep == 1 })}
                  // formstep == 0 ->translateX == 0%
                  // formstep == 1 ->translateX == -100%

                  animate={{ translateX: `-${formStep * 100}%` }}
                  transition={{ ease: "easeInOut" }}
                >
                  {/* full name */}
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Kondeti Shivaji" {...field} />
                          </FormControl>
                          <div className="h-1">
                            <FormMessage className="text-xs" />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  {/*  phone Number */}
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="8788676763" {...field} />
                          </FormControl>
                          <div className="h-1">
                            <FormMessage className="text-xs" />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  {/*  Email */}
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="vy@gmail.com"
                              {...field}
                            />
                          </FormControl>

                          <div className="h-3">
                            <FormMessage className="text-xs" />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </MotionDiv>
                {/* form step 2 */}
                <MotionDiv
                  className={cn("space-y-4", {
                    hidden: formStep == 0,
                  })}
                  //formstep == 0 ->translateX == 100%
                  //formstep == 1 ->translateX == 0%

                  animate={{ translateX: `-${100 - formStep * 100}%` }}
                  transition={{ ease: "easeInOut" }}
                >
                  <div className="grid grid-cols-2 gap-x-3">
                    {/*  State */}
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select State" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {indianStates.map((item) => (
                                  <SelectItem value={item} key={item}>
                                    {item}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <div className="h-1">
                              {isDirty && <FormMessage />}
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                    {/*  Pincode */}
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="pincode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pincode</FormLabel>
                            <FormControl>
                              <Input placeholder="533246" {...field} />
                            </FormControl>
                            <div className="h-1">
                              {isDirty && <FormMessage className="text-xs" />}
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  {/* city/District */}
                  <div className="grid gap-2 ">
                    <FormField
                      control={form.control}
                      name="city/District"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City/District</FormLabel>
                          <FormControl>
                            <Input placeholder="City/District" {...field} />
                          </FormControl>
                          <div className="h-2">
                            {isDirty && <FormMessage className="text-xs" />}
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* Address */}
                  <div className="grid gap-2 ">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us a little bit about yourself"
                              className="resize-y"
                              {...field}
                            />
                          </FormControl>
                          <div className="h-2">
                            {isDirty && <FormMessage className="text-xs" />}
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  {/*  Type of Address */}
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="addressType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type of Address </FormLabel>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-4"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="home" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                home
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="office" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Office
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormItem>
                      )}
                    />
                  </div>
                </MotionDiv>

                <div className="mt-2 flex space-x-6 justify-around">
                  {formStep === 1 && (
                    <Button
                      className="w-40"
                      variant={"outline"}
                      onClick={() => {
                        setFormStep(0);
                      }}
                    >
                      Previous
                    </Button>
                  )}
                  {formStep == 0 && (
                    <Button className="w-full" onClick={nextFormStep}>
                      Next
                    </Button>
                  )}

                  {formStep == 1 && (
                    <Button type="submit" className="w-40">
                      Save
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </form>
        </Form>
      </Card>
    </div>
  );
}
