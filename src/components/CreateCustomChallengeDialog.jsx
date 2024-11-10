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

      // Extracting and formatting data
      const formattedData = parsedData.slice(1).map((row) => ({
        link: row[0],
        difficulty: row[1],
        category: row[2],
      }));

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
