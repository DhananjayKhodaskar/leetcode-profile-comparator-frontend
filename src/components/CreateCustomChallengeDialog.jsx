import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "./ui/checkbox";
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
  const [createActiveChallenge] = useCreateChallengeMutation();

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
      console.log(formattedData, "thi is sthe data from the sheet");
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
      const response = await createActiveChallenge(challengeData).unwrap();
      console.log("Challenge created successfully:", response);
      // Optionally reset the form and close the dialog
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

            {/* Excel Upload Section */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Picture</Label>
              <Input id="picture" type="file" onChange={handleFileUpload} />
            </div>

            <div className="flex items-center justify-center w-full">
              <div className="border-t border-gray-300 flex-grow mr-3"></div>
              <span className="text-gray-500 font-medium">OR</span>
              <div className="border-t border-gray-300 flex-grow ml-3"></div>
            </div>

            <FormField
              control={form.control}
              name="isPublic"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Public</FormLabel>
                </FormItem>
              )}
            />
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
