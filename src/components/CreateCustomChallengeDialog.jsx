import React, { useEffect, useState } from "react";
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
const dsaCategories = [
  "Array",
  "String",
  "Hashing",
  "Linked List",
  "Stack",
  "Queue",
  "Heap",
  "Graph",
  "Tree",
  "Binary Search Tree",
  "Dynamic Programming",
  "Divide and Conquer",
  "Recursion",
  "Backtracking",
  "Sorting and Searching",
  "Greedy Algorithms",
  "Bit Manipulation",
  "Trie",
  "Sliding Window",
  "Two Pointers",
  "Mathematics",
  "Number Theory",
  "Geometry",
  "Game Theory",
  "Union-Find (Disjoint Set Union)",
  "Segment Tree",
  "Fenwick Tree (Binary Indexed Tree)",
  "Matrix",
  "Combinatorics",
  "String Matching Algorithms",
  "Graph Traversals (DFS, BFS)",
  "Shortest Path Algorithms",
  "Minimum Spanning Tree",
  "Topological Sort",
  "Flow Network",
];

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
    { link: "", difficulty: "Medium", category: "Array" },
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
        alert(
          "Invalid file format! Column name  must be Problem Link, Difficulty, Category"
        );
        return;
      }

      if (rows.length >= 155) {
        alert("Sheet exceeds the 150-problem limit. rows should be under 155");
        return;
      }

      // Extracting and validating data
      const validDifficulties = ["Easy", "Medium", "Hard"];
      const formattedData = rows.map((row, index) => {
        // Check if all columns exist and validate each row's data
        if (row.length < 3) {
          alert(
            `Missing columns at row ${index + 2}. Each row must have 3 columns.`
          );
          throw new Error("Validation Error");
        }

        const [link, difficulty, category] = row;

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

        if (!category || category.trim() === "") {
          alert(
            `Category is missing or empty at row ${
              index + 2
            }. Each problem must have a category.`
          );
          throw new Error("Validation Error");
        }

        if (category.length > 50) {
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
      setInputFields([
        ...inputFields,
        { link: "", difficulty: "Medium", category: "Array" },
      ]);
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
      problems: inputMode === "file" ? data : inputFields,
    };

    if (inputMode === "manual") {
      const errors = [];
      const validDifficulties = ["Easy", "Medium", "Hard"];
      inputFields.forEach((field, index) => {
        const { link, difficulty, category } = field;

        if (
          !link ||
          !/^https:\/\/leetcode\.com\/problems\/[a-z0-9-]+\/?.*$/.test(link)
        ) {
          errors.push(`Invalid link format at row ${index + 1}: ${link}`);
        }

        if (!validDifficulties.includes(difficulty)) {
          errors.push(`Invalid difficulty at row ${index + 1}: ${difficulty}`);
        }

        if (!category || category.trim() === "") {
          errors.push(`Category is missing at row ${index + 1}`);
        }

        if (category.length > 50) {
          errors.push(
            `Category is too long at row ${
              index + 1
            }: ${category} (max 50 characters)`
          );
        }
      });

      if (errors.length > 0) {
        alert(`Validation errors:\n${errors.join("\n")}`);
        return;
      }

      // Check for duplicate links in manual mode
      const linkCount = {};
      inputFields.forEach((field, index) => {
        linkCount[field.link] = linkCount[field.link] || [];
        linkCount[field.link].push(index + 1);
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
    }

    try {
      await createChallenge(challengeData).unwrap();
      form.reset();
      setData([]);
      setInputFields([{ link: "", difficulty: "Medium", category: "Array" }]);
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to create custom challenge:", error);
    }
  };

  useEffect(() => {
    console.log("input fields", inputFields);
  }, [inputFields]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1000px] max-h-[600px] w-3/4 overflow-auto">
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
                      className="w-full max-w-[500px]"
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
                <FormLabel>Select Input Method</FormLabel>
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
                <p className="text-sm text-gray-500 mb-2">
                  Use the{" "}
                  <a
                    href="https://docs.google.com/spreadsheets/d/1HL5WHK2MfMc68uQX_KP2ztO-FdaJF9Cx5G8uxwoH-xQ/edit?gid=0#gid=0"
                    target="_blank"
                    className="text-blue-500 hover:underline"
                  >
                    example Excel template
                  </a>{" "}
                  for your problem list.
                </p>
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
                    <Select
                      value={field.category}
                      onValueChange={(value) =>
                        handleInputChange(index, "category", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Category</SelectLabel>
                          {dsaCategories.map((category, index) => {
                            return (
                              <SelectItem key={index} value={category}>
                                {category}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <button
                      type="button"
                      onClick={() => removeField(index)}
                      className={`${
                        inputFields.length >= 1
                          ? "text-red-500"
                          : "text-slate-800"
                      }`}
                      disabled={inputFields.length === 1}
                    >
                      <Trash2 />
                    </button>
                  </div>
                ))}

                <div className="flex gap-2 items-center">
                  {inputFields.length < 20 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addMoreFields}
                    >
                      Add More
                    </Button>
                  )}
                  <p className="text-slate-600">Add upto 20 problems</p>
                </div>
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
