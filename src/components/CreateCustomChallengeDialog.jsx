import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { createCustomChallengeSchema } from "@/validation/createCustomChallengeSchema";
import { useCreateChallengeMutation } from "@/services/challenge";
import { Label } from "@radix-ui/react-dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateCustomChallengeDialog = ({ isOpen, onOpenChange }) => {
  const form = useForm({
    resolver: zodResolver(createCustomChallengeSchema),
    defaultValues: {
      name: "",
      description: "",
      isPublic: false,
    },
  });

  const [data, setData] = useState([]);
  const [createChallenge] = useCreateChallengeMutation();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Assuming the first row contains headers like ['Problem Link', 'Difficulty']
      const formattedData = parsedData.slice(1).map((row) => ({
        link: row[0],
        difficulty: row[1],
      }));

      // Basic validation for difficulty
      const validDifficulties = ["Easy", "Medium", "Hard"];
      const isValid = formattedData.every((item) =>
        validDifficulties.includes(item.difficulty)
      );

      if (!isValid) {
        alert(
          "Invalid difficulty detected! Please use 'Easy', 'Medium', or 'Hard'."
        );
        return;
      }
      setData(formattedData);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleSubmitCustomChallenge = async (values) => {
    // Prepare the data to be sent
    const challengeData = {
      name: values.name,
      description: values.description,
      isPublic: values.isPublic,
      problems: data, // Use the uploaded problems
    };

    try {
      console.log(challengeData, "challengeData");
      const response = await createChallenge(challengeData).unwrap();
      console.log("Challenge created successfully:", response);
      form.reset();
      setData([]); // Clear uploaded data
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to create custom challenge:", error);
      // Optionally handle the error (e.g., show a notification)
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] w-screen">
        <DialogHeader>
          <DialogTitle>Create Custom Challenge</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmitCustomChallenge)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Challenge Name</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="Enter challenge name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Challenge Description</FormLabel>
                  <FormControl>
                    <Input
                      id="description"
                      placeholder="Enter challenge description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isPublic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Public</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value ? "yes" : "no"}
                      onValueChange={(value) => field.onChange(value === "yes")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Yes or No" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Visibility</SelectLabel>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="problemExcel" className="font-semibold">
                Upload Problem List
              </Label>
              <p className="text-sm text-gray-600 mb-2">
                Please upload an Excel file containing a list of problems and
                their difficulty levels. You can download a sample file{" "}
                <a
                  href="https://docs.google.com/spreadsheets/d/1HL5WHK2MfMc68uQX_KP2ztO-FdaJF9Cx5G8uxwoH-xQ/export?format=xlsx"
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here{" "}
                </a>
                or go to the following link to view, make a copy, edit, and then
                download:
                <a
                  href="https://docs.google.com/spreadsheets/d/1HL5WHK2MfMc68uQX_KP2ztO-FdaJF9Cx5G8uxwoH-xQ/edit?usp=sharing"
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  View Google Sheet
                </a>
                .
              </p>
              <Input
                id="problemExcel"
                type="file"
                onChange={handleFileUpload}
                className="cursor-pointer"
              />
            </div>
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCustomChallengeDialog;
