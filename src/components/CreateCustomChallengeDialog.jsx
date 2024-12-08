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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react"; // Importing Trash2 icon

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
  const [inputFields, setInputFields] = useState([
    { link: "", difficulty: "" },
  ]);
  const [createChallenge] = useCreateChallengeMutation();
  const [inputMode, setInputMode] = useState("file");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  
      // Check for header structure
      const [header, ...rows] = parsedData;
      if (
        header.length !== 3 ||
        header[0] !== "Problem Link" ||
        header[1] !== "Difficulty" ||
        header[2] !== "Category"
      ) {
        alert("Invalid file format! Please upload the correct template.");
        return;
      }
  
      if (rows.length > 150) {
        alert("Sheet exceeds the 150-problem limit.");
        return;
      }
  
      // Extracting and validating data
      const validDifficulties = ["Easy", "Medium", "Hard"];
      const formattedData = rows.map((row, index) => {
        const [link, difficulty, category = ""] = row;
  
        // Validate LeetCode link format (only care about the slug)
        if (
          !link ||
          !/^https:\/\/leetcode\.com\/problems\/[a-z0-9-]+\/?.*$/.test(link)
        ) {
          alert(`Invalid link format at row ${index + 2}: ${link}`);
          throw new Error("Validation Error");
        }
  
        if (!validDifficulties.includes(difficulty?.trim())) {
          alert(`Invalid difficulty at row ${index + 2}: ${difficulty}`);
          throw new Error("Validation Error");
        }
  
        if (category && category.length > 50) {
          alert(
            `Category is too long at row ${
              index + 2
            }: ${category} (max 50 characters)`
          );
          throw new Error("Validation Error");
        }
  
        return {
          link: link.trim(),
          difficulty: difficulty.trim(),
          category: category.trim(),
          rowIndex: index + 2, // Store the original row number for better error reporting
        };
      });
  
      // Check for duplicate links
      const linkCount = {};
      formattedData.forEach((item) => {
        linkCount[item.link] = linkCount[item.link] || [];
        linkCount[item.link].push(item.rowIndex);
      });
  
      const duplicateLinks = Object.entries(linkCount).filter(
        ([_, indices]) => indices.length > 1
      );
  
      if (duplicateLinks.length > 0) {
        const duplicateMessages = duplicateLinks
          .map(
            ([link, indices]) =>
              `Duplicate link "${link}" found at rows: ${indices.join(", ")}`
          )
          .join("\n");
        alert(`Duplicate links detected:\n${duplicateMessages}`);
        return;
      }
  
      setData(formattedData);
    };
  
    reader.readAsArrayBuffer(file);
  };
  

  const handleInputChange = (index, field, value) => {
    const updatedFields = [...inputFields];
    updatedFields[index][field] = value;
    setInputFields(updatedFields);
  };

  const addMoreFields = () => {
    if (inputFields.length < 20) {
      setInputFields([...inputFields, { link: "", difficulty: "" }]);
    }
  };

  const removeField = (index) => {
    const updatedFields = inputFields.filter((_, i) => i !== index);
    setInputFields(updatedFields);
  };

  const handleSubmitCustomChallenge = async (values) => {
    const challengeData = {
      name: values.name,
      description: values.description,
      isPublic: values.isPublic,
      problems: data,
    };

    try {
      await createChallenge(challengeData).unwrap();
      form.reset();
      setData([]);
      setInputFields([{ link: "", difficulty: "" }]);
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to create custom challenge:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-h-[600px] overflow-auto">
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
            <div className="mb-2">
              <Select value={inputMode} onValueChange={setInputMode}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Input Mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Input Mode</SelectLabel>
                    <SelectItem value="file">Upload File</SelectItem>
                    <SelectItem value="manual">Manual Input</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {inputMode === "file" ? (
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <FormLabel htmlFor="problemExcel" className="font-semibold">
                  Upload Problem List
                </FormLabel>
                <Input
                  id="problemExcel"
                  type="file"
                  onChange={handleFileUpload}
                  className="cursor-pointer"
                />
              </div>
            ) : (
              <div className="space-y-4">
                {inputFields.map((field, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <Input
                      placeholder="Enter problem link"
                      value={field.link}
                      onChange={(e) =>
                        handleInputChange(index, "link", e.target.value)
                      }
                    />
                    <Select
                      value={field.difficulty}
                      onValueChange={(value) =>
                        handleInputChange(index, "difficulty", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Difficulty</SelectLabel>
                          <SelectItem value="Easy">Easy</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Hard">Hard</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <button
                      type="button"
                      onClick={() => removeField(index)}
                      className="text-red-500"
                    >
                      <Trash2 />
                    </button>
                  </div>
                ))}
                {inputFields.length < 20 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addMoreFields}
                  >
                    Add More
                  </Button>
                )}
              </div>
            )}
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
